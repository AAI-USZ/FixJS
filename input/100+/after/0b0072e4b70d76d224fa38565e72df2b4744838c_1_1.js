function () {

    this.init=function(){

        this.callSuper('init');

        this.createEventListener('propertyPropertyChanged',this._propChanged,this);

        this.createEventListener('startPropertyChanged',this._propChanged,this);

        this.createEventListener('endPropertyChanged',this._propChanged,this);

    }



    this._propChanged=function(event){

        if(event.propertyName=='property'){ this.propertyName=this.getProperty(); }

        if(event.propertyName=='start'){ this.startValue=this.getStart();  }

        if(event.propertyName=='end'){ this.endValue=this.getEnd();  }

        this.updateTween();



    }

}