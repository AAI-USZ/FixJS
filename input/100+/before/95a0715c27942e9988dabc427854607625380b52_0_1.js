function(params) {
      var args, domainX, domainY, dx, h, mode, num, pts, w, _xysig;
      params = params ? params : {};
      mode = params.mode ? params.mode : "rand_boxmuller";
      num = params.num ? params.num : 500.;
      w = params.w ? params.w : 400.;
      h = params.h ? params.h : 300.;
      _xysig = {
        "default": ['x', 'y'],
        rand_boxmuller: ['x', 'p']
      };
      args = params.args ? params.args : {};
      args.xysig = args.xysig ? args.xysig : (!!_xysig[mode] ? _xysig[mode] : _xysig["default"]);
      typeof RNDS[mode] === "function" && (pts = (function(fn) {
        var i;
        pts = [];
        for (i = 0; 0 <= num ? i < num : i > num; 0 <= num ? i++ : i--) {
          pts.push(fn(args));
        }
        return pts;
      })(RNDS[mode]));
      domainX = {
        rand_cos: [0, Math.PI],
        rand_g: [-4, 4],
        rand_mm: [0, 1],
        rand_boxmuller: [-4, 4]
      };
      domainY = {
        rand_cos: [-1, 1],
        rand_g: [0, 0.6],
        rand_mm: [0, 1],
        rand_boxmuller: [0, 1]
      };
      dx = domainX[mode] ? domainX : void 0;
      return pts.length && $(this).html("").showD3({
        data: pts,
        w: w,
        h: h,
        domainX: domainX[mode],
        domainY: domainY[mode],
        d_name: [args.xsig, args.ysig]
      });
    }