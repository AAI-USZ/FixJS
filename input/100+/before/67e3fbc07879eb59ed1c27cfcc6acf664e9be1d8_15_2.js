function()
{
    if(this.currentAnimation_.Direction > 0)
    {
        data = spriteLookup_.Get(this.currentFrame_.RightSrc);
        if(!!data)
        {
            this.spriteElement_.style.backgroundPosition = data.Left + " " + data.Bottom;
            this.spriteElement_.style.width = data.Width;
            this.spriteElement_.style.height = data.Height;
            this.element_.style.width = data.Width;
        }
    }
    else
    {
        data = spriteLookup_.Get(this.currentFrame_.LeftSrc);
        if(!!data)
        {
            this.spriteElement_.style.backgroundPosition = data.Left + " " + data.Bottom;
            this.spriteElement_.style.width = data.Width;
            this.spriteElement_.style.height = data.Height;
            this.element_.style.width = data.Width;
        }
    }
    if(this.currentFrame_.ImageOffsetX != undefined)
        this.OffsetImageX(this.currentFrame_.ImageOffsetX);
    if(this.currentFrame_.ImageOffsetY != undefined)
        this.OffsetImageY(this.currentFrame_.ImageOffsetY);
}