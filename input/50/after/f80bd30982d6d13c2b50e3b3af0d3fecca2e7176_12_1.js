function (sender) {
        var gradient = this.getChildByTag(cc.TAG_LAYER);
        gradient.setCompressedInterpolation(!gradient.isCompressedInterpolation());
    }