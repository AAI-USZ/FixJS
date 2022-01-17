function(retainNode) {
            var my = this;
            Y.Object.each(this.getChildren(), function(child, childId) {
                my.destroyChild(childId, retainNode);
            });
        }