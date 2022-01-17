function() {
        var trans = this.getAbsoluteTransform();
        var o = this.getOffset();
        trans.translate(o.x, o.y);
        return trans.getTranslation();
    }