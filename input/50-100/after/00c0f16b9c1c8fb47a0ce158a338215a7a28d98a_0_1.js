function(){





        this.callSuper('init');

        $(this.domElement).css({left:'0px',right:'0px',top:'0px',bottom:'0px'});

        this.invalidateSize();

        var target=this;

        this.callTick=function(){

            target.tick();

        }

        $(window).bind('resize', $.proxy(function() {

            this.invalidateSize();

        },this));





    }