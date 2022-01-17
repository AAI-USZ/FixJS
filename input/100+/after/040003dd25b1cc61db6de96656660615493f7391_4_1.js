function () {
    var $this = $(this);
    var $parent = $this.parent();
    var objectType = "Need";
    var category = $parent.attr("data-original-label");
    var enabledCategories = ['uncategorized'];
    $.each($("input:checked", $parent.parent().parent()).parent(), function (key, element) {
        var e = $(element);
        if (e) {
            enabledCategories.push(e.attr("data-original-label"));
        }
    });

    if ($("input[type=checkbox]", $parent).attr("checked")) {
        editor.showFeaturesByType(objectType, [category]);
    } else {
        editor.hideFeaturesByType(objectType, [category]);
    }

    if (enabledCategories.length == 1)
        editor.hideFeaturesByType(objectType, ['uncategorized']);
    else
        editor.showFeaturesByType(objectType, enabledCategories);
}