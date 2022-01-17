function dezi_pager(resp) {
    var pager_html = $('<div id="pager">' +
      '<a id="pager_m_left"></a><div id="pager_o_left"></div>' +
      '<div class="paginator_p_wrap">' +
        '<div class="paginator_p_bloc">' + '</div>' +
      '</div>' +
      '<div id="pager_o_right"></div><a id="pager_m_right"></a>' +
      '<div id="pager_slider" class="paginator_slider" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">' +
        '<a class="ui-slider-handle ui-state-default ui-corner-all" href="#"></a>' +
      '</div>' +
     '</div>');

    if ($('#pager').length) {
        $('#pager').replaceWith(pager_html);
    }
    else {
        $('#tools').append(pager_html);
    }
    var this_page = (resp.offset / resp.page_size) + 1;
    $("#pager").jPaginator({
        nbPages: parseInt(resp.total / resp.page_size)+1,
        nbVisible: 10,
        selectedPage: this_page,
        withSlider: true,
        minSlidesForSlider: 2,
        overBtnLeft:'#pager_o_left',
        overBtnRight:'#pager_o_right',
        maxBtnLeft:'#pager_m_left',
        maxBtnRight:'#pager_m_right',
        onPageClicked: function(a,num) {
            var new_offset = resp.page_size * (num - 1);
            dezi_search(new_offset);
        }
    });
     
}