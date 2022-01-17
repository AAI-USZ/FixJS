function(label, evt) {
    if (!GraphState.rmEvt) {
        GraphState.currentLabel = label;
        GraphState.currentLogicSegment = storyboardController.storyboard.getSegmentById(label.component.getParameter("storyboard_id"));
        //GraphState.currentSegmentId = label.component.getParameter("storyboard_id");
        console.log(GraphState.currentLogicSegment);

        var act = (GraphState.currentLogicSegment.actor && GraphState.currentLogicSegment.description) || "default";
        $("#segment-actor option").filter(function() {
            return $(this).val() === act;
        }).attr('selected', true);

        $("#segment-duration").val(GraphState.currentLogicSegment.duration);
        $("#segment-description").val(GraphState.currentLogicSegment.description);

        $("#edit-segment-dialog-form").dialog("open");
    }
}