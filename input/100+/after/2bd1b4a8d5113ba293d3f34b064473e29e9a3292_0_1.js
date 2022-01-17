function(node) {
            var group, name, traversed, before, after, generated, indent;

            //TODO: Configurable replacement value
            if(this.key === "value" &&
               node.type === "Literal" &&
               node.value === self.options.key &&
               traverse(this.parent.node).get([ "key", "name" ]) === "modules") {

                group = traverse(this.parents[this.parents.length - 4].node);

                //group name might be identifier (name) or a literal string (value)
                name = group.get([ "key", "name" ]) || group.get([ "key", "value" ]);

                if(name in modules) {
                    //saving comments requires some string manipulation
                    if(self.options.comments) {
                        generated = escodegen.generate(modules[name].ast);

                        //update the source
                        before = src.substring(0, node.range[0] + offset);
                        after  = src.substring(node.range[1] + 1 + offset);

                        src = before + generated + after;

                        //TODO: unsure why we need to subtract the extra character...
                        offset += generated.length - (node.range[1] - node.range[0]) - 1;
                    } else {
                        //Otherwise we can just update the AST
                        this.update(modules[name].ast);
                    }
                }
            }
        }