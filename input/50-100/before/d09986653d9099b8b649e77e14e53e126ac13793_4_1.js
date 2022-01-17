function(key,spriteFilename,left,bottom,width,height)
    {
    
        if(!!spriteFilename && (spriteFilename[0] != "|"))
            frameImages_.Load(spriteFilename);
    
        spriteFilename = spriteFilename.replace("|","");
    
        if(!this.Get(key))
        {
            data_[key] = {Key:key, Sprite:spriteFilename, Left:left, Bottom:bottom, Width:width, Height:height};
        }
        return data_[key];
    }