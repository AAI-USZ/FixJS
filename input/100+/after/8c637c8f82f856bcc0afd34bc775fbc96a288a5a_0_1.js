function(){



    this.init=function(){

        this.callSuper('init');

        this.createEventListener('horizontalAlignPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('verticalAlignPropertyChanged',this.selfRefreshLayout,this);

    }



    this.init=function(){

        this.callSuper('init');

        this.createEventListener('gapPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('verticalAlignPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('horizontalAlignPropertyChanged',this.selfRefreshLayout,this);

    }



}