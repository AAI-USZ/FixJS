function()
    {
        if(!!this.Enabled)
        {
            this.StageDeltaX = 0;
            this.StageDeltaY = 0;

            this.Enabled = false;

            for(var i = 0, length = this.Trail.length; i < length; ++i)
            {
                //this.FollowElement.parentNode.removeChild(this.Trail[i].Element);
                this.Trail[i].Element.style.display = "none";
                this.Trail[i].FrameIndex = 0;
            }
        }
    }