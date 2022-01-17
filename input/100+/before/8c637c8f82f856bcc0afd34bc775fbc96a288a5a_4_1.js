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



    /**

     * Create attribute for this object. Generate getter and setter and also initialize xml attributes.

     * @description

     * Use this method to generate standard getters setters with a single line. This method has to be called in

     * the createAttributes method.

     * @example

     * <pre><code>

     *      my.NewComponent=function(){

     *          extend(this,'core.Component');

     *

     *          this.createAttribute('width',200);

     *

     *          this.init(){

     *              this.callSuper('init');

     *              this.getWidth(); //This will return 200, if it is not overridden in the layout xml

     *              this.setWidth(350); //This will set width parameter 350 and fires widthPropertyChanged event

     *              this.getWidth(); //Returns 350

     *          }

     *      }

     * </code></pre>

     * This method looking for default value amongst the xml attributes for the first place. So if this component is

     * included into a layout xml this way <code><my:NewComponent width="900"/></code> then the first getWidth() call

     * will return 900 instead of 200.

     * @param {String} property Property name

     * @param {*} defaultValue Property default value

     */

    this.createAttribute=function(property,defaultValue,typeForcing){

        this._attributes.push({name:property,type:typeForcing});

        this._attributeTypes[property]=typeForcing;

        if(this[property]!=undefined){

            var val=this[property];

            this[property]=this.extractValue(val,typeForcing);

        }else{

            if(defaultValue!=null){

                this[property]=defaultValue;

            }

        }



        //Parsing state params

        /*if(this.master!=undefined && this.master.states!=undefined){

            for(var i in this.master.states){

                var name=this.master.states[i].stateName;

                if(this.master._stateAttributes[name]==undefined){

                    this.master._stateAttributes[name]=[];

                }



                if(this.getXMLData(property+'.'+name,undefined)!=undefined){

                    this.master._stateAttributes[name].push({property:property,target:this,value:this.extractValue(this.getXMLData(property+'.'+name,undefined),typeForcing)});

                }else{

                    this.master._stateAttributes[name].push({property:property,value:this[property],target:this});

                }

            }

        }*/



        //generating getters and setters

        var getterName='get'+property.capitalize();

        var setterName='set'+property.capitalize();

        if(this[setterName]==undefined){

            if(Rokkstar.setterGetterCache[setterName]==undefined){

                Rokkstar.profiling.sgGeneration++;

                Rokkstar.setterGetterCache[setterName]=function(v){

                    this.set(property,v);

                };

            }



            this[setterName]=Rokkstar.setterGetterCache[setterName];

        }

        if(this[getterName]==undefined){

            if(Rokkstar.setterGetterCache[getterName]==undefined){

                Rokkstar.profiling.sgGeneration++;

                Rokkstar.setterGetterCache[getterName]=function(){

                    return this.get(property);

                };

            }



            this[getterName]=Rokkstar.setterGetterCache[getterName];

        }

    }

    

    

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

    this.set=function(property,value){

        var target;

        if(this.propertyRedirections.hasOwnProperty(property) && this.propertyRedirections[property]!=null){

            target=this.propertyRedirections[property];

            target.set(property,value);

        }else{

            target=this;

            target[property]=Rokkstar.parseAttribute(value,this._attributeTypes[property]);

            target.triggerEvent(property+'PropertyChanged')

        }

    }

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

    this.get=function(property){

        return this[property];

    }





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