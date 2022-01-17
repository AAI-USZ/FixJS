function(frame,stageDiffX)
{
    this.CheckZOrder();
    if(!this.isPaused_)
    {
        if(!!this.currentFrame_)
        {
            this.SetSprite();
            if(!!this.currentFrame_.ShadowImageSrc && (this.shadow_._relSrc != this.currentFrame_.ShadowImageSrc))
            {
                this.shadow_._relSrc  = this.currentFrame_.ShadowImageSrc;
                spriteLookup_.Set(this.shadow_, this.currentFrame_.ShadowImageSrc);
            }
        }


        if(this.direction_ > 0)
            this.SetRight(this.x_);
        else
            this.SetLeft(this.x_);
        this.element_.style.bottom = Math.max(this.y_,STAGE.FLOORY) + "px";
        this.RenderShadow();
        this.RenderTrail(frame,stageDiffX);
        this.RenderDebugInfo();
        this.PlaySounds();
    }
}