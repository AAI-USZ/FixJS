function() {
    var $body, $canvas, AcmeFFT, EQ_Params, EQ_SIZE, ctx, mouseFunction, sparse, synth, timer;
    EQ_SIZE = 64;
    EQ_Params = new Float32Array(EQ_SIZE);
    AcmeFFT = function(n) {
      this.size = 1024;
      this.source = T("buffer").set({
        loop: true
      });
      this.fft = new FFT(this.size);
      this.buffer = new Float32Array(this.size);
      this.index = 0;
      return this;
    };
    AcmeFFT.prototype.setBuffer = function(buffer) {
      this.source.set({
        buffer: buffer
      }).bang();
      return this;
    };
    AcmeFFT.prototype.seq = function(seq_id) {
      var cell, di, dx, fft, i, imag, j, n, nn, real, res, x, _, _i, _j, _k, _ref, _ref1;
      _ = this._;
      if (_.seq_id !== seq_id) {
        _.seq_id = seq_id;
        fft = this.fft;
        res = this.source.seq(seq_id);
        for (i = _i = 0, _ref = res.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.buffer[this.index + i] = res[i];
        }
        res = fft.buffer;
        cell = this.cell;
        for (i = _j = 0, _ref1 = cell.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          cell[i] = res[this.index + i];
        }
        this.index += timbre.cellsize;
        if (this.index === this.size) {
          this.index = 0;
          fft.forward(this.buffer);
          real = fft.real;
          imag = fft.imag;
          n = real.length;
          nn = n >> 1;
          dx = timbre.samplerate / nn / 2;
          di = EQ_SIZE / this.size;
          for (i = _k = 0; 0 <= nn ? _k < nn : _k > nn; i = 0 <= nn ? ++_k : --_k) {
            j = n - i - 1;
            x = i * dx;
            if (x < 8000) {
              x = EQ_Params[(x / 8000 * EQ_SIZE) | 0];
            } else {
              x = EQ_Params[EQ_SIZE - 1];
            }
            real[i] *= x;
            imag[i] *= x;
            real[j] *= x;
            imag[j] *= x;
          }
          fft.inverse(real, imag);
        }
      }
      return this.cell;
    };
    timbre.fn.register("acme", AcmeFFT);
    synth = T("acme").play();
    ctx = new webkitAudioContext();
    $body = $(document.body);
    $body.on("dragover", function(e) {
      e.preventDefault();
      return e.stopPropagation();
    });
    $body.on("drop", function(e) {
      var file, reader;
      e.preventDefault();
      e.stopPropagation();
      file = e.originalEvent.dataTransfer.files[0];
      reader = new FileReader();
      reader.onload = function(e) {
        var buffer;
        try {
          buffer = ctx.createBuffer(e.target.result, true).getChannelData(0);
          synth.setBuffer(buffer);
          $("#text").text("再生を開始します.");
          return setTimeout(function() {
            return $("#text").text("音楽ファイルをドラッグ & ドロップすると再生します.");
          }, 5000);
        } catch (e) {
          return $("#text").text("再生できないファイルです.");
        }
      };
      return reader.readAsArrayBuffer(file);
    });
    if (timbre.env === "webkit") {
      $("#text").text("音楽ファイルをドラッグ & ドロップすると再生します.");
    } else {
      $("#text").text("Chrome で開いてね!!");
    }
    $canvas = $("#canvas");
    $canvas.draw = function(list) {
      var context, dx, h, i, w, x, y, _i, _ref;
      w = $canvas.width();
      h = $canvas.height();
      context = $canvas.get(0).getContext("2d");
      context.save();
      context.clearRect(0, 0, w, h);
      context.fillStyle = "#6699ff";
      dx = w / list.length;
      for (i = _i = 0, _ref = list.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        x = i * dx;
        y = h * list[i];
        context.fillRect(x | 0, h - y, dx + 0.5, y);
      }
      return context.restore();
    };
    $canvas.get(0).width = $canvas.width();
    $canvas.get(0).height = $canvas.height();
    mouseFunction = function(e, change) {
      var offset, x, y;
      e.preventDefault();
      offset = $canvas.offset();
      x = (e.pageX - offset.left) / $canvas.width();
      y = (e.pageY - offset.top) / $canvas.height();
      if (x < 0) {
        x = 0;
      } else if (x > 1) {
        x = 0.999;
      }
      if (y < 0) {
        y = 0;
      } else if (y > 1) {
        y = 1;
      }
      if (change) {
        EQ_Params[(x * EQ_SIZE) | 0] = 1 - y;
        $canvas.draw(EQ_Params);
      }
      x = (x * 8000) | 0;
      y = 1 - y;
      return $("#status").text("" + x + "Hz / " + (y.toFixed(2)));
    };
    $("#control").on("mousedown", function(e) {
      $canvas.isMousedown = true;
      return mouseFunction(e, true);
    });
    $("#control").on("mousemove", function(e) {
      return mouseFunction(e, $canvas.isMousedown);
    });
    $("#control").on("mouseup", function(e) {
      mouseFunction(e, true);
      return $canvas.isMousedown = false;
    });
    $("#1_0").on("click", function(e) {
      (function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= EQ_SIZE ? _i < EQ_SIZE : _i > EQ_SIZE; i = 0 <= EQ_SIZE ? ++_i : --_i) {
          _results.push(EQ_Params[i] = 1.0);
        }
        return _results;
      })();
      return $canvas.draw(EQ_Params);
    });
    $("#0_0").on("click", function(e) {
      (function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= EQ_SIZE ? _i < EQ_SIZE : _i > EQ_SIZE; i = 0 <= EQ_SIZE ? ++_i : --_i) {
          _results.push(EQ_Params[i] = 0.0);
        }
        return _results;
      })();
      return $canvas.draw(EQ_Params);
    });
    sparse = function() {
      var i, x, _i, _ref;
      x = (Math.random() * EQ_SIZE) | 0;
      sparse.data.push(x);
      EQ_Params[x] = 1;
      if (sparse.data.length > sparse.size) {
        x = sparse.data.shift();
        EQ_Params[x] = 0;
      }
      for (i = _i = 0, _ref = sparse.size; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        EQ_Params[sparse.data[i]] = i / sparse.size;
      }
      return $canvas.draw(EQ_Params);
    };
    sparse.size = 16;
    sparse.data = [];
    timer = T("interval", 50, sparse);
    $("#sparse-play").on("click", function(e) {
      if (timer.isOn) {
        timer.off();
        return $(this).css("color", "black");
      } else {
        timer.on();
        return $(this).css("color", "red");
      }
    });
    (function() {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= EQ_SIZE ? _i < EQ_SIZE : _i > EQ_SIZE; i = 0 <= EQ_SIZE ? ++_i : --_i) {
        _results.push(EQ_Params[i] = 0.8);
      }
      return _results;
    })();
    return $canvas.draw(EQ_Params);
  }