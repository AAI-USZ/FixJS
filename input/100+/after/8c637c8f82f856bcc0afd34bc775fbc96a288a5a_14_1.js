function(){

    this.init=function(){

        this.callSuper('init');

        this.createEventListener('textPropertyChanged',this._updateText,this);

        this.setWidth('auto');

        this.setHeight('auto');

        $(this.domElement).html(this.getText());

    }

    /**

     * @private

     *

     */

    this._updateText=function(){

        $(this.domElement).html(this.getText());

        if(this.getWidth()=='auto' || this.getHeight()=='auto'){

            this.invalidateSize();

        }

    }

}