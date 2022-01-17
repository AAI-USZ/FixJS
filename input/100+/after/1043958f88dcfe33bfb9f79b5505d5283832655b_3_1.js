function Shader(gl, type, src, attributes, uniforms) {
            if (!gl) {
                throw new Error('Shader must have gl.');
            }
            if (!type) {
                throw new Error('Shader must have a type, FRAGMENT_SHADER or VERTEX_SHADER');
            }
            /** * *
            * The WebGLRenderingContext
            * @type {WebGLRenderingContext}
            * * **/
            this.gl = gl;
            /** * *
            * The type of this shader.
            * @type {number}
            * * **/
            this.type = type || 0;
            /** * *
            * The source code for this shader
            * @type {string}
            * * **/
            this.src = src || this.defaultSourceForType(type);
            /** * *
            * A list of all the vertex shader attributes.
            * @type {Array.<string>}
            * * **/
            this.attributes = attributes || (type === this.gl.VERTEX_SHADER ? ['aVertex'] : []);
            /** * *
            * A list of all the vertex and fragment shader uniforms.
            * @type {Array.<string>}
            * * **/
            this.uniforms = uniforms || (type === this.gl.VERTEX_SHADER ? ['uMVMatrix', 'uPMatrix'] : []);
            /** * *
            * The webgl shader object.
            * @type {WebGLShader}
            * * **/
            this.id = this.gl.createShader(type);
            
            // Compile the shader...
            this.gl.shaderSource(this.id, this.src);
            this.gl.compileShader(this.id);
            // Check the status of our compilation...
            if (!this.gl.getShaderParameter(this.id, this.gl.COMPILE_STATUS)) {
                throw new Error('Failed to compile shader ' + this.id + ':\n' + this.gl.getShaderInfoLog(this.id));
            }
        }