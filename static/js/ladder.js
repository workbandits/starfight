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
var position = 0;
var ladderModel = function(data) {
    ko.mapping.fromJS(data, {}, this);
    
    this.position = ko.computed(function() {
        position++;
        
        return position;
    }, this);
}
            
var mapping = {
    'ladder': {
        create: function(options) {
            return new ladderModel(options.data);
        }
    }
}

function onLoad(response) {
    if (response.status == 'notConnected' || response.status == 'unknown') {
        document.location.href='index.html';
    }
    
    DI.api('/action/on-load-ladder-page/run', function(response) {
        var viewModel = ko.mapping.fromJS(response.data, mapping);
            
        ko.applyBindings(viewModel);
    });
}