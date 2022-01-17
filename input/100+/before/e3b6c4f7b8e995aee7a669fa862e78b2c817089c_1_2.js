function(ev,ui) { 
            var droppedObject = jQuery(ui.draggable).clone(),
            droppedName = droppedObject.text(),
            droppedPath = droppedObject.attr("modpath"),
            off = elm.parent().offset(),
            x = Math.round(ui.offset.left - off.left),
            y = Math.round(ui.offset.top - off.top),
            o = elm.data('corresponding_openmdao_object'),
            model = o.myModel ;

            openmdao.drag_and_drop_manager.clearHighlightingDroppables() ;
            openmdao.drag_and_drop_manager.clearDroppables() ;

            openmdao.Util.promptForValue('Enter name for new '+droppedName,
                    function(name) {
                        model.addComponent(droppedPath,name,o.pathname);
                    }
                                        );
        }