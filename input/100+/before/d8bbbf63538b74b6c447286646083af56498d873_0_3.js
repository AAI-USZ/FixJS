function() {
        var go = Kinetic.Global;
        var stage = this.getStage();
        var pos = stage.getUserPosition();

        if(pos) {
            var m = this.getTransform().getTranslation();
            var am = this.getAbsoluteTransform().getTranslation();
            go.drag.node = this;
            go.drag.offset.x = pos.x - this.getAbsoluteTransform().getTranslation().x;
            go.drag.offset.y = pos.y - this.getAbsoluteTransform().getTranslation().y;
        }
    }