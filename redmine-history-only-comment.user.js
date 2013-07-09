// ==UserScript==
// @name        redmine-history-only-comment
// @namespace   ngyuki.net
// @include     http://redmine.example.net/*
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

                        var css = {
                            top: pos.top,
                            left: pos.left,
                            width: $(this).outerWidth(true),
                            height: $(this).outerHeight(true)
                        };

                        $('<div style="position: absolute; z-index:99999; background-color:#ff0; opacity:0">')
                            .css(css)
                            .appendTo('body')
                            .animate({'opacity':0.9}, {duration:100})
                            //.queue(function(){var self=$(this);setTimeout(function(){self.dequeue()}, 100)})
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
