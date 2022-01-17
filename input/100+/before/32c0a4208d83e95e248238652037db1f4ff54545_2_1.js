function(gl)
{
  // Move some of this (viewport, projection) to a reshape function.
  var w = this.ui.width;
  var h = this.ui.height;

  gl.clearColor(0.2, 0.2, 0.6, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

  gl.viewport(0, 0, w, h);

  this.xform.projection.loadIdentity();
  this.xform.projection.perspective(sglDegToRad(60.0), w/h, 0.1, 100.0);

  this.xform.view.loadIdentity();
  this.xform.view.lookAt(0.0, 2.0, 3.0,
                         0.0, 0.0, 0.0,
                         0.0, 1.0, 0.0);

  this.xform.model.loadIdentity();
  this.xform.model.rotate(sglDegToRad(this.angle), 0.0, 1.0, 0.0);

  gl.uniformMatrix4fv(this.program.set_uniform["u_mvp"], false,
                      this.xform.modelViewProjectionMatrix);
                      
  //-> original code:
  //gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
  //program.vertexAttribPointers(BUDDHA_ATTRIB_ARRAYS);
  //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
  //gl.drawElements(gl.TRIANGLES, this.num_indices, gl.UNSIGNED_SHORT, 0);
  //-
	//-> replaced with:
  if (UseInterleavedOutput) {
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffers.positions);
    gl.vertexAttribPointer(positionAttribLocation, 3, gl.UNSIGNED_SHORT, true, 6*2, 0  );
    gl.vertexAttribPointer(normalAttribLocation,   2, gl.UNSIGNED_SHORT, true, 6*2, 4*2);							
  }
  else {
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffers.positions);
    gl.vertexAttribPointer(positionAttribLocation, 3, gl.UNSIGNED_SHORT, true, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffers.normals);
    gl.vertexAttribPointer(normalAttribLocation, 2, gl.UNSIGNED_SHORT, true, 0, 0);
  }
  
  gl.drawArrays(gl.TRIANGLES, 0, numArrayElements);
  //-  
}