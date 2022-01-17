function($selected) {
    var selected_objs = [];
    if (typeof $selected != 'undefined') {
        $selected.each(function(i){
            selected_objs.push( {"id":$(this).attr('id')} );
        });
    }
    $("body")
        .data("selected_objects.ome", selected_objs)
        .trigger("selection_change.ome");
}