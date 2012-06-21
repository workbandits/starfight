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
window.diAsyncInit = function() {
    DI.init({
        apiKey: '6815553c2a68472c8e399ebb4106fad5', 
        status: true,
        cookie: true,
        logging: true
    });
    
    /* All the events registered */
    DI.Event.subscribe('auth.login', function(response) {
        document.location.href = 'dashboard.html'; 
    });
    DI.Event.subscribe('auth.logout', function(response) {
        document.location.href='index.html';
    });
    DI.Event.subscribe('auth.statusChange', function(response) {
        if ($('#di_connected').length != 0) {
            if (response.status == 'connected') {
                onLoad(response);
            } else {
                DI.login(function(response) {
                    if (response.status == 'connected') {
                        onLoad(response);
                    }
                }, {
                    'display':'silent'
                });
            }
        } else {
            if (!endsWith(document.location.href, 'index.html')) {
                if (response.status == 'connected') {
                    DI.logout(function(response) {});
                    document.location.href = 'index.html';
                } else {
                    onLoad(response);
                }   
            }
        }
    });
};
(function() {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol + '//192.168.0.21/starfight/static/js/lib/all.js';
    //e.src = document.location.protocol + '//www.dingg.it/api/all.js';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(e, s);
}());

$('#login').on('click', function(e) {
    e.preventDefault();
    
    DI.login(function(response) {});
});

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}