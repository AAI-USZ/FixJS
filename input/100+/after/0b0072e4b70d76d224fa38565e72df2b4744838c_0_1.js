function(reversed){

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