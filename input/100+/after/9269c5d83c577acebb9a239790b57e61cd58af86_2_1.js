function waEditorUpdateSource(options) {
    var options = options || {};
    options = jQuery.extend({
        'id': 'wa-page-content'
    }, options);
    var element = $('#' + options.id);
    if ($(".el-rte").length && $(".el-rte").is(':visible')) {
        $('.el-rte iframe').contents().find("img[data-src!='']").each(function () {
            $(this).attr('src', $(this).attr('data-src'));
        });
        element.val(element.elrte('val'));
        //element.elrte('val', element.val());
        $('.el-rte iframe').contents().find('img[src*="$wa_url"]').each(function () {
            var s = decodeURIComponent($(this).attr('src'));
            $(this).attr('data-src', s);
            $(this).attr('src', s.replace(/\{\$wa_url\}/, wa_url));
        });
    } else if (wa_editor) {
        element.val(wa_editor.getValue());
    }
}