function (path, isSrc) {
            var src;

            if (!isSrc && Path.existsSync(path)) {
                this.filepath = Path.resolve(path);
                src = this.source = FS.readFileSync(this.filepath, "utf8");
            }
            else {
                this.filepath = process.cwd();
                src = this.source = path;
            }
            
            this.dirpath = Path.dirname(this.filepath);
            this.infusions = this.options.infusions ||
                                new Infusions({
                                    embed: this.options.embed
                                });
            
            return this.infuseAst(jsp.parse(src));
        }