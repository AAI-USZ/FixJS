function(ev,ui) { 
            
            /* new way */
            var droppedObject = jQuery(ui.draggable).clone(),
            droppedName = droppedObject.text(),
            droppedPath = droppedObject.attr("modpath"),
            module = openmdao.Util.getPath(droppedPath),
            klass = openmdao.Util.getName(droppedPath);
            
            cmd = 'from '+module+' import '+klass+'\n'
                +  self.pathname+'='+klass+'()';
            self.myModel.issueCommand(cmd);
            
            /* old way */
            // var droppedObject = jQuery(ui.draggable).clone(),
            // droppedName = droppedObject.text(),
            // droppedPath = droppedObject.attr("modpath"),
            // off = elm.parent().offset(),
            // x = Math.round(ui.offset.left - off.left),
            // y = Math.round(ui.offset.top - off.top),
            // o = elm.data('corresponding_openmdao_object'),
            // model = o.myModel ;
            // model.addComponent(droppedPath,o.name,o.pathname);

            openmdao.drag_and_drop_manager.clearHighlightingDroppables() ;
            openmdao.drag_and_drop_manager.clearDroppables() ;
        }