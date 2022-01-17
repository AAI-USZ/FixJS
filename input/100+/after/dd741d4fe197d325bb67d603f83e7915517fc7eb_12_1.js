function(forcedFrameIndex,frame,stageX,stageY)
{
    if(!!this.grappledPlayer_.currentAnimation_.Animation && !!this.grappledPlayer_.IsBeingGrappled())
    {
        var forcedFrame = this.grappledPlayer_.currentAnimation_.Animation.baseAnimation_.frames_[forcedFrameIndex];
        if(!!forcedFrame)
        {
            var offsetX = forcedFrame.X;
            var offsetY = forcedFrame.Y;

            var x = this.ConvertX(this.x_ + offsetX);
            var y = this.ConvertY(this.y_ + offsetY);

            this.grappledPlayer_.SetX(x);
            this.grappledPlayer_.SetY(y);

            this.grappledPlayer_.SetCurrentFrame(forcedFrame,frame,stageX,stageY,true);
        }
    }
}