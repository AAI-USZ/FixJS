function (base) {

    var undef = base.undef;
    var enums = base.enums;
    var GLCore = base.GLCore;
        
    var vs = [
        "void main(void) {",
        "  vertexTexCoordOut = cubicvr_texCoord();",
        "  gl_Position =  matrixProjection * matrixModelView * cubicvr_transform();",
        "  #if !LIGHT_DEPTH_PASS  // not needed if shadowing ",
        "    vertexNormalOut = matrixNormal * cubicvr_normal();",
        "    cubicvr_lighting();",
        "  #endif // !LIGHT_DEPTH_PASS ",
        "}"].join("\n");

    var dummyTex;
    
    var fs = [
        "uniform sampler2D spatImage;",
        "uniform sampler2D spat0;",
        "uniform sampler2D spat1;",
        "uniform sampler2D spat2;",
        "uniform sampler2D spat3;",
        "uniform sampler2D spat4;",
        "uniform vec3 spatOffset;",
        "uniform float spatTexel;",
        "void main(void) ",
        "{  ",
            "vec2 texCoord = cubicvr_texCoord();",
            "vec2 spatTexCoord = texCoord*30.0;",
            "vec4 color = texture2D(spat0,spatTexCoord);",

            "vec2 spatSourceCoord = vec2(texCoord.x*spatOffset.x,texCoord.y*spatOffset.y);",
            "if (spatSourceCoord.s<=spatTexel/2.0) {",
            "   spatSourceCoord.s=spatTexel/2.0;",
            "}",
            "if (spatSourceCoord.s>=1.0-spatTexel/2.0) {",
            "   spatSourceCoord.s=1.0-spatTexel/2.0;",
            "}",
            "if (spatSourceCoord.t<=spatTexel/2.0) {",
            "   spatSourceCoord.t=spatTexel/2.0;",
            "}",
            "if (spatSourceCoord.t>=1.0-spatTexel/2.0) {",
            "   spatSourceCoord.t=1.0-spatTexel/2.0;",
            "}",

            "vec4 spatSource = texture2D(spatImage,spatSourceCoord);",

            "color = mix(color,texture2D(spat1,spatTexCoord),spatSource.r);",
            "color = mix(color,texture2D(spat2,spatTexCoord),spatSource.g);",
            "color = mix(color,texture2D(spat3,spatTexCoord),spatSource.b);",
            "color = mix(color,texture2D(spat4,spatTexCoord),spatSource.a);",

            "vec3 normal = cubicvr_normal(texCoord);",
            "color = cubicvr_environment(color,normal,texCoord);",
            "color = cubicvr_lighting(color,normal,texCoord);",
            "gl_FragColor = clamp(color,0.0,1.0);",
        "}"].join("\n");

    // SpatMaterial extends Material
    var SpatMaterial = base.extendClassGeneral(base.Material, function() {
        var opt = arguments[0]||{};
        
        if (!dummyTex) {
            dummyTex = new base.Texture();
        }

        this.spats = opt.spats||[dummyTex,dummyTex,dummyTex,dummyTex,dummyTex];
        this.sourceTex = opt.sourceTexture||dummyTex; 
        this.spatResolution = opt.spatResolution||256;
        this.spatTexel = (1.0/this.spatResolution);
                
        var spats = this.spats;
        var sourceTexture = this.sourceTex;
        
        for (var i in spats) {
            var tex = spats[i];
            if (typeof(tex) === "string") {
              spats[i] = (base.Textures_ref[tex] !== undef) ? base.Textures_obj[base.Textures_ref[tex]] : (new base.Texture(tex));
            }
        }
        
        this.spatOffset = opt.spatOffset||[1,1,1];
        
        var context = this;
        
        this.spatShader = new base.CustomShader({
            vertex: vs,
            fragment: fs,
            init: function(shader) {    
                
            }, 
            update: function(context) { return function(shader,opt) {
                var material = opt.material;
                var texIndex = opt.textureIndex;
                
                shader.spatImage.set(texIndex++,context.sourceTex);
                shader.spatOffset.set(context.spatOffset);
                shader.spatTexel.set(context.spatTexel);

                if (spats[0]) shader.spat0.set(texIndex++,spats[0]);
                if (spats[1]) shader.spat1.set(texIndex++,spats[1]);
                if (spats[2]) shader.spat2.set(texIndex++,spats[2]);
                if (spats[3]) shader.spat3.set(texIndex++,spats[3]);
                if (spats[4]) shader.spat4.set(texIndex++,spats[4]);
            }; }(this)
        });
        
        opt.shader = this.spatShader;
        
        base.Material.apply(this,[opt]);
                
    },{ // subclass functions
        setSpats: function(spats) {
            this.spats = spats;
        },
        getSpats: function() {
            return this.spats;
        },
        setSource: function(sourceTex) {
            this.sourceTexture = sourceTex;
        }
    });

    var exports = {
        SpatMaterial: SpatMaterial
    };

    return exports;
}