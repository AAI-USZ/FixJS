function(node) {
            var group, name, before, after, generated, indent;

            //TODO: Configurable replacement value
            if(this.key === "value" &&
               node.type === "Literal" &&
               node.value === self.options.key &&
               traverse(this.parent.node).get([ "key", "name" ]) === "modules") {
                group = this.parents[this.parents.length - 4];
                name = traverse(group.node).get([ "key", "name" ]);

                if(name in modules) {
                    //saving comments requires some string manipulation
                    if(self.options.comments) {
                        generated = escodegen.generate(modules[name].ast);

                        //update the source
                        before = src.substring(0, node.range[0] + offset);
                        after  = src.substring(node.range[1] + 1 + offset);

                        src = before + generated + after;

                        offset += generated.length - (node.range[1] - node.range[0]);
                    } else {
                        //Otherwise we can just update the AST
                        this.update(modules[name].ast);
                    }
                }
            }
        }