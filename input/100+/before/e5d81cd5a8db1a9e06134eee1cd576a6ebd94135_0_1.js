function (display,window){
        
        if (!window.maximized_horizontally && window.get_window_type() == Meta.WindowType.NORMAL){
            let actor = window.get_compositor_private();
            
            let [prevX,prevY] = actor.get_position();
            
            let [width,height] = actor.get_size();
            
            let centerX = (prevX+Math.round(width/2));
            
            let startX = (centerX-this._half < 0 )?prevX-Math.round(width/2):prevX+Math.round(width/2); // default in the left part
            
            actor.set_position(startX,prevY);
            actor.set_opacity(200);
            
            Tweener.addTween(actor,{
                             x:prevX,
                             opacity:255,
                             time: WINDOW_ANIMATION_TIME,
                             transition: 'easeOutQuad'
                            });
        };
    }