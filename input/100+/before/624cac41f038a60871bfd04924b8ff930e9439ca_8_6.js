function(event, ui) {
                        sakai_util.Draggable.setIFrameFix();
                        $('body').append('<div class="s3d-draggable-draggingitems">' + sakai_util.Draggable.getDraggableMessage($(ui.helper).children().length) + '</div>');
                        $(window).trigger('start.drag.sakai');
                        if ($(this).data('startdragevent')) {
                            $(window).trigger($(this).data('startdragevent'), sakai_util.Draggable.getDraggableData(ui.helper));
                        }
                    }