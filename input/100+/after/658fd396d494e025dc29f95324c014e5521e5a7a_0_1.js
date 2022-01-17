function (display,window){
        
        if (!window.maximized_horizontally && window.get_window_type() == Meta.WindowType.NORMAL){
        
            let actor = window.get_compositor_private();
            
            let [width,height] = actor.get_size();
            
            // Initialized scale 
            scale_x = Math.min(1-(this._screenW - width)/this._screenW,0.85);
            scale_y = Math.min(1-(this._screenH - height)/this._screenH,0.85);
            actor.set_scale(scale_x,scale_y);
            
            
            Tweener.addTween(actor,{
                             scale_x:1,
                             scale_y:1,
                             time: WINDOW_ANIMATION_TIME,
                             transition: 'easeOutQuad',
                             onComplete:function(actor){
                                actor.set_scale(1,1);
                             },
                             onCompleteParams:[actor]
                            });
        };
    }