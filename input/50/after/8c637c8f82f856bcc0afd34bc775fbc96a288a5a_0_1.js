function(){

        this.callSuper('init');

        this.createEventListener('horizontalAlignPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('verticalAlignPropertyChanged',this.selfRefreshLayout,this);

    }