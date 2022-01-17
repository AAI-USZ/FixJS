function(event, ui) {
                        sakai_util.Draggable.removeIFrameFix();
                        $('.s3d-draggable-draggingitems').remove();
                        $(window).trigger('stop.drag.sakai');
                        if ($(this).data('stopdragevent')) {
                            $(window).trigger($(this).data('stopdragevent'), sakai_util.Draggable.getDraggableData(ui.helper));
                        }
                    }