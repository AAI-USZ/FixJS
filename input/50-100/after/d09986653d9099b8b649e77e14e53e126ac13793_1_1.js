function()
{
    var parentElement = window.document.getElementById("pnlStage");
    utils_.RemoveFromDOM(this.selectIcon_.Element);
    utils_.RemoveFromDOM(this.portriatElement_);
    utils_.RemoveFromDOM(this.element_.Element);
    utils_.RemoveFromDOM(this.randomCharFace_.Element);
    this.isCharSelected_ = false;
}