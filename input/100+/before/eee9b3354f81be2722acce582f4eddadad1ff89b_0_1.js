function(frame,stageDiffX,stageDiffY)
{
    if(this.Enabled)
    {
        /*The trail is applying the exact coords of the player, but the screen may move, which must be applied to all trail coords!*/
        this.ApplyStageOffset(stageDiffX,stageDiffY);
            
        for(var i = 0, length = this.Trail.length; i < length; i++)
        {
            if(frame > this.Trail[i].StartFrame)
            {
                var coords = this.GetNextCoord(i);
                if(!!coords)
                {
                    this.Trail[i].Element.style.left = (!!coords.Left) ? coords.DeltaX + parseInt(coords.Left) + "px" : "";
                    this.Trail[i].Element.style.right = (!!coords.Right) ? coords.DeltaX + parseInt(coords.Right) + "px" : "";
                    this.Trail[i].Element.style.bottom = (!!coords.Bottom) ? coords.DeltaY + parseInt(coords.Bottom) + "px" : "";
                    this.Trail[i].Element.style.top = (!!coords.Top) ? coords.DeltaY + parseInt(coords.Top) + "px" : "";
                }
            }
            if(frame > this.Trail[i].StartFrame)
            {
                var currentItem = this.Trail[i];

                if(!currentItem.Animation.HasUserData(currentItem.FrameIndex))
                    ++currentItem.FrameIndex;

                var frameToRender = this.GetCurrentFrame(i);
                if(!!frameToRender)
                {
                    var data = spriteLookup_.Get(frameToRender.GetImageSrc(this.direction_));
                    if(!!data)
                    {
                        if(currentItem.Element.children[0].style.backgroundPositionX != spriteLookup_.GetLeft(frameToRender.RightSrc)
                            || currentItem.Element.children[0].style.backgroundPositionX != spriteLookup_.GetLeft(frameToRender.LeftSrc))
                        {
                            if(!currentItem.Element.children[0].style.backgroundImage)
                                currentItem.Element.children[0].style.backgroundImage = "url(" + data.Sprite + ")";
                            currentItem.Element.children[0].style.backgroundPosition = data.Left + " " + data.Bottom;
                            currentItem.Element.children[0].style.width = data.Width;
                            currentItem.Element.children[0].style.height = data.Height;
                        }
                    }
                }
            }
        }
    }
}