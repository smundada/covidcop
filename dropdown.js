// ==UserScript==
// @name        facebook login
// @namespace   http://123.123
// @include     https://www.facebook.com/*
// @version     1
// @require     http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js
// @require     http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js
// @resource    bt http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css
// @resource    bt-theme http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-theme.min.css
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==
(function() {
    if ($('#login_form').length <= 0) {
        console.log('No login_form');
        return;
    }

    GM_addStyle(GM_getResourceText("bt"));
    GM_addStyle(GM_getResourceText ("bt-theme"));
    GM_addStyle("#menu1 a {text-align: left}");
    var $loginbutton = $('#loginbutton');
    var menu = '<span class="dropdown btn btn-primary" style="padding: 2px; margin: 0 0 0 5px;">' +
               '<a id="drop4" href="#" data-toggle="dropdown" role="button" style="color: #FFF">帳號 ' +
               '<b class="caret"></b>' +
               '</a>' +
               '<ul id="menu1" class="dropdown-menu" aria-labelledby="drop4" role="menu">' +
               '<li>' +
               '<a href="#" role="menuitem">kaoyenchi</a>' +
               '</li>' +
               '<li>' +
               '<a href="#" role="menuitem">tcyc</a>' +
               '</li>' +
               '<li>' +
               '<a href="#" role="menuitem">fcwu</a>' +
               '</li>' +
               '</ul>' +
               '</span>'
    $loginbutton.parent().append(menu);
    var accounts = {};
    accounts['fcwu'] = ['', ''];
    accounts['kaoyenchi'] = ['', ''];
    accounts['tcyc'] = ['', ''];
    accounts['timy'] = ['', ''];
    $('#menu1 a').click(function() {
        name = $(this).text()
        $('#email').attr('value', accounts[name][0]);
        $('#pass').attr('value', accounts[name][1]);
        $('#login_form').submit();
    });

})(); 