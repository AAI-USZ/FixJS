function(frame,deltaX)
    {
        if(this.GetCursor() != this.GetLastCursor())
        {
            this.SetLastCursor(this.GetCursor());
            spriteLookup_.Set(this.GetNameImg(), this.GetPlayer(this.GetCursor()).GetNameImageSrc());
            spriteLookup_.Set(this.GetPortriatImg(), this.GetPlayer(this.GetCursor()).GetPortriatImageSrc());
        }
        for(var i = 0; i < this.GetPlayers().length; ++i)
            this.GetPlayer(i).Render(frame,deltaX);

        this.GetEnergybar().Render(frame);
        this.GetHealthbar().Render(frame);
    }