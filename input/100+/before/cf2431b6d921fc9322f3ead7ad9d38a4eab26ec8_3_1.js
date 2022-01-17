function(lightingMode) {
        if (this._lightingMode !== lightingMode) {
            this._lightingMode = lightingMode;
            if (this._lightingMode !== osgViewer.View.LightingMode.NO_LIGHT) {
                if (! this._light) {
                    this._light = new osg.Light();
                    this._light.setAmbient([0.2,0.2,0.2,1.0]);
                    this._light.setDiffuse([0.8,0.8,0.8,1.0]);
                    this._light.setSpecular([0.5,0.5,0.5,1.0]);
                    this._scene.getOrCreateStateSet().setAttributeAndMode(this._light);
                }
            } else {
                this._light = undefined;
                this._scene.getOrCreateStateSet().removeAttribute("Light0");
            }
        }
    }