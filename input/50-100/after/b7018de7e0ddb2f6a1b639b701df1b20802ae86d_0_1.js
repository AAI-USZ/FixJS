function(uiGroupClone) {
        this._inverse = new Shell.InvertLightnessEffect();
        this._brightnessContrast = new Clutter.BrightnessContrastEffect();
        this._colorSaturation = new Clutter.DesaturateEffect();
        this._inverse.set_enabled(false);
        this._brightnessContrast.set_enabled(false);

        this._magView = uiGroupClone;
        this._magView.add_effect(this._inverse);
        this._magView.add_effect(this._brightnessContrast);
        this._magView.add_effect(this._colorSaturation);
    }