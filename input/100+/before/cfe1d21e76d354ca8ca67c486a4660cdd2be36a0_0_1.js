function()
{
    var images_ = {};
    var nbImages_ = 0;
    var nbImagesLoading_ = 0;
    var element_ = window.document.getElementById("spnImagesLoading");
    
    var FrameImageLookup = function()
    {
    }
    
    FrameImageLookup.prototype.GetNbImages = function() { return nbImages_; }
    FrameImageLookup.prototype.GetNbImagesLoading = function() { return nbImagesLoading_; }
    
    /*Image only loaded once*/
    FrameImageLookup.prototype.Load = function(src)
    {
        if(!images_.hasOwnProperty(src))
        {
            ++nbImagesLoading_;
            ++nbImages_;
    
            element_.innerHTML = "0";
            images_[src] = new Image();
            //images_[src] = window.document.createElement("img");
            images_[src].onload = (function(thisValue)
            {
                return function()
                {
                    if(!!--thisValue.nbImagesLoading_)
                    {
                        thisValue.element_.innerHTML = (100*(thisValue.GetNbImages()-thisValue.GetNbImagesLoading())/thisValue.GetNbImages()).toFixed(1);
                    }
                    else
                    {
                        thisValue.element_.innerHTML = "100";
                    }
                }
            })(this);
            images_[src].src = src;
        }
        return images_[src];
    }
    FrameImageLookup.prototype.Get = function(src)
    {
        return images_[src];
    }
    return new FrameImageLookup();
}