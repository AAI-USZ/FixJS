function() {
            sakaiWidgetsAPI.bindToHash();
            sakaiWidgetsAPI.Container.setReadyToLoad(true);
            sakaiWidgetsAPI.widgetLoader.insertWidgets(null, false);

            // Set up draggable/droppable containers for the main page if there are any
            if($(".s3d-droppable-container", $("body")).length){
                sakai_util.Droppable.setupDroppable({}, $("body"));
            }
            if($(".s3d-draggable-container", $("body")).length){
                sakai_util.Draggable.setupDraggable({}, $("body"));
            }
        }