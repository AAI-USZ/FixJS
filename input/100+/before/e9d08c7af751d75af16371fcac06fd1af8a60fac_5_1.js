function( prop,  value )
    {
        var ok = this.validateProperty( prop, value );
        if (!ok && (prop != 'color')) {
            //console.log( "invalid property in Material:" + prop + " : " + value );
            return;
        }

        // get the technique if the shader is instantiated
        var technique;
        var material = this._materialNode;
        if (material)  technique = material.shaderProgram[this.getTechniqueName()];

        if(prop === "gradient") {
            this.setGradientData(value);
        } else {
        switch (this.getPropertyType(prop))
        {
            case "angle":
            case "float":
                this._propValues[prop] = value;
                if (technique)  technique[prop].set( [value] );
                break;

            case "file":
                this._propValues[prop] = value.slice();
                if (technique)
                {
                    var glTex = new Texture( this.getWorld(),  value );
                    this._glTextures[prop] = glTex;
                    glTex.render();
                    var tex = glTex.getTexture();
                    if (tex)  technique[prop].set( tex );
                }
                break;

            case "color":
            case "vector2d":
            case "vector3d":
                this._propValues[prop] = value.slice();
                if (technique)  technique[prop].set( value );
                break;
        }
        }
    }