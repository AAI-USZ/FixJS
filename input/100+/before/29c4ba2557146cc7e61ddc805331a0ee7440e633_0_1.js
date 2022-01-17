function () {



    function Context(ctx3d, canvas, name) {

        this.ctx3d = ctx3d;

        this.canvas = canvas;

        this.name = name;

        this.cached_shader_programs = {};

        this.cached_shaders = {};

		this.IG_PositionBuffer = null;

		//this.imageLoadManager = new x3dom.ImageLoadManager();

    }



    Context.prototype.getName = function() {

        return this.name;

    };



    function setupContext(canvas) {

        // TODO: add experimental-webgl, webgl test    

        // x3dom.debug.logInfo("setupContext: canvas=" + canvas);

        var validContextNames = ['moz-webgl', 'webkit-3d', 'experimental-webgl', 'webgl'];

        var ctx = null;

        // Context creation params (not yet working)

        // https://cvs.khronos.org/svn/repos/registry/trunk/public/webgl/doc/spec/WebGL-spec.html#5.2.1

        var ctxAttribs = { alpha: true,

                           depth: true,

                           stencil: true,

                           antialias: true,

                           premultipliedAlpha: false 

                         };

        // FIXME; do we need to handle context lost events?

        // https://cvs.khronos.org/svn/repos/registry/trunk/public/webgl/doc/spec/WebGL-spec.html#5.16.1

        for (var i=0; i<validContextNames.length; i++) {

            try {

                ctx = canvas.getContext(validContextNames[i], ctxAttribs);

                if (ctx) {

                    var newCtx = new Context(ctx, canvas, 'webgl');



                    try {

						if (ctx.getString) {

							x3dom.debug.logInfo("\nVendor: " + ctx.getString(ctx.VENDOR) + ", " + 

												"Renderer: " + ctx.getString(ctx.RENDERER) + ", " + 

												"Version: " + ctx.getString(ctx.VERSION) + ", " + 

												"ShadingLangV.: " + ctx.getString(ctx.SHADING_LANGUAGE_VERSION) + ", " + 

												"\nExtensions: " + ctx.getString(ctx.EXTENSIONS));

						}

						else {

							x3dom.debug.logInfo("\nVendor: " + ctx.getParameter(ctx.VENDOR) + ", " + 

												"Renderer: " + ctx.getParameter(ctx.RENDERER) + ", " + 

												"Version: " + ctx.getParameter(ctx.VERSION) + ", " + 

												"ShadingLangV.: " + ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION)

												+ ", " + "\nExtensions: " + ctx.getSupportedExtensions());

												

							//Save CAPS

							x3dom.caps.VENDOR 							= ctx.getParameter(ctx.VENDOR);

							x3dom.caps.VERSION							= ctx.getParameter(ctx.VERSION);

							x3dom.caps.RENDERER							= ctx.getParameter(ctx.RENDERER);

							x3dom.caps.SHADING_LANGUAGE_VERSION 		= ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION);

							x3dom.caps.RED_BITS 						= ctx.getParameter(ctx.RED_BITS);

							x3dom.caps.GREEN_BITS 						= ctx.getParameter(ctx.GREEN_BITS);

							x3dom.caps.BLUE_BITS 						= ctx.getParameter(ctx.BLUE_BITS);

							x3dom.caps.ALPHA_BITS 						= ctx.getParameter(ctx.ALPHA_BITS);

							x3dom.caps.DEPTH_BITS 						= ctx.getParameter(ctx.DEPTH_BITS);

							x3dom.caps.MAX_VERTEX_ATTRIBS				= ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);

							x3dom.caps.MAX_VERTEX_TEXTURE_IMAGE_UNITS 	= ctx.getParameter(ctx.MAX_VERTEX_TEXTURE_IMAGE_UNITS);

							x3dom.caps.MAX_VARYING_VECTORS				= ctx.getParameter(ctx.MAX_VARYING_VECTORS);

							x3dom.caps.MAX_VERTEX_UNIFORM_VECTORS		= ctx.getParameter(ctx.MAX_VERTEX_UNIFORM_VECTORS);

							x3dom.caps.MAX_COMBINED_TEXTURE_IMAGE_UNITS	= ctx.getParameter(ctx.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

							x3dom.caps.MAX_TEXTURE_SIZE					= ctx.getParameter(ctx.MAX_TEXTURE_SIZE);

							x3dom.caps.MAX_CUBE_MAP_TEXTURE_SIZE		= ctx.getParameter(ctx.MAX_CUBE_MAP_TEXTURE_SIZE);

							x3dom.caps.NUM_COMPRESSED_TEXTURE_FORMATS	= ctx.getParameter(ctx.NUM_COMPRESSED_TEXTURE_FORMATS);

							x3dom.caps.MAX_RENDERBUFFER_SIZE			= ctx.getParameter(ctx.MAX_RENDERBUFFER_SIZE);

							x3dom.caps.MAX_VIEWPORT_DIMS				= ctx.getParameter(ctx.MAX_VIEWPORT_DIMS);

							x3dom.caps.ALIASED_LINE_WIDTH_RANGE			= ctx.getParameter(ctx.ALIASED_LINE_WIDTH_RANGE);

							x3dom.caps.ALIASED_POINT_SIZE_RANGE			= ctx.getParameter(ctx.ALIASED_POINT_SIZE_RANGE);

							x3dom.caps.EXTENSIONS						= ctx.getSupportedExtensions();

																							

							x3dom.caps.MOBILE							= (function(a){if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){return true}else{return false}})(navigator.userAgent||navigator.vendor||window.opera);

                            // explicitly disable for iPad and the like

                            if (x3dom.caps.RENDERER.indexOf("PowerVR") >= 0 ||

                                navigator.appVersion.indexOf("Mobile") > -1 ||

                                // coarse guess to find out old SM 2.0 hardware (e.g. Intel):

                                x3dom.caps.MAX_VARYING_VECTORS <= 8 ||

                                x3dom.caps.MAX_VERTEX_TEXTURE_IMAGE_UNITS < 2)   

                            {

                                x3dom.caps.MOBILE = true;

                            }

                            if (x3dom.caps.MOBILE) {

								x3dom.debug.logWarning("Detected mobile graphics card! Using low quality shaders without ImageGeometry support!");

							}

						}

                    }

                    catch (ex) {

                        x3dom.debug.logWarning(

                                "Your browser probably supports an older WebGL version. " +

                                "Please try the old mobile runtime instead:\n" +

                                "http://www.x3dom.org/x3dom/src_mobile/x3dom.js");

                        newCtx = null;

                    }

                    

                    return newCtx;

                }

            }

            catch (e) {}

        }

        return null;

    }



    var g_shaders = {};

    

    g_shaders['vs-x3d-bg-texture'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "varying vec2 fragTexCoord;" +

        "" +

        "void main(void) {" +

        "    vec2 texCoord = (position.xy + 1.0) * 0.5;" +

        "    fragTexCoord = texCoord;" +

		"    gl_Position = vec4(position.xy, 0.0, 1.0);" +

        "}"

        };

        

    g_shaders['vs-x3d-bg-texture-bgnd'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "attribute vec2 texcoord;" +

        "uniform mat4 modelViewProjectionMatrix;" +

        "varying vec2 fragTexCoord;" +

        "" +

        "void main(void) {" +

        "    fragTexCoord = texcoord;" +

        "    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);" +

        "}"

        };

    

    g_shaders['fs-x3d-bg-texture'] = { type: "fragment", data:

        "#ifdef GL_ES             \n" +

        "  precision highp float; \n" +

        "#endif                   \n" +

        "\n" +

        "uniform sampler2D tex;\n" +

        "varying vec2 fragTexCoord;\n" +

        "\n" +

        "void main(void) {\n" +

        "    gl_FragColor = texture2D(tex, fragTexCoord);\n" +

        "}"

        };

        

    g_shaders['vs-x3d-bg-textureCube'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "uniform mat4 modelViewProjectionMatrix;" +

        "varying vec3 fragNormal;" +

        "" +

        "void main(void) {" +

        "    fragNormal = normalize(position);" +

        "    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);" +

        "}"

        };

        

    g_shaders['fs-x3d-bg-textureCube'] = { type: "fragment", data:

        "#ifdef GL_ES             \n" +

        "  precision highp float; \n" +

        "#endif                   \n" +

        "\n" +

        "uniform samplerCube tex;" +

        "varying vec3 fragNormal;" +

        " " +

        "float magn(float val) {" +

        "    return ((val >= 0.0) ? val : -1.0 * val);" +

        "}" +

        " " +

        "void main(void) {" +

        "    vec3 normal = -reflect(normalize(fragNormal), vec3(0.0,0.0,1.0));" +

        "    if (magn(normal.y) >= magn(normal.x) && magn(normal.y) >= magn(normal.z))" +

        "        normal.xz = -normal.xz;" +

        "    gl_FragColor = textureCube(tex, normal);" +

        "}"

        };

    

    g_shaders['vs-x3d-vertexcolorUnlit'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "attribute vec3 color;" +

        "varying vec3 fragColor;" +

        "uniform mat4 modelViewProjectionMatrix;" +

        "" +

        "void main(void) {" +

        "    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);" +

        "    gl_PointSize = 2.0;" + 

        "    fragColor = color;" +

        "}"

        };

    

    g_shaders['fs-x3d-vertexcolorUnlit'] = { type: "fragment", data:

        "#ifdef GL_ES             \n" +

        "  precision highp float; \n" +

        "#endif                   \n" +

        "\n" +

        "uniform vec3 diffuseColor;" +

        "uniform float alpha;" +

        "uniform float lightOn;" +

        "varying vec3 fragColor;" +

        "" +

        "void main(void) {" +

        "    gl_FragColor = vec4(fragColor, alpha);" +

        "}"

        };



    g_shaders['vs-x3d-default'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "uniform mat4 modelViewProjectionMatrix;" +

        "void main(void) {" +

        "    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);" +

        "}"

        };



    g_shaders['fs-x3d-default'] = { type: "fragment", data:

        "#ifdef GL_ES             \n" +

        "  precision highp float; \n" +

        "#endif                   \n" +

        "\n" +

        "struct Material {" +

        "   vec3  diffuseColor;" +

        "   vec3  specularColor;" +

        "   vec3  emissiveColor;" +

        "   float shininess;" +

        "   float transparency;" +

        "   float ambientIntensity;" +

        "};" +

        "uniform Material material;" +

        "void main(void) {" +

        "    gl_FragColor = vec4(material.emissiveColor, 1.0);" +

        "}"

        };

        

    // TEST SHADER FOR PICKING TEXTURE COORDINATES INSTEAD OF COLORS

    g_shaders['vs-x3d-texcoordUnlit'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "attribute vec2 texcoord;" +

        "varying vec3 fragColor;" +

        "uniform mat4 modelViewProjectionMatrix;" +

        "" +

        "void main(void) {" +

        "    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);" +

        "    fragColor = vec3(abs(texcoord.x), abs(texcoord.y), 0.0);" +

        "}"

        };

    

    g_shaders['fs-x3d-texcoordUnlit'] = { type: "fragment", data:

        "#ifdef GL_ES             \n" +

        "  precision highp float; \n" +

        "#endif                   \n" +

        "\n" +

        "uniform float alpha;" +

        "varying vec3 fragColor;" +

        "" +

        "void main(void) {" +

        "    gl_FragColor = vec4(fragColor, alpha);" +

        "}"

        };

    

    g_shaders['vs-x3d-pick'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "uniform vec3 bgCenter;" +

		"uniform vec3 bgSize;" +

		"uniform float bgPrecisionMax;" +

        "uniform mat4 modelMatrix;" +

        "uniform mat4 modelViewProjectionMatrix;" +

        "uniform vec3 wcMin;" +

        "uniform vec3 wcMax;" +

        "varying vec3 worldCoord;" +

        "void main(void) {" +

        "    vec3 pos = bgCenter + bgSize * position / bgPrecisionMax;" +

        "    vec3 dia = wcMax - wcMin;" +

        "    worldCoord = (modelMatrix * vec4(pos, 1.0)).xyz;" +

        "    worldCoord = (worldCoord - wcMin) / dia;" +

        "    gl_Position = modelViewProjectionMatrix * vec4(pos, 1.0);" +

        "}"

        };

		

	g_shaders['vs-x3d-pickIG'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "uniform mat4 modelMatrix;" +

        "uniform mat4 modelViewProjectionMatrix;" +

        "uniform vec3 wcMin;" +

        "uniform vec3 wcMax;" +

        "varying vec3 worldCoord;" +

		"uniform float indexed;" +

		"uniform float imageGeometry;" +

		"uniform vec3 IG_bboxMin;" +

		"uniform vec3 IG_bboxMax;" +

		"uniform float IG_coordTextureWidth;" +

		"uniform float IG_coordTextureHeight;" +

		"uniform float IG_indexTextureWidth;" +

		"uniform float IG_indexTextureHeight;" +

		"uniform sampler2D IG_indexTexture;" +

		"uniform sampler2D IG_coordinateTexture;" +

		"uniform float IG_implicitMeshSize;" +

		

        "void main(void) {" +

		"	 if(imageGeometry == 1.0) { " +

		"		vec2 IG_texCoord;" +

		"		if(indexed == 1.0) {" +

		"			vec2 halfPixel = vec2(0.5/IG_indexTextureWidth,0.5/IG_indexTextureHeight);" +

		"			IG_texCoord = vec2(position.x*(IG_implicitMeshSize/IG_indexTextureWidth), position.y*(IG_implicitMeshSize/IG_indexTextureHeight)) + halfPixel;" +

		"			vec2 IG_index = texture2D( IG_indexTexture, IG_texCoord ).rg;" + 

		"			IG_texCoord = IG_index * 0.996108948;" +

		"		} else { " +

		"			vec2 halfPixel = vec2(0.5/IG_coordTextureWidth, 0.5/IG_coordTextureHeight);" +

		"			IG_texCoord = vec2(position.x*(IG_implicitMeshSize/IG_coordTextureWidth), position.y*(IG_implicitMeshSize/IG_coordTextureHeight)) + halfPixel;" +

		"		}" +

		"		vec3 pos = texture2D( IG_coordinateTexture, IG_texCoord ).rgb;" +

		"	 	pos = pos * (IG_bboxMax - IG_bboxMin) + IG_bboxMin;" +

        "    	worldCoord = (modelMatrix * vec4(pos, 1.0)).xyz;" +

		"		gl_Position = modelViewProjectionMatrix * vec4(pos, 1.0);" +		

		"	 } else { " +

        "    	worldCoord = (modelMatrix * vec4(position, 1.0)).xyz;" +

		"		gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);" +

		"	 }" +

        "    vec3 dia = wcMax - wcMin;" +

        "    worldCoord = worldCoord - wcMin;" +

        "    worldCoord.x /= dia.x;" +

        "    worldCoord.y /= dia.y;" +

        "    worldCoord.z /= dia.z;" +

        "}"

        };



    g_shaders['fs-x3d-pick'] = { type: "fragment", data:

        "#ifdef GL_ES             \n" +

        "  precision highp float; \n" +

        "#endif                   \n" +

        "\n" +

        "uniform float alpha;" +

        "varying vec3 worldCoord;" +

        "void main(void) {" +

        "    gl_FragColor = vec4(worldCoord, alpha);" +

        "}"

        };



    g_shaders['vs-x3d-shadow'] = { type: "vertex", data:

        "attribute vec3 position;" +

        "uniform mat4 modelViewProjectionMatrix;" +

        "varying vec4 projCoord;" +

        "void main(void) {" +

        "   projCoord = modelViewProjectionMatrix * vec4(position, 1.0);" +

        "   gl_Position = projCoord;" +

        "}"

        };



    g_shaders['fs-x3d-shadow'] = { type: "fragment", data:

        "#ifdef GL_ES             \n" +

        "  precision highp float; \n" +

        "#endif                   \n" +

        "\n" +

        "varying vec4 projCoord;" +

        "void main(void) {" +

        "    vec3 proj = (projCoord.xyz / projCoord.w);" +

        //   http://www.gamedev.net/community/forums/topic.asp?topic_id=486847

        "    vec4 outVal = vec4(0.0);" +

        "    float toFixed = 255.0 / 256.0;" +

        "    outVal.r = fract(proj.z * toFixed);" +

        "    outVal.g = fract(proj.z * toFixed * 255.0);" +

        "    outVal.b = fract(proj.z * toFixed * 255.0 * 255.0);" +

        "    outVal.a = fract(proj.z * toFixed * 255.0 * 255.0 * 255.0);" +

        "    gl_FragColor = outVal;" +

        "}"

        };

        

    function getDefaultShaderProgram(gl, suffix) 

    {

        var prog = gl.createProgram();

        var vs = gl.createShader(gl.VERTEX_SHADER);

        var fs = gl.createShader(gl.FRAGMENT_SHADER);

        

        gl.shaderSource(vs, g_shaders['vs-x3d-'+suffix].data);

        gl.shaderSource(fs, g_shaders['fs-x3d-'+suffix].data);



        gl.compileShader(vs);

		

		if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)){

			x3dom.debug.logError("VertexShader " + gl.getShaderInfoLog(vs));	      

		}

		

        gl.compileShader(fs);

		

		if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)){

			x3dom.debug.logError("FragmentShader " + gl.getShaderInfoLog(fs));	          

		}

		

        gl.attachShader(prog, vs);

        gl.attachShader(prog, fs);



        gl.linkProgram(prog);

        

        var msg = gl.getProgramInfoLog(prog);

        if (msg) {

            if (msg.indexOf("warning") >= 0)

                x3dom.debug.logWarning(msg);

            else

                x3dom.debug.logError(msg);

        }

        

        return wrapShaderProgram(gl, prog);

    }

    

    function scaleImage(image)

    {

        if (!isPowerOfTwo(image.width) || !isPowerOfTwo(image.height)) {

            var canvas = document.createElement("canvas");

            canvas.width = nextHighestPowerOfTwo(image.width);

            canvas.height = nextHighestPowerOfTwo(image.height);

            var ctx = canvas.getContext("2d");

            ctx.drawImage(image,

                          0, 0, image.width, image.height,

                          0, 0, canvas.width, canvas.height);

            image = canvas;

        }

        return image;

    }

    

    function isPowerOfTwo(x) 

    {

        return ((x & (x - 1)) === 0);

    }

    

    function nextHighestPowerOfTwo(x) 

    {

        --x;

        for (var i = 1; i < 32; i <<= 1) {

            x = x | x >> i;

        }

        return (x + 1);

    }

    

    function nextBestPowerOfTwo(x)

    {

        var log2x = Math.log(x) / Math.log(2);

        return Math.pow(2, Math.round(log2x));

    }



    function getArrayBufferView(type, buffer)

    {

        var array = null;

        

        switch(type)

        {

            case "Int8":

                array = new Int8Array(buffer);

                break;

            case "Uint8":

                array = new Uint8Array(buffer);

                break;

            case "Int16":

                array = new Int16Array(buffer);

                break;

            case "Uint16":

                array = new Uint16Array(buffer);

                break;

            case "Int32":

                array = new Int32Array(buffer);

                break;

            case "Uint32":

                array = new Uint32Array(buffer);

                break;

            case "Float32":

                array = new Float32Array(buffer);

                break;

            case "Float64":

                array = new Float64Array(buffer);

                break;

            default:

                x3dom.debug.logError("Can't create typed array view of type " + type + ", trying Float32...");

                array = new Float32Array(buffer);

                break;

        }



        return array;

    }



    function getVertexAttribType(type, gl)

    {

        var dataType = gl.NONE;



        switch(type)

        {

            case "Int8":

                dataType = gl.BYTE;

                break;

            case "Uint8":

                dataType = gl.UNSIGNED_BYTE;

                break;

            case "Int16":

                dataType = gl.SHORT;

                break;

            case "Uint16":

                dataType = gl.UNSIGNED_SHORT;

                break;

            case "Int32":

                dataType = gl.INT;

                break;

            case "Uint32":

                dataType = gl.UNSIGNED_INT;

                break;

            case "Float32":

                dataType = gl.FLOAT;

                break;

            case "Float64":

            default:

                x3dom.debug.logError("Can't find GL data type for " + type + ", getting FLOAT...");

                dataType = gl.FLOAT;

                break;

        }



        return dataType;

    }



    function getDataTypeSize(type)  // in Byte

    {

        switch(type)

        {

            case "Int8":

            case "Uint8":

                return 1;

            case "Int16":

            case "Uint16":

                return 2;

            case "Int32":

            case "Uint32":

            case "Float32":

                return 4;

            case "Float64":

            default:

                return 8;

        }

    }

    

//----------------------------------------------------------------------------

/*! get shader program

 */

//----------------------------------------------------------------------------

    Context.prototype.getShaderProgram = function(gl, ids)

    {

        var shader = [];

        var prog = null;

		

		var debug = [];

        

        if( this.cached_shader_programs[ids[0]+ids[1]] ) {

            prog = this.cached_shader_programs[ids[0]+ids[1]];

            //x3dom.debug.logInfo("Using cached shader program");

        } 

        else 

        {

            for (var id = 0; id < 2; id++) 

            {

                if (!g_shaders[ids[id]]) {

                    x3dom.debug.logError('Cannot find shader ' + ids[id]);

                    return;

                }

                // Try to cache shaders because this might be expensive...

                if( this.cached_shaders[ids[id]] ) {

                    shader[id] = this.cached_shaders[ids[id]];

                    //x3dom.debug.logInfo("Using cached shader");

                } else {

                    if (g_shaders[ids[id]].type == 'vertex') {

                        shader[id] = gl.createShader(gl.VERTEX_SHADER);

                    }

                    else if (g_shaders[ids[id]].type == 'fragment') {

                        shader[id] = gl.createShader(gl.FRAGMENT_SHADER);

                    }

                    else {

                        x3dom.debug.logError('Invalid shader type ' + g_shaders[id].type);

                        return;

                    }

                    gl.shaderSource(shader[id], g_shaders[ids[id]].data);

					//debug[id] = g_shaders[ids[id]].data;

                    gl.compileShader(shader[id]);

					if(!gl.getShaderParameter(shader[id], gl.COMPILE_STATUS)){

						if(id == 0) {

							x3dom.debug.logError("VertexShader " + gl.getShaderInfoLog(shader[id]));

						} else {

							x3dom.debug.logError("FragmentShader " + gl.getShaderInfoLog(shader[id]));

						}

					}

                    this.cached_shaders[ids[id]] = shader[id];

                }

            }

            

            prog = gl.createProgram();

            gl.attachShader(prog, shader[0]);

            gl.attachShader(prog, shader[1]);

            gl.linkProgram(prog);

            var msg = gl.getProgramInfoLog(prog);

                

            if (msg) {

                if (msg.indexOf("warning") >= 0)

                    x3dom.debug.logWarning(msg);

                else

                    x3dom.debug.logError(msg);

            }

            this.cached_shader_programs[ids[0]+ids[1]] = wrapShaderProgram(gl, prog);

            prog = this.cached_shader_programs[ids[0]+ids[1]];

        }

        

        return prog;

    };

    

    

    // Returns "shader" such that "shader.foo = [1,2,3]" magically sets the appropriate uniform

    function wrapShaderProgram(gl, sp) 

    {

        var shader = {};

        

        shader.bind = function () { 

            gl.useProgram(sp); 

        };

        

        var loc = null, obj = null;

        var i = 0;

        var glErr;

        

        var numUniforms = gl.getProgramParameter(sp, gl.ACTIVE_UNIFORMS);

        

        for (i=0; i < numUniforms; ++i) {

            try {

                obj = gl.getActiveUniform(sp, i);

                //x3dom.debug.logInfo("uniform #" + i + " obj=" + obj.name );

            }

            catch (eu) {}



            glErr = gl.getError();

            

            if (glErr !== 0) {

                //x3dom.debug.logInfo("GetProgramiv(ACTIVE_UNIFORMS) not implemented, loop until error");

                x3dom.debug.logError("GL-Error (on searching uniforms): " + glErr);

                //break;

            }



            loc = gl.getUniformLocation(sp, obj.name);

			

			var objName = obj.name;

			if(obj.name.lastIndexOf("[0]") == obj.name.length-3){

				//x3dom.debug.logInfo(obj.name);

				objName = obj.name.substr(0, obj.name.length-3);

			}

			

			

            switch (obj.type) {

                case gl.SAMPLER_2D:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniform1i(loc, val); }; })(loc));

                    break;

                case gl.SAMPLER_CUBE:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniform1i(loc, val); }; })(loc));

                    break;

                case gl.BOOL:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniform1i(loc, val); }; })(loc));

                    break;

                case gl.FLOAT:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniform1f(loc, val); }; })(loc));

                    break;

                case gl.FLOAT_VEC2:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniform2f(loc, val[0], val[1]); }; })(loc));           

                    break;

                case gl.FLOAT_VEC3:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniform3f(loc, val[0], val[1], val[2]); }; })(loc));

                    break;

                case gl.FLOAT_VEC4:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniform4f(loc, val[0], val[1], val[2], val[3]); }; })(loc));

                    break;

                case gl.FLOAT_MAT2:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniformMatrix2fv(loc, false, new Float32Array(val)); }; })(loc));

                    break;

                case gl.FLOAT_MAT3:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniformMatrix3fv(loc, false, new Float32Array(val)); }; })(loc));

                    break;

                case gl.FLOAT_MAT4:

                    shader.__defineSetter__(objName, 

                        (function (loc) { return function (val) { gl.uniformMatrix4fv(loc, false, new Float32Array(val)); }; })(loc));

                    break;

                case gl.INT:

                    shader.__defineSetter__(objName,

                        (function (loc) { return function (val) { gl.uniform1i(loc, val); }; }) (loc));

                    break;

                default:

                    x3dom.debug.logWarning('GLSL program variable '+obj.name+' has unknown type '+obj.type);

            }

        }

        

        var numAttribs = gl.getProgramParameter(sp, gl.ACTIVE_ATTRIBUTES);

        

        for (i=0; i < numAttribs; ++i) {

            try {

                obj = gl.getActiveAttrib(sp, i);

                //x3dom.debug.logInfo("attribute #" + i + " obj=" + obj.name );

            }

            catch (ea) {}

            

            glErr = gl.getError();

            

            if (glErr !== 0) {

                //x3dom.debug.logInfo("GetProgramiv(ACTIVE_ATTRIBUTES) not implemented, loop until error");

                x3dom.debug.logError("GL-Error (on searching attributes): " + glErr);

                //break;    

            }



            loc = gl.getAttribLocation(sp, obj.name);

            shader[obj.name] = loc;

        }

        

        return shader;

    }

    

    //Checks for lighting and shadowing

    //return 0 if no Lights, 1 if Lights, 2 if Lights + Shadows

    function useLightingFunc(viewarea)

    {

        var result = [0, false];

        var slights = viewarea.getLights(); 

        var numLights = slights.length;

        if(numLights > 0){

            if(numLights > 8){

                result[0] = 8;

            }else{

                result[0] = numLights;

            }

        }

        

        //Check for Shadows

        for(var i=0; i<numLights; i++){

            if(slights[i]._vf.shadowIntensity > 0.0){

                result[1] = true;

            }

        }

                

        var nav = viewarea._scene.getNavigationInfo();

        if(nav._vf.headlight) {

            result[0] += 1;

        }

            

        return result;

    }

	

//----------------------------------------------------------------------------

/*! gen vs mobile

 */

//----------------------------------------------------------------------------

	Context.prototype.generateVSMobile = function (viewarea, shape)

    {

		var texture				= (shape._cf.appearance.node._cf.texture.node || x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text)) ? 1 : 0;

		var textureTransform 	= (shape._cf.appearance.node._cf.textureTransform.node !== null) ? 1 : 0;

		var sphereMapping		= (shape._cf.geometry.node._cf.texCoord !== undefined && shape._cf.geometry.node._cf.texCoord.node !== null && shape._cf.geometry.node._cf.texCoord.node._vf.mode) ? (shape._cf.geometry.node._cf.texCoord.node._vf.mode.toLowerCase() == "sphere") ? 1 : 0 : 0;

		var cubeMap				= (shape._cf.appearance.node._cf.texture.node) ? x3dom.isa(shape._cf.appearance.node._cf.texture.node, x3dom.nodeTypes.X3DEnvironmentTextureNode) ? 1 : 0 : 0;

		var blending			= (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text) || cubeMap || (shape._cf.appearance.node._cf.texture.node && (shape._cf.appearance.node._cf.texture.node._vf.origChannelCount == 1 || shape._cf.appearance.node._cf.texture.node._vf.origChannelCount == 2))) ? 1 : 0;

		var vertexColor 		= (shape._cf.geometry.node._mesh._colors[0].length > 0 || shape._cf.geometry.node.getColorTexture() || (shape._cf.geometry.node._vf.color !== undefined && shape._cf.geometry.node._vf.color.length > 0)) ? shape._cf.geometry.node._mesh._numColComponents : 0;

		var lights				= (viewarea.getLights().length) + (viewarea._scene.getNavigationInfo()._vf.headlight);

		var solid				= (shape.isSolid()) ? 1 : 0;

		var fog					= (viewarea._scene.getFog()._vf.visibilityRange > 0) ? 1 : 0;

		var imageGeometry		= (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.ImageGeometry)) ? 1 : 0;

		var iG_Precision		= (imageGeometry) ? shape._cf.geometry.node.numCoordinateTextures() : 0;

		var iG_Indexed			= (imageGeometry && shape._cf.geometry.node.getIndexTexture() != null) ? 1.0 : 0.0;

		var requireBBox         = (shape._cf.geometry.node._vf.coordType !== undefined && shape._cf.geometry.node._vf.coordType != "Float32");

		var requireBBoxCol      = (shape._cf.geometry.node._vf.colorType !== undefined && shape._cf.geometry.node._vf.colorType != "Float32");

		var requireBBoxTex      = (shape._cf.geometry.node._vf.texCoordType !== undefined && shape._cf.geometry.node._vf.texCoordType != "Float32");

		

        var shaderIdentifier = "vs-x3d-mobil-" +  vertexColor + 

                                                  texture +

												  textureTransform +

												  sphereMapping +

												  blending +

												  cubeMap +

												  solid +

												  fog +

												  lights +

												  imageGeometry +

												  iG_Precision +

												  iG_Indexed + 

												  requireBBox + 

												  requireBBoxCol + 

												  requireBBoxTex;

		

		if(!g_shaders[shaderIdentifier]) {

		

			var shader = "";

            

            //Set Attributes +Uniforms + Varyings

            shader += "attribute vec3 position;\n";

            shader += "attribute vec3 normal;\n";

            shader += "uniform mat4 modelViewMatrix;\n";

            shader += "uniform mat4 normalMatrix;\n";

            shader += "uniform mat4 modelViewProjectionMatrix;\n";

			

            shader += "uniform vec3  diffuseColor;\n";

            shader += "uniform vec3  specularColor;\n";

            shader += "uniform vec3  emissiveColor;\n";

            shader += "uniform float shininess;\n";

            shader += "uniform float transparency;\n";

            shader += "uniform float ambientIntensity;\n";



			shader += "varying vec4 fragColor;\n";

			

			if(requireBBox) {

				shader += "uniform vec3 bgCenter;\n";

				shader += "uniform vec3 bgSize;\n";

				shader += "uniform float bgPrecisionMax;\n";

			}

			if(requireBBoxCol) {

			    shader += "uniform float bgPrecisionColMax;\n";

			}

			if(requireBBoxTex) {

			    shader += "uniform float bgPrecisionTexMax;\n";

			}

			

			if(imageGeometry) {

			    shader += "uniform vec3 IG_bboxMin;\n";

			    shader += "uniform vec3 IG_bboxMax;\n";

				shader += "uniform float IG_coordTextureWidth;";

				shader += "uniform float IG_coordTextureHeight;";

				shader += "uniform sampler2D IG_normalTexture;";

				shader += "uniform float IG_implicitMeshSize;";

				

				for( var i = 0; i < iG_Precision; i++ ) {

					shader += "uniform sampler2D IG_coordinateTexture" + i + ";";

				}

				

				if(iG_Indexed) {

					shader += "uniform sampler2D IG_indexTexture;";

					shader += "uniform float IG_indexTextureWidth;";

					shader += "uniform float IG_indexTextureHeight;";

				}

			}

			

			if(fog) {

				shader += "uniform vec3  fogColor;\n" +

						  "uniform float fogType;\n" +

						  "uniform float fogRange;\n" +

						  "float calcFog(in vec3 eye) {\n" +

						  "   float f0 = 0.0;\n" +      

						  "   if(fogType == 0.0) {\n" +

						  "       if(length(eye) < fogRange){\n" +

						  "           f0 = (fogRange-length(eye)) / fogRange;\n" +

						  "       }\n" +

						  "   }else{\n" +

						  "       if(length(eye) < fogRange){\n" +

						  "           f0 = exp(-length(eye) / (fogRange-length(eye) ) );\n" +

						  "       }\n" +

						  "   }\n" +

						  "   f0 = clamp(f0, 0.0, 1.0);\n" +

						  "   return f0;\n" +

						  "}";

			}

			

			if(lights) {

				for(var l=0; l<lights; l++) {

					shader += "uniform float Light"+l+"_On;\n";

					shader += "uniform float Light"+l+"_Type;\n";

					shader += "uniform vec3  Light"+l+"_Location;\n";

					shader += "uniform vec3  Light"+l+"_Direction;\n";

					shader += "uniform vec3  Light"+l+"_Color;\n";

					shader += "uniform vec3  Light"+l+"_Attenuation;\n";

					shader += "uniform float Light"+l+"_Intensity;\n";

					shader += "uniform float Light"+l+"_AmbientIntensity;\n";

					shader += "uniform float Light"+l+"_BeamWidth;\n";

					shader += "uniform float Light"+l+"_CutOffAngle;\n";

					shader += "uniform float Light"+l+"_ShadowIntensity;\n";

				}

				shader += "void lighting(in float lType, in vec3 lLocation, in vec3 lDirection, in vec3 lColor, in vec3 lAttenuation," + 

						  " 			   in float lIntensity, in float lAmbientIntensity, in float lBeamWidth, in float lCutOffAngle," +

						  " 			   in vec3 N, in vec3 V, inout vec3 ambient, inout vec3 diffuse, inout vec3 specular) {" +

                          "   vec3 L;\n" +

                          "   float spot = 1.0, attentuation = 1.0;\n" +

                          "   if(lType == 0.0) {\n" +

                          "       L = -normalize(lDirection);\n" +

                          "   }else{\n" +

                          "       L = normalize(lLocation - (-V));" +

                          "       float distance = length(L);" +

                          "       L /= distance;\n" +

                          "       attentuation = 1.0 / (lAttenuation.x + lAttenuation.y * distance + lAttenuation.z * (distance * distance));" +

                          "       attentuation *= max(0.0, dot(N, L));" +

                          "       if(lType == 2.0) {" +

                          "           float spotAngle = acos(max(0.0, dot(-L, normalize(lDirection))));" +

                          "           if(spotAngle >= lCutOffAngle) spot = 0.0;" +

                          "           else if(spotAngle <= lBeamWidth) spot = 1.0;" +

                          "           else spot = (spotAngle - lCutOffAngle ) / (lBeamWidth - lCutOffAngle);" +

                          "       }" +

                          "   }" +

                        

                          "   vec3  H = normalize( L + V );\n" +

                          "   float NdotL = max(0.0, dot(N, L));\n" +

                          "   float NdotH = max(0.0, dot(N, H));\n" +

                        

                          "   float ambientFactor  = lAmbientIntensity * ambientIntensity;" +

                          "   float diffuseFactor  = lIntensity * NdotL;" +

                          "   float specularFactor = lIntensity * NdotL * pow(NdotH, shininess*128.0);" +

                          "   ambient  += lColor * ambientFactor * attentuation * spot;" +

                          "   diffuse  += lColor * diffuseFactor * attentuation * spot;" +

                          "   specular += lColor * specularFactor * attentuation * spot;" +  

                          "}";

			}

			

			if(vertexColor){

				if(imageGeometry) {

					shader += "uniform sampler2D IG_colorTexture;";

				} else {

					if(vertexColor == 3){

						shader += "attribute vec3 color;";

					} else{

						shader += "attribute vec4 color;";

					}

				}

            }

			

			if(texture) {

				if(imageGeometry) {

					shader += "uniform sampler2D IG_texCoordTexture;";

				} else {

					shader += "attribute vec2 texcoord;\n";

				}

                shader += "varying vec2 fragTexcoord;\n";

                if(textureTransform){

                    shader += "uniform mat4 texTrafoMatrix;\n";

                }

				if(!blending) {

					shader += "varying vec3 fragAmbient;\n";

					shader += "varying vec3 fragDiffuse;\n";

				}

				if(cubeMap) {

					shader += "varying vec3 fragViewDir;\n";

					shader += "varying vec3 fragNormal;\n";

					shader += "uniform mat4 viewMatrix;\n";

				}

			}

			

			shader += "void main(void) {\n";

			

			if(imageGeometry) {

				if (iG_Indexed) {

					shader += "vec2 halfPixel = vec2(0.5/IG_indexTextureWidth,0.5/IG_indexTextureHeight);";

					shader += "vec2 IG_texCoord = vec2(position.x*(IG_implicitMeshSize/IG_indexTextureWidth), position.y*(IG_implicitMeshSize/IG_indexTextureHeight)) + halfPixel;";

					shader += "vec2 IG_index = texture2D( IG_indexTexture, IG_texCoord ).rg;";

					

					shader += "halfPixel = vec2(0.5/IG_coordTextureWidth,0.5/IG_coordTextureHeight);";

					shader += "IG_texCoord = (IG_index * 0.996108948) + halfPixel;";

				} else {

					shader += "vec2 halfPixel = vec2(0.5/IG_coordTextureWidth, 0.5/IG_coordTextureHeight);";

					shader += "vec2 IG_texCoord = vec2(position.x*(IG_implicitMeshSize/IG_coordTextureWidth), position.y*(IG_implicitMeshSize/IG_coordTextureHeight)) + halfPixel;";

				}

				

				//Coordinates

				shader += "vec3 temp = vec3(0.0, 0.0, 0.0);";

				shader += "vec3 vertPosition = vec3(0.0, 0.0, 0.0);";

				

				for(var i=0; i<iG_Precision; i++)

				{

					shader += "temp = 255.0 * texture2D( IG_coordinateTexture" + i + ", IG_texCoord ).rgb;";

					shader += "vertPosition *= IG_implicitMeshSize;";

					shader += "vertPosition += temp;";

				}

				

			    shader += "vertPosition /= (pow(2.0, 8.0 * " + iG_Precision + ".0) - 1.0);";

                

                // comment out if transformMatrix() from Shape is used for generating model matrix

				shader += "vertPosition = vertPosition * (IG_bboxMax - IG_bboxMin) + IG_bboxMin;";

				

				//Normals

				shader += "vec3 vertNormal = texture2D( IG_normalTexture, IG_texCoord ).rgb;";

				shader += "vertNormal = vertNormal * 2.0 - 1.0;";

				

				//TexCoords

				if(texture) {

					shader += "vec4 IG_doubleTexCoords = texture2D( IG_texCoordTexture, IG_texCoord );";

					shader += "vec2 vertTexCoord;";

					shader += "vertTexCoord.r = (IG_doubleTexCoords.r * 0.996108948) + (IG_doubleTexCoords.b * 0.003891051);";

					shader += "vertTexCoord.g = (IG_doubleTexCoords.g * 0.996108948) + (IG_doubleTexCoords.a * 0.003891051);";

				}

				

				//Color

				if(vertexColor == 3) {

					shader += "vec3 vertColor = texture2D( IG_colorTexture, IG_texCoord ).rgb;";

				} else if(vertexColor == 4) {

					shader += "vec4 vertColor = texture2D( IG_colorTexture, IG_texCoord ).rgba;";

				}

			} else {

				shader += "vec3 vertNormal = normal;";

				shader += "vec3 vertPosition = position;";

				if(requireBBox) {

				    shader += "vertPosition = bgCenter + bgSize * vertPosition / bgPrecisionMax;\n";

			    }

				if(vertexColor == 3){

					shader += "vec3 vertColor = color;";

				} else if(vertexColor == 4) {

					shader += "vec4 vertColor = color;";

				}

				if(requireBBoxCol && vertexColor >= 3) {

				    shader += "vertColor = vertColor / bgPrecisionColMax;\n";

				}

				if(texture) {

					shader += "vec2 vertTexCoord = texcoord;";

					if(requireBBoxTex) {

					    shader += "vertTexCoord = vertTexCoord / bgPrecisionTexMax;\n";

				    }

				}

			}

			

			//positions to model-view-space

			shader += "vec3 positionMV = (modelViewMatrix * vec4(vertPosition, 1.0)).xyz;\n";

			

			//normals to model-view-space

			shader += "vec3 normalMV = normalize( (normalMatrix * vec4(vertNormal, 0.0)).xyz );\n";

			

			shader += "vec3 eye = -positionMV;\n";

			

			shader += "vec3 rgb = diffuseColor;\n";

			shader += "float alpha = 1.0 - transparency;\n";

			

			if(vertexColor) {

				shader += "rgb = vertColor.rgb;\n";

				if(vertexColor == 4) {

					shader += "alpha = vertColor.a;\n";

				}

			}

			

			//Calc TexCoords

			if(texture){

				if(cubeMap) {

					shader += "fragViewDir = viewMatrix[3].xyz;\n";

					shader += "fragNormal = normalMV;\n";

				} else if(sphereMapping) {

					shader += " fragTexcoord = 0.5 + normalMV.xy / 2.0;\n";

				} else if(textureTransform) {

					shader += " fragTexcoord = (texTrafoMatrix * vec4(vertTexCoord, 1.0, 1.0)).xy;\n";

				} else {

					shader += " fragTexcoord = vertTexCoord;\n";

				}

            }

			

			//calc lighting

			if(lights) {

				shader += "vec3 ambient   = vec3(0.07, 0.07, 0.07);\n";

                shader += "vec3 diffuse   = vec3(0.0, 0.0, 0.0);\n";

                shader += "vec3 specular  = vec3(0.0, 0.0, 0.0);\n";

				

				if(!solid) {

					shader += "if (dot(normalMV, eye) < 0.0) {\n";

					shader += "	 normalMV *= -1.0;\n";

					shader += "}\n";

				}

				for(var i=0; i<lights; i++) {		

					shader += " lighting(Light"+i+"_Type," +

										"Light"+i+"_Location," +

										"Light"+i+"_Direction," +

										"Light"+i+"_Color," + 

										"Light"+i+"_Attenuation," +

										"Light"+i+"_Intensity," + 

										"Light"+i+"_AmbientIntensity," +

										"Light"+i+"_BeamWidth," +

										"Light"+i+"_CutOffAngle," +

										"normalMV, eye, ambient, diffuse, specular);\n";

				}

				

				if(texture && !blending) {

					shader += "fragAmbient = ambient;\n";

					shader += "fragDiffuse = diffuse;\n";

					shader += "fragColor.rgb = (emissiveColor + specular*specularColor);\n";

					shader += "fragColor.a = alpha;\n";

				} else {

					shader += "fragColor.rgb = (emissiveColor + ambient*rgb + diffuse*rgb + specular*specularColor);\n";

					shader += "fragColor.a = alpha;\n";

				}

			} else {

				if(texture && !blending) {

					shader += "fragAmbient = vec3(1.0);\n";

					shader += "fragDiffuse = vec3(1.0);\n";

					shader += "fragColor.rgb = vec3(0.0);\n";

					shader += "fragColor.a = alpha;\n";

				} else {

					shader += "fragColor.rgb = rgb + emissiveColor;\n;\n";

					shader += "fragColor.a = alpha;\n";

				}

			}

			

			if(fog) {

				shader += "float f0 = calcFog(-positionMV);\n";

                shader += "fragColor.rgb = fogColor * (1.0-f0) + f0 * (fragColor.rgb);\n";

			}



			shader += "gl_Position = modelViewProjectionMatrix * vec4(vertPosition, 1.0);\n";

            shader += "}\n";

		

			g_shaders[shaderIdentifier] = {};

            g_shaders[shaderIdentifier].type = "vertex";

            g_shaders[shaderIdentifier].data = shader;

        }



        return shaderIdentifier;		

	};

	

//----------------------------------------------------------------------------

/*! gen fs mobile

 */

//----------------------------------------------------------------------------

	Context.prototype.generateFSMobile = function (viewarea, shape)

    {

        var texture		= (shape._cf.appearance.node._cf.texture.node || x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text)) ? 1 : 0;

		var cubeMap		= (shape._cf.appearance.node._cf.texture.node) ? x3dom.isa(shape._cf.appearance.node._cf.texture.node, x3dom.nodeTypes.X3DEnvironmentTextureNode) ? 1 : 0 : 0;

		var blending	= (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text) || cubeMap || (shape._cf.appearance.node._cf.texture.node && (shape._cf.appearance.node._cf.texture.node._vf.origChannelCount == 1 || shape._cf.appearance.node._cf.texture.node._vf.origChannelCount == 2))) ? 1 : 0;

		

        var shaderIdentifier = "fs-x3d-mobil-" + texture +

												 cubeMap +

												 blending;

                                           

        if(!g_shaders[shaderIdentifier]) {

		

			var shader = "";

			shader += "#ifdef GL_ES \n";

            shader += "  precision highp float;\n";

            shader += "#endif\n";

            shader += "\n";

			

			if(texture) {

				if(cubeMap) {

					shader += "uniform samplerCube tex;\n";

					shader += "varying vec3 fragViewDir;\n";

					shader += "varying vec3 fragNormal;\n";

					shader += "uniform mat4 modelViewMatrixInverse;\n";

				} else {

					shader += "uniform sampler2D tex;           \n";

					shader += "varying vec2 fragTexcoord;       \n";

				}

				if(!blending) {

					shader += "varying vec3 fragAmbient;\n";

					shader += "varying vec3 fragDiffuse;\n";

				}

			}

			

			shader += "varying vec4 fragColor;\n";

			

			shader += "void main(void) {\n";

			

			shader += "vec4 color = fragColor;\n";

			

			if(texture){

				if(cubeMap) {

					shader += "vec3 normal = normalize(fragNormal);\n";

					shader += "vec3 viewDir = normalize(fragViewDir);\n";

					shader += "vec3 reflected = reflect(viewDir, normal);\n"

					shader += "reflected = (modelViewMatrixInverse * vec4(reflected,0.0)).xyz;\n"

					shader += "vec4 texColor = textureCube(tex, reflected);\n";

				} else {

					shader += "vec4 texColor = texture2D(tex, vec2(fragTexcoord.s, 1.0-fragTexcoord.t));\n";

				}

				if(blending) {

					if(cubeMap) {

						shader += "color.rgb = mix(color.rgb, texColor.rgb, vec3(0.75));\n";

						shader += "color.a = texColor.a;\n";

					} else {

						shader += "color.rgb *= texColor.rgb;\n";

						shader += "color.a *= texColor.a;\n";

					}

				} else {

					shader += "color.rgb += fragAmbient*texColor.rgb + fragDiffuse*texColor.rgb;\n";

					shader += "color.a *= texColor.a;\n";

				}

            } 

			

			shader += "if (color.a <= 0.1) discard;\n";

            shader += "gl_FragColor = color;\n";

			shader += "}\n";

			

			g_shaders[shaderIdentifier] = {};

            g_shaders[shaderIdentifier].type = "fragment";

            g_shaders[shaderIdentifier].data = shader;

        }

        

        return shaderIdentifier;		

	};

	

//----------------------------------------------------------------------------

/*! gen vs

 */

//----------------------------------------------------------------------------

    Context.prototype.generateVS = function (viewarea, shape)

    {

		var shader				= (shape._cf.appearance.node._shader && x3dom.isa(shape._cf.appearance.node._shader, x3dom.nodeTypes.CommonSurfaceShader)) ? 1 : 0;

		var texture				= (shape._cf.appearance.node._cf.texture.node || shader || x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text)) ? 1 : 0;

		var normalMap			= (shader && shape._cf.appearance.node._shader.getNormalMap()) ? 1 : 0; 

		var textureTransform 	= (shape._cf.appearance.node._cf.textureTransform.node !== null) ? 1 : 0;

		var sphereMapping		= (shape._cf.geometry.node._cf.texCoord !== undefined && shape._cf.geometry.node._cf.texCoord.node !== null && shape._cf.geometry.node._cf.texCoord.node._vf.mode) ? (shape._cf.geometry.node._cf.texCoord.node._vf.mode.toLowerCase() == "sphere") ? 1 : 0 : 0;

		var cubeMap				= (shape._cf.appearance.node._cf.texture.node) ? x3dom.isa(shape._cf.appearance.node._cf.texture.node, x3dom.nodeTypes.X3DEnvironmentTextureNode) ? 1 : 0 : 0;

		var vertexColor 		= (shape._cf.geometry.node._mesh._colors[0].length > 0 || shape._cf.geometry.node.getColorTexture() || (shape._cf.geometry.node._vf.color !== undefined && shape._cf.geometry.node._vf.color.length > 0)) ? shape._cf.geometry.node._mesh._numColComponents : 0;

		var lights				= (viewarea.getLights().length) + (viewarea._scene.getNavigationInfo()._vf.headlight);

		var shadow				= (viewarea.getLightsShadow()) ? 1 : 0;

		var fog					= (viewarea._scene.getFog()._vf.visibilityRange > 0) ? 1 : 0;

		var imageGeometry		= (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.ImageGeometry)) ? 1 : 0;

		var iG_Precision		= (imageGeometry) ? shape._cf.geometry.node.numCoordinateTextures() : 0;

		var iG_Indexed			= (imageGeometry && shape._cf.geometry.node.getIndexTexture() != null) ? 1 : 0;

		var requireBBox         = (shape._cf.geometry.node._vf.coordType !== undefined && shape._cf.geometry.node._vf.coordType != "Float32");

		var requireBBoxCol      = (shape._cf.geometry.node._vf.colorType !== undefined && shape._cf.geometry.node._vf.colorType != "Float32");

		var requireBBoxTex      = (shape._cf.geometry.node._vf.texCoordType !== undefined && shape._cf.geometry.node._vf.texCoordType != "Float32");

										   

		var shaderIdentifier = "vs-x3d-" +  vertexColor + 

                                            texture +

											normalMap +

											textureTransform +

											sphereMapping +

											cubeMap +

											fog +

											lights +

											shadow +

											imageGeometry +

											iG_Precision +

											iG_Indexed +

											requireBBox + 

											requireBBoxCol +

											requireBBoxTex;



        if(!g_shaders[shaderIdentifier]) {

            //x3dom.debug.logInfo("generate new Vertex Shader: " + shaderIdentifier);

            

            var shader = "";

            

            //Set Attributes +Uniforms + Varyings

            shader += "attribute vec3 position;\n";

            shader += "attribute vec3 normal;\n";

            shader += "uniform mat4 modelViewMatrix;\n";

            shader += "uniform mat4 normalMatrix;\n";

            shader += "uniform mat4 modelViewProjectionMatrix;\n";

            shader += "varying vec3 fragNormal;\n";

			

			if(requireBBox) {

				shader += "uniform vec3 bgCenter;\n";

				shader += "uniform vec3 bgSize;\n";

				shader += "uniform float bgPrecisionMax;\n";

			}

			if(requireBBoxCol) {

			    shader += "uniform float bgPrecisionColMax;\n";

			}

    		if(requireBBoxTex) {

    			shader += "uniform float bgPrecisionTexMax;\n";

    		}

    		

			if(imageGeometry) {

				shader += "uniform vec3 IG_bboxMin;\n";

				shader += "uniform vec3 IG_bboxMax;\n";

				shader += "uniform float IG_coordTextureWidth;\n";

				shader += "uniform float IG_coordTextureHeight;\n";

				shader += "uniform float IG_implicitMeshSize;\n";

				

				if(iG_Indexed) {

					shader += "uniform sampler2D IG_indexTexture;\n";

					shader += "uniform float IG_indexTextureWidth;\n";

					shader += "uniform float IG_indexTextureHeight;\n";

				}

				

				for( var i = 0; i < iG_Precision; i++ ) {

					shader += "uniform sampler2D IG_coordinateTexture" + i + "\n;";

				}

				

				shader += "uniform sampler2D IG_normalTexture;\n";

				shader += "uniform sampler2D IG_texCoordTexture;\n";

				shader += "uniform sampler2D IG_colorTexture;\n";	

			}



            if(vertexColor){

                if(vertexColor == 3.0){

                    shader += "attribute vec3 color;\n";

                    shader += "varying vec3 fragColor;\n";

                }else{

                    shader += "attribute vec4 color;\n";

                    shader += "varying vec4 fragColor;\n";

                }

            }

            if(texture){

                shader += "attribute vec2 texcoord;\n";

                shader += "varying vec2 fragTexcoord;\n";

                if(textureTransform){

                    shader += "uniform mat4 texTrafoMatrix;\n";

                }

                if(normalMap){

                    shader += "attribute vec3 tangent;\n";

                    shader += "attribute vec3 binormal;\n";

                    shader += "varying vec3 fragTangent;\n";

                    shader += "varying vec3 fragBinormal;\n";

                }

				if(cubeMap) {

					shader += "varying vec3 fragViewDir;\n";

					shader += "uniform mat4 viewMatrix;\n";

				}

            }

            

            if(lights || fog){

                shader += "uniform vec3 eyePosition;\n";

                if (fog) {

                    shader += "varying vec3 fragEyePosition;\n";

                }

                shader += "varying vec3 fragPosition;\n";

                

                if(shadow) {

                    shader += "uniform mat4 matPV;\n";

                    shader += "varying vec4 projCoord;\n";

                }

            }

            

            //Set Main

            shader += "void main(void) {\n"; 

			

			if(imageGeometry) {

				

				//Indices

				if(iG_Indexed) {

					shader += "vec2 halfPixel = vec2(0.5/IG_indexTextureWidth,0.5/IG_indexTextureHeight);\n";

					shader += "vec2 IG_texCoord = vec2(position.x*(IG_implicitMeshSize/IG_indexTextureWidth), position.y*(IG_implicitMeshSize/IG_indexTextureHeight)) + halfPixel;\n";

					//shader += "vec2 IG_texCoord = vec2(1.0/(2.0*IG_indexTextureWidth)+position.x*(IG_indexTextureWidth-1.0)/IG_indexTextureWidth, 1.0/(2.0*IG_indexTextureHeight)+position.y*(IG_indexTextureHeight-1.0)/IG_indexTextureHeight);";

					shader += "vec2 IG_index = texture2D( IG_indexTexture, IG_texCoord ).rg;\n";

					

					shader += "halfPixel = vec2(0.5/IG_coordTextureWidth,0.5/IG_coordTextureHeight);\n";

					shader += "IG_texCoord = (IG_index * 0.996108948) + halfPixel;\n";

					//shader += "IG_texCoord = vec2(1.0/(2.0*IG_coordTextureWidth)+position.x*(IG_coordTextureWidth-1.0)/IG_coordTextureWidth, 1.0/(2.0*IG_coordTextureHeight)+position.y*(IG_coordTextureHeight-1.0)/IG_coordTextureHeight);";

				} else {

					shader += "vec2 halfPixel = vec2(0.5/IG_coordTextureWidth, 0.5/IG_coordTextureHeight);\n";

					shader += "vec2 IG_texCoord = vec2(position.x*(IG_implicitMeshSize/IG_coordTextureWidth), position.y*(IG_implicitMeshSize/IG_coordTextureHeight)) + halfPixel;\n";

					//shader += "vec2 IG_texCoord = vec2(position.x*(256.0/IG_coordTextureWidth)*(IG_coordTextureWidth-1.0)/(IG_coordTextureWidth), position.y*(256.0/IG_coordTextureHeight)*(IG_coordTextureHeight-1.0)/(IG_coordTextureHeight)) + halfPixel;";

				}

				

				//Coordinates

				shader += "vec3 temp = vec3(0.0, 0.0, 0.0);\n";

				shader += "vec3 vertPosition = vec3(0.0, 0.0, 0.0);\n";

				

				for(var i=0; i<iG_Precision; i++)

				{

					shader += "temp = 255.0 * texture2D( IG_coordinateTexture" + i + ", IG_texCoord ).rgb;\n";

					shader += "vertPosition *= 256.0;\n";

					shader += "vertPosition += temp;\n";

				}

				

			    shader += "vertPosition /= (pow(2.0, 8.0 * " + iG_Precision + ".0) - 1.0);\n";

			    

			    // comment out if transformMatrix() from Shape is used for generating model matrix

				shader += "vertPosition = vertPosition * (IG_bboxMax - IG_bboxMin) + IG_bboxMin;\n";

				

				//Normals

				shader += "vec3 vertNormal = texture2D( IG_normalTexture, IG_texCoord ).rgb;\n";

				shader += "vertNormal = vertNormal * 2.0 - 1.0;\n";

				

				//TexCoords

				if(texture) {

					shader += "vec4 IG_doubleTexCoords = texture2D( IG_texCoordTexture, IG_texCoord );\n";

					shader += "vec2 vertTexCoord;";

					shader += "vertTexCoord.r = (IG_doubleTexCoords.r * 0.996108948) + (IG_doubleTexCoords.b * 0.003891051);\n";

					shader += "vertTexCoord.g = (IG_doubleTexCoords.g * 0.996108948) + (IG_doubleTexCoords.a * 0.003891051);\n";

				}

				

				//Color

				if(vertexColor) {

					shader += "fragColor = texture2D( IG_colorTexture, IG_texCoord ).rgb;\n";

				}

				

				//PointSize

				shader += "gl_PointSize = 2.0;\n";

			} else {

				shader += "vec3 vertNormal = normal;\n";

				if(texture) {

					shader += "vec2 vertTexCoord = texcoord;\n";

					if(requireBBoxTex) {

					    shader += "vertTexCoord = vertTexCoord / bgPrecisionTexMax;\n";

				    }

				}

				shader += "vec3 vertPosition = position;\n";

				if(requireBBox) {

				    shader += "vertPosition = bgCenter + bgSize * vertPosition / bgPrecisionMax;\n";

			    }

				shader += "gl_PointSize = 2.0;\n";

				if(vertexColor){

    				if(requireBBoxCol) {

    				    shader += "fragColor = color / bgPrecisionColMax;\n";

    				}

    				else {

    					shader += "fragColor = color;\n";

    				}

				}

			}

            

			shader += "fragNormal = (normalMatrix * vec4(vertNormal, 0.0)).xyz;\n";

            

            if(lights || fog){    

                shader += "fragPosition = (modelViewMatrix * vec4(vertPosition, 1.0)).xyz;\n";

                if (fog) {

                    shader += "fragEyePosition = eyePosition - fragPosition;\n";

                }

                if(shadow) {

                    shader += "projCoord = matPV * vec4(vertPosition+0.5*normalize(vertNormal), 1.0);\n";

                }

            }

            if(texture){

				if(cubeMap) {

					shader += "fragViewDir = (viewMatrix[3].xyz);\n";

				} else if (sphereMapping) {

					shader += " fragTexcoord = 0.5 + fragNormal.xy / 2.0;\n";

                } else if(textureTransform) {

                    shader += " fragTexcoord = (texTrafoMatrix * vec4(vertTexCoord, 1.0, 1.0)).xy;\n";

                } else {

					shader += " fragTexcoord = vertTexCoord;\n";

				}

                if(normalMap){

                    shader += "fragTangent  = (normalMatrix * vec4(tangent, 0.0)).xyz;\n";

                    shader += "fragBinormal = (normalMatrix * vec4(binormal, 0.0)).xyz;\n";

                }

            }

			shader += "gl_Position = modelViewProjectionMatrix * vec4(vertPosition, 1.0);\n";

            shader += "}";

			

            g_shaders[shaderIdentifier] = {};

            g_shaders[shaderIdentifier].type = "vertex";

            g_shaders[shaderIdentifier].data = shader;

        }

        

        return shaderIdentifier;

    };

    

//----------------------------------------------------------------------------

/*! gen fs

 */

//----------------------------------------------------------------------------

    Context.prototype.generateFS = function (viewarea, shape)

    {

		var vertexColor 		= (shape._cf.geometry.node._mesh._colors[0].length > 0 || shape._cf.geometry.node.getColorTexture() || (shape._cf.geometry.node._vf.color !== undefined && shape._cf.geometry.node._vf.color.length > 0)) ? shape._cf.geometry.node._mesh._numColComponents : 0;

		var lights				= (viewarea.getLights().length) + (viewarea._scene.getNavigationInfo()._vf.headlight);

		var shadows				= (viewarea.getLightsShadow()) ? 1 : 0;

        var fogs				= (viewarea._scene.getFog()._vf.visibilityRange > 0) ? 1 : 0;

		var solid				= (shape.isSolid()) ? 1 : 0;

		var texture				= (shape._cf.appearance.node._cf.texture.node || x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text)) ? 1 : 0;

		var cubeMap				= (shape._cf.appearance.node._cf.texture.node) ? x3dom.isa(shape._cf.appearance.node._cf.texture.node, x3dom.nodeTypes.X3DEnvironmentTextureNode) ? 1 : 0 : 0;

		var blending			= (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text) || cubeMap || (shape._cf.appearance.node._cf.texture.node && (shape._cf.appearance.node._cf.texture.node._vf.origChannelCount == 1.0 || shape._cf.appearance.node._cf.texture.node._vf.origChannelCount == 2.0))) ? 1 : 0;

		var shader 				= (shape._cf.appearance.node._shader && x3dom.isa(shape._cf.appearance.node._shader, x3dom.nodeTypes.CommonSurfaceShader)) ? 1 : 0;

		var shaderDiffuse 		= (shader && shape._cf.appearance.node._shader.getDiffuseMap()) ? 1 : 0;

		var shaderNormal 		= (shader && shape._cf.appearance.node._shader.getNormalMap()) ? 1 : 0;

		var shaderSpec 			= (shader && shape._cf.appearance.node._shader.getSpecularMap()) ? 1 : 0;

		

        var shaderIdentifier = "fs-x3d-" + vertexColor + 

                                           texture +

										   cubeMap +

                                           fogs +

                                           lights +

                                           shadows  +

										   blending +

                                           shader +

										   shaderDiffuse +

										   shaderNormal +

										   shaderSpec;

                                           

        if(!g_shaders[shaderIdentifier]){

            //x3dom.debug.logInfo("generate new FragmentShader: " + shaderIdentifier);

            

            var fog =   "struct Fog {" +

                        "   vec3  color;" +

                        "   float fogType;" +

                        "   float visibilityRange;" +

                        "};" +

                        "uniform Fog fog;" +

                        "float calcFog() {" +

                        "   float f0 = 0.0;" +      

                        "   if(fog.fogType == 0.0) {" +

                        "       if(length(fragEyePosition) < fog.visibilityRange){" +

                        "           f0 = (fog.visibilityRange-length(fragEyePosition)) / fog.visibilityRange;" +

                        "       }" +

                        "   }else{" +

                        "       if(length(fragEyePosition) < fog.visibilityRange){" +

                        "           f0 = exp(-length(fragEyePosition) / (fog.visibilityRange-length(fragEyePosition) ) );" +

                        "       }" +

                        "   }" +

                        "   f0 = clamp(f0, 0.0, 1.0);" +

                        "   return f0;" +

                        "}";

                        

            var light = "struct Light {\n" +

                        "   float on;\n" +

                        "   float type;\n" +

                        "   vec3  location;\n" +

                        "   vec3  direction;\n" +

                        "   vec3  color;\n" +

                        "   vec3  attenuation;\n" +

                        "   float intensity;\n" +

                        "   float ambientIntensity;\n" +

                        "   float beamWidth;\n" +

                        "   float cutOffAngle;\n" +

                        "   float shadowIntensity;\n" +

                        "};\n" +

                        "const int NUMLIGHTS = " + lights + ";\n" +

                        "uniform Light light[9];\n" +

                        "void lighting(in Light light, in vec3 N, in vec3 V, inout vec3 ambient, inout vec3 diffuse, inout vec3 specular){" +

                        "   vec3 L;\n" +

                        "   float spot = 1.0, attentuation = 1.0;\n" +

                        "   if(light.type == 0.0) {\n" +

                        "       L = -normalize(light.direction);\n" +

                        "   }else{\n" +

                        "       L = normalize(light.location - fragPosition);" +

                        "       float distance = length(L);" +

                        "       L /= distance;\n" +

                        "       attentuation = 1.0 / (light.attenuation.x + light.attenuation.y * distance + light.attenuation.z * distance * distance);" +

                        "       attentuation *= max(0.0, dot(N, L));" +

                        "       if(light.type == 2.0) {" +

                        "           float spotAngle = acos(max(0.0, dot(-L, normalize(light.direction))));" +

                        "           if(spotAngle >= light.cutOffAngle) spot = 0.0;" +

                        "           else if(spotAngle <= light.beamWidth) spot = 1.0;" +

                        "           else spot = (spotAngle - light.cutOffAngle ) / (light.beamWidth - light.cutOffAngle);" +

                        "       }" +

                        "   }" +

                        

                        "   vec3  H = normalize( L + V );\n" +

                        "   float NdotL = max(0.0, dot(N, L));\n" +

                        "   float NdotH = max(0.0, dot(N, H));\n" +

                        

                        "   float ambientFactor  = light.ambientIntensity * material.ambientIntensity;" +

                        "   float diffuseFactor  = light.intensity * NdotL;" +

                        "   float specularFactor = light.intensity * NdotL * pow(NdotH, material.shininess*128.0);" +

                        "   ambient  += light.color * ambientFactor * attentuation * spot;" +

                        "   diffuse  += light.color * diffuseFactor * attentuation * spot;" +

                        "   specular += light.color * specularFactor * attentuation * spot;" +  

                        "}";

                        

            var shadow =    "uniform sampler2D sh_tex;" +

                            "varying vec4 projCoord;" +

                            "float PCF_Filter(Light light, vec3 projectiveBiased, float filterWidth)" +

                            "{" +

                            "    float stepSize = 2.0 * filterWidth / 3.0;" +

                            "    float blockerCount = 0.0;" +

                            "    projectiveBiased.x -= filterWidth;" +

                            "    projectiveBiased.y -= filterWidth;" +

                            "    for (float i=0.0; i<3.0; i++)" +

                            "    {" +

                            "        for (float j=0.0; j<3.0; j++)" +

                            "        {" +

                            "            projectiveBiased.x += (j*stepSize);" +

                            "            projectiveBiased.y += (i*stepSize);" +

                            "            vec4 zCol = texture2D(sh_tex, (1.0+projectiveBiased.xy)*0.5);" +

                            "            float fromFixed = 256.0 / 255.0;" +

                            "            float z = zCol.r * fromFixed;" +

                            "            z += zCol.g * fromFixed / (255.0);" +

                            "            z += zCol.b * fromFixed / (255.0 * 255.0);" +

                            "            z += zCol.a * fromFixed / (255.0 * 255.0 * 255.0);" +

                            "            if (z < projectiveBiased.z) blockerCount += 1.0;" +

                            "            projectiveBiased.x -= (j*stepSize);" +

                            "            projectiveBiased.y -= (i*stepSize);" +

                            "        }" +

                            "    }" +

                            "    float result = 1.0 - light.shadowIntensity * blockerCount / 9.0;" +

                            "    return result;" +

                            "}";

            

            var material =  "struct Material {          \n" +

                            "   vec3  diffuseColor;     \n" +

                            "   vec3  specularColor;    \n" +

                            "   vec3  emissiveColor;    \n" +

                            "   float shininess;        \n" +

                            "   float transparency;     \n" +

                            "   float ambientIntensity; \n" +

                            "};                         \n" +

                            "uniform Material material; \n";

                    

            var shader = "";

            shader += "#ifdef GL_ES             \n";

            shader += "  precision highp float; \n";

            shader += "#endif                   \n";

            shader += "\n";

            

            //Set Uniforms + Varyings

            shader += material;

            shader += "uniform mat4 modelMatrix;";

            shader += "uniform mat4 modelViewMatrix;";

            if(vertexColor){

                if(vertexColor == 3){

                    shader += "varying vec3 fragColor;  \n";

                }else{

                    shader += "varying vec4 fragColor;  \n";

                }

            }

            if(texture || shader){

				shader += "varying vec2 fragTexcoord;       \n";

				if((texture || shaderDiffuse) && !cubeMap) {

					shader += "uniform sampler2D tex;           \n";

                } else if(cubeMap) {

					shader += "uniform samplerCube tex;\n";

					shader += "varying vec3 fragViewDir;\n";

					shader += "uniform mat4 modelViewMatrixInverse;\n";

				}

                if(shaderNormal){

                    shader += "uniform sampler2D bump;      \n";

                    shader += "varying vec3 fragTangent;    \n";

                    shader += "varying vec3 fragBinormal;   \n";

                }

                if(shaderSpec){

                    shader += "uniform sampler2D spec;      \n";

                }

            }

            

            if(lights){

                shader += "uniform float solid;             \n";

                shader += "varying vec3 fragNormal;         \n";

                shader += "varying vec3 fragPosition;       \n";

                shader += light;

                if(shadows) {

                    shader += shadow;

                }

            }

            if(fogs){

                shader += "varying vec3 fragEyePosition;    \n";

                shader += fog;

            }

            

            //Set Main

            shader += "void main(void) {    \n";

                

			shader += "vec3 rgb = material.diffuseColor; \n";

			shader += "float alpha = 1.0 - material.transparency;\n";

			

			if(vertexColor) {

                shader += "rgb = fragColor.rgb;\n";

				if(vertexColor == 4) {

					shader += "alpha = fragColor.a;\n";

				}

			}

            

            if(lights){

                shader += "vec3 ambient   = vec3(0.07, 0.07, 0.07);\n";

                shader += "vec3 diffuse   = vec3(0.0, 0.0, 0.0);\n";

                shader += "vec3 specular  = vec3(0.0, 0.0, 0.0);\n";

                if(shadows){

                    shader += "float shadowed = 1.0;\n";

                    shader += "float oneShadowAlreadyExists = 0.0;\n";

                }

                shader += "vec3 eye = normalize(-fragPosition);\n";

                shader += "vec3 normal = normalize(fragNormal);\n";

                if(shaderNormal){                

                    shader += "vec3 t = normalize( fragTangent );\n";

                    shader += "vec3 b = normalize( fragBinormal );\n";

                    shader += "vec3 n = normalize( fragNormal );\n";

                

                    shader += "mat3 tangentToWorld = mat3(t, b, n);\n";

                

                    shader += "normal = texture2D( bump, vec2(fragTexcoord.x, 1.0-fragTexcoord.y) ).rgb;\n";

                    shader += "normal = 2.0 * normal - 1.0;\n";

                    shader += "normal = normalize( normal * tangentToWorld );\n";

                    

                    shader += "normal.y = -normal.y;";

                    shader += "normal.x = -normal.x;";

                }

                



				shader += "if (solid == 0.0 && dot(normal, eye) < 0.0) {\n";

				shader += " normal *= -1.0;\n";

				shader += "}\n";

				

                shader += "for(int i=0; i<NUMLIGHTS; i++) {\n";

                shader += " lighting(light[i], normal, eye, ambient, diffuse, specular);\n";

                if(shadows){

                    shader += " if(light[i].shadowIntensity > 0.0 && oneShadowAlreadyExists == 0.0){\n";

                    shader += "     vec3 projectiveBiased = projCoord.xyz / projCoord.w;\n";

                    shader += "     shadowed = PCF_Filter(light[i], projectiveBiased, 0.002);\n";

                    shader += "     oneShadowAlreadyExists = 1.0;\n";

                    shader += " }\n";

                }

                shader += "}\n";

                if(shaderSpec) {

                    shader += "specular *= texture2D( spec, vec2(fragTexcoord.x, 1.0-fragTexcoord.y) ).rgb;\n";

                }

				

                if(texture || shaderDiffuse){

					if(cubeMap) {

						shader += "vec3 viewDir = normalize(fragViewDir);\n";

						shader += "vec3 reflected = reflect(viewDir, normal);\n"

						shader += "reflected = (modelViewMatrixInverse * vec4(reflected,0.0)).xyz;\n"

						shader += "vec4 texColor = textureCube(tex, reflected);\n";

						shader += "alpha *= texColor.a;\n";

					} else {

						shader += "vec2 texCoord = vec2(fragTexcoord.x, 1.0-fragTexcoord.y);\n";

						shader += "vec4 texColor = texture2D(tex, texCoord);\n";

						shader += "alpha *= texColor.a;\n";

					}

                    if(blending){

						shader += "rgb = (material.emissiveColor + ambient*rgb + diffuse*rgb + specular*material.specularColor);\n";

						if(cubeMap) {

							shader += "rgb = mix(rgb, texColor.rgb, vec3(0.75));\n";

						} else {

							shader += "rgb *= texColor.rgb;\n";

						}

                    }else{

						shader += "rgb = (material.emissiveColor + ambient*texColor.rgb + diffuse*texColor.rgb + specular*material.specularColor);\n";

                    }

                }else{

                    shader += "rgb = (material.emissiveColor + ambient*rgb + diffuse*rgb + specular*material.specularColor);\n";

                }

                if(shadows) {

                    shader += "rgb *= shadowed;\n";

                }

                

            }else{

                if(texture){

                    shader += "vec2 texCoord = vec2(fragTexcoord.x, 1.0-fragTexcoord.y);\n";

                    shader += "vec4 texColor = texture2D(tex, texCoord);\n";

                    shader += "rgb = texColor.rgb;\n";

                    shader += "alpha *= texColor.a;\n";

                } else if(vertexColor){

                    shader += "rgb = fragColor.rgb;\n";

                    if(vertexColor == 4) {

                        shader += "alpha = fragColor.a;\n";

                    }

                } else {

                    shader += "rgb = material.diffuseColor + material.emissiveColor;\n";

                }

            }

            if(fogs){

                shader += "float f0 = calcFog();\n";

                shader += "rgb = fog.color * (1.0-f0) + f0 * (rgb);\n";

            }

            //shader += "rgb = clamp(rgb, 0.0, 1.0);\n";

            shader += "if (alpha <= 0.1) discard;\n";

            shader += "gl_FragColor = vec4(rgb, alpha);\n";

			shader += "}\n";

            

            g_shaders[shaderIdentifier] = {};

            g_shaders[shaderIdentifier].type = "fragment";

            g_shaders[shaderIdentifier].data = shader;

        }

        

        return shaderIdentifier;

    };



    

//----------------------------------------------------------------------------

/*! setup gl objects for shape

 */

//----------------------------------------------------------------------------

    Context.prototype.setupShape = function (gl, shape, viewarea) 

    {

        var i, q = 0;

        var tex = null;

        var IG_texUnit = 1;

        var vertices, positionBuffer;

        

        if (shape._webgl !== undefined)

        {

            var oldLightsAndShadow = shape._webgl.lightsAndShadow;

            shape._webgl.lightsAndShadow = useLightingFunc(viewarea);

            

            var needFullReInit = (shape._webgl.lightsAndShadow[0] != oldLightsAndShadow[0] || 

                                  shape._webgl.lightsAndShadow[1] != oldLightsAndShadow[1] ||

                                  shape._dirty.shader);



            // TODO; do same for texcoords etc.!

            if (shape._dirty.colors === true &&

                shape._webgl.shader.color === undefined &&

                shape._cf.geometry.node._mesh._colors[0].length)

            {

                // required since otherwise shape._webgl.shader.color stays undefined

                // and thus the wrong shader will be chosen although there are colors

                needFullReInit = true;

            }

                    

            if (shape._dirty.texture === true || needFullReInit)

            {   

                tex = shape._cf.appearance.node._cf.texture.node;

                

                if ((shape._webgl.texture !== undefined && tex) && !needFullReInit)

                {

                    shape.updateTexture(tex, 0, "false");

                    

                    shape._dirty.texture = false;

                }

                else

                {

                    needFullReInit = true;

                    

                    // clean-up old state before creating new shader

                    var spOld = shape._webgl.shader;

                    var inc = 0;

                    

                    for (inc=0; shape._webgl.texture !== undefined && 

                         inc < shape._webgl.texture.length; inc++)

                    {

                        if (shape._webgl.texture[inc])

                        {

                            gl.deleteTexture(shape._webgl.texture[inc]);

                        }

                    }

                    

                    for (q=0; q<shape._webgl.positions.length; q++)

                    {

                        if (spOld.position !== undefined) 

                        {

                            gl.deleteBuffer(shape._webgl.buffers[5*q+1]);

                            gl.deleteBuffer(shape._webgl.buffers[5*q+0]);

                        }

                        

                        if (spOld.normal !== undefined) 

                        {

                            gl.deleteBuffer(shape._webgl.buffers[5*q+2]);

                        }

                        

                        if (spOld.texcoord !== undefined) 

                        {

                            gl.deleteBuffer(shape._webgl.buffers[5*q+3]);

                        }

                        

                        if (spOld.color !== undefined)

                        {

                            gl.deleteBuffer(shape._webgl.buffers[5*q+4]);

                        }

                    }

                    

                    for (inc=0; inc<shape._webgl.dynamicFields.length; inc++)

                    {

                        var h_attrib = shape._webgl.dynamicFields[inc];

                        

                        if (spOld[h_attrib.name] !== undefined)

                        {

                            gl.deleteBuffer(h_attrib.buf);

                        }

                    }

                }

            }

            

            for (q=0; q<shape._webgl.positions.length; q++)

            {

              if (!needFullReInit && shape._dirty.positions === true)

              {

                if (shape._webgl.shader.position !== undefined) 

                {

                    shape._webgl.positions[q] = shape._cf.geometry.node._mesh._positions[q];

                    

                    // TODO; don't delete but use glMapBuffer() and DYNAMIC_DRAW

                    gl.deleteBuffer(shape._webgl.buffers[5*q+1]);

                    

                    positionBuffer = gl.createBuffer();

                    shape._webgl.buffers[5*q+1] = positionBuffer;

                    

                    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shape._webgl.buffers[5*q+0]);

                    

                    vertices = new Float32Array(shape._webgl.positions[q]);

                    

                    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

                    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

                    

                    gl.vertexAttribPointer(shape._webgl.shader.position, 3, shape._webgl.coordType, false,

                        shape._coordStrideOffset[0], shape._coordStrideOffset[1]);



                    vertices = null;

                }

                

                shape._dirty.positions = false;

              }

              if (!needFullReInit && shape._dirty.colors === true)

              {

                if (shape._webgl.shader.color !== undefined)

                {

                    shape._webgl.colors[q] = shape._cf.geometry.node._mesh._colors[q];

                    

                    gl.deleteBuffer(shape._webgl.buffers[5*q+4]);

                    

                    colorBuffer = gl.createBuffer();

                    shape._webgl.buffers[5*q+4] = colorBuffer;

                    

                    colors = new Float32Array(shape._webgl.colors[q]);

                    

                    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);             

                    

                    gl.vertexAttribPointer(shape._webgl.shader.color, 3, shape._webgl.colorType, false,

                        shape._colorStrideOffset[0], shape._colorStrideOffset[1]);

                    

                    colors = null;

                }

                

                shape._dirty.colors = false;

              }

			  if (!needFullReInit && shape._dirty.normals === true)

              {

                if (shape._webgl.shader.normal !== undefined)

                {

                    shape._webgl.normals[q] = shape._cf.geometry.node._mesh._normals[q];

                    

					gl.deleteBuffer(shape._webgl.buffers[5*q+2]);

                    

                    normalBuffer = gl.createBuffer();

                    shape._webgl.buffers[5*q+2] = normalBuffer;					

                    

                    normals = new Float32Array(shape._webgl.normals[q]);

                    

                    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);             

                    

                    gl.vertexAttribPointer(shape._webgl.shader.normal, 3, shape._webgl.normalType, false,

                        shape._normalStrideOffset[0], shape._normalStrideOffset[1]);

                    

                    normals = null;

                }

                

                shape._dirty.normals = false; 

              }

			  if (!needFullReInit && shape._dirty.texCoords === true)

              {

                if (shape._webgl.shader.texcoord !== undefined)

                {

                    shape._webgl.texcoords[q] =  shape._cf.geometry.node._mesh._texCoords[q];

                    

                    gl.deleteBuffer(shape._webgl.buffers[5*q+3]);

					         

                    texCoordBuffer = gl.createBuffer();

                    shape._webgl.buffers[5*q+3] = texCoordBuffer;

                    

                    texCoords = new Float32Array(shape._webgl.texcoords[q]);

                    

                    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);             

                    

                    gl.vertexAttribPointer(shape._webgl.shader.texCoord, 3, shape._webgl.texCoordType, false,

                        shape._texCoordStrideOffset[0], shape._texCoordStrideOffset[1]);

                    

                    texCoords = null;

                }

                

                shape._dirty.texCoords = false; 

              }

            }



		    if (shape._webgl.imageGeometry)

            {

                var texNode = null;



                IG_texUnit = 1;     //Associate GeometryImage texture units



                if ((texNode = shape._cf.geometry.node.getIndexTexture()) &&

                    shape._cf.geometry.node._dirty.index == true) {

                    shape.updateTexture(texNode, IG_texUnit++, 'index');

                }



                for (i=0; i<shape._webgl.imageGeometry &&

                          shape._cf.geometry.node._dirty.coord == true; i++) {

                    if ((texNode = shape._cf.geometry.node.getCoordinateTexture(i))) {

                        shape.updateTexture(texNode, IG_texUnit++, 'coord');

                    }

                }



                if ((texNode = shape._cf.geometry.node.getNormalTexture(0)) &&

                    shape._cf.geometry.node._dirty.normal == true) {

                    shape.updateTexture(texNode, IG_texUnit++, 'normal');

                }



                if ((texNode = shape._cf.geometry.node.getTexCoordTexture()) &&

                    shape._cf.geometry.node._dirty.texCoord == true) {

                    shape.updateTexture(texNode, IG_texUnit++, 'texCoord');

                }



                if ((texNode = shape._cf.geometry.node.getColorTexture()) &&

                    shape._cf.geometry.node._dirty.color == true) {

                    shape.updateTexture(texNode, IG_texUnit++, 'color');

                }



                shape._cf.geometry.node._dirty.coord = false;

                shape._cf.geometry.node._dirty.normal = false;

                shape._cf.geometry.node._dirty.texCoord = false;

                shape._cf.geometry.node._dirty.color = false;

                shape._cf.geometry.node._dirty.index = false;

            }



            if (!needFullReInit) {

                return;

            }

        }

        else if (!(x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text) ||

                   x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.BinaryGeometry)) &&

                 (!shape._cf.geometry.node || 

				   shape._cf.geometry.node._mesh._positions[0].length < 1) ) 

		{

		    if (x3dom.caps.MAX_VERTEX_TEXTURE_IMAGE_UNITS < 2 &&

		        x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.ImageGeometry)) {

		        x3dom.debug.logError("Can't render ImageGeometry nodes with only " +

		                              x3dom.caps.MAX_VERTEX_TEXTURE_IMAGE_UNITS +

		                             " vertex texture units. Please upgrade your GPU!");

		    }

		    else {

                x3dom.debug.logError("NO VALID MESH OR NO VERTEX POSITIONS SET!");

            }

            return;

        }

        

        // we're on init, thus reset all dirty flags

        shape._dirty.positions = false;

        shape._dirty.normals   = false;

        shape._dirty.texcoords = false;

        shape._dirty.colors    = false;

        shape._dirty.indexes   = false;

        shape._dirty.texture   = false;

		shape._dirty.material  = false;

        shape._dirty.shader    = false;

        

        

        // dynamically attach clean-up method for GL objects

        if (shape._cleanupGLObjects == null)

        {

          shape._cleanupGLObjects = function(force)

          {

            // FIXME; what if complete tree is removed? Then _parentNodes.length my be greater 0.

            if (this._webgl && ((arguments.length > 0 && force) || this._parentNodes.length == 0))

            {

                //var doc = this.findX3DDoc();

                //var gl = doc.ctx.ctx3d;

                var sp = this._webgl.shader;



                for (var cnt=0; this._webgl.texture !== undefined &&

                                cnt < this._webgl.texture.length; cnt++)

                {

                    if (this._webgl.texture[cnt]) {

                        gl.deleteTexture(this._webgl.texture[cnt]);

                    }

                }



                for (var q=0; q<this._webgl.positions.length; q++)

                {

                    if (sp.position !== undefined) {

                        gl.deleteBuffer(this._webgl.buffers[5*q+1]);

                        gl.deleteBuffer(this._webgl.buffers[5*q+0]);

                    }



                    if (sp.normal !== undefined) {

                        gl.deleteBuffer(this._webgl.buffers[5*q+2]);

                    }



                    if (sp.texcoord !== undefined) {

                        gl.deleteBuffer(this._webgl.buffers[5*q+3]);

                    }



                    if (sp.color !== undefined) {

                        gl.deleteBuffer(this._webgl.buffers[5*q+4]);

                    }

                }



                for (var df=0; df<this._webgl.dynamicFields.length; df++)

                {

                    var attrib = this._webgl.dynamicFields[df];



                    if (sp[attrib.name] !== undefined) {

                        gl.deleteBuffer(attrib.buf);

                    }

                }



                delete this._webgl;

            }

          };  // shape._cleanupGLObjects()

        }

        

        

        // TODO; finish text!

        // CANVAS only supports: font, textAlign, textBaseline, fillText, strokeText, measureText, width

        if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text)) 

        {

            var fontStyleNode = shape._cf.geometry.node._cf.fontStyle.node;



            // defaults

            var font_family = ['SERIF'];

            var font_size = 32;

            var font_style = "PLAIN";



            var font_spacing = 1.0;

            var font_horizontal = true;

            var font_justify = 'BEGIN';

            var font_language = "";

            var font_leftToRight = true;

            var font_topToBottom = true;





            // {{{ multiline helper functions start

            var createMultilineText = function(ctx, textToWrite, maxWidth, text) {



                textToWrite = textToWrite.toString().replace("\n"," ");



                var currentText = textToWrite;

                var futureText;

                var subWidth = 0;

                var maxLineWidth = 0;



                var wordArray = textToWrite.split(" ");

                var wordsInCurrent, wordArrayLength;



                wordsInCurrent = wordArrayLength = wordArray.length;



                while (measureText(ctx, currentText) > maxWidth && wordsInCurrent > 1) {

                    wordsInCurrent--;

                    var linebreak = false;



                    currentText = futureText = "";

                    for(var i = 0; i < wordArrayLength; i++) {

                        if (i < wordsInCurrent) {

                            currentText += wordArray[i];

                            if (i+1 < wordsInCurrent) { currentText += " "; }

                        }

                        else {

                            futureText += wordArray[i];

                            if( i+1 < wordArrayLength) { futureText += " "; }

                        }

                    }

                }

                text.push(currentText);

                maxLineWidth = measureText(ctx, currentText);



                if(futureText) {

                    subWidth = createMultilineText(ctx, futureText, maxWidth, text);

                    if (subWidth > maxLineWidth) {

                        maxLineWidth = subWidth;

                    }

                }



                return maxLineWidth;

            };



            // should probably be refactored

            var getPowerOfTwo = function(value, pow) {

                var pow = pow || 1;

                while(pow<value) {

                    pow *= 2;

                }

                return pow;

            };



            var measureText = function(ctx, textToMeasure) {

                return ctx.measureText(textToMeasure).width;

            };

            // }}}





            if (fontStyleNode !== null) {



                var fonts = fontStyleNode._vf.family.toString();



                // clean attribute values and split in array

                fonts = fonts.trim().replace(/\'/g,'').replace(/\,/, ' ');

                fonts = fonts.split(" ");

                

                font_family = Array.map(fonts, function(s) {

                    if (s == 'SANS') { return 'sans-serif'; }

                    else if (s == 'SERIF') { return 'serif'; }

                    else if (s == 'TYPEWRITER') { return 'monospace'; }

                    else { return ''+s+''; }  //'Verdana' 

                }).join(",");

                

                font_style = fontStyleNode._vf.style.toString().replace(/\'/g,'');

                switch (font_style.toUpperCase()) {

                    case 'PLAIN': font_style = 'normal'; break;

                    case 'BOLD': font_style = 'bold'; break;

                    case 'ITALIC': font_style = 'italic'; break;

                    case 'BOLDITALIC': font_style = 'italic bold'; break;

                    default: font_style = 'normal';

                }

                

                font_leftToRight = fontStyleNode._vf.leftToRight ? 'ltr' : 'rtl';

                font_topToBottom = fontStyleNode._vf.topToBottom;

                

                // TODO: make it possible to use mutiple values

                font_justify = fontStyleNode._vf.justify.toString().replace(/\'/g,'');

                switch (font_justify.toUpperCase()) {

                    case 'BEGIN': font_justify = 'left'; break;

                    case 'END': font_justify = 'right'; break;

                    case 'FIRST': font_justify = 'left'; break; // not clear what to do with this one

                    case 'MIDDLE': font_justify = 'center'; break;

                    default: font_justify = 'left';

                }



                font_size = fontStyleNode._vf.size;

                font_spacing = fontStyleNode._vf.spacing;

                font_horizontal = fontStyleNode._vf.horizontal;

                font_language = fontStyleNode._vf.language;

            }



            var string = shape._cf.geometry.node._vf.string;

//            var text = string.toString().split('\\');





            var canvasX, canvasY;

            var textX, textY;

            var textToWrite = string.toString().split('\\');

            var paragraph = [];





            var maxWidth = 100;

            var squareTexture = true;

            var textHeight = font_size;

            var textAlignment = font_justify;





            var text_canvas = document.createElement('canvas');

            text_canvas.dir = font_leftToRight;

            text_canvas.width  = viewarea._width;

            text_canvas.height = font_size;

            text_canvas.display = 'none';



            // needed to make webfonts work

            document.body.appendChild(text_canvas);



            var text_ctx = text_canvas.getContext('2d');



            // calculate font size in px

            text_ctx.font = font_style + " " + font_size + "px " + font_family;  //bold 



            if (maxWidth && measureText(text_ctx, textToWrite) > maxWidth) {

                maxWidth = createMultilineText(text_ctx, textToWrite, maxWidth, paragraph);

                canvasX = getPowerOfTwo(maxWidth);

            } else {

                paragraph.push(textToWrite);

                canvasX = getPowerOfTwo(text_ctx.measureText(textToWrite).width);

            }



            canvasY = getPowerOfTwo(textHeight*(paragraph.length+1));

            if(squareTexture) {

                (canvasX > canvasY) ? canvasY = canvasX : canvasX = canvasY;

            }



//            text_canvas.width = canvasX;

//            text_canvas.height = canvasY;



            switch(textAlignment) {

                case "left":

                    textX = 0;

                    break;

                case "center":

                    textX = canvasX/2;

                    break;

                case "right":

                    textX = canvasX;

                    break;

            }

            textY = canvasY/2;





            var txtW = text_ctx.measureText(string).width;

            var txtH = text_ctx.measureText(string).height || text_canvas.height;



            text_canvas.width = Math.pow(2, Math.ceil(Math.log(txtW)/Math.log(2)));

            text_canvas.height = Math.pow(2, Math.ceil(Math.log(txtH)/Math.log(2)));



            text_ctx.fillStyle = 'rgba(0,0,0,0)';

            text_ctx.fillRect(0, 0, text_ctx.canvas.width, text_ctx.canvas.height);

            

            // write white text with black border

            text_ctx.fillStyle = 'white';

            text_ctx.lineWidth = 2.5;

            text_ctx.strokeStyle = 'grey';

            text_ctx.textBaseline = 'top';



            text_ctx.font = font_style + " " + font_size + "px " + font_family;  //bold 

            text_ctx.textAlign = font_justify;



//            // create the multiline text

//            var offset = (canvasY - textHeight*(paragraph.length+1)) * 0.5;

//            for(var i = 0; i < paragraph.length; i++) {

//                if(paragraph.length > 1) {

//                    textY = (i+1)*textHeight + offset;

//                }

//                text_ctx.fillText(paragraph[i], textX,  textY);

//            }





            var leftOffset = (text_ctx.canvas.width - txtW) / 2.0;

            var topOffset  = (text_ctx.canvas.height - font_size) / 2.0;



            text_ctx.fillText(string, leftOffset, topOffset);

            

            var ids = gl.createTexture();

            gl.bindTexture(gl.TEXTURE_2D, ids);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, text_canvas);

			

			//remove canvas after Texture creation

            document.body.removeChild(text_canvas);

            

            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);

            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);

            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);

            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);

            gl.bindTexture(gl.TEXTURE_2D, null);



            var w = txtW/100.0; //txtW/txtH;

            var h = txtH/100.0;

            

            // prevent distortion

            var v0 = 1, u0 = 0;

            var u = 1, v = 0;



            shape._cf.geometry.node._mesh._positions[0] = [-w,-h,0, w,-h,0, w,h,0, -w,h,0];

            shape._cf.geometry.node._mesh._normals[0] = [0,0,1, 0,0,1, 0,0,1, 0,0,1];

            shape._cf.geometry.node._mesh._texCoords[0] = [u0,v, u,v, u,v0, u0,v0];

            shape._cf.geometry.node._mesh._colors[0] = [];

            shape._cf.geometry.node._mesh._indices[0] = [0,1,2, 2,3,0];

            shape._cf.geometry.node._mesh._invalidate = true;

            shape._cf.geometry.node._mesh._numFaces = 2;

            shape._cf.geometry.node._mesh._numCoords = 4;



            shape._webgl = {

                positions: shape._cf.geometry.node._mesh._positions,

                normals: shape._cf.geometry.node._mesh._normals,

                texcoords: shape._cf.geometry.node._mesh._texCoords,

                colors: shape._cf.geometry.node._mesh._colors,

                indexes: shape._cf.geometry.node._mesh._indices,

                texture: [ids],

				textureFilter: [gl.LINEAR], 

                //buffers: [{},{},{},{},{}],

                coordType: gl.FLOAT,

                normalType: gl.FLOAT,

                texCoordType: gl.FLOAT,

                colorType: gl.FLOAT,

                lightsAndShadow: useLightingFunc(viewarea),

				imageGeometry: 0,

				indexedImageGeometry: 0,

                binaryGeometry: 0   // 0 := no BG

            };



            shape._webgl.primType = gl.TRIANGLES;

			if(x3dom.caps.MOBILE) {

				shape._webgl.shader = this.getShaderProgram(gl, [this.generateVSMobile(viewarea, shape), 

				                                            this.generateFSMobile(viewarea, shape)]);

			} else {

				shape._webgl.shader = this.getShaderProgram(gl, [this.generateVS(viewarea, shape), 

				                                            this.generateFS(viewarea, shape)]);

			}

        }

        else 

        {

            var context = this;

            tex = shape._cf.appearance.node._cf.texture.node;

            

            shape.updateTexture = function(tex, unit, saveSize)

            {

                var that = this;

                var texture;

                var childTex = (tex._video !== undefined && 

                                tex._video !== null && 

                                tex._needPerFrameUpdate !== undefined && 

                                tex._needPerFrameUpdate === true);

				

                if (this._webgl.texture === undefined) {

                    this._webgl.texture = [];

                }

                

				if(this._webgl.textureFilter === undefined) {

					that._webgl.textureFilter = [];

					that._webgl.textureFilter[unit] = gl.LINEAR;

				}

				

                if (tex._isCanvas && tex._canvas) {

                    texture = gl.createTexture();

                    that._webgl.texture[unit] = texture;

                    gl.bindTexture(gl.TEXTURE_2D, texture);

                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex._canvas);

                    

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    gl.bindTexture(gl.TEXTURE_2D, null);

                }

                else if (x3dom.isa(tex, x3dom.nodeTypes.RenderedTexture))

                {

                    that._webgl.texture[unit] = tex._webgl.fbo.tex;

                    gl.bindTexture(gl.TEXTURE_2D, tex._webgl.fbo.tex);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    gl.bindTexture(gl.TEXTURE_2D, null);

                }

                else if (x3dom.isa(tex, x3dom.nodeTypes.PixelTexture))

                {

                    var pixels = new Uint8Array(tex._vf.image.toGL());

                    

                    var format = gl.NONE;

                    switch (tex._vf.image.comp)

                    {

                        case 1: format = gl.LUMINANCE; break;

                        case 2: format = gl.LUMINANCE_ALPHA; break;

                        case 3: format = gl.RGB; break;

                        case 4: format = gl.RGBA; break;

                    }

                    

                    texture = gl.createTexture();

                    that._webgl.texture[unit] = texture;

                    gl.bindTexture(gl.TEXTURE_2D, texture);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                    

                    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

                    gl.texImage2D(gl.TEXTURE_2D, 0, format, 

                            tex._vf.image.width, tex._vf.image.height, 0, 

                            format, gl.UNSIGNED_BYTE, pixels);

                }

                else if (x3dom.isa(tex, x3dom.nodeTypes.MultiTexture))

                {

                    for (var cnt=0; cnt<tex.size(); cnt++)

                    {

                        var singleTex = tex.getTexture(cnt);

                        if (!singleTex) {

                            break;

                        }

                        that.updateTexture(singleTex, cnt, "false");

                    }

                }

                else if (x3dom.isa(tex, x3dom.nodeTypes.MovieTexture) || childTex)

                {

                    texture = gl.createTexture();



                    if (!childTex)

                    {

                        tex._video = document.createElement('video');

                        tex._video.setAttribute('autobuffer', 'true');

                        var p = document.getElementsByTagName('body')[0];

                        p.appendChild(tex._video);

                        //tex._video.style.display = "none";

                        //tex._video.style.display = "inline";

                        tex._video.style.visibility = "hidden";

                    }

                    

                    for (var i=0; i<tex._vf.url.length; i++)

                    {

                        var videoUrl = tex._nameSpace.getURL(tex._vf.url[i]);

                        x3dom.debug.logInfo('Adding video file: ' + videoUrl);

                        var src = document.createElement('source');

                        src.setAttribute('src', videoUrl);

                        tex._video.appendChild(src);

                    }



                    var updateMovie = function()

                    {

                        that._nameSpace.doc.needRender = true;



						if (saveSize == "index" || saveSize == "coord" || saveSize == "normal" || 

						    saveSize == "texCoord") {

							that._webgl.textureFilter[unit] = gl.NEAREST;

						}					

    

                        gl.bindTexture(gl.TEXTURE_2D, texture);

                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex._video);

                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, that._webgl.textureFilter[unit]);

                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, that._webgl.textureFilter[unit]);

                        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

                        //gl.generateMipmap(gl.TEXTURE_2D);

                        gl.bindTexture(gl.TEXTURE_2D, null);

                    };

                    

                    var startVideo = function()

                    {

                        that._nameSpace.doc.needRender = true;          

                        

                        that._webgl.texture[unit] = texture;

						

                        if(saveSize == "coord") {

							that._webgl.coordTextureWidth  = tex._video.clientWidth;

							that._webgl.coordTextureHeight = tex._video.clientHeight;

						} else if(saveSize == "index"){

							that._webgl.indexTextureWidth  = tex._video.clientWidth;

							that._webgl.indexTextureHeight = tex._video.clientHeight;

						}

                        x3dom.debug.logInfo(texture + " video tex url: " + tex._vf.url[0]);

                        

                        tex._video.play();

                        tex._intervalID = setInterval(updateMovie, 16);

                    };

                    

                    var videoDone = function()

                    {

                        clearInterval(tex._intervalID);

                        

                        if (tex._vf.loop === true)

                        {

                            tex._video.play();

                            tex._intervalID = setInterval(updateMovie, 16);

                        }

                    };

                    

                    // Start listening for the canplaythrough event, so we do not

                    // start playing the video until we can do so without stuttering

                    tex._video.addEventListener("canplaythrough", startVideo, true);



                    // Start listening for the ended event, so we can stop the

                    // texture update when the video is finished playing

                    tex._video.addEventListener("ended", videoDone, true);

                }

                else if (x3dom.isa(tex, x3dom.nodeTypes.X3DEnvironmentTextureNode))

                {

                    texture = context.loadCubeMap(gl, tex.getTexUrl(), that._nameSpace.doc, false);

                    that._webgl.texture[unit] = texture;

                }

                else

                {

                    var t00 = new Date().getTime();

                    

                    texture = gl.createTexture();

					

					//Old Loading

					var image = new Image();

					image.crossOrigin = '';

                    image.src = tex._nameSpace.getURL(tex._vf.url[0]);

					

                    that._nameSpace.doc.downloadCount += 1;					



					//var image = tex._image;

                    //var load = function()

					image.onload = function()

                    {    

						x3dom.ImageLoadManager.activeDownloads--;

						

						that._nameSpace.doc.needRender = true;

                        that._nameSpace.doc.downloadCount -= 1;

						

                        if(tex._vf.scale){

                            image = scaleImage(image);

                        }

                        

						that._webgl.texture[unit] = texture;

						

						if (saveSize == "coord") {

							that._webgl.coordTextureWidth  = image.width;

							that._webgl.coordTextureHeight = image.height;

						} else if(saveSize == "index"){

							that._webgl.indexTextureWidth  = image.width;

							that._webgl.indexTextureHeight = image.height;

						}

						

						if (saveSize == "index" || saveSize == "coord" || saveSize == "normal" || 

						    saveSize == "texCoord" ||saveSize == "color") {

							that._webgl.textureFilter[unit] = gl.NEAREST;

						} else{

							that._webgl.textureFilter[unit] = gl.LINEAR;

						}

						

                        gl.bindTexture(gl.TEXTURE_2D, texture);

                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, that._webgl.textureFilter[unit]);

                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, that._webgl.textureFilter[unit]);

                        //gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);

                        //gl.generateMipmap(gl.TEXTURE_2D);

                        gl.bindTexture(gl.TEXTURE_2D, null);

						

						tex._complete = true;

						

                        var t11 = new Date().getTime() - t00;

                        //x3dom.debug.logInfo(texture + " bound tex url " + tex._vf.url[0] + " at unit " + unit +

                        //                    " with img load time " + t11 + " ms.");

                    };



                    image.onerror = function()

                    {

                        that._nameSpace.doc.downloadCount -= 1;



                        x3dom.debug.logError("Can't load tex url: " + tex._vf.url[0] + " (at unit " + unit + ").");

                    };

					

					//(tex._complete || image.complete) ? load() : image.addEventListener('ImageLoadManager_Load', load, true);

                }

            };

			

			var indexed = 0, numCoordinateTextures = 0;



			if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.ImageGeometry) && !x3dom.caps.MOBILE)

            {

				numCoordinateTextures = shape._cf.geometry.node.numCoordinateTextures();

				indexed = (shape._cf.geometry.node.getIndexTexture() != null) ? 1.0 : 0.0;

			}



			//Needed for right picking shader

			viewarea._scene._webgl.imageGeometry = numCoordinateTextures;

            

            shape._webgl = {

                positions: shape._cf.geometry.node._mesh._positions,

                normals: shape._cf.geometry.node._mesh._normals,

                texcoords: shape._cf.geometry.node._mesh._texCoords,

                colors: shape._cf.geometry.node._mesh._colors,

                indexes: shape._cf.geometry.node._mesh._indices,

                //indicesBuffer,positionBuffer,normalBuffer,texcBuffer,colorBuffer

                //buffers: [{},{},{},{},{}],

                coordType: gl.FLOAT,

                normalType: gl.FLOAT,

                texCoordType: gl.FLOAT,

                colorType: gl.FLOAT,

                lightsAndShadow: useLightingFunc(viewarea),

				imageGeometry: numCoordinateTextures,

				indexedImageGeometry: indexed,

				binaryGeometry: 0   // 0 := no BG, 1 := indexed BG, -1 := non-indexed BG

            };

            

            if (tex) {

                shape.updateTexture(tex, 0, "false");

            }

			

			//If GeometryImage-Node load textures

			if(shape._webgl.imageGeometry) {

				var IG_texUnit = 1;

				

				var indexTexture = shape._cf.geometry.node.getIndexTexture();

				if(indexTexture) {

					shape.updateTexture(indexTexture, IG_texUnit++, 'index');

				}

				

				for(i=0; i<numCoordinateTextures; i++) {

					var coordinateTexture = shape._cf.geometry.node.getCoordinateTexture(i);

					if(coordinateTexture) {

						shape.updateTexture(coordinateTexture, IG_texUnit++, 'coord');

					}

				}

							

				var normalTexture = shape._cf.geometry.node.getNormalTexture(0);

				if(normalTexture) {

					shape.updateTexture(normalTexture, IG_texUnit++, "normal");

				}

				

				var texCoordTexture = shape._cf.geometry.node.getTexCoordTexture();

				if(texCoordTexture) {

					shape.updateTexture(texCoordTexture, IG_texUnit++, "texCoord");

				}

				

				var colorTexture = shape._cf.geometry.node.getColorTexture();

				if(colorTexture) {

					shape.updateTexture(colorTexture, IG_texUnit++, "color");

				}



                shape._cf.geometry.node._dirty.coord = false;

                shape._cf.geometry.node._dirty.normal = false;

                shape._cf.geometry.node._dirty.texCoord = false;

                shape._cf.geometry.node._dirty.color = false;

                shape._cf.geometry.node._dirty.index = false;

			}

            

            

            if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.PointSet) || 

				x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Polypoint2D)) 

			{

                shape._webgl.primType = gl.POINTS;

                

                //TODO; remove these hacky thousands of shaders!!!

                if (shape._webgl.colors[0].length) {

                    shape._webgl.shader = this.getShaderProgram(gl, 

                                          ['vs-x3d-vertexcolorUnlit', 'fs-x3d-vertexcolorUnlit']);					

                }

                else {

                    shape._webgl.shader = this.getShaderProgram(gl, 

                                          ['vs-x3d-default', 'fs-x3d-default']);

                }

            }

            else if ( (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.IndexedLineSet)) ||

					  (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Circle2D)) ||

					  (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Arc2D)) || 

					  (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Polyline2D)))

			{

                shape._webgl.primType = gl.LINES;

                

                if (shape._webgl.colors[0].length) {

                    shape._webgl.shader = this.getShaderProgram(gl, 

                                          ['vs-x3d-vertexcolorUnlit', 'fs-x3d-vertexcolorUnlit']);

                }

                else {

                    shape._webgl.shader = this.getShaderProgram(gl, 

                                          ['vs-x3d-default', 'fs-x3d-default']);

                }

            }

            else 

            {

                //TODO; also account for other cases such as LineSet

				if ( x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.ImageGeometry) ) {

					shape._webgl.primType = [];

					for(var i=0; i<shape._cf.geometry.node._vf.primType.length; i++) {				

						if(shape._cf.geometry.node._vf.primType[i].toUpperCase() == 'POINTS') {

							shape._webgl.primType.push(gl.POINTS);

						} else if(shape._cf.geometry.node._vf.primType[i].toUpperCase() == 'TRIANGLESTRIP'){

							shape._webgl.primType.push(gl.TRIANGLE_STRIP);

						} else {

							shape._webgl.primType.push(gl.TRIANGLES);

						}

					}

				} else if(x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.IndexedTriangleStripSet) &&  

				          shape._cf.geometry.node._mesh._primType.toUpperCase() == 'TRIANGLESTRIP') {

					shape._webgl.primType = gl.TRIANGLE_STRIP;

				} else {

					shape._webgl.primType = gl.TRIANGLES;

				}

                

                /** SHADER HACK (TODO: MAKE BETTER!) */

				

                if (shape._cf.appearance.node._shader !== null) {

                    if(x3dom.isa(shape._cf.appearance.node._shader, x3dom.nodeTypes.CommonSurfaceShader)) {

                        

                        var texCnt = 0;

                        var cssMode = 0; //Bit coded CSS Modes - 1.Bit > Diffuse, 2.Bit > Normal, 3.Bit > Specular

                        var cssShader = shape._cf.appearance.node._shader;

                        

                        var diffuseTex  = cssShader.getDiffuseMap();

                        var normalTex   = cssShader.getNormalMap(); 

                        var specularTex = cssShader.getSpecularMap(); 

                        

                        if(diffuseTex != null){

                            shape.updateTexture(diffuseTex, texCnt++, "false");

                        }

                        if(normalTex != null){

                            shape.updateTexture(normalTex, texCnt++, "false");

                        }

                        if(specularTex != null){

                            shape.updateTexture(specularTex, texCnt++, "false");

                        }

                        

						if(x3dom.caps.MOBILE) {

							x3dom.debug.logWarning("No mobile shader for CommonSurfaceShader! Using high quality shader!");

						}

						shape._webgl.shader = this.getShaderProgram(gl, [this.generateVS(viewarea, shape), 

                                                                    this.generateFS(viewarea, shape)]);

                    }

                    else {

                        //FIXME; HACK

                        var hackID = 'HACK'+shape._objectID;

                        g_shaders['vs-x3d-'+hackID] = {};

                        g_shaders['vs-x3d-'+hackID].type = "vertex";

                        g_shaders['vs-x3d-'+hackID].data = shape._cf.appearance.node._shader._vertex._vf.url[0];

                        g_shaders['fs-x3d-'+hackID] = {};

                        g_shaders['fs-x3d-'+hackID].type = "fragment";

                        g_shaders['fs-x3d-'+hackID].data = shape._cf.appearance.node._shader._fragment._vf.url[0];

                        shape._webgl.shader = getDefaultShaderProgram(gl, hackID);

                        //END OF HACK

                    }

                } 

                else {

					if(x3dom.caps.MOBILE) {

						shape._webgl.shader = this.getShaderProgram(gl, [this.generateVSMobile(viewarea, shape), 

                                                                    this.generateFSMobile(viewarea, shape)]);

					} else {

						shape._webgl.shader = this.getShaderProgram(gl, [this.generateVS(viewarea, shape), 

                                                                    this.generateFS(viewarea, shape)]);

					}

				}

            }

        }

		

		// init vertex attribs

        var sp = shape._webgl.shader;

        var currAttribs = 0;

        

        shape._webgl.buffers = [];

        shape._webgl.dynamicFields = [];

        

        // BinaryGeometry needs special handling

        if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.BinaryGeometry)) 

        {

            var t00 = new Date().getTime();

            

            shape._webgl.primType = [];

            

			for (var primCnt=0; primCnt<shape._cf.geometry.node._vf.primType.length; ++primCnt) 

			{

			    switch(shape._cf.geometry.node._vf.primType[primCnt].toUpperCase())

			    {

			        case 'POINTS':

			            shape._webgl.primType.push(gl.POINTS);

			            break;

			        case 'LINES':

			            shape._webgl.primType.push(gl.LINES);

			            break;

			        case 'TRIANGLESTRIP':

			            shape._webgl.primType.push(gl.TRIANGLE_STRIP);

			            break;

			        case 'TRIANGLES':

			        default:

			            shape._webgl.primType.push(gl.TRIANGLES);

			            break;

			    }

			}

			

			// 0 := no BG, 1 := indexed BG, -1 := non-indexed BG

			shape._webgl.binaryGeometry = -1;

			

            // index

            if (shape._cf.geometry.node._vf.index.length > 0)

            {

                var xmlhttp0 = new XMLHttpRequest();

                xmlhttp0.open("GET", encodeURI(shape._nameSpace.getURL(

                                        shape._cf.geometry.node._vf.index)) , true);

                xmlhttp0.responseType = "arraybuffer";

            

                shape._nameSpace.doc.downloadCount += 1;

            

                xmlhttp0.send(null);

            

                xmlhttp0.onload = function() 

                {

                    var XHR_buffer = xmlhttp0.response;



                    var indicesBuffer = gl.createBuffer();

                    shape._webgl.buffers[0] = indicesBuffer;



                    var indexArray = getArrayBufferView("Uint16", XHR_buffer);



                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);



                    // Test reading Data

                    //x3dom.debug.logWarning("arraybuffer[0]="+indexArray[0]+"; n="+indexArray.length);

                    

                    shape._webgl.binaryGeometry = 1;    // indexed BG

                    

        		    var geoNode = shape._cf.geometry.node;

        		    

                    if (geoNode._vf.vertexCount[0] == 0)

                        geoNode._vf.vertexCount[0] = indexArray.length;

                    

                    geoNode._mesh._numFaces = 0;

                    

                    for (var i=0; i<geoNode._vf.vertexCount.length; i++) {

                        if (shape._webgl.primType[i] == gl.TRIANGLE_STRIP)

                            geoNode._mesh._numFaces += geoNode._vf.vertexCount[i] - 2;

                        else

                            geoNode._mesh._numFaces += geoNode._vf.vertexCount[i] / 3;

                    }



                    indexArray = null;



                    shape._nameSpace.doc.downloadCount -= 1;

                    shape._nameSpace.doc.needRender = true;



                    var t11 = new Date().getTime() - t00;   

                    x3dom.debug.logInfo("XHR0/ index load time: " + t11 + " ms"); 

                };

            }



            // interleaved array -- assume all attributes are given in one single array buffer

            if (shape._cf.geometry.node._hasStrideOffset && shape._cf.geometry.node._vf.coord.length > 0)

            {

                var xmlhttp = new XMLHttpRequest();

                xmlhttp.open("GET", encodeURI(shape._nameSpace.getURL(

                                        shape._cf.geometry.node._vf.coord)) , true);

                xmlhttp.responseType = "arraybuffer";



                shape._nameSpace.doc.downloadCount += 1;

                xmlhttp.send(null);



                xmlhttp.onload = function()

                {

                    var XHR_buffer = xmlhttp.response;



                    var geoNode = shape._cf.geometry.node;

                    var attribTypeStr = geoNode._vf.coordType;



                    // assume same data type for all attributes (but might be wrong)

                    shape._webgl.coordType = getVertexAttribType(attribTypeStr, gl);

                    shape._webgl.normalType = shape._webgl.coordType;

                    shape._webgl.texCoordType = shape._webgl.coordType;

                    shape._webgl.colorType = shape._webgl.coordType;



                    var attributes = getArrayBufferView(attribTypeStr, XHR_buffer);



                    // calculate number of single data packages by including stride and type size

                    var dataLen = shape._coordStrideOffset[0] / getDataTypeSize(attribTypeStr);

                    if (dataLen)

                        geoNode._mesh._numCoords = (attributes.length / dataLen) / 3;



                    var buffer = gl.createBuffer();



                    shape._webgl.buffers[1] = buffer;



                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

                    gl.bufferData(gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW);



                    gl.vertexAttribPointer(sp.position, 3, shape._webgl.coordType, false,

                        shape._coordStrideOffset[0], shape._coordStrideOffset[1]);

                    gl.enableVertexAttribArray(sp.position);



                    if (shape._cf.geometry.node._vf.normal.length > 0)

                    {

                        shape._webgl.buffers[2] = buffer;



                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

                        gl.bufferData(gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW);



                        gl.vertexAttribPointer(sp.normal, 3, shape._webgl.normalType, false,

                            shape._normalStrideOffset[0], shape._normalStrideOffset[1]);

                        gl.enableVertexAttribArray(sp.normal);

                    }



                    if (shape._cf.geometry.node._vf.texCoord.length > 0)

                    {

                        shape._webgl.buffers[3] = buffer;



                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

                        gl.bufferData(gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW);



                        gl.vertexAttribPointer(sp.texcoord, 2, shape._webgl.texCoordType, false,

                            shape._texCoordStrideOffset[0], shape._texCoordStrideOffset[1]);

                        gl.enableVertexAttribArray(sp.texcoord);

                    }



                    if (shape._cf.geometry.node._vf.color.length > 0)

                    {

                        shape._webgl.buffers[4] = buffer;



                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

                        gl.bufferData(gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW);



                        gl.vertexAttribPointer(sp.color, 3, shape._webgl.colorType, false,

                            shape._colorStrideOffset[0], shape._colorStrideOffset[1]);

                        gl.enableVertexAttribArray(sp.color);

                    }



                    attributes = null;  // delete data block in CPU memory



                    shape._nameSpace.doc.downloadCount -= 1;

                    shape._nameSpace.doc.needRender = true;



                    var t11 = new Date().getTime() - t00;

                    x3dom.debug.logInfo("XHR/ interleaved array load time: " + t11 + " ms");

                };

            }

            

            // coord

            if (!shape._cf.geometry.node._hasStrideOffset && shape._cf.geometry.node._vf.coord.length > 0)

            {

                var xmlhttp1 = new XMLHttpRequest();

                xmlhttp1.open("GET", encodeURI(shape._nameSpace.getURL(

                                        shape._cf.geometry.node._vf.coord)) , true);

                xmlhttp1.responseType = "arraybuffer";

            

                shape._nameSpace.doc.downloadCount += 1;

            

                xmlhttp1.send(null);

            

                xmlhttp1.onload = function() 

                {

                    var XHR_buffer = xmlhttp1.response;



                    positionBuffer = gl.createBuffer();

                    shape._webgl.buffers[1] = positionBuffer;

                    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);               



                    var attribTypeStr = shape._cf.geometry.node._vf.coordType;

                    shape._webgl.coordType = getVertexAttribType(attribTypeStr, gl);



                    var vertices = getArrayBufferView(attribTypeStr, XHR_buffer);

                    

                    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

                    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);



                    gl.vertexAttribPointer(sp.position, 3, shape._webgl.coordType, false,

                        shape._coordStrideOffset[0], shape._coordStrideOffset[1]);

                    gl.enableVertexAttribArray(sp.position);



                    // Test reading Data

                    //x3dom.debug.logWarning("arraybuffer[0].vx="+vertices[0]);

                    

                    shape._cf.geometry.node._mesh._numCoords = vertices.length / 3;



                    if ((attribTypeStr == "Float32") &&

                        (shape._vf.bboxSize.x < 0 || shape._vf.bboxSize.y < 0 || shape._vf.bboxSize.z < 0))

                    {

                        var min = new x3dom.fields.SFVec3f(vertices[0],vertices[1],vertices[2]);

                        var max = new x3dom.fields.SFVec3f(vertices[0],vertices[1],vertices[2]);



                        for (var i=3; i<vertices.length; i+=3)

                        {

                            if (min.x > vertices[i+0]) { min.x = vertices[i+0]; }

                            if (min.y > vertices[i+1]) { min.y = vertices[i+1]; }

                            if (min.z > vertices[i+2]) { min.z = vertices[i+2]; }



                            if (max.x < vertices[i+0]) { max.x = vertices[i+0]; }

                            if (max.y < vertices[i+1]) { max.y = vertices[i+1]; }

                            if (max.z < vertices[i+2]) { max.z = vertices[i+2]; }

                        }



                        // TODO; move to mesh for all cases?

                        shape._vf.bboxCenter.setValues(min.add(max).multiply(0.5));

                        shape._vf.bboxSize.setValues(max.subtract(min));

                    }

                    

                    vertices = null;



                    shape._nameSpace.doc.downloadCount -= 1;

                    shape._nameSpace.doc.needRender = true;



                    var t11 = new Date().getTime() - t00;   

                    x3dom.debug.logInfo("XHR1/ coord load time: " + t11 + " ms"); 

                };

            }

            

            // normal

            if (!shape._cf.geometry.node._hasStrideOffset && shape._cf.geometry.node._vf.normal.length > 0)

            {

                var xmlhttp2 = new XMLHttpRequest();

                xmlhttp2.open("GET", encodeURI(shape._nameSpace.getURL(

                                        shape._cf.geometry.node._vf.normal)) , true);

                xmlhttp2.responseType = "arraybuffer";

            

                shape._nameSpace.doc.downloadCount += 1;

            

                xmlhttp2.send(null);

            

                xmlhttp2.onload = function() 

                {

                    var XHR_buffer = xmlhttp2.response;



                    var normalBuffer = gl.createBuffer();

                    shape._webgl.buffers[2] = normalBuffer;



                    var attribTypeStr = shape._cf.geometry.node._vf.normalType;

                    shape._webgl.normalType = getVertexAttribType(attribTypeStr, gl);



                    var normals = getArrayBufferView(attribTypeStr, XHR_buffer);



                    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);                



                    gl.vertexAttribPointer(sp.normal, 3, shape._webgl.normalType, false,

                        shape._normalStrideOffset[0], shape._normalStrideOffset[1]);

                    gl.enableVertexAttribArray(sp.normal);



                    // Test reading Data

                    //x3dom.debug.logWarning("arraybuffer[0].nx="+normals[0]);  



                    normals = null;



                    shape._nameSpace.doc.downloadCount -= 1;

                    shape._nameSpace.doc.needRender = true;



                    var t11 = new Date().getTime() - t00;   

                    x3dom.debug.logInfo("XHR2/ normal load time: " + t11 + " ms");

                };

            }

            

            // texCoord

            if (!shape._cf.geometry.node._hasStrideOffset && shape._cf.geometry.node._vf.texCoord.length > 0)

            {

                var xmlhttp3 = new XMLHttpRequest();

                xmlhttp3.open("GET", encodeURI(shape._nameSpace.getURL(

                                        shape._cf.geometry.node._vf.texCoord)) , true);

                xmlhttp3.responseType = "arraybuffer";

            

                shape._nameSpace.doc.downloadCount += 1;

            

                xmlhttp3.send(null);

            

                xmlhttp3.onload = function() 

                {

                    var XHR_buffer = xmlhttp3.response;



                    var texcBuffer = gl.createBuffer();

                    shape._webgl.buffers[3] = texcBuffer;



                    var attribTypeStr = shape._cf.geometry.node._vf.texCoordType;

                    shape._webgl.texCoordType = getVertexAttribType(attribTypeStr, gl);



                    var texCoords = getArrayBufferView(attribTypeStr, XHR_buffer);



                    gl.bindBuffer(gl.ARRAY_BUFFER, texcBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);



                    gl.vertexAttribPointer(sp.texcoord, 2, shape._webgl.texCoordType, false,

                        shape._texCoordStrideOffset[0], shape._texCoordStrideOffset[1]);

                    gl.enableVertexAttribArray(sp.texcoord);



                    // Test reading Data

                    //x3dom.debug.logWarning("arraybuffer[0].tx="+texCoords[0]);  



                    texCoords = null;



                    shape._nameSpace.doc.downloadCount -= 1;

                    shape._nameSpace.doc.needRender = true;



                    var t11 = new Date().getTime() - t00;   

                    x3dom.debug.logInfo("XHR3/ texCoord load time: " + t11 + " ms"); 

                };

            }

          

            // color

            if (!shape._cf.geometry.node._hasStrideOffset && shape._cf.geometry.node._vf.color.length > 0)

            {

                var xmlhttp4 = new XMLHttpRequest();

                xmlhttp4.open("GET", encodeURI(shape._nameSpace.getURL(

                                        shape._cf.geometry.node._vf.color)) , true);

                xmlhttp4.responseType = "arraybuffer";

            

                shape._nameSpace.doc.downloadCount += 1;

            

                xmlhttp4.send(null);

            

                xmlhttp4.onload = function() 

                {

                    var XHR_buffer = xmlhttp4.response;



                    var colorBuffer = gl.createBuffer();

                    shape._webgl.buffers[4] = colorBuffer;



                    var attribTypeStr = shape._cf.geometry.node._vf.colorType;

                    shape._webgl.colorType = getVertexAttribType(attribTypeStr, gl);



                    var colors = getArrayBufferView(attribTypeStr, XHR_buffer);



                    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);             



                    gl.vertexAttribPointer(sp.color, 3, shape._webgl.colorType, false,

                        shape._colorStrideOffset[0], shape._colorStrideOffset[1]);

                    gl.enableVertexAttribArray(sp.color);



                    // Test reading Data

                    //x3dom.debug.logWarning("arraybuffer[0].cx="+colors[0]);  



                    colors = null;



                    shape._nameSpace.doc.downloadCount -= 1;

                    shape._nameSpace.doc.needRender = true;



                    var t11 = new Date().getTime() - t00;   

                    x3dom.debug.logInfo("XHR4/ color load time: " + t11 + " ms");

                };

            }

            

            // TODO: tangent AND binormal

        }

		else if(x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.ImageGeometry))

		{

			if(this.IG_PositionBuffer == null) {

				this.IG_PositionBuffer = gl.createBuffer();

			}

            shape._webgl.buffers[5*q+1] = this.IG_PositionBuffer;

            gl.bindBuffer(gl.ARRAY_BUFFER, this.IG_PositionBuffer);

            

            vertices = new Float32Array(shape._webgl.positions[q]);

            

            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.IG_PositionBuffer);

            

            gl.vertexAttribPointer(sp.position, 3, shape._webgl.coordType, false,

                shape._coordStrideOffset[0], shape._coordStrideOffset[1]);

            gl.enableVertexAttribArray(sp.position);



            vertices = null;

		}

		

        else // No BinaryMesh -- FIXME

        {

            

            for (q=0; q<shape._webgl.positions.length; q++)

            {

              if (sp.position !== undefined) 

              {

                // bind indices for drawElements() call

                var indicesBuffer = gl.createBuffer();

                shape._webgl.buffers[5*q+0] = indicesBuffer;

            

                var indexArray = new Uint16Array(shape._webgl.indexes[q]);

            

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

            

                indexArray = null;

            

                positionBuffer = gl.createBuffer();

                shape._webgl.buffers[5*q+1] = positionBuffer;

                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            

                vertices = new Float32Array(shape._webgl.positions[q]);

            

                gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            

                gl.vertexAttribPointer(sp.position, 3, shape._webgl.coordType, false,

                    shape._coordStrideOffset[0], shape._coordStrideOffset[1]);

                gl.enableVertexAttribArray(sp.position);



                vertices = null;

              }

              if (sp.normal !== undefined) 

              {

                var normalBuffer = gl.createBuffer();

                shape._webgl.buffers[5*q+2] = normalBuffer;

            

                var normals = new Float32Array(shape._webgl.normals[q]);

            

                gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

                gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);                

            

                gl.vertexAttribPointer(sp.normal, 3, shape._webgl.normalType, false,

                    shape._normalStrideOffset[0], shape._normalStrideOffset[1]);

                gl.enableVertexAttribArray(sp.normal);



                normals = null;

              }

              if (sp.texcoord !== undefined)

              {

                var texcBuffer = gl.createBuffer();

                shape._webgl.buffers[5*q+3] = texcBuffer;

            

                var texCoords = new Float32Array(shape._webgl.texcoords[q]);

            

                gl.bindBuffer(gl.ARRAY_BUFFER, texcBuffer);

                gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

            

                gl.vertexAttribPointer(sp.texcoord, 

                    shape._cf.geometry.node._mesh._numTexComponents, shape._webgl.texCoordType, false,

                    shape._texCoordStrideOffset[0], shape._texCoordStrideOffset[1]);

                gl.enableVertexAttribArray(sp.texcoord);

                

                texCoords = null;

              }

              if (sp.color !== undefined)

              {

                var colorBuffer = gl.createBuffer();

                shape._webgl.buffers[5*q+4] = colorBuffer;

            

                var colors = new Float32Array(shape._webgl.colors[q]);



                gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

                gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);             

            

                gl.vertexAttribPointer(sp.color, 

                    shape._cf.geometry.node._mesh._numColComponents, shape._webgl.colorType, false,

                    shape._colorStrideOffset[0], shape._colorStrideOffset[1]);

                gl.enableVertexAttribArray(sp.color);

                

                colors = null;

              }

            }

        

            // TODO; FIXME; what if geometry with split mesh has dynamic fields?

            for (var df in shape._cf.geometry.node._mesh._dynamicFields)

            {

                var attrib = shape._cf.geometry.node._mesh._dynamicFields[df];

            

                shape._webgl.dynamicFields[currAttribs] = {

                      buf: {}, name: df, numComponents: attrib.numComponents };

            

                if (sp[df] !== undefined)

                {

                    var attribBuffer = gl.createBuffer();

                    shape._webgl.dynamicFields[currAttribs++].buf = attribBuffer;

                

                    var attribs = new Float32Array(attrib.value);

                

                    gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, attribs, gl.STATIC_DRAW);                

                

                    gl.vertexAttribPointer(sp[df], attrib.numComponents, gl.FLOAT, false, 0, 0); 



                    attribs = null;

                }

            }

            

        } // No BinaryGeometry -- FIXME

        

        shape._webgl._minFilterDic = {

             NEAREST:                      gl.NEAREST                ,

             LINEAR:                       gl.LINEAR                 ,

             NEAREST_MIPMAP_NEAREST:       gl.NEAREST_MIPMAP_NEAREST ,

             NEAREST_MIPMAP_LINEAR:        gl.NEAREST_MIPMAP_LINEAR  ,

             LINEAR_MIPMAP_NEAREST:        gl.LINEAR_MIPMAP_NEAREST  ,

             LINEAR_MIPMAP_LINEAR:         gl.LINEAR_MIPMAP_LINEAR   ,

             AVG_PIXEL:                    gl.LINEAR                 ,

             AVG_PIXEL_AVG_MIPMAP:         gl.LINEAR_MIPMAP_LINEAR   ,

             AVG_PIXEL_NEAREST_MIPMAP:     gl.LINEAR_MIPMAP_NEAREST  ,

             DEFAULT:                      gl.LINEAR_MIPMAP_LINEAR   ,

             FASTEST:                      gl.NEAREST                ,

             NEAREST_PIXEL:                gl.NEAREST                ,

             NEAREST_PIXEL_AVG_MIPMAP:     gl.NEAREST_MIPMAP_LINEAR  ,

             NEAREST_PIXEL_NEAREST_MIPMAP: gl.NEAREST_MIPMAP_NEAREST ,

             NICEST:                       gl.LINEAR_MIPMAP_LINEAR   

        };



        shape._webgl._magFilterDic = {

             NEAREST:          gl.NEAREST  ,

             LINEAR:           gl.LINEAR   ,

             AVG_PIXEL:        gl.LINEAR   ,

             DEFAULT:          gl.LINEAR   ,

             FASTEST:          gl.NEAREST  ,

             NEAREST_PIXEL:    gl.NEAREST  ,

             NICEST:           gl.LINEAR   

        };



       shape._webgl._boundaryModesDic = {

             //CLAMP:             gl.CLAMP,             // NO PART OF WebGL

             CLAMP:             gl.CLAMP_TO_EDGE,

             CLAMP_TO_EDGE:     gl.CLAMP_TO_EDGE,

             //CLAMP_TO_BOUNDARY: gl.CLAMP_TO_BORDER,

             CLAMP_TO_BOUNDARY: gl.CLAMP_TO_EDGE,       // NO PART OF WebGL

             MIRRORED_REPEAT:   gl.MIRRORED_REPEAT,

             REPEAT:            gl.REPEAT 

        };

    };

    

    

//----------------------------------------------------------------------------

/*! mainly manages rendering of backgrounds and buffer clearing

 */

//----------------------------------------------------------------------------

    Context.prototype.setupScene = function(gl, bgnd) {

        var sphere;

        var texture;

        

        if (bgnd._webgl !== undefined)

        {

            if (!bgnd._dirty) {

                return;

            }

            

            if (bgnd._webgl.texture !== undefined && bgnd._webgl.texture)

            {

                gl.deleteTexture(bgnd._webgl.texture);

            }

            if (bgnd._webgl.shader.position !== undefined) 

            {

                gl.deleteBuffer(bgnd._webgl.buffers[1]);

                gl.deleteBuffer(bgnd._webgl.buffers[0]);

            }

            if (bgnd._webgl.shader.texcoord !== undefined) 

            {

                gl.deleteBuffer(bgnd._webgl.buffers[2]);

            }

            bgnd._webgl = {};

        }

        

        bgnd._dirty = false;

        

        var url = bgnd.getTexUrl();

        var i = 0;

        var w = 1, h = 1;

        

        if (url.length > 0 && url[0].length > 0)

        {

            if (url.length >= 6 && url[1].length > 0 && url[2].length > 0 && 

                url[3].length > 0 && url[4].length > 0 && url[5].length > 0)

            {

                sphere = new x3dom.nodeTypes.Sphere();

                

                bgnd._webgl = {

                    positions: sphere._mesh._positions[0],

                    indexes: sphere._mesh._indices[0],

                    buffers: [{}, {}]

                };

                

                bgnd._webgl.primType = gl.TRIANGLES;

                bgnd._webgl.shader = this.getShaderProgram(gl, 

                        ['vs-x3d-bg-textureCube', 'fs-x3d-bg-textureCube']);

                

                bgnd._webgl.texture = this.loadCubeMap(gl, url, bgnd._nameSpace.doc, true);

            }

            else {

                texture = gl.createTexture();

                

                var image = new Image();

                image.crossOrigin = '';

                

                image.onload = function() {

                    bgnd._nameSpace.doc.needRender = true;

                    bgnd._nameSpace.doc.downloadCount -= 1;

                    

                    bgnd._webgl.texture = texture;

                    //x3dom.debug.logInfo(texture + " load tex url: " + url[0]);

                    

                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

                    gl.bindTexture(gl.TEXTURE_2D, texture);

                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                    gl.bindTexture(gl.TEXTURE_2D, null);

                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

                };



                image.onerror = function()

                {

                    bgnd._nameSpace.doc.downloadCount -= 1;



                    x3dom.debug.logError("Can't load tex url: " + url[0]);

                };

                

                image.src = bgnd._nameSpace.getURL(url[0]);

                bgnd._nameSpace.doc.downloadCount += 1;

                

                bgnd._webgl = {

                    positions: [-w,-h,0, -w,h,0, w,-h,0, w,h,0],

                    indexes: [0, 1, 2, 3],

                    buffers: [{}, {}]

                };



                bgnd._webgl.primType = gl.TRIANGLE_STRIP;

                bgnd._webgl.shader = this.getShaderProgram(gl, 

                        ['vs-x3d-bg-texture', 'fs-x3d-bg-texture']);

            }

        }

        else 

        {          

            if (bgnd.getSkyColor().length > 1 || bgnd.getGroundColor().length) 

            {

                sphere = new x3dom.nodeTypes.Sphere();

                texture = gl.createTexture();

                

                bgnd._webgl = {

                    positions: sphere._mesh._positions[0],

                    texcoords: sphere._mesh._texCoords[0],

                    indexes: sphere._mesh._indices[0],

                    buffers: [{}, {}, {}],

                    texture: texture,

                    primType: gl.TRIANGLES

                };

                

                var N = nextHighestPowerOfTwo(

                            bgnd.getSkyColor().length + bgnd.getGroundColor().length + 2);

                N = (N < 512) ? 512 : N;

                

                var n = bgnd._vf.groundAngle.length;

                var tmp = [], arr = [];

                var colors = [], sky = [0];

                

                for (i=0; i<bgnd._vf.skyColor.length; i++) {

                    colors[i] = bgnd._vf.skyColor[i];

                }

                

                for (i=0; i<bgnd._vf.skyAngle.length; i++) {

                    sky[i+1] = bgnd._vf.skyAngle[i];

                }

                

                if (n > 0) {

                    if (sky[sky.length-1] < Math.PI / 2) {

                        sky[sky.length] = Math.PI / 2 - x3dom.fields.Eps;

                        colors[colors.length] = colors[colors.length - 1];

                    }

                    

                    for (i=n-1; i>=0; i--) {

                        if ((i == n - 1) && (Math.PI - bgnd._vf.groundAngle[i] <= Math.PI / 2)) {

                            sky[sky.length] = Math.PI / 2;

                            colors[colors.length] = bgnd._vf.groundColor[bgnd._vf.groundColor.length-1];

                        }

                        sky[sky.length] = Math.PI - bgnd._vf.groundAngle[i];

                        colors[colors.length] = bgnd._vf.groundColor[i + 1];

                    }

                    

                    sky[sky.length] = Math.PI;

                    colors[colors.length] = bgnd._vf.groundColor[0];

                }

                else {

                    if (sky[sky.length-1] < Math.PI) {

                        sky[sky.length] = Math.PI;

                        colors[colors.length] = colors[colors.length - 1];

                    }

                }

                

                for (i=0; i<sky.length; i++) {

                    sky[i] /= Math.PI;

                }

                

                x3dom.debug.assert(sky.length == colors.length);

                

                var interp = new x3dom.nodeTypes.ColorInterpolator();

                

                interp._vf.key = new x3dom.fields.MFFloat(sky);

                interp._vf.keyValue = new x3dom.fields.MFColor(colors);

                

                for (i=0; i<N; i++) {

                    var fract = i / (N - 1.0);

                    interp._vf.set_fraction = fract;

                    interp.fieldChanged("set_fraction");

                    tmp[i] = interp._vf.value_changed;

                }

                

                tmp.reverse();

                

                for (i=0; i<tmp.length; i++) {

                    arr[3 * i + 0] = Math.floor(tmp[i].r * 255);

                    arr[3 * i + 1] = Math.floor(tmp[i].g * 255);

                    arr[3 * i + 2] = Math.floor(tmp[i].b * 255);

                }

                

                var pixels = new Uint8Array(arr);

                var format = gl.RGB;

                

                N = (pixels.length) / 3;

                

                gl.bindTexture(gl.TEXTURE_2D, texture);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

                

                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

                gl.texImage2D(gl.TEXTURE_2D, 0, format, 1, N, 0, format, gl.UNSIGNED_BYTE, pixels);

            	gl.bindTexture(gl.TEXTURE_2D, null);

            	

                bgnd._webgl.shader = this.getShaderProgram(gl, 

                						['vs-x3d-bg-texture-bgnd', 'fs-x3d-bg-texture']);

            }

            else 

            {

                // TODO; impl. gradient bg etc., e.g. via canvas 2d?

                bgnd._webgl = {};

            }

        }

        

        if (bgnd._webgl.shader)

        {

            var sp = bgnd._webgl.shader;

            

            var positionBuffer = gl.createBuffer();

            bgnd._webgl.buffers[1] = positionBuffer;

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            

            var vertices = new Float32Array(bgnd._webgl.positions);

            

            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            

            gl.vertexAttribPointer(sp.position, 3, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(sp.position);

            

            var indicesBuffer = gl.createBuffer();

            bgnd._webgl.buffers[0] = indicesBuffer;

            

            var indexArray = new Uint16Array(bgnd._webgl.indexes);

            

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

            

            vertices = null;

            indexArray = null;

            

            if (sp.texcoord !== undefined)

            {       

                var texcBuffer = gl.createBuffer();

                bgnd._webgl.buffers[2] = texcBuffer;

                

                var texcoords = new Float32Array(bgnd._webgl.texcoords);

                

                gl.bindBuffer(gl.ARRAY_BUFFER, texcBuffer);

                gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);              

                

                gl.vertexAttribPointer(sp.texcoord, 2, gl.FLOAT, false, 0, 0);

                gl.enableVertexAttribArray(sp.texcoord);

                

                texcoords = null;

            }

        }

        

        bgnd._webgl.render = function(gl, mat_view, mat_proj)

        {

            var sp = bgnd._webgl.shader;

            var mat_scene = null;

            var projMatrix_22 = mat_proj._22,

                projMatrix_23 = mat_proj._23;

            

            if ((sp !== undefined && sp !== null) &&

                (sp.texcoord !== undefined && sp.texcoord !== null) &&

                (bgnd._webgl.texture !== undefined && bgnd._webgl.texture !== null))

            {

                gl.clearDepth(1.0);

                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

                

                gl.frontFace(gl.CCW);

                gl.disable(gl.CULL_FACE);

                gl.disable(gl.DEPTH_TEST);

                gl.disable(gl.BLEND);

                

                sp.bind();

                

                if (!sp.tex) {

                    sp.tex = 0;

                }

                sp.alpha = 1.0;

                

                // adapt projection matrix to better near/far

                mat_proj._22 = 100001 / 99999;

                mat_proj._23 = 200000 / 99999;

                

                mat_scene = mat_proj.mult(mat_view);

                sp.modelViewProjectionMatrix = mat_scene.toGL();

                

                mat_proj._22 = projMatrix_22;

                mat_proj._23 = projMatrix_23;

                

                gl.activeTexture(gl.TEXTURE0);

                gl.bindTexture(gl.TEXTURE_2D, bgnd._webgl.texture);

                

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bgnd._webgl.buffers[0]);

                

                gl.bindBuffer(gl.ARRAY_BUFFER, bgnd._webgl.buffers[1]);

                gl.vertexAttribPointer(sp.position, 3, gl.FLOAT, false, 0, 0);

                gl.enableVertexAttribArray(sp.position);

                

                gl.bindBuffer(gl.ARRAY_BUFFER, bgnd._webgl.buffers[2]);

                gl.vertexAttribPointer(sp.texcoord, 2, gl.FLOAT, false, 0, 0); 

                gl.enableVertexAttribArray(sp.texcoord);

                

                try {

                    gl.drawElements(bgnd._webgl.primType, bgnd._webgl.indexes.length, gl.UNSIGNED_SHORT, 0);

                }

                catch(e) {

                    x3dom.debug.logException("Render background: " + e);

                }

                

                gl.activeTexture(gl.TEXTURE0);

                gl.bindTexture(gl.TEXTURE_2D, null);

                

                gl.disableVertexAttribArray(sp.position);

                gl.disableVertexAttribArray(sp.texcoord);

                

                gl.clear(gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

            }

            else if (!sp || !bgnd._webgl.texture ||

                (bgnd._webgl.texture.textureCubeReady !== undefined && 

                 bgnd._webgl.texture.textureCubeReady !== true))

            {

                var bgCol = bgnd.getSkyColor().toGL();

                bgCol[3] = 1.0 - bgnd.getTransparency();

                

                gl.clearColor(bgCol[0], bgCol[1], bgCol[2], bgCol[3]);

                gl.clearDepth(1.0);

                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

            }

            else

            {

                gl.clearDepth(1.0);

                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

                

                gl.frontFace(gl.CCW);

                gl.disable(gl.CULL_FACE);

                gl.disable(gl.DEPTH_TEST);

                gl.disable(gl.BLEND);

                

                sp.bind();

                if (!sp.tex) {

                    sp.tex = 0;

                }

                

                if (bgnd._webgl.texture.textureCubeReady) {

                    // adapt projection matrix to better near/far

                    mat_proj._22 = 100001 / 99999;

                    mat_proj._23 = 200000 / 99999;



                    mat_scene = mat_proj.mult(mat_view);

                    sp.modelViewProjectionMatrix = mat_scene.toGL();



                    mat_proj._22 = projMatrix_22;

                    mat_proj._23 = projMatrix_23;

                    

                    gl.activeTexture(gl.TEXTURE0);

                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, bgnd._webgl.texture);

                    

                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                }

                else {

                    gl.activeTexture(gl.TEXTURE0);

                    gl.bindTexture(gl.TEXTURE_2D, bgnd._webgl.texture);

                    

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                }

                

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bgnd._webgl.buffers[0]);

                gl.bindBuffer(gl.ARRAY_BUFFER, bgnd._webgl.buffers[1]);

                gl.vertexAttribPointer(sp.position, 3, gl.FLOAT, false, 0, 0);

                gl.enableVertexAttribArray(sp.position);

                

                try {

                    gl.drawElements(bgnd._webgl.primType, bgnd._webgl.indexes.length, gl.UNSIGNED_SHORT, 0);

                }

                catch(e) {

                    x3dom.debug.logException("Render background: " + e);

                }

                

                gl.disableVertexAttribArray(sp.position);

                

                if (bgnd._webgl.texture.textureCubeReady) {

                    gl.activeTexture(gl.TEXTURE0);

                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

                }

                else {

                    gl.activeTexture(gl.TEXTURE0);

                    gl.bindTexture(gl.TEXTURE_2D, null);

                }

                

                gl.clear(gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

            }

        };

    };

    

//----------------------------------------------------------------------------

/*! setup dbg fgnds

 */

//----------------------------------------------------------------------------

    Context.prototype.setupFgnds = function (gl, scene)

    {

        if (scene._fgnd !== undefined) {

            return;

        }

        

        var w = 1, h = 1;

        scene._fgnd = {};

        

        scene._fgnd._webgl = {

            positions: [-w,-h,0, -w,h,0, w,-h,0, w,h,0],

            indexes: [0, 1, 2, 3],

            buffers: [{}, {}]

        };



        scene._fgnd._webgl.primType = gl.TRIANGLE_STRIP;

        scene._fgnd._webgl.shader = this.getShaderProgram(gl, 

                ['vs-x3d-bg-texture', 'fs-x3d-bg-texture']);

        

        var sp = scene._fgnd._webgl.shader;

        

        var positionBuffer = gl.createBuffer();

        scene._fgnd._webgl.buffers[1] = positionBuffer;

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        

        var vertices = new Float32Array(scene._fgnd._webgl.positions);

        

        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        

        gl.vertexAttribPointer(sp.position, 3, gl.FLOAT, false, 0, 0);

        

        var indicesBuffer = gl.createBuffer();

        scene._fgnd._webgl.buffers[0] = indicesBuffer;

        

        var indexArray = new Uint16Array(scene._fgnd._webgl.indexes);

        

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

        

        vertices = null;

        indexArray = null;

        

        scene._fgnd._webgl.render = function(gl, tex)

        {

            scene._fgnd._webgl.texture = tex;

            

            gl.frontFace(gl.CCW);

            gl.disable(gl.CULL_FACE);

            gl.disable(gl.DEPTH_TEST);

            

            sp.bind();

            if (!sp.tex) {

                sp.tex = 0;

            }

            

            //gl.enable(gl.TEXTURE_2D);

            gl.activeTexture(gl.TEXTURE0);

            gl.bindTexture(gl.TEXTURE_2D, scene._fgnd._webgl.texture);

            

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, scene._fgnd._webgl.buffers[0]);

            gl.bindBuffer(gl.ARRAY_BUFFER, scene._fgnd._webgl.buffers[1]);

            gl.vertexAttribPointer(sp.position, 3, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(sp.position);

            

            try {

                gl.drawElements(scene._fgnd._webgl.primType, 

                                scene._fgnd._webgl.indexes.length, gl.UNSIGNED_SHORT, 0);

            }

            catch(e) {

                x3dom.debug.logException("Render background: " + e);

            }

            

            gl.disableVertexAttribArray(sp.position);

            

            gl.activeTexture(gl.TEXTURE0);

            gl.bindTexture(gl.TEXTURE_2D, null);

            //gl.disable(gl.TEXTURE_2D);

        };

    };

    

//----------------------------------------------------------------------------

/*! render shadow pass

 */

//----------------------------------------------------------------------------

    Context.prototype.renderShadowPass = function(gl, scene, mat_light, mat_scene)

    {

        gl.bindFramebuffer(gl.FRAMEBUFFER, scene._webgl.fboShadow.fbo);

        

        gl.viewport(0, 0, scene._webgl.fboShadow.width, scene._webgl.fboShadow.height);

        

        gl.clearColor(1.0, 1.0, 1.0, 1.0);

        gl.clearDepth(1.0);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        

        gl.depthFunc(gl.LEQUAL);

        gl.enable(gl.DEPTH_TEST);

        gl.enable(gl.CULL_FACE);

        gl.disable(gl.BLEND);

        

        var sp = scene._webgl.shadowShader;

        sp.bind();

        

        //var mat_light = scene.getLightMatrix();

        //var mat_scene = scene.getWCtoLCMatrix();

        var i, n = scene.drawableObjects.length;

        

        for (i=0; i<n; i++)

        {

            var trafo = scene.drawableObjects[i][0];

            var shape = scene.drawableObjects[i][1];

            

            sp.modelViewMatrix = mat_light.mult(trafo).toGL();

            sp.modelViewProjectionMatrix = mat_scene.mult(trafo).toGL();

            

            for (var q=0; q<shape._webgl.positions.length; q++)

            {

                if (sp.position !== undefined) 

                {

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shape._webgl.buffers[5*q+0]);

                    

                    gl.bindBuffer(gl.ARRAY_BUFFER, shape._webgl.buffers[5*q+1]);

                    

                    gl.vertexAttribPointer(sp.position, 3, shape._webgl.coordType, false,

                        shape._coordStrideOffset[0], shape._coordStrideOffset[1]);

                    gl.enableVertexAttribArray(sp.position);

                }

                

                try {

                    if (shape._webgl.indexes && shape._webgl.indexes[q]) {

						if (shape._webgl.imageGeometry || shape._webgl.binaryGeometry < 0) {

							for (var v=0, offset=0; v<shape._cf.geometry.node._vf.vertexCount.length; v++) {

								gl.drawArrays(shape._webgl.primType[v], offset, shape._cf.geometry.node._vf.vertexCount[v]);

								offset += shape._cf.geometry.node._vf.vertexCount[v];

							}

						}

						else if (shape._webgl.binaryGeometry > 0) {

					        for (var v=0, offset=0; v<shape._cf.geometry.node._vf.vertexCount.length; v++) {

						        gl.drawElements(shape._webgl.primType[v], shape._cf.geometry.node._vf.vertexCount[v], 

						                        gl.UNSIGNED_SHORT, 2*offset);

						        offset += shape._cf.geometry.node._vf.vertexCount[v];

					        }

						}

    					else if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.IndexedTriangleStripSet) &&

    					         shape._webgl.primType == gl.TRIANGLE_STRIP) {  // TODO; remove 2nd check

        				    var indOff = shape._cf.geometry.node._indexOffset;

        				    for (var io=1; io<indOff.length; io++) {

             					gl.drawElements(gl.TRIANGLE_STRIP, indOff[io]-indOff[io-1], gl.UNSIGNED_SHORT, 2*indOff[io-1]);

             				}

        				}

						else {

							gl.drawElements(shape._webgl.primType, shape._webgl.indexes[q].length, gl.UNSIGNED_SHORT, 0);

						}

                    }

                }

                catch (e) {

                    x3dom.debug.logException(shape._DEF + " renderShadowPass(): " + e);

                }

                

                if (sp.position !== undefined) {

                    gl.disableVertexAttribArray(sp.position);

                }

            }

        }

        gl.flush();

        

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    };

    

//----------------------------------------------------------------------------

/*! render picking pass

 */

//----------------------------------------------------------------------------

    Context.prototype.renderPickingPass = function(gl, scene, mat_view, mat_scene, 

                                                   min, max, pickMode, lastX, lastY)

    {

        gl.bindFramebuffer(gl.FRAMEBUFFER, scene._webgl.fboPick.fbo);

        

        gl.viewport(0, 0, scene._webgl.fboPick.width, scene._webgl.fboPick.height);

        

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        gl.clearDepth(1.0);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        

        gl.depthFunc(gl.LEQUAL);

        gl.enable(gl.DEPTH_TEST);

        gl.enable(gl.CULL_FACE);

        gl.disable(gl.BLEND);

        

        var sp = null;

        if (pickMode === 0)

		{

			if (scene._webgl.imageGeometry > 0 && !x3dom.caps.MOBILE)   // Do mobile devices with vertex textures exist?

				{ sp = scene._webgl.pickShaderIG; }

			else

				{ sp = scene._webgl.pickShader; }

		}

        else if (pickMode === 1)

            { sp = scene._webgl.pickColorShader; }

        else if (pickMode === 2)

            { sp = scene._webgl.pickTexCoordShader; }

        sp.bind();

        

        var bgCenter = new x3dom.fields.SFVec3f(0, 0, 0).toGL();

        var bgSize = new x3dom.fields.SFVec3f(1, 1, 1).toGL();

        

        for (var i=0; i<scene.drawableObjects.length; i++)

        {

            var trafo = scene.drawableObjects[i][0];

            var shape = scene.drawableObjects[i][1];

            

            if (shape._objectID < 1 || shape._webgl === undefined) {

                continue;

            }

			

			//Get prev shape 

			if(i > 0) {

				var prev_shape = scene.drawableObjects[i-1][1];

			}

			//Get next shape

			if(i < scene.drawableObjects.length-1) {

				var next_shape = scene.drawableObjects[i+1][1];

			}

            

            sp.modelMatrix = trafo.toGL();

            //sp.modelMatrix = mat_view.mult(trafo).toGL();

            sp.modelViewProjectionMatrix = mat_scene.mult(trafo).toGL();

            

            sp.wcMin = min.toGL();

            sp.wcMax = max.toGL();

            //FIXME; allow more than 255 objects!

            sp.alpha = 1.0 - shape._objectID / 255.0;

			

			sp.imageGeometry = 0.0;

			

			if (shape._webgl.coordType != gl.FLOAT)

			{

			    sp.bgCenter       = shape._cf.geometry.node._vf.position.toGL();

			    sp.bgSize         = shape._cf.geometry.node._vf.size.toGL();

    		    sp.bgPrecisionMax = shape._cf.geometry.node.getPrecisionMax('coordType');

    		}

    		else {

			    sp.bgCenter = bgCenter;

			    sp.bgSize   = bgSize;

    		    sp.bgPrecisionMax = 1;

    		}

    		if (shape._webgl.colorType != gl.FLOAT) {

    		    sp.bgPrecisionColMax = shape._cf.geometry.node.getPrecisionMax('colorType');

			}

			if (shape._webgl.texCoordType != gl.FLOAT) {

			    sp.bgPrecisionTexMax = shape._cf.geometry.node.getPrecisionMax('texCoordType');

			}

			

			if (shape._webgl.imageGeometry)  // FIXME: mobile errors

			{

				sp.imageGeometry    		= 1.0;

				sp.IG_bboxMin 				= shape._cf.geometry.node.getMin().toGL();

				sp.IG_bboxMax				= shape._cf.geometry.node.getMax().toGL();

				sp.IG_coordTextureWidth	 	= shape._webgl.coordTextureWidth;

				sp.IG_coordTextureHeight 	= shape._webgl.coordTextureHeight;

				sp.IG_implicitMeshSize		= shape._cf.geometry.node._vf.implicitMeshSize.x;  // FIXME

				

				if(shape._webgl.indexedImageGeometry) {

					sp.indexed = 1.0;

					sp.IG_indexTextureWidth	 = shape._webgl.indexTextureWidth;

					sp.IG_indexTextureHeight = shape._webgl.indexTextureHeight;

					

					gl.activeTexture(gl.TEXTURE0);

					gl.bindTexture(gl.TEXTURE_2D, shape._webgl.texture[1]);

					

					gl.activeTexture(gl.TEXTURE1);

					gl.bindTexture(gl.TEXTURE_2D, shape._webgl.texture[2]);

				} else {

					sp.indexed = 0.0;

					gl.activeTexture(gl.TEXTURE0);

					gl.bindTexture(gl.TEXTURE_2D, shape._webgl.texture[1]);

				}

				

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

				

				var texUnit = 0;

				

				if(shape._cf.geometry.node.getIndexTexture()) {

					if(!sp.IG_indexTexture) {

						sp.IG_indexTexture = texUnit++;

					}

				}

				

				if(shape._cf.geometry.node.getCoordinateTexture(0)) {

					if(!sp.IG_coordinateTexture) {

						sp.IG_coordinateTexture = texUnit++;

					}

				}

			}

			



			for (var q=0; q<shape._webgl.positions.length; q++)

			{

				//check prev, act

				if(!prev_shape || (prev_shape && prev_shape._cf.geometry.node._mesh !== shape._cf.geometry.node._mesh)) 

				{

					if (sp.position !== undefined) 

					{

						gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shape._webgl.buffers[5*q+0]);

						

						gl.bindBuffer(gl.ARRAY_BUFFER, shape._webgl.buffers[5*q+1]);

						

						gl.vertexAttribPointer(sp.position, 3, shape._webgl.coordType, false,

                            shape._coordStrideOffset[0], shape._coordStrideOffset[1]);

						gl.enableVertexAttribArray(sp.position);

					}

					if (sp.color !== undefined)

					{

						gl.bindBuffer(gl.ARRAY_BUFFER, shape._webgl.buffers[5*q+4]);

						

						gl.vertexAttribPointer(sp.color, 

							shape._cf.geometry.node._mesh._numColComponents, shape._webgl.colorType, false,

                            shape._colorStrideOffset[0], shape._colorStrideOffset[1]);

						gl.enableVertexAttribArray(sp.color);

					}

					if (sp.texcoord !== undefined)

					{

						gl.bindBuffer(gl.ARRAY_BUFFER, shape._webgl.buffers[5*q+3]);



						gl.vertexAttribPointer(sp.texcoord, 

							shape._cf.geometry.node._mesh._numTexComponents, shape._webgl.texCoordType, false,

                            shape._texCoordStrideOffset[0], shape._texCoordStrideOffset[1]);

						gl.enableVertexAttribArray(sp.texcoord);

					}

				}

				

				if (shape.isSolid()) {

					gl.enable(gl.CULL_FACE);

					

					if (shape.isCCW()) {

						gl.frontFace(gl.CCW);

					}

					else {

						gl.frontFace(gl.CW);

					}

				}

				else {

					gl.disable(gl.CULL_FACE);

				}

				

				try {

					if (shape._webgl.indexes && shape._webgl.indexes[q]) {

						if (shape._webgl.imageGeometry || shape._webgl.binaryGeometry < 0) {

							for (var v=0, offset=0; v<shape._cf.geometry.node._vf.vertexCount.length; v++) {

								gl.drawArrays(shape._webgl.primType[v], offset, shape._cf.geometry.node._vf.vertexCount[v]);

								offset += shape._cf.geometry.node._vf.vertexCount[v];

							}

						}

						else if (shape._webgl.binaryGeometry > 0) {

					        for (var v=0, offset=0; v<shape._cf.geometry.node._vf.vertexCount.length; v++) {

						        gl.drawElements(shape._webgl.primType[v], shape._cf.geometry.node._vf.vertexCount[v], 

						                        gl.UNSIGNED_SHORT, 2*offset);

						        offset += shape._cf.geometry.node._vf.vertexCount[v];

					        }

    					} 

    					else if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.IndexedTriangleStripSet) &&

    					         shape._webgl.primType == gl.TRIANGLE_STRIP) {  // TODO; remove 2nd check

        				    var indOff = shape._cf.geometry.node._indexOffset;

        				    for (var io=1; io<indOff.length; io++) {

             					gl.drawElements(gl.TRIANGLE_STRIP, indOff[io]-indOff[io-1], gl.UNSIGNED_SHORT, 2*indOff[io-1]);

             				}

        				}

						else {

							gl.drawElements(shape._webgl.primType, shape._webgl.indexes[q].length, gl.UNSIGNED_SHORT, 0);

						}

					}

				}

				catch (e) {

					x3dom.debug.logException(shape._DEF + " renderPickingPass(): " + e);

				}

				

				

				//check act next

				if(!next_shape || (next_shape && next_shape._cf.geometry.node._mesh !== shape._cf.geometry.node._mesh)) 

				{

					if (sp.position !== undefined) {

						gl.disableVertexAttribArray(sp.position);

					}

					if (sp.color !== undefined) {

						gl.disableVertexAttribArray(sp.color);

					}

					if (sp.texcoord !== undefined) {

						gl.disableVertexAttribArray(sp.texcoord);

					}

				}

			}

        }

        gl.flush();

        

        try {

            var x = lastX * scene._webgl.pickScale,

                y = scene._webgl.fboPick.height - 1 - lastY * scene._webgl.pickScale;

            var data = new Uint8Array(4);    // 4 = 1 * 1 * 4

            

            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);

            

            scene._webgl.fboPick.pixelData = data;

        }

        catch(se) {

            scene._webgl.fboPick.pixelData = [];

            //No Exception on file:// when starting with additional flags:

            //chrome.exe --enable-webgl --use-gl=desktop --log-level=0 

            //           --allow-file-access-from-files --allow-file-access  --disable-web-security

            x3dom.debug.logException(se + " (cannot pick)");

        }

        

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    };

    

    

//----------------------------------------------------------------------------

/*! render single object/ shape

 */

//----------------------------------------------------------------------------

    Context.prototype.renderShape = function (transform, shape, prev_shape, next_shape, viewarea, 

                                              slights, numLights, 

                                              mat_view, mat_scene, mat_light, 

                                              gl, oneShadowExistsAlready)

    {

        if (shape._webgl === undefined) {

            return;

        }

        

        var tex = null;

        var scene = viewarea._scene;

        var sp = shape._webgl.shader;



        if (!sp) {

            shape._webgl.shader = getDefaultShaderProgram(gl, 'default');

            sp = shape._webgl.shader;

        }

        sp.bind();

        

        if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.Text)){

            sp.useText = 1.0;

        }else{

            sp.useText = 0.0;

        }

		

		//===========================================================================

        // Set GeometryImage variables

        //===========================================================================

		if (shape._webgl.coordType != gl.FLOAT)

		{

		    sp.bgCenter       = shape._cf.geometry.node._vf.position.toGL();

		    sp.bgSize         = shape._cf.geometry.node._vf.size.toGL();

		    sp.bgPrecisionMax = shape._cf.geometry.node.getPrecisionMax('coordType');

		}

		if (shape._webgl.colorType != gl.FLOAT) {

		    sp.bgPrecisionColMax = shape._cf.geometry.node.getPrecisionMax('colorType');

		}

		if (shape._webgl.texCoordType != gl.FLOAT) {

			sp.bgPrecisionTexMax = shape._cf.geometry.node.getPrecisionMax('texCoordType');

		}

		

		if (shape._webgl.imageGeometry) {

			sp.IG_bboxMin 			 = shape._cf.geometry.node.getMin().toGL();

			sp.IG_bboxMax			 = shape._cf.geometry.node.getMax().toGL();

			sp.IG_coordTextureWidth	 = shape._webgl.coordTextureWidth;

			sp.IG_coordTextureHeight = shape._webgl.coordTextureHeight;

			sp.IG_implicitMeshSize	 = shape._cf.geometry.node._vf.implicitMeshSize.x;  // FIXME

			

			if(shape._webgl.indexedImageGeometry) {

				sp.IG_indexTextureWidth	 = shape._webgl.indexTextureWidth;

				sp.IG_indexTextureHeight = shape._webgl.indexTextureHeight;

			}

			

			//Associate GeometryImage texture units

			var IG_texUnit = 1;

			

			if(shape._cf.geometry.node.getIndexTexture()) {

				sp.IG_indexTexture = IG_texUnit++;

			}



			for(var i=0; i<shape._webgl.imageGeometry; i++) {

				if(shape._cf.geometry.node.getCoordinateTexture(i)) {

					sp['IG_coordinateTexture' + i] = IG_texUnit++;

				}

			}

			

			if(shape._cf.geometry.node.getNormalTexture(0)) {

				sp.IG_normalTexture = IG_texUnit++;

			}

			

			if(shape._cf.geometry.node.getTexCoordTexture()) {

				sp.IG_texCoordTexture = IG_texUnit++;

			}

			

			if(shape._cf.geometry.node.getColorTexture()) {

				sp.IG_colorTexture = IG_texUnit++;

			}

		}



        //===========================================================================

        // Set fog

        //===========================================================================

        var fog = scene.getFog();

        if(fog){

			if(x3dom.caps.MOBILE) {

				sp.fogColor = fog._vf.color.toGL();

				sp.fogRange = fog._vf.visibilityRange;

				sp.fogType	= (fog._vf.fogType == "LINEAR") ? 0.0 : 1.0;

			} else {

				sp['fog.color']             = fog._vf.color.toGL();

				sp['fog.visibilityRange']   = fog._vf.visibilityRange;

				sp['fog.fogType']			= (fog._vf.fogType == "LINEAR") ? 0.0 : 1.0;

			}

        }

        

        //===========================================================================

        // Set Material

        //===========================================================================

        var mat = shape._cf.appearance.node._cf.material.node;          

        var shaderCSS = shape._cf.appearance.node._shader;

        

        if (shaderCSS !== null && x3dom.isa(shaderCSS, x3dom.nodeTypes.CommonSurfaceShader)) {

			sp['material.diffuseColor']     = shaderCSS._vf.diffuseFactor.toGL();

			sp['material.specularColor']    = shaderCSS._vf.specularFactor.toGL();

			sp['material.emissiveColor']    = shaderCSS._vf.emissiveFactor.toGL();

			sp['material.shininess']        = shaderCSS._vf.shininessFactor;

			sp['material.ambientIntensity'] = (shaderCSS._vf.ambientFactor.x + 

											   shaderCSS._vf.ambientFactor.y + 

											   shaderCSS._vf.ambientFactor.z)/3;

			sp['material.transparency']     = 1.0 - shaderCSS._vf.alphaFactor;

        }

        else{

			shaderCSS = null;

			if(x3dom.caps.MOBILE) {

				sp.diffuseColor		= mat._vf.diffuseColor.toGL();

				sp.specularColor	= mat._vf.specularColor.toGL();

				sp.emissiveColor	= mat._vf.emissiveColor.toGL();

				sp.shininess        = mat._vf.shininess;

				sp.ambientIntensity	= mat._vf.ambientIntensity;

				sp.transparency		= mat._vf.transparency;

			} else {

				sp['material.diffuseColor']         = mat._vf.diffuseColor.toGL();

				sp['material.specularColor']        = mat._vf.specularColor.toGL();

				sp['material.emissiveColor']        = mat._vf.emissiveColor.toGL();

				sp['material.shininess']            = mat._vf.shininess;

				sp['material.ambientIntensity']     = mat._vf.ambientIntensity;

				sp['material.transparency']         = mat._vf.transparency;

			}

        }

        

        //FIXME Only set for VertexColorUnlit and ColorPicking

        sp.alpha = 1.0 - mat._vf.transparency;

        

        //===========================================================================

        // Set Lights

        //===========================================================================

        if (numLights > 0)

        {

            if(numLights > 8){

                x3dom.debug.logWarning("Too many lights! Only 8 lights supported!");

                numLights = 8;

            }

            

            for(var p=0; p<numLights; p++) {

                var light_transform = mat_view.mult(slights[p].getCurrentTransform());

                

                if(x3dom.isa(slights[p], x3dom.nodeTypes.DirectionalLight))

                {

                    if(x3dom.caps.MOBILE) {

						sp['Light'+p+'_Type']             = 0.0;

						sp['Light'+p+'_On']               = (slights[p]._vf.on) ? 1.0 : 0.0;

						sp['Light'+p+'_Color']            = slights[p]._vf.color.toGL();

						sp['Light'+p+'_Intensity']        = slights[p]._vf.intensity;

						sp['Light'+p+'_AmbientIntensity'] = slights[p]._vf.ambientIntensity;

						sp['Light'+p+'_Direction']        = light_transform.multMatrixVec(slights[p]._vf.direction).toGL();

						sp['Light'+p+'_Attenuation']      = [1.0, 1.0, 1.0];

						sp['Light'+p+'_Location']         = [1.0, 1.0, 1.0];

						sp['Light'+p+'_Radius']           = 0.0;

						sp['Light'+p+'_BeamWidth']        = 0.0;

						sp['Light'+p+'_CutOffAngle']      = 0.0;

						sp['Light'+p+'_shadowIntensity']  = slights[p]._vf.shadowIntensity;

					} else {

						sp['light[' + p + '].type']             = 0.0;

						sp['light[' + p + '].on']               = (slights[p]._vf.on) ? 1.0 : 0.0;

						sp['light[' + p + '].color']            = slights[p]._vf.color.toGL();

						sp['light[' + p + '].intensity']        = slights[p]._vf.intensity;

						sp['light[' + p + '].ambientIntensity'] = slights[p]._vf.ambientIntensity;

						sp['light[' + p + '].direction']        = light_transform.multMatrixVec(slights[p]._vf.direction).toGL();

						sp['light[' + p + '].attenuation']      = [1.0, 1.0, 1.0];

						sp['light[' + p + '].location']         = [1.0, 1.0, 1.0];

						sp['light[' + p + '].radius']           = 0.0;

						sp['light[' + p + '].beamWidth']        = 0.0;

						sp['light[' + p + '].cutOffAngle']      = 0.0;

						sp['light[' + p + '].shadowIntensity']  = slights[p]._vf.shadowIntensity;

					}

                }

                else if(x3dom.isa(slights[p], x3dom.nodeTypes.PointLight))

                {

                    if(x3dom.caps.MOBILE) {

						sp['Light'+p+'_Type']             = 1.0;

						sp['Light'+p+'_On']               = (slights[p]._vf.on) ? 1.0 : 0.0;

						sp['Light'+p+'_Color']            = slights[p]._vf.color.toGL();

						sp['Light'+p+'_Intensity']        = slights[p]._vf.intensity;

						sp['Light'+p+'_AmbientIntensity'] = slights[p]._vf.ambientIntensity;

						sp['Light'+p+'_Direction']        = [1.0, 1.0, 1.0];

						sp['Light'+p+'_Attenuation']      = slights[p]._vf.attenuation.toGL();

						sp['Light'+p+'_Location']         = light_transform.multMatrixPnt(slights[p]._vf.location).toGL();

						sp['Light'+p+'_Radius']           = slights[p]._vf.radius;

						sp['Light'+p+'_BeamWidth']        = 0.0;

						sp['Light'+p+'_CutOffAngle']      = 0.0;

						sp['Light'+p+'_shadowIntensity']  = slights[p]._vf.shadowIntensity;

					} else {

						sp['light[' + p + '].type']             = 1.0;

						sp['light[' + p + '].on']               = (slights[p]._vf.on) ? 1.0 : 0.0;

						sp['light[' + p + '].color']            = slights[p]._vf.color.toGL();

						sp['light[' + p + '].intensity']        = slights[p]._vf.intensity;

						sp['light[' + p + '].ambientIntensity'] = slights[p]._vf.ambientIntensity;

						sp['light[' + p + '].direction']        = [1.0, 1.0, 1.0];

						sp['light[' + p + '].attenuation']      = slights[p]._vf.attenuation.toGL();

						sp['light[' + p + '].location']         = light_transform.multMatrixPnt(slights[p]._vf.location).toGL();

						sp['light[' + p + '].radius']           = slights[p]._vf.radius;

						sp['light[' + p + '].beamWidth']        = 0.0;

						sp['light[' + p + '].cutOffAngle']      = 0.0;

						sp['light[' + p + '].shadowIntensity']  = slights[p]._vf.shadowIntensity;

					}

                }

                else if(x3dom.isa(slights[p], x3dom.nodeTypes.SpotLight))

                {

					if(x3dom.caps.MOBILE) {

						sp['Light'+p+'_Type']             = 2.0;

						sp['Light'+p+'_On']               = (slights[p]._vf.on) ? 1.0 : 0.0;

						sp['Light'+p+'_Color']            = slights[p]._vf.color.toGL();

						sp['Light'+p+'_Intensity']        = slights[p]._vf.intensity;

						sp['Light'+p+'_AmbientIntensity'] = slights[p]._vf.ambientIntensity;

						sp['Light'+p+'_Direction']        = light_transform.multMatrixVec(slights[p]._vf.direction).toGL();

						sp['Light'+p+'_Attenuation']      = slights[p]._vf.attenuation.toGL();

						sp['Light'+p+'_Location']         = light_transform.multMatrixPnt(slights[p]._vf.location).toGL();

						sp['Light'+p+'_Radius']           = slights[p]._vf.radius;

						sp['Light'+p+'_BeamWidth']        = slights[p]._vf.beamWidth;

						sp['Light'+p+'_CutOffAngle']      = slights[p]._vf.cutOffAngle;

						sp['Light'+p+'_shadowIntensity']  = slights[p]._vf.shadowIntensity;

					} else {

						sp['light[' + p + '].type']             = 2.0;

						sp['light[' + p + '].on']               = (slights[p]._vf.on) ? 1.0 : 0.0;

						sp['light[' + p + '].color']            = slights[p]._vf.color.toGL();

						sp['light[' + p + '].intensity']        = slights[p]._vf.intensity;

						sp['light[' + p + '].ambientIntensity'] = slights[p]._vf.ambientIntensity;

						sp['light[' + p + '].direction']        = light_transform.multMatrixVec(slights[p]._vf.direction).toGL();

						sp['light[' + p + '].attenuation']      = slights[p]._vf.attenuation.toGL();

						sp['light[' + p + '].location']         = light_transform.multMatrixPnt(slights[p]._vf.location).toGL();

						sp['light[' + p + '].radius']           = slights[p]._vf.radius;

						sp['light[' + p + '].beamWidth']        = slights[p]._vf.beamWidth;

						sp['light[' + p + '].cutOffAngle']      = slights[p]._vf.cutOffAngle;

						sp['light[' + p + '].shadowIntensity']  = slights[p]._vf.shadowIntensity;

					}

                }

            }

        }

        //===========================================================================

        // Set HeadLight

        //===========================================================================

        var nav = scene.getNavigationInfo();

        if(nav._vf.headlight){

			numLights = (numLights) ? numLights : 0;

			if(x3dom.caps.MOBILE) {

				sp['Light'+numLights+'_Type']             = 0.0;

				sp['Light'+numLights+'_On']               = 1.0;

				sp['Light'+numLights+'_Color']            = [1.0, 1.0, 1.0];

				sp['Light'+numLights+'_Intensity']        = 1.0;

				sp['Light'+numLights+'_AmbientIntensity'] = 0.0;

				sp['Light'+numLights+'_Direction']        = [0.0, 0.0, -1.0];

				sp['Light'+numLights+'_Attenuation']      = [1.0, 1.0, 1.0];

				sp['Light'+numLights+'_Location']         = [1.0, 1.0, 1.0];

				sp['Light'+numLights+'_Radius']           = 0.0;

				sp['Light'+numLights+'_BeamWidth']        = 0.0;

				sp['Light'+numLights+'_CutOffAngle']      = 0.0;

			} else {

				sp['light[' + numLights + '].type']             = 0.0;

				sp['light[' + numLights + '].on']               = 1.0;

				sp['light[' + numLights + '].color']            = [1.0, 1.0, 1.0];

				sp['light[' + numLights + '].intensity']        = 1.0;

				sp['light[' + numLights + '].ambientIntensity'] = 0.0;

				sp['light[' + numLights + '].direction']        = [0.0, 0.0, -1.0];

				sp['light[' + numLights + '].attenuation']      = [1.0, 1.0, 1.0];

				sp['light[' + numLights + '].location']         = [1.0, 1.0, 1.0];

				sp['light[' + numLights + '].radius']           = 0.0;

				sp['light[' + numLights + '].beamWidth']        = 0.0;

				sp['light[' + numLights + '].cutOffAngle']      = 0.0;

			}

        }

		

		

        var userShader = shape._cf.appearance.node._shader;

        if (userShader) {

            for (var fName in userShader._vf) {

                if (userShader._vf.hasOwnProperty(fName) && fName !== 'language') {

                    var field = userShader._vf[fName];

                    try {

                        sp[fName] = field.toGL();

                    }

                    catch(noToGl) {

                        sp[fName] = field;

                    }

                }

            }

        }

        

        // transformation matrices

        // Calculate and Set Normalmatrix

        // For rigid motions the inverse-transpose is not necessary

        /*var normalMatrix = mat_view.mult(transform);

        normalMatrix = mat_view.inverse().transpose();*/



        var model_view = mat_view.mult(transform);



        sp.modelViewMatrix = model_view.toGL();

        sp.normalMatrix    = model_view.inverse().transpose().toGL();

        

        //if (userShader) {

            sp.viewMatrix = mat_view.toGL();

            sp.modelViewMatrixInverse = model_view.inverse().toGL();

        //}

        sp.modelViewProjectionMatrix = mat_scene.mult(transform).toGL();



        for (var cnt=0; shape._webgl.texture !== undefined && 

                        cnt < shape._webgl.texture.length; cnt++)

        {

            

          if (shape._webgl.texture[cnt])

          {

            if (shape._cf.appearance.node._cf.texture.node) {

                tex = shape._cf.appearance.node._cf.texture.node.getTexture(cnt);

            }

			if(tex) {

				sp.origChannelCount = tex._vf.origChannelCount;

			}



            var wrapS = gl.REPEAT, wrapT = gl.REPEAT;

            var minFilter = gl.LINEAR, magFilter = gl.LINEAR;

            var genMipMaps = false;



            if (shape._webgl.textureFilter) {

                minFilter = shape._webgl.textureFilter[cnt];

                magFilter = shape._webgl.textureFilter[cnt];

            }



            if (tex && tex._cf.textureProperties.node !== null)

            {

                var texProp = tex._cf.textureProperties.node;



                wrapS = shape._webgl._boundaryModesDic[texProp._vf.boundaryModeS.toUpperCase()];

                wrapT = shape._webgl._boundaryModesDic[texProp._vf.boundaryModeT.toUpperCase()];



                minFilter = shape._webgl._minFilterDic[texProp._vf.minificationFilter.toUpperCase()];

                magFilter = shape._webgl._magFilterDic[texProp._vf.magnificationFilter.toUpperCase()];



                if ( texProp._vf.generateMipMaps === true )

                {

                    if (minFilter == gl.NEAREST)

                        minFilter  = gl.NEAREST_MIPMAP_NEAREST;

                    if (minFilter == gl.LINEAR)

                        minFilter  = gl.LINEAR_MIPMAP_LINEAR;

                    genMipMaps = true;

                }

                else

                {

                    if ( (minFilter == gl.LINEAR_MIPMAP_LINEAR) ||

                         (minFilter == gl.LINEAR_MIPMAP_NEAREST) )

                        minFilter  = gl.LINEAR;

                    if ( (minFilter == gl.NEAREST_MIPMAP_LINEAR) ||

                         (minFilter == gl.NEAREST_MIPMAP_NEAREST) )

                        minFilter  = gl.NEAREST;

                }

            }

            else

            {

                if (tex && tex._vf.repeatS === false) {

                    wrapS = gl.CLAMP_TO_EDGE;

                }

                if (tex && tex._vf.repeatT === false) {

                    wrapT = gl.CLAMP_TO_EDGE;

                }

            }

            

            if (shape._webgl.texture[cnt].textureCubeReady && tex && 

                x3dom.isa(tex, x3dom.nodeTypes.X3DEnvironmentTextureNode))

            {

                //gl.enable(gl.TEXTURE_CUBE_MAP);

                gl.activeTexture(gl.TEXTURE0 + cnt);

                gl.bindTexture(gl.TEXTURE_CUBE_MAP, shape._webgl.texture[cnt]);

                

                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, wrapS);

                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, wrapT);

                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, magFilter);

                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, minFilter);

                if (genMipMaps) {

                    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

                }

            }

            else

            {

                //gl.enable(gl.TEXTURE_2D);

                gl.activeTexture(gl.TEXTURE0 + cnt);

                gl.bindTexture(gl.TEXTURE_2D, shape._webgl.texture[cnt]);



                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);

                if (genMipMaps) {

                    gl.generateMipmap(gl.TEXTURE_2D);

                }

            }

            

            if (shape._cf.appearance.node._cf.textureTransform.node !== null)

            {

                // use shader/ calculation due to performance issues

                var texTrafo = shape._cf.appearance.node.texTransformMatrix();

                sp.texTrafoMatrix = texTrafo.toGL();

            }

            

            if(shaderCSS) {

                var texUnit = 0;

                if(shaderCSS.getDiffuseMap()) {

                    if(!sp.tex) {

                        sp.tex  = texUnit++;

                    }

                }

                if(shaderCSS.getNormalMap()) {

                    if(!sp.bump) { 

                        sp.bump = texUnit++;

                    }

                }

                if(shaderCSS.getSpecularMap()) { 

                    if(!sp.spec) { 

                        sp.spec = texUnit++;

                    }

                }

            } else {

                if (!sp.tex) {

                    sp.tex = 0;     // FIXME; only 1st tex known in shader

                }

            }

          }

        }

        

        if (oneShadowExistsAlready) 

        {

            if (!sp.sh_tex) {

                sp.sh_tex = cnt;

            }

            gl.activeTexture(gl.TEXTURE0 + cnt);

            gl.bindTexture(gl.TEXTURE_2D, scene._webgl.fboShadow.tex);

            

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            //gl.generateMipmap(gl.TEXTURE_2D);

            

            sp.matPV = mat_light.mult(transform).toGL();

        }



        var attrib;

        // TODO; FIXME; what if geometry with split mesh has dynamic fields?

        for (var df=0; df<shape._webgl.dynamicFields.length; df++)

        {

            attrib = shape._webgl.dynamicFields[df];

            

            if (sp[attrib.name] !== undefined)

            {

                gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buf);

                

                gl.vertexAttribPointer(sp[attrib.name], attrib.numComponents, gl.FLOAT, false, 0, 0); 

                gl.enableVertexAttribArray(sp[attrib.name]);

            }

        }

        

        if (shape.isSolid()) {

            gl.enable(gl.CULL_FACE);

            

            if (shape.isCCW()) {

                gl.frontFace(gl.CCW);

            }

            else {

                gl.frontFace(gl.CW);

            }

        }

        else {

            gl.disable(gl.CULL_FACE);

        }

        sp.solid = (shape.isSolid() ? 1.0 : 0.0);

        

        for (var q=0; q<shape._webgl.positions.length; q++)

        {

		

			//check prev, act

			if(!prev_shape || (prev_shape && prev_shape._cf.geometry.node._mesh !== shape._cf.geometry.node._mesh)) 

			{

			  if (sp.position !== undefined)

			  {

				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shape._webgl.buffers[5*q+0]);

				

				gl.bindBuffer(gl.ARRAY_BUFFER, shape._webgl.buffers[5*q+1]);

				

				gl.vertexAttribPointer(sp.position, 3, shape._webgl.coordType, false,

                    shape._coordStrideOffset[0], shape._coordStrideOffset[1]);

				gl.enableVertexAttribArray(sp.position);

			  }

			  if (sp.normal !== undefined) 

			  {

				gl.bindBuffer(gl.ARRAY_BUFFER, shape._webgl.buffers[5*q+2]);            

				

				gl.vertexAttribPointer(sp.normal, 3, shape._webgl.normalType, false,

                    shape._normalStrideOffset[0], shape._normalStrideOffset[1]);

				gl.enableVertexAttribArray(sp.normal);

			  }

			  if (sp.texcoord !== undefined)

			  {

				gl.bindBuffer(gl.ARRAY_BUFFER, shape._webgl.buffers[5*q+3]);

				

				gl.vertexAttribPointer(sp.texcoord, 

					shape._cf.geometry.node._mesh._numTexComponents, shape._webgl.texCoordType, false,

                    shape._texCoordStrideOffset[0], shape._texCoordStrideOffset[1]);

				gl.enableVertexAttribArray(sp.texcoord);

			  }

			  if (sp.color !== undefined)

			  {

				gl.bindBuffer(gl.ARRAY_BUFFER, shape._webgl.buffers[5*q+4]);

				

				gl.vertexAttribPointer(sp.color, 

					shape._cf.geometry.node._mesh._numColComponents, shape._webgl.colorType, false,

                    shape._colorStrideOffset[0], shape._colorStrideOffset[1]);

				gl.enableVertexAttribArray(sp.color);

			  }

			}

        

            // render object

            try {

              // fixme; viewarea._points is dynamic and doesn't belong there!!!

              if (viewarea._points !== undefined && viewarea._points > 0) {

                var polyMode = (viewarea._points == 1) ? gl.POINTS : gl.LINES;  // FIXME

                

				if (shape._webgl.imageGeometry || shape._webgl.binaryGeometry < 0) {

					for (var i=0, offset=0; i<shape._cf.geometry.node._vf.vertexCount.length; i++) {

						gl.drawArrays(polyMode, offset, shape._cf.geometry.node._vf.vertexCount[i]);

						offset += shape._cf.geometry.node._vf.vertexCount[i];

					}

				}    

				else if (shape._webgl.binaryGeometry > 0) {

			        for (var i=0, offset=0; i<shape._cf.geometry.node._vf.vertexCount.length; i++) {

				        gl.drawElements(polyMode, shape._cf.geometry.node._vf.vertexCount[i], 

				                        gl.UNSIGNED_SHORT, 2*offset);

				        offset += shape._cf.geometry.node._vf.vertexCount[i];

			        }

				}

				else {

					gl.drawElements(polyMode, shape._webgl.indexes[q].length, gl.UNSIGNED_SHORT, 0);

				}

              }

              else {

                if (shape._webgl.primType == gl.POINTS) {

					gl.drawArrays(gl.POINTS, 0, shape._webgl.positions[q].length/3);

                }

                else {

                    if (shape._webgl.indexes && shape._webgl.indexes[q]) {

						if (shape._webgl.imageGeometry || shape._webgl.binaryGeometry < 0) {

							for (var i=0, offset=0; i<shape._cf.geometry.node._vf.vertexCount.length; i++) {

								gl.drawArrays(shape._webgl.primType[i], offset, shape._cf.geometry.node._vf.vertexCount[i]);

								offset += shape._cf.geometry.node._vf.vertexCount[i];

							}

						}

						else if (shape._webgl.binaryGeometry > 0) {

                            for (var i=0, offset=0; i<shape._cf.geometry.node._vf.vertexCount.length; i++) {

						        gl.drawElements(shape._webgl.primType[i], shape._cf.geometry.node._vf.vertexCount[i], 

						                        gl.UNSIGNED_SHORT, 2*offset);

						        offset += shape._cf.geometry.node._vf.vertexCount[i];

					        }

    					}

    					else if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.IndexedTriangleStripSet) &&

    					         shape._webgl.primType == gl.TRIANGLE_STRIP) {  // TODO; remove 2nd check

        				    var indOff = shape._cf.geometry.node._indexOffset;

        				    for (var io=1; io<indOff.length; io++) {

             					gl.drawElements(gl.TRIANGLE_STRIP, indOff[io]-indOff[io-1], gl.UNSIGNED_SHORT, 2*indOff[io-1]);

             				}

        				}

						else {

							gl.drawElements(shape._webgl.primType, shape._webgl.indexes[q].length, gl.UNSIGNED_SHORT, 0);

						}

                    }

                }

              }

            }

            catch (e) {

                x3dom.debug.logException(shape._DEF + " renderScene(): " + e);

            }



			//check act next

			if(!next_shape || (next_shape && next_shape._cf.geometry.node._mesh !== shape._cf.geometry.node._mesh)) 

			{

				if (sp.position !== undefined) {

					gl.disableVertexAttribArray(sp.position);

				}

				if (sp.normal !== undefined) {

					gl.disableVertexAttribArray(sp.normal);

				}

				if (sp.texcoord !== undefined) {

					gl.disableVertexAttribArray(sp.texcoord);

				}

				if (sp.color !== undefined) {

					gl.disableVertexAttribArray(sp.color);

				}

			}

        }

        

        if (shape._webgl.indexes && shape._webgl.indexes[0]) {

			if(shape._webgl.imageGeometry) {

				for(var i=0; i<shape._cf.geometry.node._vf.vertexCount.length; i++) {

				    if (shape._webgl.primType[i] == gl.TRIANGLE_STRIP)

					    this.numFaces += (shape._cf.geometry.node._vf.vertexCount[i] - 2);

					else

					    this.numFaces += (shape._cf.geometry.node._vf.vertexCount[i] / 3);

				}

			} 

			else {

				this.numFaces += shape._cf.geometry.node._mesh._numFaces;

			}

        }

		

		if(shape._webgl.imageGeometry) {

			for(var i=0; i<shape._cf.geometry.node._vf.vertexCount.length; i++)

				this.numCoords += shape._cf.geometry.node._vf.vertexCount[i];

			this.numDrawCalls += shape._cf.geometry.node._vf.vertexCount.length;

		}

		else if (shape._webgl.binaryGeometry != 0) {

		    this.numCoords += shape._cf.geometry.node._mesh._numCoords;

		    this.numDrawCalls += shape._cf.geometry.node._vf.vertexCount.length;

		}

		else {

			this.numCoords += shape._cf.geometry.node._mesh._numCoords;

			

			if (x3dom.isa(shape._cf.geometry.node, x3dom.nodeTypes.IndexedTriangleStripSet) 

			    && shape._webgl.primType == gl.TRIANGLE_STRIP) {

			    this.numDrawCalls += shape._cf.geometry.node._indexOffset.length;

			}

			else {

			    this.numDrawCalls += 1;

		    }

		}

		

        for (cnt=0; shape._webgl.texture !== undefined && 

                    cnt < shape._webgl.texture.length; cnt++)

        {

            if (shape._webgl.texture[cnt])

            {

                tex = null;

                if (shape._cf.appearance.node._cf.texture.node) {

                    tex = shape._cf.appearance.node._cf.texture.node.getTexture(cnt);

                }

                

                if (shape._webgl.texture[cnt].textureCubeReady && tex && 

                    x3dom.isa(tex, x3dom.nodeTypes.X3DEnvironmentTextureNode)) 

                {

                    gl.activeTexture(gl.TEXTURE0 + cnt);

                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

                    //gl.disable(gl.TEXTURE_CUBE_MAP);

                } else {

                    gl.activeTexture(gl.TEXTURE0 + cnt);

                    gl.bindTexture(gl.TEXTURE_2D, null);

                }

            }

        }

        if (oneShadowExistsAlready) {

            gl.activeTexture(gl.TEXTURE0 + cnt);

            gl.bindTexture(gl.TEXTURE_2D, null);

        }

        //gl.disable(gl.TEXTURE_2D);

        

        for (df=0; df<shape._webgl.dynamicFields.length; df++) {

            attrib = shape._webgl.dynamicFields[df];

            

            if (sp[attrib.name] !== undefined) {

                gl.disableVertexAttribArray(sp[attrib.name]);

            }

        }

    };

    

//----------------------------------------------------------------------------

/*! render color-buf pass for picking

 */

//----------------------------------------------------------------------------

    Context.prototype.pickValue = function (viewarea, x, y, viewMat, sceneMat)

    {

        var gl = this.ctx3d;

        var scene = viewarea._scene;

        

        // method requires that scene has already been rendered at least once

        if (gl === null || scene === null || !scene._webgl ||

            scene.drawableObjects === undefined || !scene.drawableObjects ||

            scene._vf.pickMode.toLowerCase() === "box")

        {

            return false;

        }

        

        //t0 = new Date().getTime();

        

        var mat_view, mat_scene;

        

        if (arguments.length > 4) {

            mat_view = viewMat;

            mat_scene = sceneMat;

        }

        else {

            mat_view = viewarea._last_mat_view;

            mat_scene = viewarea._last_mat_scene;

        }

        

        var pickMode = (scene._vf.pickMode.toLowerCase() === "color") ? 1 :

                        ((scene._vf.pickMode.toLowerCase() === "texcoord") ? 2 : 0);

        

        var min = scene._lastMin;

        var max = scene._lastMax;

        

        // render to texture for reading pixel values

        this.renderPickingPass(gl, scene, 

                               mat_view, mat_scene, 

                               min, max, 

                               pickMode, x, y);

        

        //var index = ( (scene._webgl.fboPick.height - 1 - scene._lastY) * 

        //               scene._webgl.fboPick.width + scene._lastX ) * 4;

        var index = 0;

        if (index >= 0 && index < scene._webgl.fboPick.pixelData.length) {

            var pickPos = new x3dom.fields.SFVec3f(0, 0, 0);

            var charMax = (pickMode > 0) ? 1 : 255;

            

            pickPos.x = scene._webgl.fboPick.pixelData[index + 0] / charMax;

            pickPos.y = scene._webgl.fboPick.pixelData[index + 1] / charMax;

            pickPos.z = scene._webgl.fboPick.pixelData[index + 2] / charMax;

            

            if (pickMode === 0) {

                pickPos = pickPos.multComponents(max.subtract(min)).add(min);

            }

            var objId = 255 - scene._webgl.fboPick.pixelData[index + 3];

            //x3dom.debug.logInfo(pickPos + " / " + objId);

            

            if (objId > 0) {

                //x3dom.debug.logInfo(x3dom.nodeTypes.Shape.idMap.nodeID[objId]._DEF + " // " +

                //                    x3dom.nodeTypes.Shape.idMap.nodeID[objId]._xmlNode.localName);

                viewarea._pickingInfo.pickPos = pickPos;

                viewarea._pickingInfo.pickObj = x3dom.nodeTypes.Shape.idMap.nodeID[objId];

            }

            else {

                viewarea._pickingInfo.pickObj = null;

                //viewarea._pickingInfo.lastObj = null;

                viewarea._pickingInfo.lastClickObj = null;

            }

        }

        

        //t1 = new Date().getTime() - t0;

        //x3dom.debug.logInfo("Picking time (idBuf): " + t1 + "ms");

        

        return true;

    };

    

//----------------------------------------------------------------------------

/*! render scene (main pass)

 */

//----------------------------------------------------------------------------

    Context.prototype.renderScene = function (viewarea) 

    {

        var gl = this.ctx3d;

        var scene = viewarea._scene;

        

        if (gl === null || scene === null)

        {

            return;

        }

        

        var rentex = viewarea._doc._nodeBag.renderTextures;

        var rt_tex, rtl_i, rtl_n = rentex.length;

        

        if (!scene._webgl)

        {

            var type = gl.UNSIGNED_BYTE;



            this._fpTexSupport = gl.getExtension("OES_texture_float");



            if (this._fpTexSupport) {

                type = gl.FLOAT;

                //x3dom.debug.logInfo("WebGL backend: found support for floating point textures");

            }



            scene._webgl = {};

            this.setupFgnds(gl, scene);

            

            // scale factor for mouse coords and width/ height (low res for speed-up)

            scene._webgl.pickScale = 0.5;

            

            scene._webgl._currFboWidth = Math.round(this.canvas.width * scene._webgl.pickScale);

            scene._webgl._currFboHeight = Math.round(this.canvas.height * scene._webgl.pickScale);



            // TODO: FIXME when spec ready: readPixels not (yet?) available for float textures

            // https://bugzilla.mozilla.org/show_bug.cgi?id=681903

            // https://www.khronos.org/webgl/public-mailing-list/archives/1108/msg00025.html

            scene._webgl.fboPick = this.initFbo(gl, 

                         scene._webgl._currFboWidth, scene._webgl._currFboHeight, true, gl.UNSIGNED_BYTE);

            scene._webgl.fboPick.pixelData = null;

            

            scene._webgl.pickShader = getDefaultShaderProgram(gl, 'pick');

            if (!x3dom.caps.MOBILE)    // TODO: mobile + fp

			    scene._webgl.pickShaderIG = this.getShaderProgram(gl, ['vs-x3d-pickIG', 'fs-x3d-pick']);

            scene._webgl.pickColorShader = getDefaultShaderProgram(gl, 'vertexcolorUnlit');

            scene._webgl.pickTexCoordShader = getDefaultShaderProgram(gl, 'texcoordUnlit');

            

            scene._webgl.fboShadow = this.initFbo(gl, 1024, 1024, false, gl.UNSIGNED_BYTE); // type);  TODO: fp shadows

            scene._webgl.shadowShader = getDefaultShaderProgram(gl, 'shadow');

            

            // TODO; for testing do it on init, but must be refreshed on node change!

            for (rtl_i=0; rtl_i<rtl_n; rtl_i++) {

                rt_tex = rentex[rtl_i];

                rt_tex._webgl = {};

                rt_tex._webgl.fbo = this.initFbo(gl, 

                            rt_tex._vf.dimensions[0], 

                            rt_tex._vf.dimensions[1], false, type);

            }

            

            // init scene volume to improve picking speed

            var min = x3dom.fields.SFVec3f.MAX();

            var max = x3dom.fields.SFVec3f.MIN();

            

            scene.getVolume(min, max, true);

            

            scene._lastMin = min;

            scene._lastMax = max;

            

            viewarea._last_mat_view = x3dom.fields.SFMatrix4f.identity();

            viewarea._last_mat_proj = x3dom.fields.SFMatrix4f.identity();

        	viewarea._last_mat_scene = x3dom.fields.SFMatrix4f.identity();



            this._calledViewpointChangedHandler = false;

        }

        else 

        {

            var fboWidth = Math.round(this.canvas.width * scene._webgl.pickScale);

            var fboHeight = Math.round(this.canvas.height * scene._webgl.pickScale);

            

            if (scene._webgl._currFboWidth !== fboWidth ||

                scene._webgl._currFboHeight !== fboHeight)

            {

                scene._webgl._currFboWidth = fboWidth;

                scene._webgl._currFboHeight = fboHeight;

                

                scene._webgl.fboPick = this.initFbo(gl, fboWidth, fboHeight, true, scene._webgl.fboPick.typ);

                scene._webgl.fboPick.pixelData = null;

                

                x3dom.debug.logInfo("Refreshed picking FBO to size (" + 

                                    (fboWidth) + ", " + (fboHeight) + ")");

            }

        }

        

        var bgnd = scene.getBackground();

        this.setupScene(gl, bgnd);

        

        var t0, t1;

        this.numFaces = 0;

        this.numCoords = 0;

        this.numDrawCalls = 0;

        

        // render traversal

        scene.drawableObjects = null;

        //if (scene.drawableObjects === undefined || !scene.drawableObjects)

        //{

            scene.drawableObjects = [];

            scene.drawableObjects.LODs = [];

            scene.drawableObjects.Billboards = [];



            // remote rendering stuff XXX

            scene.drawableObjects.useIdList = false;

            scene.drawableObjects.collect = false;

            scene.drawableObjects.idList = [];

            

            t0 = new Date().getTime();

            

            scene.collectDrawableObjects(x3dom.fields.SFMatrix4f.identity(), scene.drawableObjects);

            

            t1 = new Date().getTime() - t0;

            

            if (this.canvas.parent.statDiv) {

                this.canvas.parent.statDiv.appendChild(document.createElement("br"));

                this.canvas.parent.statDiv.appendChild(document.createTextNode("traverse: " + t1));

            }

        //}

        

        var mat_proj = viewarea.getProjectionMatrix();

        var mat_view = viewarea.getViewMatrix();



        // fire viewpointChanged event

        if ( !this._calledViewpointChangedHandler || !viewarea._last_mat_view.equals(mat_view) )

        {

        	var e_viewpoint = viewarea._scene.getViewpoint();

        	var e_eventType = "viewpointChanged";



        	try {

				if ( e_viewpoint._xmlNode && 

					(e_viewpoint._xmlNode["on"+e_eventType] ||

					 e_viewpoint._xmlNode.hasAttribute("on"+e_eventType) ||

					 e_viewpoint._listeners[e_eventType]) )

				{

				    var e_viewtrafo = e_viewpoint.getCurrentTransform();

					e_viewtrafo = e_viewtrafo.inverse().mult(mat_view);

					

					var e_mat = e_viewtrafo.inverse();

					

					var e_rotation = new x3dom.fields.Quaternion(0, 0, 1, 0);

					e_rotation.setValue(e_mat);

					

					var e_translation = e_mat.e3();

					

				    var e_event = {

						target: e_viewpoint._xmlNode,

						type: e_eventType,

						matrix: e_viewtrafo,

						position: e_translation,

						orientation: e_rotation.toAxisAngle(),

						cancelBubble: false,

						stopPropagation: function() { this.cancelBubble = true; }

					};

					

					e_viewpoint.callEvtHandler(e_eventType, e_event);



                    this._calledViewpointChangedHandler = true;

				}

			}

			catch(e_e) {

				x3dom.debug.logException(e_e);

			}

        }

        

        viewarea._last_mat_view = mat_view;

        viewarea._last_mat_proj = mat_proj;

        

        var mat_scene = mat_proj.mult(mat_view);  //viewarea.getWCtoCCMatrix();

        viewarea._last_mat_scene = mat_scene;

        

        

        // sorting and stuff

        t0 = new Date().getTime();

        

        // do z-sorting for transparency (currently no separate transparency list)

        var zPos = [], sortKeyArr = [], zPosTransp = {};

        var sortKeyProp = "";

        var i, m, n = scene.drawableObjects.length;

        var center, trafo, obj3d;

        

        for (i=0; i<n; i++)

        {

            trafo = scene.drawableObjects[i][0];

            obj3d = scene.drawableObjects[i][1];

            

            // do also init of GL objects

            this.setupShape(gl, obj3d, viewarea);

            

            center = obj3d.getCenter();

            center = trafo.multMatrixPnt(center);

            center = mat_view.multMatrixPnt(center);



            var sortType = (obj3d._cf.appearance.node !== undefined) ? obj3d._cf.appearance.node._vf.sortType : "opaque";

            var sortKey = (obj3d._cf.appearance.node !== undefined) ? obj3d._cf.appearance.node._vf.sortKey : 0;



            if (sortType.toLowerCase() === "opaque") {

                zPos.push([i, center.z, sortKey]);

            }

            else {

                sortKeyProp = sortKey.toString();

                if (zPosTransp[sortKeyProp] === undefined)

                    zPosTransp[sortKeyProp] = [];



                zPosTransp[sortKeyProp].push([i, center.z, sortKey]);

                sortKeyArr.push(sortKey);

            }

        }



        // sort solid objects only according to sortKey

        zPos.sort(function(a, b) { return a[2] - b[2]; });



        // sort transparent objects along viewer distance and sortKey

        sortKeyArr.sort(function(a, b) { return a - b; });

        

        sortKeyArr = (function (arr) {

            var a = [], l = arr.length;

            for (var i=0; i<l; i++) {

                for (var j=i+1; j<l; j++) {

                    if (arr[i] === arr[j])

                      j = ++i;

                }

                a.push(arr[i]);

            }

            return a;

        })(sortKeyArr);



        for (var sortKeyArrIt=0, sortKeyArrN=sortKeyArr.length; 

                 sortKeyArrIt<sortKeyArrN; ++sortKeyArrIt) {

            sortKeyProp = sortKeyArr[sortKeyArrIt];

            var zPosTranspArr = zPosTransp[sortKeyProp];

            

            zPosTranspArr.sort(function(a, b) { return a[1] - b[1]; });



            //zPos = zPos.concat(zPosTransp[sortKeyProp]);

            zPos.push.apply(zPos, zPosTranspArr);

        }

        

        m = scene.drawableObjects.Billboards.length;

        n = scene.drawableObjects.LODs.length;

        if (m || n) {

            center = new x3dom.fields.SFVec3f(0, 0, 0); // eye

            center = mat_view.inverse().multMatrixPnt(center);

        }

        

        for (i=0; i<n; i++)

        {

            trafo = scene.drawableObjects.LODs[i][0];

            obj3d = scene.drawableObjects.LODs[i][1];

            

            if (obj3d) {

                obj3d._eye = trafo.inverse().multMatrixPnt(center);

            }

        }

        

        for (i=0; i<m; i++)

        {

            trafo = scene.drawableObjects.Billboards[i][0];

            obj3d = scene.drawableObjects.Billboards[i][1];

            

            if (obj3d) {

                var mat_view_model = mat_view.mult(trafo);

                obj3d._eye = trafo.inverse().multMatrixPnt(center);

                obj3d._eyeViewUp = new x3dom.fields.SFVec3f(mat_view_model._10, mat_view_model._11, mat_view_model._12);

                obj3d._eyeLook = new x3dom.fields.SFVec3f(mat_view_model._20, mat_view_model._21, mat_view_model._22);

            }

        }

        

        t1 = new Date().getTime() - t0;

        

        if (this.canvas.parent.statDiv) {

            this.canvas.parent.statDiv.appendChild(document.createElement("br"));

            this.canvas.parent.statDiv.appendChild(document.createTextNode("sort: " + t1));

        }

        

        //===========================================================================

        // Render Shadow Pass

        //===========================================================================

        var slights = viewarea.getLights(); 

        var numLights = slights.length;

        var oneShadowExistsAlready = false;

        var mat_light;

        

        for(var p=0; p<numLights; p++){

            //FIXME!!! Shadowing for only one Light

            if(slights[p]._vf.shadowIntensity > 0.0 && !oneShadowExistsAlready){

                oneShadowExistsAlready = true;

                t0 = new Date().getTime();



                // FIXME; iterate over all lights

                var lightMatrix = viewarea.getLightMatrix()[0];

                mat_light = viewarea.getWCtoLCMatrix(lightMatrix);

                

                this.renderShadowPass(gl, scene, lightMatrix, mat_light);

                t1 = new Date().getTime() - t0;

                

                if (this.canvas.parent.statDiv) {

                    this.canvas.parent.statDiv.appendChild(document.createElement("br"));

                    this.canvas.parent.statDiv.appendChild(document.createTextNode("shadow: " + t1));

                }   

            }

        }

        

        for (rtl_i=0; rtl_i<rtl_n; rtl_i++) {

            this.renderRTPass(gl, viewarea, rentex[rtl_i]);

        }

        

        // rendering

        t0 = new Date().getTime();

        

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        

        // calls gl.clear etc. (bgnd stuff)

        bgnd._webgl.render(gl, mat_view, mat_proj);

        

        gl.depthMask(true);

        gl.depthFunc(gl.LEQUAL);

        gl.enable(gl.DEPTH_TEST);

        gl.enable(gl.CULL_FACE);

        

        //gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);

        //gl.enable(gl.SAMPLE_COVERAGE);

        //gl.sampleCoverage(0.5, false);



        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        //Workaround for WebKit & Co.

        gl.blendFuncSeparate(

                    gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,

                    //gl.ONE_MINUS_DST_ALPHA, gl.ONE

                    gl.ONE, gl.ONE

                    //gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA

                );

        gl.enable(gl.BLEND);



        for (i=0, n=zPos.length; i<n; i++)

        {

            var obj = scene.drawableObjects[zPos[i][0]];

			

			//Get prev shape 

			if(i > 0) {

				var prev_obj = scene.drawableObjects[zPos[i-1][0]][1];

			}

			//Get next shape

			if(i < zPos.length-1) {

				var next_obj = scene.drawableObjects[zPos[i+1][0]][1];

			}

			

            var needEnableBlending = false;

            var needEnableDepthMask = false;

            var shapeApp = obj[1]._cf.appearance.node;



            // HACK; fully impl. BlendMode and DepthMode

            if (shapeApp._cf.blendMode.node &&

                shapeApp._cf.blendMode.node._vf.srcFactor.toLowerCase() === "none" &&

                shapeApp._cf.blendMode.node._vf.destFactor.toLowerCase() === "none")

            {

                needEnableBlending = true;

                gl.disable(gl.BLEND);

            }

            if (shapeApp._cf.depthMode.node &&

                shapeApp._cf.depthMode.node._vf.readOnly === true)

            {

                needEnableDepthMask = true;

                gl.depthMask(false);

            }



            this.renderShape(obj[0], obj[1], prev_obj, next_obj, viewarea, slights, numLights, 

                mat_view, mat_scene, mat_light, gl, oneShadowExistsAlready);



            if (needEnableBlending) {

                gl.enable(gl.BLEND);

            }

            if (needEnableDepthMask) {

                gl.depthMask(true);

            }

        }



        gl.disable(gl.BLEND);

        /*gl.blendFuncSeparate( // just multiply dest RGB by its A

            gl.ZERO, gl.DST_ALPHA,

            gl.ZERO, gl.ONE

        );*/

        

        gl.disable(gl.DEPTH_TEST);

        

        if (viewarea._visDbgBuf !== undefined && viewarea._visDbgBuf)

        {

            if (scene._vf.pickMode.toLowerCase() === "idbuf" || 

                scene._vf.pickMode.toLowerCase() === "color" ||

                scene._vf.pickMode.toLowerCase() === "texcoord") {

                gl.viewport(0, 3*this.canvas.height/4, 

                            this.canvas.width/4, this.canvas.height/4);

                scene._fgnd._webgl.render(gl, scene._webgl.fboPick.tex);

            }

            

            if (oneShadowExistsAlready) {

                gl.viewport(this.canvas.width/4, 3*this.canvas.height/4, 

                            this.canvas.width/4, this.canvas.height/4);

                scene._fgnd._webgl.render(gl, scene._webgl.fboShadow.tex);

            }

        }

        gl.flush();

        

        t1 = new Date().getTime() - t0;

            

        if (this.canvas.parent.statDiv) {

            this.canvas.parent.statDiv.appendChild(document.createElement("br"));

            this.canvas.parent.statDiv.appendChild(document.createTextNode("render: " + t1));

            this.canvas.parent.statDiv.appendChild(document.createElement("br"));

			this.canvas.parent.statDiv.appendChild(document.createTextNode("#Tris: " + this.numFaces));

            this.canvas.parent.statDiv.appendChild(document.createElement("br"));

            this.canvas.parent.statDiv.appendChild(document.createTextNode("#Pnts: " + this.numCoords));

            this.canvas.parent.statDiv.appendChild(document.createElement("br"));

            this.canvas.parent.statDiv.appendChild(document.createTextNode("#Draws: " + this.numDrawCalls));

        }

        

        //scene.drawableObjects = null;

    };

    

//----------------------------------------------------------------------------

/*! render rendered texture pass

 */

//----------------------------------------------------------------------------

    Context.prototype.renderRTPass = function(gl, viewarea, rt)

    {

        switch(rt._vf.update.toUpperCase())

        {

            case "NONE":

                return;

            case "NEXT_FRAME_ONLY":

                if (!rt._needRenderUpdate) {

                    return;

                }

                rt._needRenderUpdate = false;

                break;

            case "ALWAYS":

            default:

                break;

        }

        

        var scene = viewarea._scene;

        var bgnd = null; 

        

        var mat_view = rt.getViewMatrix();

        var mat_proj = rt.getProjectionMatrix();

        var mat_scene = mat_proj.mult(mat_view);

        

        var lightMatrix = viewarea.getLightMatrix()[0];

        var mat_light = viewarea.getWCtoLCMatrix(lightMatrix);

        

        var i, n, m = rt._cf.excludeNodes.nodes.length;

        

        var arr = new Array(m);

        for (i=0; i<m; i++) {

            var render = rt._cf.excludeNodes.nodes[i]._vf.render;

            if (render === undefined) {

                arr[i] = -1;

            }

            else {

                if (render === true) {

                    arr[i] = 1;

                } else {

                    arr[i] = 0;

                }

            }

            rt._cf.excludeNodes.nodes[i]._vf.render = false;

        }

        

        gl.bindFramebuffer(gl.FRAMEBUFFER, rt._webgl.fbo.fbo);

        

        gl.viewport(0, 0, rt._webgl.fbo.width, rt._webgl.fbo.height);

        

        if (rt._cf.background.node === null) 

        {

            gl.clearColor(0, 0, 0, 1);

            gl.clearDepth(1.0);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

        }

        else if (rt._cf.background.node === scene.getBackground())

        {

            bgnd = scene.getBackground();

            bgnd._webgl.render(gl, mat_view, mat_proj);

        }

        else 

        {

            bgnd = rt._cf.background.node;

            this.setupScene(gl, bgnd);

            bgnd._webgl.render(gl, mat_view, mat_proj);

        }

        

        gl.depthFunc(gl.LEQUAL);

        gl.enable(gl.DEPTH_TEST);

        gl.enable(gl.CULL_FACE);

        

        gl.blendFuncSeparate(

                    gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,

                    gl.ONE, gl.ONE

                );

        gl.enable(gl.BLEND);

        

        var slights = viewarea.getLights(); 

        var numLights = slights.length;

        var oneShadowExistsAlready = false;

        

        var transform, shape;

        var locScene = rt._cf.scene.node;



        var needEnableBlending, needEnableDepthMask;

        

        if (!locScene || locScene === scene)

        {

            n = scene.drawableObjects.length;

            

            for (i=0; i<n; i++)

            {

                transform = scene.drawableObjects[i][0];

                shape = scene.drawableObjects[i][1];

                

                if (shape._vf.render !== undefined && shape._vf.render === false) {

                   continue;

                }

                

				//Get prev shape 

				if(i > 0) {

					var prev_shape = scene.drawableObjects[i-1][1];

				}

				//Get next shape

				if(i < scene.drawableObjects.length-1) {

					var next_shape = scene.drawableObjects[i+1][1];

				}



                needEnableBlending = false;

                needEnableDepthMask = false;



                // HACK; fully impl. BlendMode and DepthMode

                appearance = shape._cf.appearance.node;



                if (appearance._cf.blendMode.node &&

                    appearance._cf.blendMode.node._vf.srcFactor.toLowerCase() === "none" &&

                    appearance._cf.blendMode.node._vf.destFactor.toLowerCase() === "none")

                {

                    needEnableBlending = true;

                    gl.disable(gl.BLEND);

                }

                if (appearance._cf.depthMode.node &&

                    appearance._cf.depthMode.node._vf.readOnly === true)

                {

                    needEnableDepthMask = true;

                    gl.depthMask(false);

                }



                this.renderShape(transform, shape, prev_shape, next_shape, viewarea, slights, numLights, 

                        mat_view, mat_scene, mat_light, gl, oneShadowExistsAlready);



                if (needEnableBlending) {

                    gl.enable(gl.BLEND);

                }

                if (needEnableDepthMask) {

                    gl.depthMask(true);

                }

            }

        }

        else

        {

            locScene.drawableObjects = [];



            // remote rendering stuff XXX

            locScene.drawableObjects.useIdList = false;

            locScene.drawableObjects.collect = false;

            locScene.drawableObjects.idList = [];



            locScene.collectDrawableObjects(

                locScene.transformMatrix(x3dom.fields.SFMatrix4f.identity()), locScene.drawableObjects);

            

            n = locScene.drawableObjects.length;

            

            for (i=0; i<n; i++)

            {

                transform = locScene.drawableObjects[i][0];

                shape = locScene.drawableObjects[i][1];

                

                //x3dom.debug.logWarning(i + "\n" + transform);

                

                if (shape._vf.render !== undefined && shape._vf.render === false) {

                   continue;

                }

                

                this.setupShape(gl, shape, viewarea);

                

				//Get prev shape 

				if(i > 0) {

					var prev_shape = locScene.drawableObjects[i-1][1];

				}

				//Get next shape

				if(i < locScene.drawableObjects.length-1) {

					var next_shape = locScene.drawableObjects[i+1][1];

				}



                needEnableBlending = false;

                needEnableDepthMask = false;



                // HACK; fully impl. BlendMode and DepthMode

                appearance = shape._cf.appearance.node;



                if (appearance._cf.blendMode.node &&

                    appearance._cf.blendMode.node._vf.srcFactor.toLowerCase() === "none" &&

                    appearance._cf.blendMode.node._vf.destFactor.toLowerCase() === "none")

                {

                    needEnableBlending = true;

                    gl.disable(gl.BLEND);

                }

                if (appearance._cf.depthMode.node &&

                    appearance._cf.depthMode.node._vf.readOnly === true)

                {

                    needEnableDepthMask = true;

                    gl.depthMask(false);

                }



                this.renderShape(transform, shape, prev_shape, next_shape, viewarea, slights, numLights, 

                        mat_view, mat_scene, mat_light, gl, oneShadowExistsAlready);



                if (needEnableBlending) {

                    gl.enable(gl.BLEND);

                }

                if (needEnableDepthMask) {

                    gl.depthMask(true);

                }

            }

        }

        

        gl.disable(gl.BLEND);

        gl.disable(gl.DEPTH_TEST);

        

        gl.flush();

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        

        for (i=0; i<m; i++) {

            if (arr[i] !== 0) {

                rt._cf.excludeNodes.nodes[i]._vf.render = true;

            }

        }

    };

    

//----------------------------------------------------------------------------

/*! cleanup

 */

//----------------------------------------------------------------------------

    Context.prototype.shutdown = function(viewarea)

    {

        var gl = this.ctx3d;

        var attrib;

        var scene;

        

        if (gl === null || scene === null || !scene || scene.drawableObjects === null) {

            return;

        }

        scene = viewarea._scene;

        

        // TODO; optimize traversal, matrices are not needed for cleanup

        scene.collectDrawableObjects(x3dom.fields.SFMatrix4f.identity(), scene.drawableObjects);

        

        var bgnd = scene.getBackground();

        if (bgnd._webgl.texture !== undefined && bgnd._webgl.texture)

        {

            gl.deleteTexture(bgnd._webgl.texture);

        }

        if (bgnd._webgl.shader.position !== undefined) 

        {

            gl.deleteBuffer(bgnd._webgl.buffers[1]);

            gl.deleteBuffer(bgnd._webgl.buffers[0]);

        }

        

        for (var i=0, n=scene.drawableObjects.length; i<n; i++)

        {

            var shape = scene.drawableObjects[i][1];

            var sp = shape._webgl.shader;

            

            for (var cnt=0; shape._webgl.texture !== undefined && 

                            cnt < shape._webgl.texture.length; cnt++)

            {

                if (shape._webgl.texture[cnt])

                {

                    gl.deleteTexture(shape._webgl.texture[cnt]);

                }

            }

            

            for (var q=0; q<shape._webgl.positions.length; q++)

            {

                if (sp.position !== undefined) 

                {

                    gl.deleteBuffer(shape._webgl.buffers[5*q+1]);

                    gl.deleteBuffer(shape._webgl.buffers[5*q+0]);

                }

                

                if (sp.normal !== undefined) 

                {

                    gl.deleteBuffer(shape._webgl.buffers[5*q+2]);

                }

                

                if (sp.texcoord !== undefined) 

                {

                    gl.deleteBuffer(shape._webgl.buffers[5*q+3]);

                }

                

                if (sp.color !== undefined)

                {

                    gl.deleteBuffer(shape._webgl.buffers[5*q+4]);

                }

            }



            for (var df=0; df<shape._webgl.dynamicFields.length; df++)

            {

                attrib = shape._webgl.dynamicFields[df];

                

                if (sp[attrib.name] !== undefined)

                {

                    gl.deleteBuffer(attrib.buf);

                }

            }

            

            shape._webgl = null;

        }

    };

    

//----------------------------------------------------------------------------

/*! load cubemap

 */

//----------------------------------------------------------------------------

    Context.prototype.loadCubeMap = function(gl, url, doc, bgnd)

    {

        var texture = gl.createTexture();



        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);



        var faces;

        if (bgnd) {

            faces = [gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 

                     gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 

                     gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X];

        }

        else

        {

            //       back, front, bottom, top, left, right

            faces = [gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, gl.TEXTURE_CUBE_MAP_POSITIVE_Z,

                     gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Y,

                     gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_X];

        }

        texture.pendingTextureLoads = -1;

        texture.textureCubeReady = false;

        

        for (var i=0; i<faces.length; i++) {

            var face = faces[i];

            var image = new Image();

            image.crossOrigin = '';

            texture.pendingTextureLoads++;

            doc.downloadCount += 1;

            

            image.onload = function(texture, face, image, swap) {

                return function() {

                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, swap);

                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

                    gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

                    

                    texture.pendingTextureLoads--;

                    doc.downloadCount -= 1;

                    if (texture.pendingTextureLoads < 0) {

                        texture.textureCubeReady = true;

                        x3dom.debug.logInfo("Loading CubeMap finished...");

                        doc.needRender = true;

                    }

                };

            }( texture, face, image, bgnd );



            image.onerror = function()

            {

                doc.downloadCount -= 1;



                x3dom.debug.logError("Can't load CubeMap!");

            };

            

            // backUrl, frontUrl, bottomUrl, topUrl, leftUrl, rightUrl (for bgnd)

            image.src = url[i];

        }

        

        return texture;

    };

    

//----------------------------------------------------------------------------

/*! start of fbo init stuff

 */

//----------------------------------------------------------------------------

    Context.prototype.emptyTexImage2D = function(gl, internalFormat, width, height, format, type)

    {

        try {

            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);

        }

        catch (e) {

            // seems to be no longer necessary, but anyway...

            var bytes = 3;

            switch (internalFormat)

            {

                case gl.DEPTH_COMPONENT: bytes = 3; break;

                case gl.ALPHA: bytes = 1; break;

                case gl.RGB: bytes = 3; break;

                case gl.RGBA: bytes = 4; break;

                case gl.LUMINANCE: bytes = 1; break;

                case gl.LUMINANCE_ALPHA: bytes = 2; break;

            }

            var pixels = new Uint8Array(width * height * bytes);

            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, pixels);

        }

    };



    Context.prototype.initTex = function(gl, w, h, nearest, type)

    {

        var tex = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, tex);



        this.emptyTexImage2D(gl, gl.RGBA, w, h, gl.RGBA, type);

        //this.emptyTexImage2D(gl, gl.DEPTH_COMPONENT16, w, h, gl.DEPTH_COMPONENT, gl.UNSIGNED_BYTE);



        if (nearest) {

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        }

        else {

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        }

        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        //gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);



        tex.width = w;

        tex.height = h;



        return tex;

    };



//----------------------------------------------------------------------------

    /*!

     * Creates FBO with given size

     *   taken from FBO utilities for WebGL by Emanuele Ruffaldi 2009

     * Returned Object has

     *   rbo, fbo, tex, width, height

     */

//----------------------------------------------------------------------------

    Context.prototype.initFbo = function(gl, w, h, nearest, type)

    {

        var fbo = gl.createFramebuffer();

        var rb = gl.createRenderbuffer();



        /*

        var type = gl.UNSIGNED_BYTE;

        if (gl.getExtension("OES_texture_float")) {

            type = gl.FLOAT;

            x3dom.debug.logInfo("Using fp extension...");

        }

        */

        var tex = this.initTex(gl, w, h, nearest, type);



        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

        gl.bindRenderbuffer(gl.RENDERBUFFER, rb);

        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);

        gl.bindRenderbuffer(gl.RENDERBUFFER, null);



        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rb);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);



        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

        if (status != gl.FRAMEBUFFER_COMPLETE)

            x3dom.debug.logWarning("FBO-Status: " + status);



        var r = {

            fbo: fbo,

            rbo: rb,

            tex: tex,

            width: w,

            height: h,

            typ: type

        };



        return r;

    };



    return setupContext;



}