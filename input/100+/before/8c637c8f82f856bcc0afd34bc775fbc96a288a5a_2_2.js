function(){



    this.createAttributes=function(){

        this.callSuper('createAttributes');

        this.createAttribute('gap', '5');

        this.createAttribute('gapRight', undefined);

        this.createAttribute('gapTop', undefined);

        this.createAttribute('gapBottom', undefined);

        this.createAttribute('gapLeft', undefined);

    }



    this.init=function(){

        this.callSuper('init');

        this.createEventListener('gapPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('gapRightPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('gapTopPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('gapBottomPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('gapLeftPropertyChanged',this.selfRefreshLayout,this);

    }



    this.currentHandle=null;



    /**

     *

     * @param {core.VisualContainer} div Target container

     */

    this.doLayout=function(div){

        this.callSuper('doLayout',div);



        var gap=this.getGap();

        var leftGap=this.getGapLeft();

        var rightGap=this.getGapRight();

        var topGap=this.getGapTop();

        var bottomGap=this.getGapBottom();



        var leftPadding=this.getPaddingLeft();

        var rightPadding=this.getPaddingRight();

        var topPadding=this.getPaddingTop();

        var bottomPadding=this.getPaddingBottom();



        var position=new core.helpers.LayoutPosition();



        if(leftGap==undefined){

            leftGap=gap;

        }

        if(rightGap==undefined){

            rightGap=gap;

        }

        if(topGap==undefined){

            topGap=gap;

        }

        if(bottomGap==undefined){

            bottomGap=gap;

        }

        var topSlot=null;

        var leftSlot=null;

        var rightSlot=null;

        var bottomSlot=null;

        var centerSlot=null;

        var i=div.elements.length;

        while(--i>=0){

            var element=div.elements[i];

            switch(element.getPosition()){

                case 'center':

                    if(centerSlot==null){

                        centerSlot=element;

                    }else{

                        throw new core.exceptions.Exception('Multiple "center" part found for a border layout.');

                    }

                    break;

                case 'left':

                    if(leftSlot==null){

                        leftSlot=element;

                    }else{

                        throw new core.exceptions.Exception('Multiple "left" part found for a border layout.');

                    }

                    break;

                case 'right':

                    if(rightSlot==null){

                        rightSlot=element;

                    }else{

                        throw new core.exceptions.Exception('Multiple "right" part found for a border layout.');

                    }

                    break;

                case 'bottom':

                    if(bottomSlot==null){

                        bottomSlot=element;

                    }else{

                        throw new core.exceptions.Exception('Multiple "bottom" part found for a border layout.');

                    }

                    break;

                case 'top':

                    if(topSlot==null){

                        topSlot=element;

                    }else{

                        throw new core.exceptions.Exception('Multiple "top" part found for a border layout.');

                    }

                    break;

            }

        }





        //Create top element

        var topPosition=topPadding;

        if(topSlot!=null){

            position.clear();

            position.top=topPadding;

            position.left=leftPadding;

            position.right=rightPadding;

            position.height=this.stringToPixel(topSlot.getHeight(),div.measuredHeight,topPadding,bottomPadding);

            position.apply(topSlot);

            topSlot.measure();



            //Create top gap

            handle=document.createElement('div');

            handle.className="coreTopBorderHandle coreUpDownHandle";





            handle.style.position='absolute';

            handle.style.top=(parseInt(topPadding)+parseInt(topSlot.measuredHeight))+'px';

            handle.style.left=leftPadding+'px';

            handle.style.right=rightPadding+'px';

            handle.style.height=topGap+'px';

            div.domElement.appendChild(handle);

            handle.parentPanel=topSlot;

            handle.addEventListener('mousedown',this.handleClickedProxy);

            topPosition=parseInt(topPadding)+parseInt(topSlot.measuredHeight)+parseInt(topGap);

        }







        //Create bottom element

        var bottomPosition=bottomPadding;

        if(bottomSlot!=null){

            position.clear();

            position.bottom=bottomPadding;

            position.left=leftPadding;

            position.right=rightPadding;

            position.height=this.stringToPixel(bottomSlot.getHeight(),div.measuredHeight,topPadding,bottomPadding);

            position.apply(bottomSlot);

            bottomSlot.measure();



            //Create bottom gap

            handle=document.createElement('div');

            handle.className="coreBottomBorderHandle coreUpDownHandle";





            handle.style.position='absolute';

            handle.style.bottom=(parseInt(bottomPadding)+parseInt(bottomSlot.measuredHeight))+'px';

            handle.style.left=leftPadding+'px';

            handle.style.right=rightPadding+'px';

            handle.style.height=bottomGap+"px";

            div.domElement.appendChild(handle);

            handle.parentPanel=bottomSlot;

            handle.addEventListener('mousedown',this.handleClickedProxy);

            bottomPosition=parseInt(bottomPadding)+parseInt(bottomSlot.measuredHeight)+parseInt(bottomGap);

        }



        //Create left element

        var leftPosition=leftPadding;

        if(leftSlot!=null){

            position.clear();

            position.bottom=bottomPosition;

            position.left=leftPadding;

            position.top=topPosition;

            position.width=this.stringToPixel(leftSlot.getWidth(),div.measuredWidth,leftPadding,rightPadding);

            position.apply(leftSlot);

            leftSlot.measure();



            //Create bottom gap

            handle=document.createElement('div');

            handle.className="coreLeftBorderHandle coreLeftRightHandle";





            handle.style.position='absolute';

            handle.style.bottom=bottomPosition+'px';

            handle.style.left=(parseInt(leftPadding)+parseInt(leftSlot.measuredWidth))+'px';

            handle.style.top=topPosition+'px';

            handle.style.width=leftGap+"px";

            div.domElement.appendChild(handle);

            handle.parentPanel=leftSlot;



            handle.addEventListener('mousedown',this.handleClickedProxy);

            leftPosition=parseInt(leftPadding)+parseInt(leftSlot.measuredWidth)+parseInt(leftGap);

        }



        //Create right element

        var rightPosition=rightPadding;

        if(rightSlot!=null){



            position.clear();

            position.bottom=bottomPosition;

            position.right=rightPadding;

            position.top=topPosition;

            position.width=this.stringToPixel(rightSlot.getWidth(),div.measuredWidth,leftPadding,rightPadding);

            position.apply(rightSlot);

            rightSlot.measure();



            //Create right gap

            handle=document.createElement('div');

            handle.className="coreRightBorderHandle coreLeftRightHandle";







            handle.style.position='absolute';

            handle.style.bottom=bottomPosition+'px';

            handle.style.right=(parseInt(rightPadding)+parseInt(rightSlot.measuredWidth))+'px';

            handle.style.top=topPosition+'px';

            handle.style.width=rightGap+"px";

            div.domElement.appendChild(handle);

            handle.parentPanel=rightSlot;

            handle.addEventListener('mousedown',this.handleClickedProxy);

            rightPosition=parseInt(rightPadding)+parseInt(rightSlot.measuredWidth)+parseInt(rightGap);

        }



        if(centerSlot!=null){

            position.clear();

            position.left=leftPosition;

            position.right=rightPosition;

            position.top=topPosition;

            position.bottom=bottomPosition;

            position.apply(centerSlot);

            centerSlot.measure();

        }





    }



    this.handleClicked=function(event){

        this.currentHandle=event.currentTarget;

        this.lastPoint.x=event.pageX;

        this.lastPoint.y=event.pageY;

        this.resizeValue=0;

        $(this.currentHandle).addClass("coreHandleHighlight");

        $(window).mousemove(this.handleMoveProxy);

        $(window).mouseup(this.handleUpProxy);



    }



    this.handleClickedProxy=$.proxy(this.handleClicked,this);



    this.lastPoint={x:0,y:0};

    this.resizeValue=0;



    this.handleMove=function(event){

        var $ch=$(this.currentHandle);

        if($ch.hasClass('coreRightBorderHandle')){

            $ch.css({

                right:(parseInt($ch.css('right'))+Math.round(this.lastPoint.x-event.pageX))+'px'



            });

            this.resizeValue+=Math.round(this.lastPoint.x-event.pageX);

        }else if($ch.hasClass('coreBottomBorderHandle')){

            $ch.css({

                bottom:(parseInt($ch.css('bottom'))+Math.round(this.lastPoint.y-event.pageY))+'px'

            });

            this.resizeValue+=Math.round(this.lastPoint.y-event.pageY);

        }else if($ch.hasClass('coreLeftBorderHandle')){

            $ch.css({

                left:(parseInt($ch.css('left'))+Math.round(event.pageX-this.lastPoint.x))+'px'

            });

            this.resizeValue+=Math.round(event.pageX-this.lastPoint.x);

        }else if($ch.hasClass('coreTopBorderHandle')){

            $ch.css({

                top:(parseInt($ch.css('top'))+Math.round(event.pageY-this.lastPoint.y))+'px'

            });

            this.resizeValue+=Math.round(event.pageY-this.lastPoint.y);

        }

        this.lastPoint.x=event.pageX;

        this.lastPoint.y=event.pageY;

    }



    this.handleMoveProxy=$.proxy(this.handleMove,this);



    this.handleUp=function(event){

        $(window).unbind('mousemove',this.handleMoveProxy);

        $(window).unbind('mouseup',this.handleUpProxy);



        var $ch=$(this.currentHandle);

        if($ch.hasClass('coreLeftRightHandle')){

            this.currentHandle.parentPanel.setWidth((parseInt(this.currentHandle.parentPanel.measuredWidth)+this.resizeValue)+"px");

        }else{

            this.currentHandle.parentPanel.setHeight((parseInt(this.currentHandle.parentPanel.measuredHeight)+this.resizeValue)+"px");

        }

        $ch.removeClass("coreHandleHighlight");

        this.currentHandle=null;



    }



    this.handleUpProxy= $.proxy(this.handleUp,this);



}