function (value, charMapFile, itemWidth, itemHeight, startCharMap, target, selector) {
        cc.Assert(value != null && value.length != 0, "value length must be greater than 0");
        var label = new cc.LabelAtlas();
        label.initWithString(value, charMapFile, itemWidth, itemHeight, startCharMap);
        if (this.initWithLabel(label, target, selector)) {
            // do something ?
        }
        return true;
    }