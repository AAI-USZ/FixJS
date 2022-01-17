function initTimelines() {
    if(initTimelines_done) {
        scrollTimelineToAppropriateDate();
        return;
    }
    initTimelines_done = true;
    var width = $('.timeline li .month').parent().map(
            function() {
                return $(this).offset()['left']+$(this).outerWidth() - $(this).parents('.timeline').offset()['left'] + 1;
           }).toArray().reduce(function(x,y){return (x>y?x:y);});
    $('.timeline .months').attr('style', 'width: '+width+'px;');

    var highlight_scroll = $('#article').data('article-previous-date');
    var version_scroll = $('#article').data('article-version-date');

    if(highlight_scroll) {
        var highlight_el = $('.timeline.highlight a[data-date="'+highlight_scroll+'"]');
        highlight_el.addClass('mark');
    }
    if(version_scroll) {
        var version_el = $('.timeline.version a[data-date="'+version_scroll+'"]');
        version_el.addClass('mark');
    }
    scrollTimelineToAppropriateDate();
}