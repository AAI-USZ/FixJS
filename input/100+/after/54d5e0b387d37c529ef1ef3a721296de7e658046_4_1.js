function(element, key, loadImage)
    {
        var data = this.Get(key);
        if(!!data)
        {
            if(!!loadImage)
            {
                if(!element.style.backgroundImage)
                    element.style.backgroundImage = "url(" + data.Sprite + ")";
            }
            if(element.style.backgroundPosition != data.Left + " " + data.Bottom)
            {
                element.style.backgroundPosition = data.Left + " " + data.Bottom;
                element.style.width = data.Width;
                element.style.height = data.Height;
                if(element.style.display != "")
                    element.style.display = "";
            }
        }
    }