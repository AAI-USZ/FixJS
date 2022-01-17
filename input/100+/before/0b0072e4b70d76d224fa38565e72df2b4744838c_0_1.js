function(reversed){

        if(reversed==undefined){

            reversed=false;

        }

        this.tween.prop=this.propertyName;

        this.tween.type=this.getType();

        this.tween.setDuration(this.getDuration());

        this.tween.func=this.getEasing();

        this.tween.suffixe=this.getSuffix();

        this.tween.obj=[this.getTarget()];

        if(!reversed){

            this.tween.begin=this.startValue;

            this.tween.setFinish(this.endValue);

        }else{

            this.tween.begin=this.endValue;

            this.tween.setFinish(this.startValue);

        }

        this.tween.start();



    }