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
        var myViewModel = {
            platiniumQuantity: ko.observable(response.data.platinium.quantity),
            playerPop: response.data.player.dynProp.pop,
            playerXp: response.data.player.dynProp.xp,
            playerNbAttack: ko.observable(response.data.player.dynProp.nbAttack),
            currentLvl: ko.observable(response.data.current.lvl),
            currentProduction: ko.observable(response.data.current.production),
            nextLvl: ko.observable(response.data.next.lvl),
            nextProduction: ko.observable(response.data.next.production),
            nextCost: ko.observable(response.data.next.cost),
            nextXpMin: ko.observable(response.data.next.xpMin)
        }
        ko.applyBindings(myViewModel);
    
        if ($.data($('#upgradeMine').get(0), 'events') == undefined || $.data($('#upgradeMine').get(0), 'events').click.length == 0) {
            $('#upgradeMine').on('click', function(e) {
                e.preventDefault();

                DI.api('/action/upgrade-mine/run', function(response) {
                    if (response.data.status == 'success') {
                        // message
                        $.jGrowl(response.data.message);

                        // maj affichage
                        DI.api('/action/on-load-mine-page/run', function(response) {
                            myViewModel.platiniumQuantity(response.data.platinium.quantity)
                                .playerNbAttack(response.data.player.dynProp.nbAttack)
                                .currentLvl(response.data.current.lvl)
                                .currentProduction(response.data.current.production)
                                .nextLvl(response.data.next.lvl)
                                .nextProduction(response.data.next.production)
                                .nextCost(response.data.next.cost)
                                .nextXpMin(response.data.next.xpMin);
                        });
                    } else {
                        // message
                        $.jGrowl(response.data.message);
                    }
                });
            });
        }
    });
}