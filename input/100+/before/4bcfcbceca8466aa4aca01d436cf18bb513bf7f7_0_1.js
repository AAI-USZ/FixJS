function executeVertexImpl(v0, n, address) {
    var light     = state.geometryMode & geometryModeFlags.G_LIGHTING;
    var texgen    = state.geometryMode & geometryModeFlags.G_TEXTURE_GEN;
    var texgenlin = state.geometryMode & geometryModeFlags.G_TEXTURE_GEN_LINEAR;


    if (v0+n >= 64) {
      n64js.halt('Too many verts');
      state.pc = 0;
      return;
    }

    var dv = new DataView(state.ram.buffer, address);
    var mvmtx = state.modelview[state.modelview.length-1];
    var pmtx  = state.projection[state.projection.length-1];

    var wvp = pmtx.multiply(mvmtx);

    var scale_s = state.texture.scaleS;
    var scale_t = state.texture.scaleT;

    var xyz    = new Vector3();
    var normal = new Vector3();
    var transformedNormal = new Vector3();

    for (var i = 0; i < n; ++i) {
      var vtx_base = (v0+i)*16;
      var vertex = state.projectedVertices[v0+i];

      xyz.elems[0] = dv.getInt16(vtx_base + 0);
      xyz.elems[1] = dv.getInt16(vtx_base + 2);
      xyz.elems[2] = dv.getInt16(vtx_base + 4);
      //var w = dv.getInt16(vtx_base + 6);
      var u = dv.getInt16(vtx_base + 8);
      var v = dv.getInt16(vtx_base + 10);

      var projected = vertex.pos;
      wvp.transformPoint(xyz, projected);


      //n64js.halt( x + ',' + y + ',' + z + '-&gt;' + projected.elems[0] + ',' + projected.elems[1] + ',' + projected.elems[2] );

      // var clip_flags = 0;
      //      if (projected[0] < -projected[3]) clip_flags |= X_POS;
      // else if (projected[0] >  projected[3]) clip_flags |= X_NEG;

      //      if (projected[1] < -projected[3]) clip_flags |= Y_POS;
      // else if (projected[1] >  projected[3]) clip_flags |= Y_NEG;

      //      if (projected[2] < -projected[3]) clip_flags |= Z_POS;
      // else if (projected[2] >  projected[3]) clip_flags |= Z_NEG;
      // state.projectedVertices.clipFlags = clip_flags;

      if (light) {
        normal.elems[0] = dv.getInt8(vtx_base + 12);
        normal.elems[1] = dv.getInt8(vtx_base + 13);
        normal.elems[2] = dv.getInt8(vtx_base + 14);
        var a  = dv.getUint8(vtx_base + 15);

        // calculate transformed normal
        mvmtx.transformNormal(normal, transformedNormal);
        transformedNormal.normaliseInPlace();

        vertex.color = calculateLighting(transformedNormal);

        if (texgen) {

          // retransform using wvp
          wvp.transformNormal(normal, transformedNormal);
          transformedNormal.normaliseInPlace();

          if (texgenlin) {
            vertex.u = 0.5 * (1.0 + transformedNormal.elems[0]);
            vertex.v = 0.5 * (1.0 + transformedNormal.elems[1]);
          } else {
            var normX = Math.abs( transformedNormal.elems[0] );
            var normY = Math.abs( transformedNormal.elems[1] );
            vertex.u = 0.5 - 0.25 * normX - 0.25 * normX * normX * normX;
            vertex.v = 0.5 - 0.25 * normY - 0.25 * normY * normY * normY;
          }
        } else {
          vertex.u = u * scale_s;
          vertex.v = v * scale_t;
        }
      } else {
        vertex.u = u * scale_s;
        vertex.v = v * scale_t;

        var r = dv.getUint8(vtx_base + 12);
        var g = dv.getUint8(vtx_base + 13);
        var b = dv.getUint8(vtx_base + 14);
        var a = dv.getUint8(vtx_base + 15);

        vertex.color = (a<<24) | (b<<16) | (g<<8) | r;
      }

      //var flag = dv.getUint16(vtx_base + 6);

      //var tu = dv.getInt16(vtx_base + 8);
      //var tv = dv.getInt16(vtx_base + 10);
      //var rgba = dv.getInt16(vtx_base + 12);    // nx/ny/nz/a
    }
  }