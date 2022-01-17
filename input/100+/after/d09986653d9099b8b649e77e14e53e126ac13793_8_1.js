function(index)
    {
        if(!window.document.images.namedItem(index))
        {
            /*add image to the DOM, but off screen*/
            var img = new Image();
            img.onload = CreateOnDoneCallback_(index);
            img.id = index;
            img.style.position = "absolute";
            img.style.display = "none";
            img.style.top = "10000px";
            img.src = stuff_[index].Src;
            window.document.body.appendChild(img);
        }
        else
        {
            CreateOnDoneCallback_(index)();
        }
    }