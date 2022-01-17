function ShadowElement(base, showInvisible)

{

    ShadowElement.baseConstructor.call(this, "g");



    this.setBaseElement(base);

    this.showInvisible = showInvisible;

    if (!this.showInvisible)

        this.hide();

    

	this.shadowID = gShadowElementIdIndex++;



    this.isVisible = true;     

}