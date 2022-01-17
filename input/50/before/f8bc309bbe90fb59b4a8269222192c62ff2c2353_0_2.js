function(){
        this.$slider.slider('max', this.choices.length - 1);
        this._refreshSliderScale();
    }