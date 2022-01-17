function () {



    this.tween=null;

    this.startValue=0;

    this.endValue=0;

    this.propertyName='';



    this.play=function(reversed){

        if(reversed==undefined){

            reversed=false;

        }



        if(!reversed){

            this.tween.begin=this.startValue;

            this.tween.setFinish(this.endValue);

        }else{

            this.tween.begin=this.endValue;

            this.tween.setFinish(this.startValue);

        }

        this.tween.start();



    }



    this.init=function(){

        this.callSuper('init');

        this.createTween();

        this.createEventListener('targetPropertyChanged',this.updateTween,this);

        this.createEventListener('typePropertyChanged',this.updateTween,this);

        this.createEventListener('suffixPropertyChanged',this.updateTween,this);

        this.createEventListener('durationPropertyChanged',this.updateTween,this);

        this.createEventListener('easingPropertyChanged',this.updateTween,this);

    }

    this.createTween=function(){

        this.tween=new Tween([],'','',0,0,this.getDuration(),this.getSuffix());

    }



    this.updateTween=function(){

        this.tween.prop=this.propertyName;

        this.tween.type=this.getType();

        this.tween.setDuration(this.getDuration());

        this.tween.func=this.getEasing();

        this.tween.suffixe=this.getSuffix();

        this.tween.obj=[this.getTarget()];

        this.tween.begin=this.startValue;

        this.tween.setFinish(this.endValue);

    }









}