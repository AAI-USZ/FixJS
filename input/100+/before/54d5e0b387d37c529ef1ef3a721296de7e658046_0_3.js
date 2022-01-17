function(frame,followElement)
    {
        if(!this.Enabled)
        {
            this.StageDeltaX = 0;
            this.StageDeltaY = 0;

            this.FollowElement = this.FollowElement || followElement;
            var container = this.FollowElement.parentNode;
            for(var i = 0, length = this.Trail.length; i < length; ++i)
            {
                this.Trail[i].Animation.ClearAllFrameUserData();
                if(container.children.length == 0)
                    container.appendChild(this.Trail[i].Element);
                else
                    container.insertBefore(this.Trail[i].Element,container.children[0]);
                this.Trail[i].StartFrame = frame + (this.Delay * (i + 1));
                this.Trail[i].FrameIndex = 0;
            }
            this.Enabled = true;
        }
    }