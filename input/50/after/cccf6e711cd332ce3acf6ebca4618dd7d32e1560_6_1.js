function(b, node) {
                node.setAnnotation("scope", scope);
                scope.declare(b.x.value, b.x, PROPER);
                return node;
            }