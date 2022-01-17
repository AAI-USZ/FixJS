function confirm_action(desc, f) {
    var outer = $("#dlg_outer");
    var inner = $("#dlg_inner2");
    inner.html(
        '<form id="dlg_centered">'+
        '<span>Вы уверены, что хотите '+desc+'?</span><br /><br />'+
        '<input type="button" id="dlg_yes" class="styledbutton" value="[&lt; Да &gt;]">'+
        '<input type="button" id="dlg_no" class="styledbutton" value="[&lt; Нет &gt;]">'+
        '</form>');
    inner.find("#dlg_yes").click(function() {
        outer.css("display", "none");
        f();
    });
    inner.find("#dlg_no").click(function() {
        outer.css("display", "none");
    });
    outer.css("display", "table");
}