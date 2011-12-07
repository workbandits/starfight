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
        apiKey: '2e3824b2dc3d4da0aad123b881427d67', 
        status: true,
        cookie: true
    });
    
    /* All the events registered */
    DI.Event.subscribe('auth.login', function(response) {
        // do something with response
        login();
    });
    
    DI.Event.subscribe('auth.logout', function(response) {
        // do something with response
        logout();
    });
    
    DI.getLoginStatus(function(response) {
        if (response.session) {
           onLoad(response);
        }
    });
};
(function() {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol + '//localhost/starwaar/static/js/lib/all.js';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(e, s);
}());

function login() {
    document.location.href='report.html';
}

function logout() {
    document.location.href='index.html';
}

$('#login').on('click', function() {
    DI.login(function(response) {
        if (response.session) {
            document.location.href='report.html';
        }
    });
});

$('#logout').on('click', function(e) {
    e.preventDefault();
    
    DI.logout(function() {
        document.location.href='index.html';
    });
});