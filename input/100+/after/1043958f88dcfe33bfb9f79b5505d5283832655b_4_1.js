function GLView_draw() {
            if (!this.meshBuffer && this.mesh) {
                this.meshBuffer = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.meshBuffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.mesh), this.gl.STATIC_DRAW);
                
                this.transform = this.transform.translate(0, 0, -6);
            }

            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.meshBuffer);
            this.gl.vertexAttribPointer(this.program.shaderAttribLocations.aVertex, 3, this.gl.FLOAT, false, 0, 0);
            
            var pMatUniform = this.gl.getUniformLocation(this.program.id, 'uPMatrix');
            this.gl.uniformMatrix4fv(pMatUniform, false, new Float32Array(this.gl.stage.projection.transpose()));
            var mvMatUniform = this.gl.getUniformLocation(this.program.id, 'uMVMatrix');
            this.gl.uniformMatrix4fv(mvMatUniform, false, new Float32Array(this.transform.transpose()));
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.mesh.length/3);
        }