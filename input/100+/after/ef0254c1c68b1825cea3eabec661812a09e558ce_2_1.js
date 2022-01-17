function() 
    {
        if(this.get("direction") == "vertical")
        {
            this._stackXCoords();
        }
        else
        {
            this._stackYCoords();
        }
    }