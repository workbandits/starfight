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
    DI.api('/action/on-load-attack-page/run', function(response) {
        var myViewModel = {
            platiniumQuantity: ko.observable(response.data.platinium.quantity),
            playerPop: response.data.player.dynProp.pop,
            playerXp: response.data.player.dynProp.xp,
            playerNbAttack: ko.observable(response.data.player.dynProp.nbAttack),
            players: ko.observableArray(response.data.players)
        }
        
        myViewModel.players = ko.dependentObservable(function() {
            var result = [];
            
            ko.utils.arrayForEach(this.players(), function(player) {
               result.push({
                  player: player,
                  spy: '/action/spy/run?id=' + player.id,
                  attack: '/action/attack/run?id=' + player.id
               });
            });
            
            return result;
        }, myViewModel); 
         
        ko.applyBindings(myViewModel);
    });
        
    $('td a').click(function(e) {
        e.preventDefault();

        DI.api($(this).attr('href'), 'get', function(response) {
            document.location.href='report.html';
        });
    });
}