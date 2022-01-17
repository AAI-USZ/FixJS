function(frame,startFrame,direction,zIndex,x,y)
    {
        for(var i = 0, length = this.Animations.length; i < length; ++i)
            this.Animations[i].TryRender(frame, {StartFrame:startFrame,ZIndex:zIndex,X:x,Y:y}, direction);
    }