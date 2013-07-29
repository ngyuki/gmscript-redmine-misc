// ==UserScript==
// @name        redmine-folding-sidebar
// @namespace   ngyuki.net
// @include     https://my.redmine.jp/demo/*
// @version     0.0.1
// @grant       none
// ==/UserScript==

$(function(){

    // サイドバーが無いなら何もしない
    if ($('#main').hasClass('nosidebar'))
    {
        return;
    }

    var $checkbox = $('<input type="checkbox" style="position:absolute; top:0; right:0; margin:2px; padding:0">')
        .prependTo('#main').wrap('<div style="position:relative">')
        .css('z-index', 99999)
    ;

    var minwidth = (function(){
        var w = $('#content').outerWidth(true) - $('#content').width() + $checkbox.outerWidth(true);
        return 'calc(100% - ' + w + 'px)';
    });

    $checkbox.click(function(){
        if (this.checked)
        {
            $('#content').css('width', '').one('transitionend', function(){
                $('#sidebar').fadeIn('fast');
            });
        }
        else
        {
            $('#sidebar').fadeOut('fast', function (){
                $('#content').css('width', minwidth);
            });
        }
        localStorage['folding-sidebar'] = !this.checked - 0;
    });

    if (!(localStorage['folding-sidebar'] - 0))
    {
        $checkbox.prop('checked', true);
    }
    else
    {
        $('#sidebar').hide();
        $('#content').css('width', minwidth);
    }

    // transition
    setTimeout(function(){ $('#content').css('transition', 'width 0.3s'); }, 0);
});
