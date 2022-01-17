function() {
        this.a2dCanvas.style.position = "absolute";
        this.a2dCanvas.style.width = "100%";
        this.a2dCanvas.style.height = "100%";
        this.a2dCanvas.style.top = "0";
        this.a2dCanvas.style.left = "0";

        this.dimension = new a2d.Dimension( parseInt(getComputedStyle(canvas, null).getPropertyCSSValue("height").cssText, 10),
                                            parseInt(getComputedStyle(canvas, null).getPropertyCSSValue("width").cssText, 10));
    }