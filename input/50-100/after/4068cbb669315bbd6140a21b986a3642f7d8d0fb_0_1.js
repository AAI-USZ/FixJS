function (name) {
        if (!values.hasOwnProperty(name)) {
            return "";
        }
        var index = Array.prototype.indexOf.call(this, name);
        if (index < 0) {
            return "";
        }
        var prevValue = values[name];
        delete values[name];

        // That's what WebKit and Opera do
        Array.prototype.splice.call(this, index, 1);

        // That's what Firefox does
        //this[index] = ""

        return prevValue;
    }