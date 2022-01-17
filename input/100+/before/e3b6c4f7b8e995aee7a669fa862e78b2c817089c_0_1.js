function(elm,model,pathname,name) {

    /***********************************************************************
     *  private
     ***********************************************************************/

    // initialize private variables
    var self = this,
        dataflowID  = pathname.replace(/\./g,'-')+"-dataflow",
        dataflowCSS = 'height:'+(screen.height-100)+'px;'+
                      'width:'+(screen.width-100)+'px;'+
                      'overflow:auto;',
        dataflowDiv = jQuery('<div id='+dataflowID+' style="'+dataflowCSS+'">')
                      .appendTo(elm),
        dataflow = new draw2d.Workflow(dataflowID),
        dataflowFig = null;

    dataflow.setBackgroundImage( "/static/images/grid_10.png", true);


    openmdao.drag_and_drop_manager.addDroppable( dataflowDiv ) ;

    this.openmdao_model = model;
    this.dataflowDiv = dataflowDiv ;
    dataflowDiv.data('corresponding_openmdao_object',this);

    debug.info("Creating dataflowDiv", dataflowID ) ;

    /* only allow dropping on top most dataflow so you can add to globals */
    if ( dataflowID === "-dataflow" ) {
        dataflowDiv.droppable ({
            accept: '.IComponent',
            
            
            out: function(ev,ui){
                
                var o = dataflowDiv.data('corresponding_openmdao_object');
                o.unhighlightAsDropTarget() ;
                openmdao.drag_and_drop_manager.draggableOut( dataflowDiv ) ;
                
                calculated_zindex = openmdao.drag_and_drop_manager.computeCalculatedZindex( dataflowDiv ) ;
                topmost_zindex = openmdao.drag_and_drop_manager.computeTopmostZindex( dataflowDiv ) ;
                
                //debug.info ("out", elm.find(".DataflowFigureHeader")[0].innerHTML, calculated_zindex, topmost_zindex )
                
            },
            over: function(ev,ui){
                openmdao.drag_and_drop_manager.draggableOver( dataflowDiv ) ;
                
                /* calculated_zindex = openmdao.drag_and_drop_manager.computeCalculatedZindex( elm ) ;
                   topmost_zindex = openmdao.drag_and_drop_manager.computeTopmostZindex( elm ) ;
                   debug.info ("over", elm.find(".DataflowFigureHeader")[0].innerHTML, calculated_zindex, topmost_zindex )
                */
            },
            
            drop: function(ev,ui) { 
                /* divs could be in front of divs and the div that gets the drop
                   event might not be the one that is in front visibly and therefore
                   is not the div the user wants the drop to occur on
                */
                //top_div = openmdao.drag_and_drop_manager.getTopDroppableForDropEvent( ev, ui ) ;
                top_div = openmdao.drag_and_drop_manager.getTopDroppableForDropEvent_ver2( ev, ui ) ;
                /* call the method on the correct div to handle the drop */
                var drop_function = top_div.droppable( 'option', 'actualDropHandler');
                drop_function( ev, ui ) ;
            }, 
            
            actualDropHandler: function(ev,ui) { 
                var droppedObject = jQuery(ui.draggable).clone(),
                droppedName = droppedObject.text(),
                droppedPath = droppedObject.attr("modpath"),
                off = dataflowDiv.parent().offset(),
                x = Math.round(ui.offset.left - off.left),
                y = Math.round(ui.offset.top - off.top);
                
                var model = dataflowDiv.data("corresponding_openmdao_object").openmdao_model ;
                
                openmdao.drag_and_drop_manager.clearHighlightingDroppables() ;
                openmdao.drag_and_drop_manager.clearDroppables() ;
                
                openmdao.Util.promptForValue('Enter name for new '+droppedName,
                    function(name) {
                        model.addComponent(droppedPath,name,self.pathname);
                    }
                                            );
            }
            
        }
                              ) ;
    }
    


    // make the dataflow pane droppable
    // dataflowDiv.droppable ({
    //     accept: '.objtype',
    //     drop: function(ev,ui) {
    //         // get the object that was dropped and where it was dropped
    //         var droppedObject = jQuery(ui.draggable).clone(),
    //             droppedName = droppedObject.text(),
    //             droppedPath = droppedObject.attr("modpath"),
    //             off = dataflowDiv.parent().offset(),
    //             x = Math.round(ui.offset.left - off.left),
    //             y = Math.round(ui.offset.top - off.top),
    //             bestfig = dataflow.getBestCompartmentFigure(x,y);
    //         var elem = dataflowDiv[0];
    //         var zindex = document.defaultView.getComputedStyle(elem,null)
    //                      .getPropertyValue("z-index");
    //         debug.info(droppedName,'(modpath=',droppedPath,') ',
    //                    'dropped on dataflow:',self.pathname,
    //                    'z-index',dataflowDiv.css('z-index'),
    //                    'zIndex',dataflowDiv.css('zIndex'));
    //         if (droppedObject.hasClass('objtype')) {
    //             openmdao.Util.promptForValue('Enter name for new '+droppedName,
    //                 function(name) {
    //                     if (bestfig) {
    //                         model.addComponent(droppedPath,name,bestfig.pathname);
    //                     }
    //                     else {
    //                         model.addComponent(droppedPath,name,self.pathname);
    //                     }
    //                 }
    //             );
    //         }
    //     }
    // });


openmdao.DataflowPane.prototype.highlightAsDropTarget=function(){
    dataflow.setBackgroundImage( "/static/images/grid_10_highlighted.png", true);
    debug.info ("highlight", this.name ) ;
};

openmdao.DataflowPane.prototype.unhighlightAsDropTarget=function(){
    dataflow.setBackgroundImage( "/static/images/grid_10.png", true);
    debug.info ("unhighlight", this.name ) ;
};



    /***********************************************************************
     *  privileged
     ***********************************************************************/

    /** change the dataflow to the one with the specified pathname */
    this.showDataflow = function(pathname) {
        self.pathname = pathname;
        self.update();
    };

    /** load json dataflow data */
    this.loadData = function(json) {
        // FIXME: just having it update itself for now, ignoring json data
        dataflowFig.updateDataflow(json);
//        this.update();
    };

    /** update by deleting existing dataflow and creating a new one */
    this.update = function() {
        if (dataflowFig !== null) {
            // need to minimize & destroy figures to get rid of listeners
            dataflowFig.minimize();
            dataflow.clear();
            dataflowFig.destroy();
        }
        dataflowFig = new openmdao.DataflowFigure(model, self.pathname);
        dataflow.addFigure(dataflowFig,20,20);
        dataflowFig.maximize();
    };

    this.showDataflow(pathname);
}