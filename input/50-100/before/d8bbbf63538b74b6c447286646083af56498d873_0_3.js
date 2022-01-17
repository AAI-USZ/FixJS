function(layer) {
        var stage = this.getStage();
        var children = this.children;
        for(var n = 0; n < children.length; n++) {
            var child = children[n];
            if(child.nodeType === 'Shape') {
                if(child.isVisible() && stage.isVisible()) {
                    child._draw( layer ? layer : child.getLayer());
                }
            }
            else {
                child.draw(layer);
            }
        }
    }