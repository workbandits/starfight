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
        apiKey: 'fake_api_key', 
        status: true,
        cookie: true,
        logging: true
    });
    
    /* All the events registered */
    DI.Event.subscribe('auth.login', function(response) {
        if (response.status == 'connected') {
            document.location.href='report.html';
        }
    });
    
    DI.Event.subscribe('auth.logout', function(response) {
        document.location.href='index.html';
    });
    
    DI.Event.subscribe('auth.sessionChange', function(response) {
        if (response.status == 'notConnected' || response.status == 'unknown') {
            document.location.href='index.html';
        }
    });
    
    DI.getLoginStatus(function(response) {
        onLoad(response);
    });
};
(function() {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol + '//www.dingg.it/api/all.js';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(e, s);
}());

$('#login').on('click', function(e) {
    e.preventDefault();
    
    DI.login(function(response) {});
});

$('#logout').on('click', function(e) {
    e.preventDefault();
    
    DI.logout(function(response) {});
});
