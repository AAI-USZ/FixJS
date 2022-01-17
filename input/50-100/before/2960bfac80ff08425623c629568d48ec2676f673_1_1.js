function(fill) {
        svgCanvas.createLayer("background")
  			cur_shape = svgCanvas.addSvgElementFromJson({
  				"element": "rect",
  				"attr": {
  					"x": 0,
  					"y": 0,
  					"width": res.w,
  					"height": res.h,
  					"stroke": "none",
  					"id": "canvas_background",
  					"opacity": 1,
  					"fill": fill || $.pref('bkgd_color'),
  					"style": "pointer-events:none"
  				}
  			});
  			svgCanvas.setCurrentLayer("Layer 1")
  			svgCanvas.setCurrentLayerPosition("1")
      }