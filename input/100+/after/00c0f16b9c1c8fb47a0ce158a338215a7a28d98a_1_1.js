function(div){

        this.callSuper('doLayout',div);

        var layout=this;

        var i=div.elements.length;

        var containerWidth=parseInt(div.measuredWidth);

        var containerHeight=parseInt(div.measuredHeight);

        var paddingLeft=parseInt(this.getPaddingLeft());

        var paddingRight=parseInt(this.getPaddingRight());

        var paddingTop=parseInt(this.getPaddingTop());

        var paddingBottom=parseInt(this.getPaddingBottom());

        var position=new core.helpers.LayoutPosition(containerWidth,containerHeight,paddingLeft,paddingRight,paddingTop,paddingBottom);

        

        while(--i>=0){

            var element=div.elements[i];

            var left=parseInt(element.getLeft());

            var right=parseInt(element.getRight());

            var top=parseInt(element.getLeft());

            var bottom=parseInt(element.getRight());

            var x=parseInt(element.getX());

            var y=parseInt(element.getY());

            var width=element.getWidth();

            var height=element.getHeight();

            position.clear();

            if(left==undefined || right==undefined){

                if(width!=undefined && width!=null) position.width=layout.stringToPixel(width,containerWidth,paddingLeft,paddingRight);

            }

            if(top==undefined || bottom==undefined){

                if(height!=undefined && height!=null) position.height=layout.stringToPixel(height,containerHeight,paddingTop,paddingBottom);

            }

            if(x!=undefined && x!=null) position.left=x+paddingLeft;

            if(y!=undefined && y!=null) position.top=y+paddingTop;



            if(left!=undefined && left!=null) position.left=left+paddingLeft;

            if(right!=undefined && right!=null) position.right=right+paddingRight;

            if(top!=undefined && top!=null) position.top=top+paddingTop;

            if(bottom!=undefined && bottom!=null) position.bottom=bottom+paddingBottom;

            //if(w!=$(element).width() || h!=$(element).height()){

            position.apply(element);

            element.measure();

            //}



        }

    }