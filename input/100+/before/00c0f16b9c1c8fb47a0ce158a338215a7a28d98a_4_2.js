function(){

    /**

     * 

     * @param {core.VisualContainer} div Parent div

     */

    this.doLayout=function(div){

        this.callSuper('doLayout',div);

        

        var containerWidth=div.measuredWidth;

        var containerHeight=div.measuredHeight;

        var layout=this;

        var elements=div.elements;

        var verticalAlign=this.getVerticalAlign();

        var gap=this.getGap();

        var currentTop=this.getPaddingTop();

        if(verticalAlign=='top' || verticalAlign=='middle'){

            for(var i in elements){

                div.elements[i].domElement.style.position='absolute';

                div.elements[i].domElement.style.width=layout.stringToPixel(div.elements[i].getWidth(),containerWidth,layout.getPaddingLeft(),layout.getPaddingRight());

                div.elements[i].domElement.style.height=layout.stringToPixel(div.elements[i].getHeight(),containerHeight,layout.getPaddingTop(),layout.getPaddingBottom());

                div.elements[i].measure();



                var width=div.elements[i].measuredWidth;

                var height=div.elements[i].measuredHeight;

                

                if(this.getHorizontalAlign()=='left'){

                    div.elements[i].domElement.style.top=currentTop+'px';

                    div.elements[i].domElement.style.left=this.getPaddingLeft()+'px';

                }else if(this.getHorizontalAlign()=='right'){

                    div.elements[i].domElement.style.top=currentTop+'px';

                    div.elements[i].domElement.style.right=this.getPaddingRight()+'px';

                }else{

                    var space=Math.round((parseInt(containerWidth)-parseInt(this.getPaddingLeft())-parseInt(this.getPaddingRight())-parseInt(width))/2);

                    div.elements[i].domElement.style.top=currentTop+'px';

                    div.elements[i].domElement.style.left=space+'px';

                }

                currentTop=parseInt(currentTop)+parseInt(height)+parseInt(gap);

            }

        }else if(verticalAlign=='bottom'){

            var currentBottom=this.getPaddingBottom();

            for(var i=elements.length-1;i>=0;i--){

                div.elements[i].domElement.style.position='absolute';

                div.elements[i].domElement.style.width=layout.stringToPixel(div.elements[i].getWidth(),containerWidth,layout.getPaddingLeft(),layout.getPaddingRight());

                div.elements[i].domElement.style.height=layout.stringToPixel(div.elements[i].getHeight(),containerHeight,layout.getPaddingTop(),layout.getPaddingBottom());

                div.elements[i].measure();

                var width=div.elements[i].measuredWidth;

                var height=div.elements[i].measuredHeight;



                if(this.getHorizontalAlign()=='left'){

                    div.elements[i].domElement.style.bottom=currentBottom+'px';

                    div.elements[i].domElement.style.left=this.getPaddingLeft()+'px';

                }else if(this.getHorizontalAlign()=='right'){

                    div.elements[i].domElement.style.bottom=currentBottom+'px';

                    div.elements[i].domElement.style.right=this.getPaddingRight()+'px';

                }else{

                    var space=Math.round((parseInt(containerWidth)-parseInt(this.getPaddingLeft())-parseInt(this.getPaddingRight())-parseInt(width))/2);

                    div.elements[i].domElement.style.bottom=currentBottom+'px';

                    div.elements[i].domElement.style.left=space+'px';

                }

                currentBottom=parseInt(currentBottom)+parseInt(height)+parseInt(gap);

            }

        }

        

        if(verticalAlign=='middle'){

            //Fixing positions

            currentTop-=parseInt(gap);

            var correction=containerHeight-currentTop;

            correction=Math.round(correction/2);

            for(var i in elements){



                elements[i].domElement.style.top=(parseInt(elements[i].domElement.style.top)+correction)+"px";

            }



        }

    }

}