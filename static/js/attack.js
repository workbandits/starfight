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
var playerModel = function(data) {
    ko.mapping.fromJS(data, {}, this);
    
    this.spy = ko.computed(function() {
        return '/action/spy/run?id=' + this.id();
    }, this);
    this.attack = ko.computed(function() {
        return '/action/attack/run?id=' + this.id();
    }, this);
}
            
var mapping = {
    'players': {
        create: function(options) {
            return new playerModel(options.data);
        }
    }
}
function onLoad(response) {
    if (response.status == 'notConnected' || response.status == 'unknown') {
        document.location.href='index.html';
    }
    
    DI.api('/action/on-load-attack-page/run', function(response) {
        var myViewModel = ko.mapping.fromJS(response.data, mapping);
        
        ko.applyBindings(myViewModel);
        
        $('td a').on('click', function(e) {
            e.preventDefault();

            DI.api($(this).attr('href'), 'get', function(response) {
                document.location.href='report.html';
            });
        });
    });
}