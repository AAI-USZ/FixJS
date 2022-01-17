function(){



    this.init=function(){

        this.callSuper('init');

        this.createEventListener('labelPositionPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('gapPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('labelPaddingLeftPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('labelPaddingRightPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('elementPaddingLeftPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('elementPaddingRightPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('elementPositionPropertyChanged',this.selfRefreshLayout,this);

    }



    /**

     * @type {Number}

     */

    this.maxLabelWidth=0;



    /**

     * @override

     * @param {core.VisualContainer} div

     */

    this.doLayout=function(div){

        this.callSuper('doLayout',div);

        $(div.domElement).find('.core_FormLabel').remove();

        //Process labels

        this.maxLabelWidth=0;

        var labels=[];

        for(var i=0;i<div.getElementsNum();i++){

            var label=document.createElement('label');

            div.domElement.appendChild(label);

            labels.push(label);

            label.className="core_FormLabel";

            label.style.position='absolute';

            label.style.width='auto';

            label.style.height='auto';

            if(div.getElementAt(i).getLabel!=undefined){

                label.innerHTML=div.getElementAt(i).getLabel();

                div.getElementAt(i).labelNode=label;

            }

            var labelWidth=$(label).width();

            if(labelWidth>this.maxLabelWidth){

                this.maxLabelWidth=labelWidth;

            }

            this.maxLabelWidth=this.maxLabelWidth+this.getLabelPaddingLeft()+this.getLabelPaddingRight();

        }



        //Process elements

        var currentTop=parseInt(this.getPaddingTop());

        var elementWidth=div.measuredWidth-this.maxLabelWidth;

        for(var i=0;i<div.getElementsNum();i++){

            //Fix label position

            labels[i].style.top=currentTop+"px";

            if(this.getLabelPosition()=='center'){

                var position=this.maxLabelWidth;

                position=Math.round((position-$(labels[i]).width())/2);

                labels[i].style.left=position+"px";

            }else if(this.getLabelPosition()=='left'){

                labels[i].style.left=this.getLabelPaddingLeft()+"px";

            }else if(this.getLabelPosition()=='right'){

                var position=this.maxLabelWidth;

                position=Math.round(position-this.getLabelPaddingRight()-$(labels[i]).width());

                labels[i].style.left=position+"px";

            }

            //Create and position element

            var comp=div.elements[i];

            var el=div.elements[i].domElement;

            el.style.position='absolute';

            el.style.top=currentTop+"px";

            el.style.width=this.stringToPixel(comp.getWidth(),div.measuredWidth,parseFloat(this.getElementPaddingLeft())+this.maxLabelWidth,this.getElementPaddingRight());

            el.style.height=this.stringToPixel(comp.getHeight(),div.measuredHeight,0,0);

            comp.measure();

            if(this.getElementPosition()=='left'){

                el.style.left=(this.maxLabelWidth+this.getElementPaddingLeft())+"px";

            }else if(this.getElementPosition()=='center'){

                var position=elementWidth;

                position=Math.round((position-$(el).width())/2);

                el.style.left=position+"px";

            }else{

                el.style.right=this.getElementPaddingRight()+"px";

            }



            currentTop=currentTop+Math.max(labels[i].clientHeight,comp.measuredHeight)+this.getGap();



        }

    }

}