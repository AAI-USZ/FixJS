function(){



    this.init=function(){

        this.callSuper('init');

        this.createEventListener('change',this._inputChanged,this);

        this.createEventListener('disabledPropertyChanged',this._disabledChanged,this);

        this.createEventListener('valuePropertyChanged',this._valueChanged,this);

    }



    this.createDomElement=function(){

        this.domElement=document.createElement('input');

        this.domElement.style[Modernizr.prefixed('boxSizing')]='border-box';

        this.domElement.style.position='absolute';

    }



    this._valueChanged=function(){

        this.domElement.value=this.getValue();

    }



    this._inputChanged=function(){

        this.setValue(this.domElement.value);

    }



    this._disabledChanged=function(){

        this.domElement.disabled=this.getDisabled();

    }



}