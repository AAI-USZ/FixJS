function (display,window){
        
        if (!window.maximized_horizontally && window.get_window_type() == Meta.WindowType.NORMAL){
            let actor = window.get_compositor_private();
            
            let [prevX,prevY] = actor.get_position();
            let [width,height] = actor.get_size();
            
            let centerX = (prevX+Math.round(width/2));
            let centerY = (prevY+Math.round(height/2));
            
            let x_flag = centerX - this._x_half;
            let y_flag = centerY - this._y_half;
            
            let vertex = new Clutter.Vertex ({ x:(x_flag < 0 )?0:width,
                                                y:(y_flag < 0 )?0:height,
                                                z:0});
            actor.rotation_center_z = vertex;
            
            //FIXME why rotation_angle_z won't work if we use it in Tweener directly?
            actor._rz = ( x_flag*y_flag < 0 )?-ROTATION_ANGLE:ROTATION_ANGLE;

            Tweener.addTween(actor,{
                             _rz:0,
                             onUpdateScope: actor,
                             onUpdate: function(){
                                actor.rotation_angle_z = actor._rz;
                             },
                             time: WINDOW_ANIMATION_TIME,
                             transition: 'easeOutQuad',
                             onComplete:function(actor){
                                actor.rotation_angle_z = 0;
                             },
                             onCompleteParams:[actor]
                            });
            
        };
    }