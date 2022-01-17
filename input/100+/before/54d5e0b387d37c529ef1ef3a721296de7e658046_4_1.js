function(element, key)
    {
        var data = this.Get(key);
        if(!!data)
        {
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