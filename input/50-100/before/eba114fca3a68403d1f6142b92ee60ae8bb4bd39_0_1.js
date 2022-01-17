function($row) {
    var $body = $("body");
    if (typeof $row != 'undefined') {
        $body.data("selected_objects.ome", [{"id": $row.attr("id")}])
    } else {
        $body.data("selected_objects.ome", [])
    }
    $body.trigger("selection_change.ome");
}