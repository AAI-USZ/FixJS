function(file) {
        var group = path.dirname(file.path.relative),

            ast = esprima.parse(file.contents),
            src = traverse(ast),

            // validate that this is a bare YUI module
            valid = this._validateModule(src),

            args = src.get([ "body", "0", "expression", "arguments" ]),
            module, meta;

        if(group === ".") {
            group = "root";
        }

        if(!valid) {
            if(file.path.relative !== this.options.tmpl) {
                console.error(file.path.relative + " invalid YUI module");
            }

            return;
        }

        module = args[0].value;
        meta = args[3] || {
            type : "ObjectExpression",
            properties : []
        };

        //make sure meta's an object
        if(meta.type !== "ObjectExpression") {
            console.error("Unable to create module meta object");

            return;
        }

        meta.properties.unshift({
            type : "Property",
            key : {
                type : "Identifier",
                name : "path"
            },
            value : {
                type : "Literal",
                value : path.basename(file.path.full)
            }
        });

        this._addGroupModuleMetadata(group, module, meta);
    }