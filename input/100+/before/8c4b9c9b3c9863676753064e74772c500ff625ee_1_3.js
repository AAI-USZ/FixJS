function() {
        var info,
            config;

        // find file names
        this.findFilePaths();

        // read file contents
        this.readFileContents();

        // parse into ASTs & determine structure
        info = this.parseModuleInfo();

        // find config file, read & parse it
        config = this.parseTemplateConfig();

        traverse(config.body).forEach(function(node) {
            var group, name;

            //TODO: Ensure that the key is also "modules" (just in case)
            if(this.key === "value" && node.type === "Literal" && node.value === "configger") {
                group = this.parents[this.parents.length - 4];
                name = traverse(group.node).get([ "key", "name" ]);

                if(name in info) {
                    //update this node & don't traverse the new value
                    this.update(info[name].ast, true);

                    //shuffle comment positioning based on the size of the new AST we insert
                    config.comments = config.comments.map(function(comment) {
                        var range = comment.range;

                        if(range[0] > node.range[1]) {
                            range[0] += info[name].length;
                            range[1] += info[name].length;
                        }

                        return comment;
                    });
                }
            }
        });

        return escodegen.generate(config);
    }