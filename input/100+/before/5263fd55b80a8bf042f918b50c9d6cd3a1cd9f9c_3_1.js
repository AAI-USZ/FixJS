function () {
    var $this = $(this);
    var $parent = $this.parent();
    var objectType = "need";
    var category = $parent.attr("data-original-label");
    var enabledCategories = [];
    $.each($("input:checked", $parent.parent().parent()).parent(), function (key, element) {
        var e = $(element);
        if (e) {
            enabledCategories.push(e.attr("data-original-label"));
        }
    });

    if ($("input[type=checkbox]", $parent).attr("checked")) {
        editor.showOverlaysByType(objectType, [category]);
    } else {
        editor.hideOverlaysByType(objectType, [category]);
    }

    editor.showOverlaysByType(objectType, enabledCategories);
}