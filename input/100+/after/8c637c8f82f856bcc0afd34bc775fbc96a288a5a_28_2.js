function(){



    /**

     * Returns current skin class

     * @description

     * Returns current skin class name as string.

     * @function

     * @returns {String}

     * @name core.SkinnableComponent#getSkinClass

     */

    /**

     * Set skin class

     * @description

     * Set skin class represented by string.

     * @name core.SkinnableComponent#setSkinClass

     * @function

     * @param {String} Skin class name represented by string

     */





    /**

     * Skin part definitions

     * @type {Array}

     */

    this.definedSkinParts=[];



    /**

     * Holds skin part information

     * @private

     * @type {Object}

     */

    this.skinParts={};



    /**

     * Returns skin part

     * @param {String} name Skin part name

     * @throws "Skin part is not declared."

     * @return {*}

     */

    this.getSkinPart=function(name){

        if(this.skinParts[name]===undefined){

            throw new core.exceptions.SkinException("Skin part is not declared ("+name+").");

        }

        return this.skinParts[name];

    }



    /**

     * Tests skin part is available in the current skin.

     * @description

     * Returns true if skin part is present. Throws an exception if skin part is not declared.

     * @param {String} name Skin part name

     * @throws "Skin part is not declared."

     * @return {*}

     */

    this.hasSkinPart=function(name){

        if(this.skinParts[name]===undefined) throw new core.exceptions.SkinException("Skin part is not declared ("+name+").");

        return this.skinParts[name]!=null;

    }





    /**

     * Declares a new skin part

     * @description

     * This method declare a new skin part for this object. Needs to be called during initialization process.

     * @param {String} name Skin part name

     * @param {Boolean} required Is the skin part required

     * @param {String} className Skin part class name

     * @throws "Name is already in use."

     */

    this.declareSkinPart=function(name,required,className){

        if(this.skinParts[name]!=undefined) throw new core.exceptions.SkinException("Name ("+name+") is already in use.");

        this.skinParts[name]=null;

        this.definedSkinParts.push(

            new core.helpers.SkinPartDefinition(name,required,className)

        );

    }



    /**

     * Current skin instance

     * @private

     * @type {core.Skin}

     */

    this.skin=null;



    /**

     * Returns current skin instance

     * @return {core.Skin}

     */

    this.getSkin=function(){

        return this.skin;

    }



    /**

     * Change skin dock

     * @param {core.Event} event

     * @private

     */

    this._changeSkin=function(){

        if(this.skin!=null){

            this.detachSkin();

            this.skin.hostComponent=null;

            //Remove skin parts

            for(var i in this.definedSkinParts){

                if(this.skinParts[this.definedSkinParts[i].name]!=null){

                    this.partRemoved(this.definedSkinParts[i].name,this.skinParts[this.definedSkinParts[i].name]);

                    this.skinParts[this.definedSkinParts[i].name]=null;

                }

            }

            this.removeSkin(this.skin);

        }

        this.skin=this.createComponent(this.getSkinClass());

        this.addSkin(this.skin);

        for(var i in this.definedSkinParts){

            var def=this.definedSkinParts[i];

            if(this.skin[def.name]!=null){

                this.skinParts[def.name]=this.skin[def.name];

                this.partAdded(def.name,this.skinParts[def.name]);

            }else if(def.required){

                throw new core.exceptions.SkinException("Skin does not contain required skin part. ("+def.name+").");

            }

        }

        this.skin.hostComponent=this;



        this.attachSkin();

        this.invalidateSkinState();

    }



    this.getWidth=function(){

        if(this.width==undefined){

            if(this.skin!=null) return this.skin.getWidth();

            else return "0px";

        }else{

            return this.width;

        }

    }



    this.getHeight=function(){

        if(this.height==undefined){

            if(this.skin!=null) return this.skin.getHeight();

            else return "0px";

        }else{

            return this.height;

        }

    }







    this.removeSkin=function(skin){

        $(skin.domElement).remove();

    }



    this.addSkin=function(skin){

        $(skin.domElement).appendTo(this.domElement);

        $(skin.domElement).css({position:'absolute',top:'0px',bottom:'0px',left:'0px',right:'0px'});

        $(skin.domElement).addClass('rokkstar_skin');

    }



    this.partAdded=function(partName,instance){



    }



    this.partRemoved=function(partName,instance){



    }



    this.attachSkin=function(){



    }



    this.detachSkin=function(){



    }



    this.skinnableMeasure=function(){

        if(this.skin!=null && this.skin!=undefined){

            this.skin.measure();

            this.measuredWidth=this.skin.measuredWidth;

            this.measuredHeight=this.skin.measuredHeight;

        }

    }



    this.invalidateSize=function(){

        this.callSuper('invalidateSize');

        if(this.skin!=null && this.skin!=undefined) this.skin.invalidateSize();

    }



    this.skinnableTack=function(){

        if(this.skin!=null && this.skin!=undefined) this.skin.tack();

    }









    this.skinnableInit=function(){

        this.createEventListener('skinClassPropertyChanged',this.invalidateSkin,this);

        if(this.getSkinClass()!=undefined && this.getSkinClass()!=null){

            this.invalidateSkin();

        }

    }



    this.skinnableCommitProperties=function(){

        if(this.skinInvalid){

            this.skinInvalid=true;

            this._changeSkin();

        }

    }



    this.skinStateInvalid=false;



    this.skinInvalid=false;



    this.invalidateSkin=function(){

        this.skinInvalid=true;

        this.invalidateProperties();

    }



    this.getSkinState=function(){

        return 'normal';

    }



    this.invalidateSkinState=function(){

        if(this.skin!=undefined){

            this.skin.setCurrentState(this.getSkinState());

        }

    }



    this.createFocusRectangle=function(){

        if(this.skin!=null && this.skin!=undefined){

            $(this.skin.domElement).addClass('skin_focus');

        }



    }



    this.removeFocusRectangle=function(){

        if(this.skin!=null && this.skin!=undefined){

            $(this.skin.domElement).removeClass('skin_focus');

        }

    }

}