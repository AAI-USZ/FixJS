function () {
    alert
    var $this = $(this);
    var $parent = $this.parent();
    var objectType = $parent.attr("data-object-type");

    if (objectType) {
        if ($("input[type=checkbox]", $parent).attr("checked")) {
            editor.showOverlaysByType(objectType);
        } else {
            editor.hideOverlaysByType(objectType);
        }
    }
}