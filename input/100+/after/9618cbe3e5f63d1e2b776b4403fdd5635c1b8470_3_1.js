function(){

    this.init=function(){

        this.callSuper('init');

        this.createEventListener('textPropertyChanged',this._updateText,this);

        this.createEventListener('fontColorPropertyChanged',this.invalidateFont,this);

        this.createEventListener('fontSizePropertyChanged',this.invalidateFont,this);

        this.createEventListener('fontFamilyPropertyChanged',this.invalidateFont,this);

        this.setWidth('auto');

        this.setHeight('auto');

        this.domElement.innerHTML=this.getText();

    }

    /**

     * @private

     *

     */

    this._updateText=function(){

        this.domElement.innerHTML=this.getText();

        if(this.getWidth()=='auto' || this.getHeight()=='auto'){

            this.invalidateSize();

        }

    }



    this.measure=function(pw,ph){

        this.callSuper('measure',pw,ph);

        this.domElement.style.lineHeight=this.measuredHeight+"px";

    }



    this.fontInvalid=true;



    this.invalidateFont=function(){

        this.fontInvalid=true;

        this.invalidateProperties();

    }



    this.commitProperties=function(){

        this.callSuper('commitProperties');

        if(this.fontInvalid){

            this.domElement.style.fontFamily=this.getFontFamily();

            this.domElement.style.fontSize=this.getFontSize().toString()+"px";

            this.domElement.style.color=this.getFontColor();

        }

    }

}