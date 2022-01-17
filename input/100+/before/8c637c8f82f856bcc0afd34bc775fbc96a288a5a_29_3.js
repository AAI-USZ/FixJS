function(){

    this.left=undefined;

    this.right=undefined;

    this.top=undefined;

    this.bottom=undefined;

    this.width=undefined;

    this.height=undefined;



    this.parentWidth=0;

    this.parentHeight=0;

    this.parentPaddingLeft=0;

    this.parentPaddingRight=0;

    this.parentPaddingTop=0;

    this.parentPaddingBottom=0;



    this.clear=function(){

        this.left=undefined;

        this.right=undefined;

        this.top=undefined;

        this.bottom=undefined;

        this.width=undefined;

        this.height=undefined;

    }



    this.construct=function(parentWidth,parentHeight,parentPaddingLeft,parentPaddingRight,parentPaddingTop,parentPaddingBottom){

        this.parentWidth=parentWidth;

        this.parentHeight=parentHeight;



        this.parentPaddingLeft=parentPaddingLeft;

        this.parentPaddingRight=parentPaddingRight;

        this.parentPaddingTop=parentPaddingTop;

        this.parentPaddingBottom=parentPaddingBottom;

    }







    this.getPredictedWidth=function(){

        var w=this.width;

        if(w!=undefined){

            if(Rokkstar.globals.regex.pixelFormat.test(w)){

                return parseInt(w.replace('px',''));

            }else if(Rokkstar.globals.regex.percentFormat.test(w)){

                var val=parseFloat(w.replace('%',''))/100.0;

                return Math.round((this.parentWidth)*val);

            }else{

                return 0;

            }

        }else{

            return (this.parentWidth-this.parentPaddingLeft-this.parentPaddingRight-this.left-this.right);

        }

    }



    this.getPredictedHeight=function(){

        var h=this.height;

        if(h!=undefined){

            if(Rokkstar.globals.regex.pixelFormat.test(h)){

                return parseInt(h.replace('px',''));

            }else if(Rokkstar.globals.regex.percentFormat.test(h)){

                var val=parseFloat(h.replace('%',''))/100.0;

                return Math.round((this.parentHeight)*val);

            }else{

                return 0;

            }

        }else{

            return (this.parentHeight-this.parentPaddingTop-this.parentPaddingBottom-this.top-this.bottom);

        }



    }



    /**

     *

     * @param {core.VisualComponent} element

     */

    this.apply=function(element){

        if(BrowserDetect.browser!="Firefox"){

            if(this.width!=undefined){

                element.domElement.style.width=this.width;

            }else{

                element.domElement.style.width='';

            }



            if(this.height!=undefined){

                element.domElement.style.height=this.height;

            }else{

                element.domElement.style.height='';

            }



            if(this.top!=undefined){

                element.domElement.style.top=this.top+"px";

            }else{

                element.domElement.style.top='';

            }



            if(this.bottom!=undefined){

                element.domElement.style.bottom=this.bottom+"px";

            }else{

                element.domElement.style.bottom='';

            }



            if(this.left!=undefined){

                element.domElement.style.left=this.left+"px";

            }else{

                element.domElement.style.left='';

            }



            if(this.right!=undefined){

                element.domElement.style.right=this.right+"px";

            }else{

                element.domElement.style.right='';

            }

        }else{

            var cssStyle="position:absolute;-moz-box-sizing:border-box;";

            if(this.width!=undefined){

                cssStyle=cssStyle.concat('width:',this.width,';');

            }



            if(this.height!=undefined){

                cssStyle=cssStyle.concat('height:',this.height,';');

            }



            if(this.top!=undefined){

                cssStyle=cssStyle.concat('top:',this.top,'px;');

            }



            if(this.bottom!=undefined){

                cssStyle=cssStyle.concat('bottom:',this.bottom,'px;');

            }



            if(this.left!=undefined){

                cssStyle=cssStyle.concat('left:',this.left,'px;');

            }



            if(this.right!=undefined){

                cssStyle=cssStyle.concat('right:',this.right,'px;');

            }

            //console.log(cssStyle);

            element.domElement.style.cssText=cssStyle;

        }

    }



}