function (opts) {
      var opts = opts || {}
        , params = this.params
        , prw = params.width, prh = params.height
        , self = this;

      setParams(opts, params, Texture.param_defaults);

      var target = params.target;

      function bind () {
        if(!self.texture)
          self.texture = gl.createTexture();
        self.bind();
      }

      if(opts.data !== undefined) {
        if(prw !== params.width || prh !== this.height) {
          bind();
          gl.texImage2D(target, 0, params.format_internal,
                                   params.width,
                                   params.height,
                                   0,
                                   params.format,
                                   params.type,
                                   opts.data);
        }
        else if(prw && prh && opts.data) {
          bind();
          gl.texSubImage2D(target, 0, 0, 0, params.width,
                                            params.height,
                                            params.format,
                                            params.type,
                                            opts.data);
        }
      }
      else if(opts.element) {
        bind();
        if(params.flip_y)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(target, 0, params.format_internal,
                                 params.format,
                                 params.type,
                                 opts.element);
      }

      if(this.texture) {
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, params.filter_min ||
                                                        params.filter);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, params.filter_mag ||
                                                        params.filter);
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, params.wrap_s ||
                                                    params.wrap);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, params.wrap_t ||
                                                    params.wrap);
      }

      return this;
    }