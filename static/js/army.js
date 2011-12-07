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
    DI.api('/action/on-load-army-page/run', function(response) {
        var myViewModel = {
            platiniumQuantity: ko.observable(response.data.platinium.quantity),
            playerPop: ko.observable(response.data.player.dynProp.pop),
            playerXp: response.data.player.dynProp.xp,
            playerNbAttack: ko.observable(response.data.player.dynProp.nbAttack),
            playerAttack: ko.observable(response.data.player.dynProp.attack),
            playerDefense: ko.observable(response.data.player.dynProp.defense),
            army: ko.observableArray(response.data.army)
        }
        ko.applyBindings(myViewModel);
        
        $('input[type=submit]').unbind('click').click(function(e) {
            e.preventDefault();

            var inputNode = $(this).prev();

            DI.api('/action/create-army/run', 'post', {"ref": inputNode.attr('name'), "quantity": inputNode.val()}, function(response) {
                if (response.data.status == 'success') {
                    // message
                    $.jGrowl(response.data.message);

                    // update display
                    DI.api('/action/on-load-army-page/run', function(response) {
                        myViewModel.platiniumQuantity(response.data.platinium.quantity)
                        .playerPop(response.data.player.dynProp.pop)
                        .playerNbAttack(response.data.player.dynProp.nbAttack)
                        .playerAttack(response.data.player.dynProp.attack)
                        .playerDefense(response.data.player.dynProp.defense)
                        .army(response.data.army);
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