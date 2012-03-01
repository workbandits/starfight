/**
 * Copyright (C) Work Bandits
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
function onLoad(response) {
    if (response.status == 'notConnected' || response.status == 'unknown') {
        document.location.href='index.html';
    }
    
    DI.api('/action/on-load-army-page/run', function(response) {
        var myViewModel = ko.mapping.fromJS(response.data);
        
        ko.applyBindings(myViewModel);
        
        $('input[type=submit]').on('click', function(e) {
            e.preventDefault();

            var inputNode = $(this).prev();

            DI.api('/action/create-army/run', 'post', {
                "ref": inputNode.attr('name'), 
                "quantity": inputNode.val()
            }, function(response) {
                if (response.data.status == 'success') {
                    // update display
                    DI.api('/action/on-load-army-page/run', function(response) {
                        ko.mapping.fromJS(response.data, myViewModel);
                    });
                    
                    // message
                    $.jGrowl(response.data.message);
                    
                    $.each(response.data.achievements, function(index, value) {
                       $.jGrowl(value.template.name + ' unlocked! You dingg it!'); 
                    });
                } else {
                    // message
                    $.jGrowl(response.data.message);
                }
            });

            inputNode.val('');
        });
    });
}
