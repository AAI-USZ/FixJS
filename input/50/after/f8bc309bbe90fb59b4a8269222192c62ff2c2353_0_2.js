function(){
        this.$slider.slider('option', {'max': this.choices.length - 1});
        this._refreshSliderScale();
    }