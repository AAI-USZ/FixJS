function scrollTimelineToAppropriateDate() {
    var highlight_el = $('.timeline.highlight a[data-date="'+$('#article').data('article-previous-date')+'"]');
    var version_el = $('.timeline.version a[data-date="'+$('#article').data('article-version-date')+'"]');
    if(version_el.length>0 && version_el.offset().left!=0) {
        $('.timeline.version').scrollLeft(version_el.offset().left - version_el.parents(':scrollable').first().offset().left);
    }
    if(highlight_el.length>0 && highlight_el.offset().left!=0) {
        $('.timeline.highlight').scrollLeft(highlight_el.offset().left - highlight_el.parents(':scrollable').first().offset().left);
    }
}