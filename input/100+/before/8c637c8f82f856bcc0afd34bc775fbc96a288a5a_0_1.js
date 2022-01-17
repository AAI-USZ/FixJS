function(){



    this.createAttributes=function(){

        this.callSuper('createAttributes');

        this.createAttribute('horizontalAlign','left');

        this.createAttribute('verticalAlign','top');

    }



    this.init=function(){

        this.callSuper('init');

        this.createEventListener('horizontalAlignPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('verticalAlignPropertyChanged',this.selfRefreshLayout,this);

    }



    this.init=function(){



        this.createAttribute('gap',0);

        this.callSuper('init');

        this.createEventListener('gapPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('verticalAlignPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('horizontalAlignPropertyChanged',this.selfRefreshLayout,this);

    }



}