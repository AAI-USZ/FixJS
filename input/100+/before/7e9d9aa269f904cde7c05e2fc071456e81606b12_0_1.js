function(stateSet) {
    
    var nbSamples = 16;
    var radius = 0.05;

    var kernel = new Array(nbSamples*4);
    (function(array) {
        for (var i = 0; i < nbSamples; i++) {
            var x,y,z;
            x = 2.0*(Math.random()-0.5);
            y = 2.0*(Math.random()-0.5);
            z = Math.random()+0.15;

            var v = osg.Vec3.normalize([x,y,z],[]);
            var scale = Math.random();
            //scale = i / nbSamples;
            //scale = 0.1*(1.0-scale) + 1.0*(scale * scale);
            
            array[i*3+0] = v[0];
            array[i*3+1] = v[1];
            array[i*3+2] = v[2];
            array[i*3+3] = scale;
        }
    })(kernel);

    var sizeNoise = 32;
    var noise = new Array(sizeNoise*3);
    (function(array) {
        for (var i = 0; i < sizeNoise*sizeNoise; i++) {
            var x,y,z;
            x = 2.0*(Math.random()-0.5);
            y = 2.0*(Math.random()-0.5);
            z = 0.0;

            var n = osg.Vec3.normalize([x,y,z],[]);
            array[i*3+0] = 255*(n[0]*0.5+0.5);
            array[i*3+1] = 255*(n[1]*0.5+0.5);
            array[i*3+2] = 255*(n[2]*0.5+0.5);
        }
    })(noise);

    var noiseTexture = new osg.Texture();
    noiseTexture.setWrapS('REPEAT');
    noiseTexture.setWrapT('REPEAT');
    noiseTexture.setTextureSize(sizeNoise,sizeNoise);
    noiseTexture.setImage(new Uint8Array(noise),'RGB');

    var vertexshader = [
        "",
        "#ifdef GL_ES",
        "precision highp float;",
        "#endif",
        "attribute vec3 Vertex;",
        "attribute vec2 TexCoord0;",
        "varying vec2 FragTexCoord0;",
        "uniform mat4 ModelViewMatrix;",
        "uniform mat4 ProjectionMatrix;",
        "void main(void) {",
        "  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(Vertex,1.0);",
        "  FragTexCoord0 = TexCoord0;",
        "}",
        ""
    ].join('\n');

    var kernelglsl = [];
    for (var i = 0; i < nbSamples; i++) {
        kernelglsl.push("kernel["+i+"] = vec4("+kernel[i*3]+"," + kernel[i*3+1] + ", " + kernel[i*3+2] +", " + kernel[i*3+3] + ");");
    }
    kernelglsl = kernelglsl.join('\n');

    var fragmentshader = [
        "",
        "#ifdef GL_ES",
        "precision highp float;",
        "#endif",
        "varying vec2 FragTexCoord0;",
        "uniform sampler2D Texture0;",
        "uniform sampler2D Texture1;",
        "uniform sampler2D Texture2;",
        "uniform mat4 projection;",
        "uniform vec2 noiseSampling;",

        "#define NB_SAMPLES " + nbSamples,
        "#define Radius " + radius,
        "float depth;",
        "vec3 normal;",
        "vec3 position;",
        "vec4 kernel["+nbSamples+"];",
        "mat3 computeBasis()",
        "{",
        "  vec3 rvec = texture2D(Texture2, FragTexCoord0*noiseSampling).xyz*2.0-vec3(1.0);",
        "  vec3 tangent = normalize(rvec - normal * dot(rvec, normal));",
	"  vec3 bitangent = cross(normal, tangent);",
        "  mat3 tbn = mat3(tangent, bitangent, normal);",
        "  return tbn;",
        "}",

        "void main (void)",
        "{",
        kernelglsl,
        "  vec4 p = texture2D(Texture0, FragTexCoord0);",
        "  depth = p.w;",
        "  normal = vec3(p);",
        "  if (length(normal) == 0.0) {",
        "     discard;",
        "  }",
        "  position = texture2D(Texture1, FragTexCoord0).xyz;",
        "",
        " mat3 tbn = computeBasis();",
        " float occlusion = 0.0;",
        " for (int i = 0; i < NB_SAMPLES; i++) {",
        "    vec3 sample = tbn * vec3(kernel[i]);",
        "    vec3 dir = sample;",
        "    float w = dot(dir, normal);",
        "    float dist = 1.0-kernel[i].w;",
        "    w *= dist*dist;",
        "    sample = dir * float(Radius) + position;",
        
        "    vec4 offset = projection * vec4(sample,1.0);",
	"    offset.xy /= offset.w;",
	"    offset.xy = offset.xy * 0.5 + 0.5;",

	"    float sample_depth = texture2D(Texture1, offset.xy).z;",
	"    float range_check = abs(sample.z - sample_depth) < float(Radius) ? 1.0 : 0.0;",
	"    occlusion += (sample_depth > sample.z ? 1.0 : 0.0) * range_check*w;",

        " }",
        " occlusion = 1.0 - (occlusion / float(NB_SAMPLES));",
        " gl_FragColor = vec4(vec3(occlusion),1.0);",
        "}",
        ""
    ].join('\n');

    var program = new osg.Program(
        new osg.Shader(gl.VERTEX_SHADER, vertexshader),
        new osg.Shader(gl.FRAGMENT_SHADER, fragmentshader));

        
    var array = [];
    var ratio = window.innerWidth/window.innerHeight;
    osg.Matrix.makePerspective(60, ratio, 1.0, 100.0, array);
    stateSet.addUniform(osg.Uniform.createMatrix4(array,'projection'));
    stateSet.addUniform(osg.Uniform.createInt1(2,'Texture2'));
    var sizex = stateSet.getTextureAttribute(0,'Texture').getWidth();
    var sizey = stateSet.getTextureAttribute(0,'Texture').getHeight();
    stateSet.addUniform(osg.Uniform.createFloat2([sizex/sizeNoise, sizey/sizeNoise],'noiseSampling'));
    stateSet.setAttributeAndModes(program);
    stateSet.setTextureAttributeAndModes(2,noiseTexture);
    return program;
}