function (world) {
        // allocate a new uber material
        var newMat = new DarkBlurMaterial();

        // copy over the current values;
        var propNames = [], propValues = [], propTypes = [], propLabels = [];
        this.getAllProperties(propNames, propValues, propTypes, propLabels);
        var n = propNames.length;
        for (var i = 0; i < n; i++)
            newMat.setProperty(propNames[i], propValues[i]);

        return newMat;
    }