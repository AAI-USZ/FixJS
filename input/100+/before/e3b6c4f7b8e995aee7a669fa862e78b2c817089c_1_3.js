function(){
    var circleIMG = "url(/static/images/circle.png)";

    var item=document.createElement("div");
    item.id=this.id;
    item.style.color="black";
    item.style.position="absolute";
    item.style.left=this.x+"px";
    item.style.top=this.y+"px";
    item.style.height=this.width+"px";
    item.style.width=this.height+"px";
    item.style.margin="0px";
    item.style.padding="0px";
    item.style.outline="none";
    item.style.zIndex=String(draw2d.Figure.ZOrderBaseIndex);

    this.top_left=document.createElement("div");
    this.top_left.style.background=circleIMG+" no-repeat top left";
    this.top_left.style.position="absolute";
    this.top_left.style.width=this.cornerWidth+"px";
    this.top_left.style.height=this.cornerHeight+"px";
    this.top_left.style.left="0px";
    this.top_left.style.top="0px";
    this.top_left.style.fontSize="2px";
    this.top_right=document.createElement("div");
    this.top_right.style.background=circleIMG+" no-repeat top right";
    this.top_right.style.position="absolute";
    this.top_right.style.width=this.cornerWidth+"px";
    this.top_right.style.height=this.cornerHeight+"px";
    this.top_right.style.left="0px";
    this.top_right.style.top="0px";
    this.top_right.style.fontSize="2px";

    this.bottom_left=document.createElement("div");
    this.bottom_left.style.background=circleIMG+" no-repeat bottom left";
    this.bottom_left.style.position="absolute";
    this.bottom_left.style.width=this.cornerWidth+"px";
    this.bottom_left.style.height=this.cornerHeight+"px";
    this.bottom_left.style.left="0px";
    this.bottom_left.style.top="0px";
    this.bottom_left.style.fontSize="2px";
    this.bottom_right=document.createElement("div");
    this.bottom_right.style.background=circleIMG+" no-repeat bottom right";
    this.bottom_right.style.position="absolute";
    this.bottom_right.style.width=this.cornerWidth+"px";
    this.bottom_right.style.height=this.cornerHeight+"px";
    this.bottom_right.style.left="0px";
    this.bottom_right.style.top="0px";
    this.bottom_right.style.fontSize="2px";

    this.header=document.createElement("div");
    this.header.style.position="absolute";
    this.header.style.left=this.cornerWidth+"px";
    this.header.style.top="0px";
    this.header.style.height=(this.cornerHeight)+"px";
    this.header.style.backgroundColor="#CCCCCC";
    this.header.style.borderTop="3px solid #666666";
    this.header.style.fontSize="9px";
    this.header.style.textAlign="center";
    this.disableTextSelection(this.header);

    this.footer=document.createElement("div");
    this.footer.style.position="absolute";
    this.footer.style.left=this.cornerWidth+"px";
    this.footer.style.top="0px";
    this.footer.style.height=(this.cornerHeight)+"px";
    this.footer.style.backgroundColor="white";
    this.footer.style.borderBottom="1px solid #666666";
    this.footer.style.fontSize="2px";

    this.textarea=document.createElement("div");
    this.textarea.style.position="absolute";
    this.textarea.style.left="0px";
    this.textarea.style.top=this.cornerHeight+"px";
    this.textarea.style.backgroundColor="white";
    this.textarea.style.borderTop="2px solid #666666";
    this.textarea.style.borderLeft="1px solid #666666";
    this.textarea.style.borderRight="1px solid #666666";
    this.textarea.style.overflow="hidden";
    this.textarea.style.fontSize="9pt";
    this.disableTextSelection(this.textarea);

    item.appendChild(this.top_left);
    item.appendChild(this.header);
    item.appendChild(this.top_right);
    item.appendChild(this.textarea);
    item.appendChild(this.bottom_left);
    item.appendChild(this.footer);
    item.appendChild(this.bottom_right);

    var elm = jQuery(item);
    openmdao.drag_and_drop_manager.addDroppable( elm ) ;

    elm.data('corresponding_openmdao_object',this);
    elm.droppable ({
        accept: "." + this.type,
        out: function(ev,ui){
            var o = elm.data('corresponding_openmdao_object');
            o.unhighlightAsDropTarget() ;
            openmdao.drag_and_drop_manager.draggableOut( elm ) ;

            calculated_zindex = openmdao.drag_and_drop_manager.computeCalculatedZindex( elm ) ;
            topmost_zindex = openmdao.drag_and_drop_manager.computeTopmostZindex( elm ) ;

            //debug.info ("out", elm.find(".DataflowFigureHeader")[0].innerHTML, calculated_zindex, topmost_zindex )
            
        },
        over: function(ev,ui){
            openmdao.drag_and_drop_manager.draggableOver( elm ) ;

            calculated_zindex = openmdao.drag_and_drop_manager.computeCalculatedZindex( elm ) ;
            topmost_zindex = openmdao.drag_and_drop_manager.computeTopmostZindex( elm ) ;
            //debug.info ("over", elm.find(".DataflowFigureHeader")[0].innerHTML, calculated_zindex, topmost_zindex )
        },
        

        drop: function(ev,ui) { 
            /* divs could be in front of divs and the div that gets the drop
               event might not be the one that is in front visibly and therefore
               is not the div the user wants the drop to occur on
            */
            top_div = openmdao.drag_and_drop_manager.getTopDroppableForDropEvent_ver2( ev, ui ) ;
            /* call the method on the correct div to handle the drop */
            var drop_function = top_div.droppable( 'option', 'actualDropHandler');
            drop_function( ev, ui ) ;
        }, 

        actualDropHandler: function(ev,ui) { 
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

    }
                  ) ;

    return item;
}