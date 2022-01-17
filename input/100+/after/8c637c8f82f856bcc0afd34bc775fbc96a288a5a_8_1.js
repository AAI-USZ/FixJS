function(){

        this.callSuper('init');

        this.createEventListener('labelPositionPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('gapPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('labelPaddingLeftPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('labelPaddingRightPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('elementPaddingLeftPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('elementPaddingRightPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('elementPositionPropertyChanged',this.selfRefreshLayout,this);

    }