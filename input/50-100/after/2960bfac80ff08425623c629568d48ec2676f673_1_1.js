function(fill) {
        svgCanvas.createLayer("background")
  			cur_shape = svgCanvas.addSvgElementFromJson({
  				"element": "rect",
  				"attr": {
  					"x": -1,
  					"y": -1,
  					"width": res.w+2,
  					"height": res.h+2,
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