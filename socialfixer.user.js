// ==UserScript==
// @name           Social Fixer for Facebook Test
// @namespace      https://github.com/smundada/
// @include        /^https?:\/\/facebook\.com\//
// @include        /^https?:\/\/[^\/]*\.facebook\.com\//
// @exclude        /^https?:\/\/[^\/]*(channel|static)[^\/]*facebook\.com\//
// @exclude        /^https?:\/\/[^\/]*facebook\.com\/.*(ai.php|morestories.php|generic.php|xti.php|plugins|connect|ajax|sound_iframe|l.php\?u)/
// @exclude        /^https?:\/\/[^\/]*\.facebook\.com\/help/
// @exclude        /^https?:\/\/[^\/]*\.facebook\.com\/support/
// @exclude        /^https?:\/\/[^\/]*\.facebook\.com\/saved/
// @connect        mbasic.facebook.com
// @connect        socialfixer.com
// @connect        matt-kruse.github.io
// @run-at         document-start
// @version        24.1.0
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @match          *://*/*
// @require        file:///Users/surabhim/Documents/MITHackathon/covidcop/socialfixer.user.js

// ==/UserScript==

// Notes:
// To add more keywords to the blacklist, simply add
// more elements to the blacklist array at the start of
// this script.

const keywords = ['giá', 'bán', 'ship', 'hàng', 'khách', 'Sở hữu', 'mụn', 'lông', 'nám', 'tóc', 'thâm'];

const len = keywords.length;

const notificationDetails = {
    text: 'Blocked',
    title: 'Facebook Filter',
    timeout: 15000,
    onclick: function() { },
};

function contains(keywords, str) {
    let indexOfMatch;
    let keyBlocked;
    for (let i = len - 1; i >= 0; i--) {
        // add spaces at before and after each word to be more precise
        // (ex: ' giá '!= 'giáo'), some words do not need extra spaces
        indexOfMatch = str.search(' ' + keywords[i].toUpperCase() + ' ');
        keyBlocked = '';
        if (indexOfMatch >= 0) {
            for(let j = 0; j < 10; j++){
                if(typeof str[indexOfMatch] === "undefined") break;
                keyBlocked += str[indexOfMatch++];
            }
            console.log("[KeyBlocked] "+ keyBlocked);
            return true;
        }
    }
    return false;
}

function hidePostsByKeywords(black_list) {
    let posts = document.getElementsByClassName('userContentWrapper');
    for (let i = posts.length - 1; i >= 0; i--) {
        if(posts[i].style.display == 'none') continue;

        let content, url;

        if(typeof(posts[i].getElementsByClassName("userContent")[0]) == 'undefined'){
            continue;
        }

        content = posts[i].getElementsByClassName("userContent")[0].textContent;
        if (contains(black_list, content.toUpperCase())) {
            url = posts[i].getElementsByClassName("_5pcq")[0].href;
            posts[i].style.display = 'none';

            notificationDetails.text = "[Blocked] " + content;
            notificationDetails.onclick = function(){
                window.open(url, '_blank');
            };
            GM_notification(notificationDetails);
        }
    }
}
window.addEventListener("DOMNodeInserted", function() { hidePostsByKeywords(keywords); }, false);