function () {



    /**

     *

     * @type {core.Container}

     */

    this.parent = null;





    /**

     * Get width string

     * @description

     * Returns width in string representation (100% or 100px)

     * @name core.VisualComponent#getWidth

     * @function

     * @returns {String} value Width in pixels or in %

     */

    /**

     * Set width

     * @description

     * Set visual component width

     * <code>

     *     myComp.setWidth('100%');

     *     myComp.setWidth('100px');

     * </code>

     * @name core.VisualComponent#setWidth

     * @function

     * @param {String} value Width in pixels or in %

     */





    /**

     * Get height string

     * @description

     * Returns height in string representation (100% or 100px)

     * @name core.VisualComponent#getHeight

     * @function

     * @returns {String} value Height in pixels or in %

     */

    /**

     * Sets height

     * @description

     * Set visual component width

     * <code>

     *     myComp.setHeight('100%');

     *     myComp.setHeight('100px');

     * </code>

     * @name core.VisualComponent#setHeight

     * @function

     * @param {String} value Height in pixels or in %

     */





    /**

     * Get x position

     * @description

     * Returns x position

     * @name core.VisualComponent#getX

     * @function

     * @returns {int} value x

     */

    /**

     * Set x position

     * @description

     * Set visual component x position on the screen

     * <code>

     *     myComp.setX(33);

     * </code>

     * @name core.VisualComponent#setHeight

     * @function

     * @param {int} new x position

     */





    /**

     * DOM builder hook

     */

    this.buildDOM = function () {



    }





    /**

     *

     * @private

     */

    this._buildDOM = function () {

        this.buildDOM();

    }





    /**

     * Removes all child element

     */

    this.empty = function () {

        $(this).empty();

    }



    this.xmlContentArray = [];





    this.createAttributes = function () {

        this.callSuper('createAttributes');

        this.createAttribute('currentState', undefined);

        this.createAttribute('class');

        this.createAttribute('x');

        this.createAttribute('y');

        this.createAttribute('left');

        this.createAttribute('right');

        this.createAttribute('top');

        this.createAttribute('bottom');

        this.createAttribute('position', 'center');

        this.createAttribute('height', undefined);

        this.createAttribute('width', undefined);

        this.createAttribute('distance', 0, 'integer');

        this.createAttribute('distanceX', undefined, 'integer');

        this.createAttribute('distanceY', undefined, 'integer');

        this.createAttribute('cssStyle', {}, 'object');

    }



    this.states={};



    this.init = function () {

        this.callSuper('init');

        this._buildDOM();





        //this.xmlContentArray = $(this).children().toArray();

        //$(this).empty();

        //$(this).stateManager(this.states);

        this.createEventListener('widthPropertyChanged', this.widthChanged, this);

        this.createEventListener('heightPropertyChanged', this.heightChanged, this);

        this.createEventListener('xPropertyChanged', this.xChanged, this);

        this.createEventListener('yPropertyChanged', this.yChanged, this);

        this.createEventListener('leftPropertyChanged', this.leftChanged, this);

        this.createEventListener('rightPropertyChanged', this.rightChanged, this);

        this.createEventListener('topPropertyChanged', this.topChanged, this);

        this.createEventListener('bottomPropertyChanged', this.bottomChanged, this);

        this.createEventListener('positionPropertyChanged', this.positionChanged, this);

        this.createEventListener('classPropertyChanged', this.classChanged, this);

        this.createEventListener('currentStatePropertyChanged', this.stateChanged, this);

        this.createEventListener('cssStylePropertyChanged', this.styleChanged, this);

        if(this.domElement==null) this.createDomElement();

        $(this.domElement).mouseenter($.proxy(this.triggerJQEvent,this));

        $(this.domElement).mouseleave($.proxy(this.triggerJQEvent,this));

    }







    this.measuredWidth = 0;

    this.measuredHeight = 0;



    this.triggerJQEvent=function(event){

        this.triggerEvent(event.type);

    }



    this.measure = function () {

        //var mW=this.measuredWidth;

        //var mH=this.measuredHeight;

        this.measuredWidth = this.domElement.clientWidth;

        this.measuredHeight =this.domElement.clientHeight;

        //if ((mH!=this.measuredHeight || mW!=this.measuredWidth) && this.parent != null) {

        //    this.invalidateLayout();

        //}



    }





    this.componentInvalid = true;



    this.propertiesInvalid = true;

    this.sizeInvalid = true;



    this.invalidateSize = function () {

        this.invalidateDisplayList();

        this.sizeInvalid = true;

    }



    this.invalidateDisplayList = function () {

        this.componentInvalid = true;

        if (this.parent != null) {

            this.parent.invalidateDisplayList();

        }

    }





    this.invalidateProperties = function () {

        this.invalidateDisplayList();

        this.propertiesInvalid = true;

    }



    this.commitProperties = function () {



    }



    this.tack = function () {

        if (this.componentInvalid) {

            this.componentInvalid = false;



            if (this.propertiesInvalid) {

                this.commitProperties();

                this.propertiesInvalid = false;

            }

            if (this.sizeInvalid) {

                this.measure();

                this.sizeInvalid = false;

            }



        }

    }



    /**

     * Width change handler

     * @private

     * @param {core.Event} event

     */

    this.widthChanged = function (event) {

        event.stopPropagation();

        //$(this).css('width',this.width);

        if (this.parent != null) this.parent.invalidateLayout();

    }



    /**

     * Height change handler

     * @private

     * @param {core.Event} event

     */

    this.heightChanged = function (event) {

        event.stopPropagation();

        if (this.parent != null) this.parent.invalidateLayout();

    }



    /**

     * X change handler

     * @private

     * @param {core.Event} event

     */

    this.xChanged = function (event) {

        event.stopPropagation();

        if (this.parent != null) this.parent.invalidateLayout();

        //$(this).css('left',this.x+'px');

    }



    /**

     * Y change handler

     * @private

     * @param {core.Event} event

     */

    this.yChanged = function (event) {

        event.stopPropagation();

        if (this.parent != null) this.parent.invalidateLayout();

        //$(this).css('top',this.y+'px');

    }



    /**

     * Left change handler

     * @private

     * @param {core.Event} event

     */

    this.leftChanged = function (event) {

        event.stopPropagation();

        //$(this).css('left',this.width);

        if (this.parent != null) this.parent.invalidateLayout();

    }



    /**

     * Right change handler

     * @private

     * @param {core.Event} event

     */

    this.rightChanged = function (event) {

        event.stopPropagation();

        //$(this).css('right',this.height)

        if (this.parent != null) this.parent.invalidateLayout();

    }



    /**

     * Top change handler

     * @private

     * @param {core.Event} event

     */

    this.topChanged = function (event) {

        event.stopPropagation();

        if (this.parent != null) this.parent.invalidateLayout();

        //$(this).css('top',this.x+'px');

    }



    /**

     * Bottom change handler

     * @private

     * @param {core.Event} event

     */

    this.bottomChanged = function (event) {

        event.stopPropagation();

        if (this.parent != null) this.parent.invalidateLayout();

        //$(this).css('bottom',this.y+'px');

    }



    this.positionChanged = function (event) {

        event.stopPropagation();

        if (this.parent != null) this.parent.invalidateLayout();

    }



    this.classChanged = function (event) {

        event.stopPropagation();

        this.domElement.className = this.getClass();

    }



    this.stateChanged = function (event) {

        event.stopPropagation();

        if(this.states[this.getCurrentState()]!=undefined){

            this.states[this.getCurrentState()].activate();

        }else{

            throw new core.exceptions.Exception('Requested state is missing.');

        }

    }



    this.styleChanged=function(event){

        event.stopPropagation();

        $(this.domElement).css(this.getCssStyle());

    }

}