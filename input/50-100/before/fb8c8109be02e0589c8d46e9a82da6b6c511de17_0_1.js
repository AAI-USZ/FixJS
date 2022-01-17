function(ev,ui) {
            var droppedObject = jQuery(ui.draggable).clone();
            debug.info('CodeFrame drop',droppedObj);
            if (droppedObject.hasClass('file')) {
                editFile(droppedObject.attr("path"));
            }
        }