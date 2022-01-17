function ResizePageContentHeight(page)
{
	var $page = $(page);
	var $content = $page.children(".ui-content.tmp-splitview-menu", ".ui-content.tmp-splitview-content");

    if($content.length > 0) {
        var hh = $page.children(".ui-header").outerHeight(); hh = hh ? hh : 0;
        var fh = $page.children(".ui-footer").outerHeight(); fh = fh ? fh : 0;
        var pt = parseFloat($content.css("padding-top"));
        var pb = parseFloat($content.css("padding-bottom"));
        var wh = window.innerHeight;
        $content.height(wh - (hh + fh) - (pt + pb));
    }
}