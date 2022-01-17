function(){

        this.callSuper('init');



        //Shadow listeners

        this.createEventListener('shadowPropertyChanged',this.invalidateShadow,this);

        this.createEventListener('shadowOffsetXPropertyChanged',this.invalidateShadow,this);

        this.createEventListener('shadowOffsetYPropertyChanged',this.invalidateShadow,this);

        this.createEventListener('shadowSpreadPropertyChanged',this.invalidateShadow,this);

        this.createEventListener('shadowInsetPropertyChanged',this.invalidateShadow,this);

        this.createEventListener('shadowAlphaPropertyChanged',this.invalidateShadow,this);

        this.createEventListener('shadowColorPropertyChanged',this.invalidateShadow,this);



        //Background listeners

        this.createEventListener('backgroundColorPropertyChanged',this.invalidateBackground,this);

        this.createEventListener('backgroundAlphaPropertyChanged',this.invalidateBackground,this);



        //Border listeners

        this.createEventListener('borderColorPropertyChanged',this.invalidateBorder,this);

        this.createEventListener('borderAlphaPropertyChanged',this.invalidateBorder,this);

        this.createEventListener('cornerPropertyChanged',this.invalidateBorder,this);

        this.createEventListener('topLeftCornerPropertyChanged',this.invalidateBorder,this);

        this.createEventListener('topRightCornerPropertyChanged',this.invalidateBorder,this);

        this.createEventListener('bottomLeftCornerPropertyChanged',this.invalidateBorder,this);

        this.createEventListener('bottomRightCornerPropertyChanged',this.invalidateBorder,this);

    }