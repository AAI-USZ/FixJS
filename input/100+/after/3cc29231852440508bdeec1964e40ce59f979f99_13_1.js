function DarkBlurMaterial() {
    // initialize the inherited members
    this.inheritedFrom = RadialBlurMaterial;
    this.inheritedFrom();

    this._name = "Dark Blur";
    this._shaderName = "darkBlur";

    this._texMap = 'assets/images/darkblur.png';
    this._propValues[this._propNames[0]] = this._texMap.slice(0);


    // duplicate method required
    this.dup = function (world) {
        // allocate a new uber material
        var newMat = new DarkBlurMaterial();

        // copy over the current values;
        var propNames = [], propValues = [], propTypes = [], propLabels = [];
        this.getAllProperties(propNames, propValues, propTypes, propLabels);
        var n = propNames.length;
        for (var i = 0; i < n; i++)
            newMat.setProperty(propNames[i], propValues[i]);

        return newMat;
    };
}