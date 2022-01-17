function(){



        this.createAttribute('gap',0);

        this.callSuper('init');

        this.createEventListener('gapPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('verticalAlignPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('horizontalAlignPropertyChanged',this.selfRefreshLayout,this);

    }