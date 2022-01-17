function() {
            $( '#inserterbar_widget .inserterbar_widget_draggable', $rootel ).draggable({
                connectToSortable: '.contentauthoring_cell_content',
                helper: 'clone',
                revert: 'invalid',
                opacity: 0.4,
                start: function() {
                    $(window).trigger("startdrag.contentauthoring.sakai");
                    sakai.api.Util.Draggable.setIFrameFix();
                },
                stop: function() {
                    $(window).trigger("stopdrag.contentauthoring.sakai");
                    sakai.api.Util.Draggable.removeIFrameFix();
                }
            });
        }