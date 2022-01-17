function Program(gl, shaders) {
            if (!gl) {
                throw new Error('Program must have a gl.');
            }
            /** * *
            * The WebGL gl.
            * @type {WebGLRenderingContext}
            * * **/
            this.gl = gl;
            /** * *
            * A list of Shader objects to compile into this program.
            * @type {Array.<Shader>}
            * * **/
            this.shaders = shaders || [new Shader(this.gl, this.gl.VERTEX_SHADER), new Shader(this.gl, this.gl.FRAGMENT_SHADER)];
            /** * *
            * Whether or not this shader has been compiled
            * @type {boolean}
            * * **/
            this.hasBeenCompiled = false;
            /** * *
            * The webgl shader program.
            * @type {WebGLProgram}
            * * **/
            this.id = this.gl.createProgram();
            
            // Compile the program...
            for (var i=0; i < this.shaders.length; i++) {
                var shader = this.shaders[i];
                this.gl.attachShader(this.id, shader.id);
            }
            this.gl.linkProgram(this.id);
    
            if (!this.gl.getProgramParameter(this.id, this.gl.LINK_STATUS)) {
                throw new Error('LINK_STATUS: '+this.gl.LINK_STATUS+', unable to link the shader program:\n'+this.gl.getProgramInfoLog(this.id));
            }
            // Use this program...
            this.use();
            
            this.aVertex = this.gl.getAttribLocation(this.id, 'aVertex');
            this.gl.enableVertexAttribArray(this.aVertex);
        }