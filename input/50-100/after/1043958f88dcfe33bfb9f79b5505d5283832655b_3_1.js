function Shader_defaultSourceForType(type) {
            var src = '';
            switch (type) {
                case this.gl.FRAGMENT_SHADER: 
                    src += 'void main(void) { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);}';
                break;
                
                case this.gl.VERTEX_SHADER:
                    src += 'attribute vec3 aVertex;\n';

                    src += 'uniform mat4 uMVMatrix;\n';
                    src += 'uniform mat4 uPMatrix;\n';

                    src += 'void main (void) {\n';
                    src += '    vec4 v = vec4(aVertex, 1);\n';
                    src += '    gl_Position = uPMatrix * uMVMatrix * v;\n';
                    src += '}\n';
                break;
                
                default:
            }
            return src;
        }