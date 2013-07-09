// ==UserScript==
// @name        redmine-history-only-comment
// @namespace   ngyuki.net
// @include     http://redmine.example.net/*
// @version     0.0.1
// @grant       none
// ==/UserScript==

$(function(){

    var selector = '#history .journal:not(.has-notes), #history .journal .details';
    var checked = !!(localStorage['history-showall'] - 0);

    $('<input type="checkbox" />')
        .change(function(){
            this.checked && $(selector).slideDown('fast') || $(selector).slideUp('fast');
            localStorage['history-showall'] = this.checked - 0;
        })
        .prop('checked', checked)
        .appendTo('#history > h3')
    ;

    if (!checked)
    {
        $(selector).hide();
    }
});
