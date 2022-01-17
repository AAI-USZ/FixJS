function confirm_action(desc, f, e) {
    var inner = $("#dlg_inner");
    var inner2 = $("#dlg_inner2");
    inner2.html(
        '<form id="dlg_centered">'+
        '<span>Вы уверены, что хотите '+desc+'?</span><br /><br />'+
        '<input type="button" id="dlg_yes" class="styledbutton" value="[&lt; Да &gt;]">'+
        '<input type="button" id="dlg_no" class="styledbutton" value="[&lt; Нет &gt;]">'+
        '</form>');
    inner2.find("#dlg_yes").click(function() {
        inner.hide();
        $("body").unbind("click");
        f();
    });
    inner2.find("#dlg_no").click(function() {
        inner.hide();
        $("body").unbind("click");
    });
    inner.css("left", e.pageX+15);
    inner.css("top", e.pageY+15);
    inner.show();
}