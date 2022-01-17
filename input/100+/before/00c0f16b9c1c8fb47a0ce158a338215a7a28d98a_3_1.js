function () {



    this.lastDiv = null;

    this.createAttributes=function(){

        this.callSuper('createAttributes');

        this.createAttribute('paddingLeft', '0');

        this.createAttribute('paddingRight', '0');

        this.createAttribute('paddingTop', '0');

        this.createAttribute('paddingBottom', '0');

    }





    this.init = function () {





        this.callSuper('init');

        //this.createEventListener('paddingLeftPropertyChanged',this.);

        this.createEventListener('paddingLeftPropertyChanged', this.selfRefreshLayout, this);

        this.createEventListener('paddingRightPropertyChanged', this.selfRefreshLayout, this);

        this.createEventListener('paddingTopPropertyChanged', this.selfRefreshLayout, this);

        this.createEventListener('paddingBottomPropertyChanged', this.selfRefreshLayout, this);

    }



    /**

     * Refresh layout listener

     * @event

     * @param {core.Event} event Event object

     * @private

     */

    this.selfRefreshLayout = function (event) {

        event.stopPropagation();

        if (this.lastDiv != null) {

            //TODO: Replace this with event handling (one layout - multiple group case)

            //this.doLayout(this.lastDiv);

            this.lastDiv.invalidateLayout();

        }

    }



    /**

     * Applies layout to div.

     * @param {core.VisualContainer} div The layout object applies layout format to this div.

     */

    this.doLayout = function (div) {

        this.lastDiv = div;

        //Remove previously created attributes

        for(var i in div.elements){

            var elem=div.elements[i].domElement;

            elem.style.left='';

            elem.style.position='absolute';

            elem.style.right='';

            elem.style.top='';

            elem.style.bottom='';

            elem.style.width='';

            elem.style.height='';

            elem.style[Modernizr.prefixed('boxSizing')]='border-box';

        }

    }





    this.stringToPixel=function(data,referenceValue,paddingA,paddingB){

        var percentRegexp=/^[0-9]+%$/;

        var pxRegexp=/^[0-9]+px$/;

        if(data=='auto'){

            return 'auto';

        }else if(percentRegexp.test(data)){

            var p=parseInt(data.replace('%',''));

            var padding=Math.round((((parseFloat(paddingA)+parseFloat(paddingB))/parseFloat(referenceValue)))*100);

            return (p-padding)+'%';

        }else if(pxRegexp.test(data)){

            //return parseInt(data.replace('px',''));

            return data;

        }else{

            return parseInt(data);

        }



    }





}