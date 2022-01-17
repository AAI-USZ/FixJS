function(index)
    {
        /*add image to the DOM, but off screen*/
        var img = new Image();
        img.onload = CreateOnDoneCallback_(index);
        img.src = stuff_[index].Src;
    }