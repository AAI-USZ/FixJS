function() {

  var gl = this.getGL();

  var map = this.getMap();
  var mapExtent = /** @type {!ol.Extent} */ map.getExtent();
  var mapResolution = /** @type {number} */ map.getResolution();
  var mapSize = map.getSize();

  var tileLayer = this.getLayer();
  var tileStore = tileLayer.getStore();
  var tileGrid = tileStore.getTileGrid();
  var z = tileGrid.getZForResolution(mapResolution);
  var tileBounds = tileGrid.getTileBoundsForExtentAndZ(mapExtent, z);
  var tileBoundsSize = tileBounds.getSize();
  var tileSize = tileGrid.getTileSize();

  var maxDimension = Math.max(
      tileBoundsSize.width * tileSize.width,
      tileBoundsSize.height * tileSize.height);
  // FIXME find a better algorithms for rounding up to the next power of two
  var framebufferDimension = Math.max(tileSize.width, tileSize.height);
  while (framebufferDimension < maxDimension) {
    framebufferDimension *= 2;
  }
  var nTilesX = framebufferDimension / tileSize.width;
  var nTilesY = framebufferDimension / tileSize.height;
  var framebufferTileBounds = new ol.TileBounds(
      tileBounds.minX,
      tileBounds.minY,
      tileBounds.minX + nTilesX - 1,
      tileBounds.minY + nTilesY - 1);
  goog.asserts.assert(framebufferTileBounds.contains(tileBounds));

  this.bindFramebuffer_(framebufferDimension);
  gl.viewport(0, 0, framebufferDimension, framebufferDimension);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(goog.webgl.COLOR_BUFFER_BIT);
  gl.disable(goog.webgl.BLEND);

  var program = map.getProgram(this.fragmentShader_, this.vertexShader_);
  gl.useProgram(program);
  if (goog.isNull(this.locations_)) {
    this.locations_ = {
      aPosition: gl.getAttribLocation(program, 'aPosition'),
      aTexCoord: gl.getAttribLocation(program, 'aTexCoord'),
      uMatrix: gl.getUniformLocation(program, 'uMatrix'),
      uTexture: gl.getUniformLocation(program, 'uTexture')
    };
  }

  if (goog.isNull(this.arrayBuffer_)) {
    var arrayBuffer = gl.createBuffer();
    gl.bindBuffer(goog.webgl.ARRAY_BUFFER, arrayBuffer);
    gl.bufferData(goog.webgl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 0, 1,
      1, -1, 1, 1,
      -1, 1, 0, 0,
      1, 1, 1, 0
    ]), goog.webgl.STATIC_DRAW);
    this.arrayBuffer_ = arrayBuffer;
  } else {
    gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.arrayBuffer_);
  }

  gl.enableVertexAttribArray(this.locations_.aPosition);
  gl.vertexAttribPointer(
      this.locations_.aPosition, 2, goog.webgl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(this.locations_.aTexCoord);
  gl.vertexAttribPointer(
      this.locations_.aTexCoord, 2, goog.webgl.FLOAT, false, 16, 8);
  gl.uniform1i(this.locations_.uTexture, 0);

  tileBounds.forEachTileCoord(z, function(tileCoord) {
    var tile = tileStore.getTile(tileCoord);
    if (goog.isNull(tile)) {
    } else if (tile.isLoaded()) {
      var uMatrix = goog.vec.Mat4.createFloat32Identity();
      goog.vec.Mat4.translate(uMatrix,
          0.5 / tileSize.width,
          0.5 / tileSize.height,
          0);
      goog.vec.Mat4.translate(uMatrix,
          2 * (tileCoord.x - framebufferTileBounds.minX + 0.5) / nTilesX - 1,
          2 * (tileCoord.y - framebufferTileBounds.minY + 0.5) / nTilesY - 1,
          0);
      goog.vec.Mat4.scale(uMatrix,
          1 / nTilesX,
          1 / nTilesY,
          1);
      gl.uniformMatrix4fv(this.locations_.uMatrix, false, uMatrix);
      gl.bindTexture(goog.webgl.TEXTURE_2D, map.getTileTexture(tile));
      gl.drawArrays(goog.webgl.TRIANGLE_STRIP, 0, 4);
    } else {
      var key = goog.getUid(tile);
      if (!(key in this.tileChangeListenerKeys_)) {
        tile.load();
        // FIXME will need to handle aborts as well
        this.tileChangeListenerKeys_[key] = goog.events.listen(tile,
            goog.events.EventType.CHANGE, this.handleTileChange, false, this);
      }
    }
  }, this);

  var framebufferTileBoundsExtent =
      tileGrid.getTileBoundsExtent(z, framebufferTileBounds);
  goog.vec.Mat4.makeIdentity(this.matrix_);
  goog.vec.Mat4.translate(this.matrix_,
      (mapExtent.minX - framebufferTileBoundsExtent.minX) /
          (framebufferTileBoundsExtent.maxX - framebufferTileBoundsExtent.minX),
      (mapExtent.minY - framebufferTileBoundsExtent.minY) /
          (framebufferTileBoundsExtent.maxY - framebufferTileBoundsExtent.minY),
      0);
  goog.vec.Mat4.scale(this.matrix_,
      mapSize.width / framebufferDimension,
      mapSize.height / framebufferDimension,
      1);

}