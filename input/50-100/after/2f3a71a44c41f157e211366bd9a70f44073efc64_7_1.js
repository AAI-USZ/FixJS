function ShadowElement(base, showInvisible, showInvisibleHidden)

{

    ShadowElement.baseConstructor.call(this, "g");



    this.setBaseElement(base);

    this.showInvisible = showInvisible;

    if (!this.showInvisible)

        this.hide();



	this.showInvisibleHidden = showInvisibleHidden;

    

	this.shadowID = gShadowElementIdIndex++;



    this.isVisible = true;     

}