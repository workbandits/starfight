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
    DI.api('/action/on-load-mine-page/run', function(response) {
        var myViewModel = ko.mapping.fromJS(response.data);
        
        ko.applyBindings(myViewModel);

        $('#upgradeMine').on('click', function(e) {
            e.preventDefault();

            DI.api('/action/upgrade-mine/run', function(response) {
                if (response.data.status === 'success') {
                    $.jGrowl(response.data.message);

                    DI.api('/action/on-load-mine-page/run', function(response) {
                        ko.mapping.fromJS(response.data, myViewModel);
                    });
                } else {
                    $.jGrowl(response.data.message);
                }
            });
        });
     
        $('#buyPlatinium').on('click', function(e) {
            e.preventDefault();
            
            DI.api($(this).attr('href'), 'post', {'_method':'POST'}, function(response) {
               if (response.status === 'success') {
                    $.jGrowl('Congratz! You buy 100 platinium for 50D! Points!');
                   
                    DI.api('/action/on-load-mine-page/run', function(response) {
                        ko.mapping.fromJS(response.data, myViewModel);
                    });
               } else {
                    $.jGrowl(response.message);
               }
            });
        });
    });
}
