function(){



    this.createAttributes=function(){

        this.callSuper('createAttributes');

        this.createAttribute('fps',24);

    }



    this.init=function(){



        $(this).css({position:'absolute',left:'0px',right:'0px',top:'0px',bottom:'0px'});

        this.callSuper('init');



        this.invalidateSize();

        var target=this;

        this.callTick=function(){

            target.tick();

        }

        $(window).bind('resize', $.proxy(function() {

            this.invalidateSize();

        },this));





    }



    this.processId=-1;



    this.start=function(){

        this.processId=setTimeout(this.callTick,Math.round(1000/parseInt(this.getFps())));

    }



    this.callTick=null;







    this.tick=function(){

        var time=Rokkstar.GetMicrotime();

        console.profile();

        this.tack();

        console.profileEnd();

        var elapsed=(Rokkstar.GetMicrotime()-time)*1000.0;

        this.processId=setTimeout(this.callTick,Math.round(1000.0/parseFloat(this.getFps())-elapsed));

    }







    this.tack=function(){

        if(this.componentInvalid){

            var time=Rokkstar.GetMicrotime();

            this.callSuper('tack');

            console.log("Tack time:",Rokkstar.GetMicrotime()-time);

        }

    }

}