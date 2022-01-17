function Shader_defaultSourceForType(type) {
            var src = '';
            switch (type) {
                case this.context.FRAGMENT_SHADER: 
                /*
                    src += '#ifdef GL_ES\n';
                    src += '	precision highp float;\n';
                    src += '#endif\n';

                    src += 'varying vec4 vColor;\n';

                    src += 'void main (void) {\n';
                    src += '	gl_FragColor = vColor;\n';
                    src += '}\n';
                    */
                    src += 'void main(void) { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);}';
                break;
                
                case this.context.VERTEX_SHADER:
                    src += 'attribute vec3 aVertex;\n';
                    src += '\n';
                    src += 'uniform mat4 uMVMatrix;\n';
                    src += 'uniform mat4 uPMatrix;\n';
                    //src += 'uniform vec4 uColor;\n';

                    //src += 'varying vec4 vColor;\n';

                    src += 'void main (void) {\n';

                    src += '    vec4 v = vec4(aVertex, 1);\n';

                    src += '    gl_Position = uPMatrix * uMVMatrix * v;\n';
                    //src += '	vColor = uColor;\n';
                    src += '}\n';
                break;
                
                default:
            }
            return src;
        }