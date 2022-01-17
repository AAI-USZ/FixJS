function(x,y,parentElement)
{
    parentElement = (parentElement || window.document.getElementById("pnlStage"));
    this.element_ = window.document.createElement("div");
    this.element_.className = "player";

    var createElement = function(tagName,className,attrib,value,parent)
    {
        var i = window.document.createElement(tagName);
        i.className = className;
        if(!!attrib)
            i.style[attrib] = value;
        (parent || this.element_).appendChild(i);
        return i;
    }

    //this.image_ = createImage.call(this,"player");


    this.spriteElement_ = window.document.createElement("div");
    this.spriteElement_.className = "player-sprite";
    this.element_.appendChild(this.spriteElement_);

    for(var i = 0; i < CONSTANTS.MAX_EXTRA_IMAGES; ++i)
        this.frontHitReportImages_[this.frontHitReportImages_.length] = createElement.call(this,"div","front-hit-report","display","none",parentElement);
    for(var i = 0; i < CONSTANTS.MAX_EXTRA_IMAGES; ++i)
        this.rearHitReportImages_[this.rearHitReportImages_.length] = createElement.call(this,"div","rear-hit-report","display","none",parentElement);


    this.shadowContainer_ = window.document.createElement("div");
    this.shadowContainer_.className = "shadow";
    this.shadow_ = createElement.call(this,"div","shadow","","",this.shadowContainer_);

    parentElement.appendChild(this.shadowContainer_);
    parentElement.appendChild(this.element_);

    this.CreateDebugElements();
}