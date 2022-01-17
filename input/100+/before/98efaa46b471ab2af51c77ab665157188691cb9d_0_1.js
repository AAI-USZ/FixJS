function(window) {

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this == null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n != 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	}
}

/**
* The EaselJS class uses a static interface (ex. EaselJS.createCanvas()) and should not be instantiated.
* @class EaselJS
* @static
**/
var EaselJS = (window.EaselJS || {})
	
// public static methods:
	/**
	* Creates and returns a <canvas> element. If ExplorerCanvas is
	* detected, the element is passed to its initializer.
	* @method createCanvas
	* @static
	**/
  if(!EaselJS.createCanvas) {
    EaselJS.createCanvas = function() {
      var canvas = document.createElement("canvas");
      if ( window.G_vmlCanvasManager )
        G_vmlCanvasManager.initElement(canvas);
      return canvas;
    }
  }

  /** 
   * @param canvas A canvas object, or the string id of a canvas object in the current document.
   * @return A canvas object
   * @method getCanvas
   * @static
   **/
  if(!EaselJS.getCanvas) {
    EaselJS.getCanvas = function(canvas) {
      return (canvas instanceof HTMLCanvasElement) ? canvas : document.getElementById(canvas);
    }
  }


  if(!EaselJS.resizeCanvas) {
    EaselJS.resizeCanvas = function(canvas, width, height) {
      if(width  != null) canvas.width  = width;
      if(height != null) canvas.height = height;
    }
  }

window.EaselJS = EaselJS;
}