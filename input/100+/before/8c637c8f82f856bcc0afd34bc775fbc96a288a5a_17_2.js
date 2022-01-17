function(){



    this.createAttributes=function(){

        this.callSuper('createAttributes');

        this.createAttribute('positionX',0,'integer');

        this.createAttribute('positionY',0,'integer');

    }



    this.init=function(){

        this.callSuper('init');

        this.createEventListener('positionXPropertyChanged',this.selfRefreshLayout,this);

        this.createEventListener('positionYPropertyChanged',this.selfRefreshLayout,this);

    }

    /**

     *

     * @param {core.VisualContainer} div

     */

    this.doLayout=function(div){

        this.callSuper('doLayout',div);

        for(var i in div.elements){

            var elem=div.elements[i];

            if(elem.getWidth()!=undefined && elem.getWidth()!=null) elem.domElement.style.width=this.stringToPixel(elem.getWidth(),div.measuredWidth,this.getPaddingLeft(),this.getPaddingRight());

            else elem.domElement.style.width='100%';

            if(elem.getHeight()!=undefined && elem.getHeight()!=null) elem.domElement.style.height=this.stringToPixel(elem.getHeight(),div.measuredHeight,this.getPaddingTop(),this.getPaddingBottom());

            else elem.domElement.style.height='100%';

            var distance=elem.getDistance();

            var distanceX=elem.getDistanceX();

            var distanceY=elem.getDistanceY();

            if(distanceX==undefined) distanceX=distance;

            if(distanceY==undefined) distanceY=distance;

            var xMod=(100-distanceX)/100.0;

            var yMod=(100-distanceY)/100.0;

            if(elem.getX()!=undefined) var x=elem.getX()+this.getPositionX()*xMod;

            else var x=this.getPositionX()*xMod;

            if(elem.getY()!=undefined) var y=elem.getY()+this.getPositionY()*yMod;

            else var y=this.getPositionY()*xMod;

            elem.domElement.style.left=x+'px';

            elem.domElement.style.top=y+'px';

            elem.domElement.style.position='absolute';

            elem.measure();

        }



    }

}