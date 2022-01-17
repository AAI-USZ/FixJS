function(retainNode) {
            var children = this.getChildren(), child;
            for (child in children) {
                if (children.hasOwnProperty(child)) {
                    this.destroyChild(child, retainNode);
                }
            }
        }