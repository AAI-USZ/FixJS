function(programHTML){
        $("#List").html(programHTML);
        addDroppableFeature($("#List .droppable"));
        $("#List table").children().each(function(){
                addDraggingFeature($(this).find("table"));
        });
}