function(label, evt) {
    if (!GraphState.rmEvt) {
        GraphState.currentLabel = label;
        GraphState.currentLogicSegment = storyboardController.storyboard.getSegmentById(label.component.getParameter("storyboard_id"));
        //GraphState.currentSegmentId = label.component.getParameter("storyboard_id");
        console.log(GraphState.currentLogicSegment);
        var segment = GraphState.currentLogicSegment;

        var act = (segment.actor && segment.actor.id) || "default";
        $("#segment-actor option").filter(function() {
            return $(this).val() == act;
        }).attr('selected', true);

        $("#segment-duration").val(GraphState.currentLogicSegment.duration);
        $("#segment-description").val(GraphState.currentLogicSegment.description);

        var behaviour = GraphState.currentLogicSegment.behaviour;
        if (behaviour) {
            if (behaviour.position) {
                $("#segment-pos-to-x").val(behaviour.position.x);
                $("#segment-pos-to-y").val(behaviour.position.y);
                $("#segment-pos-to-z").val(behaviour.position.z);
            }

            if (behaviour.rotation) {
                $("#segment-rot-to-a").val(behaviour.rotation.x);
                $("#segment-rot-to-b").val(behaviour.rotation.y);
                $("#segment-rot-to-g").val(behaviour.rotation.z);
            }

            if (behaviour.scale) {
                $("#segment-scale-to-x").val(behaviour.scale.x);
                $("#segment-scale-to-y").val(behaviour.scale.y);
                $("#segment-scale-to-z").val(behaviour.scale.z);
            }

            $("#segment-easing option").filter(function () {
                return $(this).val() === behaviour.easing;
            }).attr('selected', true);
        }

        $("#edit-segment-dialog-form").dialog("open");
    }
}