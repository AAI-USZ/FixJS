function(){



    /**

     * Get XML attribute

     * @description

     * Returns <code>fallback</code> value when attribute is not set or the component is not initialized in layout xml.

     * If the <code>data</code> attribute is set it will returns its value.

     * @param {String} data XML attribute name

     * @param {*} fallback Default value when attribute is not set or the component is not initialized in layout xml

     * @return {String}

     */

    this.getXMLData=function(data,fallback){

        var val=$(this).attr('data-'+data);

        if(val==null){

            return fallback;

        }

        return val;

    }



    /**

     * Master component

     * This component defines this instance

     * @type {core.VisualComponent}

     */

    this.master=null;



    /**

     * @private

     * @param {String} name

     * @param {*} data

     */

    this.setXMLData=function(property,val){

        if(this.getXMLData(name,null)==null){

           $(this).attr('data-'+property,val);

        }

    }



    this.propertyRedirections={};



    this.redirectProperty=function(property,component,selfValue){

        component.set(property,this.get(property));

        this.set(property,selfValue);

        this.propertyRedirections[property]=component;

    }



    this.clearPropertyRedirection=function(property){

         this.propertyRedirections[property]=null;

    }



    this.createAttributes=function(){

    }



    this.postAttributeCreation=function(){



    }



    this._attributes=[];

    this._attributeTypes={};





    

    

    this.extractValue=function(val,typeForcing){

        return Rokkstar.parseAttribute(val,typeForcing);

    }



    this._buildDOM=function(){}



    this.init=function(){

        Rokkstar.profiling.initCount++;

        //if($(this).attr('id')==undefined){

            $(this).attr('id','dynid'+Rokkstar.uniqueIds);

            Rokkstar.uniqueIds++;

        //}

        this.postAttributeCreation();

        this.createAttributes();

    }

    /**

     * General attribute setter.

     * @description

     * You can set an attribute created by <code>createAttribute</code> but shorthands are preferred.

     * @example

     * Setting using this method: <code>obj.set('width',200)</code>.

     * Preferred shorthand method: <code>obj.setWidth(200);</code>

     * @see core.Component#createAttribute

     * @param {String} property Property name

     * @param {*} value New property value

     */



    /**

     * General attribute getter.

     * @description

     * You can get an attribute created by <code>createAttribute</code> but shorthands are preferred.

     * @example

     * Getting with this method: <code>obj.get('width',200)</code>.

     * Preferred shorthand method: <code>obj.getWidth(200);</code>

     * @see core.Component#createAttribute

     * @param {String} property Property name

     */







    /**

     * Produce a component instance

     * @param {String} name Component class

     * @return {*} Component instance

     */

    this.createComponent=Rokkstar.createComponent;



    /**

     * Make the given class name unique for this object instance

     * @description

     * Use this method when you want to create a class name which is available only in the current object scope.

     * @example

     * <pre><code>

     *     var class=this.getInstanceClass('moveHandler'); //Will return id4321moveHandler

     *     $(this).find('.'+class); //This will prevent selecting moveHandlers from child components

     * </code></pre>

     * @param {String} className Requested class name

     * @return {String}

     */

    this.getInstanceClass=function(className){

        return $(this).attr('id')+className;

    }







}