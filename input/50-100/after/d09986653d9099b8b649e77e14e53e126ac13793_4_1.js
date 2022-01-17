function(key,spriteFilename,left,bottom,width,height)
    {
        spriteFilename = spriteFilename.replace("|","");
    
        if(!this.Get(key))
        {
            data_[key] = {Key:key, Sprite:spriteFilename, Left:left, Bottom:bottom, Width:width, Height:height};
        }
        return data_[key];
    }