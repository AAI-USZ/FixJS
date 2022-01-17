function(b, node) {
                node.setAnnotation("scope", scope);
                if(b.x.value) {
                    scope.declare(b.x.value, b.x, PROPER);
                }
                return node;
            }