function(frame,object,direction)
    {
        direction = direction || this.direction_;
        var element = object.Element;
        var startFrame = object.StartFrame;

        var offsetX = object.X || 0;
        var offsetY = object.Y || 0;
        var delta = 0;
        if(!!this.isLooping_)
        {
            if(this.internalFrame_ > this.BaseAnimation.nbFrames_)
                this.internalFrame_ = 0;
            delta = this.internalFrame_++;
        }
        else
            delta = frame - startFrame;

        var newFrame = this.GetFrame(delta);
        if(!newFrame)
        {
            /*free the element so it can be reused in other animations*/
            element.style.display="none";
            return false;
        }
        else
        {
            offsetX += newFrame.X;
            offsetY += newFrame.Y;
            if(direction > 0)
            {
                var data = spriteLookup_.Get(newFrame.RightSrc)
                if(!!data && (element.style.backgroundPositionX != data.Left))
                {
                    element.style.backgroundPosition = data.Left + " " + data.Bottom;
                    /*element.style.backgroundImage = "url(" + data.Sprite + ")";*/
                    element.style.width = data.Width;
                    element.style.height = data.Height;
                }


                if(offsetX != undefined)
                {
                    element.style.left = "";
                    element.style.right = offsetX + "px";
                }
            }
            else
            {
                var data = spriteLookup_.Get(newFrame.LeftSrc)
                if(!!data && (element.style.backgroundPositionX != data.Left))
                {
                    element.style.backgroundPosition = data.Left + " " + data.Bottom;
                    /*element.style.backgroundImage = "url(" + data.Sprite + ")";*/
                    element.style.width = data.Width;
                    element.style.height = data.Height;
                }

                if(offsetX != undefined)
                {
                    element.style.right = "";
                    element.style.left = offsetX + "px";
                }
            }
        }

        if(offsetY != undefined)
            element.style.bottom = offsetY + "px";
        if(element.style.display != "")
            element.style.display = "";
        return true;
    }