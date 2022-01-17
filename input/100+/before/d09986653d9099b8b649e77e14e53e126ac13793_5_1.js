function()
{
    var parentElement = (parentElement || window.document.getElementById("pnlStage"));

    for(var i = 0; i < this.frontHitReportImages_.length; ++i)
        utils_.RemoveFromDOM(this.frontHitReportImages_[i]);
    for(var i = 0; i < this.rearHitReportImages_.length; ++i)
        utils_.RemoveFromDOM(this.rearHitReportImages_[i]);
    for(var i = 0; i < this.otherAnimations_.Dirt.length; ++i)
        utils_.RemoveFromDOM(this.otherAnimations_.Dirt[i].Element);
    for(var i = 0; i < this.otherAnimations_.BigDirt.length; ++i)
        utils_.RemoveFromDOM(this.otherAnimations_.BigDirt[i].Element);
    this.ClearProjectiles();
    for(var i = 0; i < this.projectiles_.length; ++i)
        this.projectiles_[i].Release();

    this.ReleaseDebugElements();

    utils_.RemoveFromDOM(this.shadowContainer_);
    utils_.RemoveFromDOM(this.element_);
    utils_.RemoveFromDOM(this.dizzyElement_);
}