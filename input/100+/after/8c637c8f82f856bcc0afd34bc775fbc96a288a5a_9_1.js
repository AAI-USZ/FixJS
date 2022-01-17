function(){



    this.init=function(){

        this.callSuper('init');

        this.createEventListener('clipAndEnableScrollingPropertyChanged',this.invalidateScrolling,this);

    }



    this.scrollingInvalid=true;



    this.invalidateScrolling=function(){

        this.scrollingInvalid=true;

        this.invalidateProperties();

    }



    this.commitProperties=function(){

        this.callSuper('commitProperties');

        if(this.scrollingInvalid){

            this.scrollingInvalid=false;

            if(this.getClipAndEnableScrolling()==true){

                $(this.domElement).css({overflow:'hidden'});

            }else{

                $(this.domElement).css({overflow:'visible'})

            }

        }

    }





}