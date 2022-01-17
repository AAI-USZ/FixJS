function(name,frames,isLooping,direction,bgImg)
{
    var BasicAnimation = function()
    {
        this.BaseAnimation = CreateBasicBaseAnimation(frames,name);
        this.isLooping_ = isLooping || false;
        this.internalFrame_ = 0;
        this.direction_  = direction || 0;
        if(!!bgImg)
            this.CreateElement(bgImg);
    }

    BasicAnimation.prototype.Count = 0;

    BasicAnimation.prototype.CreateElement = function(bgImg)
    {
        this.element_ = window.document.createElement("div");
        this.element_.className = "basic-animation";
        this.element_.style.display = "none";
        this.element_.style.backgroundImage = "url(" + bgImg + ")";
        window.document.getElementById("pnlStage").appendChild(this.element_);
    }

    BasicAnimation.prototype.GetFrame = function(frameDelta)
    {
        return this.BaseAnimation.GetFrame.apply(this.BaseAnimation,arguments);
    }

    BasicAnimation.prototype.AddEmptyFrame = function(owner,nbFrames)
    {
        this.BaseAnimation.AddEmptyFrame.apply(this.BaseAnimation,arguments);
    }

    BasicAnimation.prototype.AddFrame = function(owner,image,nbFrames)
    {
        this.BaseAnimation.AddFrame.apply(this.BaseAnimation,arguments);
    }

    BasicAnimation.prototype.TryRender = function(frame,object,direction)
    {
        direction = direction || this.direction_;
        var element = this.element_ || object.Element;
        var startFrame = object.StartFrame;

        var offsetX = object.X || 0;
        var offsetY = object.Y || 0;
        if(!!object.ZIndex)
            element.style.zIndex = object.ZIndex;
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
    return new BasicAnimation();
}