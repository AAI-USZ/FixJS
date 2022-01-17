function(){

    /**

     *

     * @param {core.VisualComponent} div Target component

     */

    this.doLayout=function(div){

        this.callSuper('doLayout',div);

        var layout=this;

        for(var i in div.elements){

            if(div.elements[i].getLeft()==undefined || div.elements[i].getRight()==undefined){

                if(div.elements[i].getWidth()!=undefined && div.elements[i].getWidth()!=null) div.elements[i].domElement.style.width=layout.stringToPixel(div.elements[i].getWidth(),div.measuredWidth,layout.getPaddingLeft(),layout.getPaddingRight());

            }

            if(div.elements[i].getTop()==undefined || div.elements[i].getBottom()==undefined){

                if(div.elements[i].getHeight()!=undefined && div.elements[i].getHeight()!=null) div.elements[i].domElement.style.height=layout.stringToPixel(div.elements[i].getHeight(),div.measuredHeight,layout.getPaddingTop(),layout.getPaddingBottom());

            }

            if(div.elements[i].getX()!=undefined && div.elements[i].getX()!=null) div.elements[i].domElement.style.left=(parseInt(div.elements[i].getX())+parseInt(layout.getPaddingLeft()))+'px';

            if(div.elements[i].getY()!=undefined && div.elements[i].getY()!=null) div.elements[i].domElement.style.top=(parseInt(div.elements[i].getY())+parseInt(layout.getPaddingTop()))+'px';



            if(div.elements[i].getLeft()!=undefined && div.elements[i].getLeft()!=null) div.elements[i].domElement.style.left=(parseInt(div.elements[i].getLeft())+parseInt(layout.getPaddingLeft()))+"px";

            if(div.elements[i].getRight()!=undefined && div.elements[i].getRight()!=null) div.elements[i].domElement.style.right=(parseInt(div.elements[i].getRight())+parseInt(layout.getPaddingRight()))+"px";

            if(div.elements[i].getTop()!=undefined && div.elements[i].getTop()!=null) div.elements[i].domElement.style.top=(parseInt(div.elements[i].getTop())+parseInt(layout.getPaddingTop()))+"px";

            if(div.elements[i].getBottom()!=undefined && div.elements[i].getBottom()!=null) div.elements[i].domElement.style.bottom=(parseInt(div.elements[i].getBottom())+parseInt(layout.getPaddingBottom()))+"px";

            //if(w!=$(div.elements[i]).width() || h!=$(div.elements[i]).height()){

            div.elements[i].measure();

            //}



        }

    }

}