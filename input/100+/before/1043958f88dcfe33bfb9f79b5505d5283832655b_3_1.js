function Shader(context, type, src) {
            if (!context) {
                throw new Error('Shader must have context.');
            }
            if (!type) {
                throw new Error('Shader must have a type, FRAGMENT_SHADER or VERTEX_SHADER');
            }
            /** * *
            * The WebGLRenderingContext
            * @type {WebGLRenderingContext}
            * * **/
            this.context = context;
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
            * The webgl shader object.
            * @type {WebGLShader}
            * * **/
            this.id = this.context.createShader(type);
            
            // Compile the shader...
            this.context.shaderSource(this.id, this.src);
            this.context.compileShader(this.id);
            // Check the status of our compilation...
            if (!this.context.getShaderParameter(this.id, this.context.COMPILE_STATUS)) {
                throw new Error('Failed to compile shader ' + this.id + ':\n' + this.context.getShaderInfoLog(this.id));
            }
        }