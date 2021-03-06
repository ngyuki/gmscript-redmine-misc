// ==UserScript==
// @name        redmine-history-only-comment
// @namespace   ngyuki.net
// @include     https://my.redmine.jp/demo/*
// @version     0.0.1
// @grant       none
// ==/UserScript==

$(function(){

    var selector = '#history .journal:not(.has-notes), #history .journal.has-notes .details';
    var checked = !!(localStorage['history-showall'] - 0);

    $('<input type="checkbox" />')
        .change(function(){
            if (this.checked)
            {
                $(selector)
                    .slideDown(undefined, function(){
                        var pos = $(this).position();
                        var css = {};

                        if ($(this).hasClass('details'))
                        {
                            css = {
                                top: pos.top,
                                left: pos.left,
                                width: $(this).outerWidth(true),
                                height: $(this).outerHeight(true)
                            };
                        }
                        else
                        {
                            css = {
                                top: pos.top,
                                left: pos.left,
                                width: $(this).outerWidth(false),
                                height: $(this).outerHeight(false)
                            };      
                        }

                        $('<div style="position: absolute; z-index:99999; background-color:#ffc; opacity:0">')
                            .css(css)
                            .appendTo('body')
                            .animate({'opacity':0.9}, {duration:100})
                            .animate({'opacity':0}, {duration:500, complete: function(){
                                $(this).remove();
                            }})
                        ;
                    })
                ;
            }
            else
            {
                $(selector).slideUp();
            }
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
