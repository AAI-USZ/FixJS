function() {
        var modules, config, output;

        // find file names
        this.findFilePaths();

        // read file contents
        this.readFileContents();

        // parse into ASTs & determine structure
        modules = this.parseModuleInfo();

        // find config file, read & parse it
        config = this.parseTemplateConfig();

        output = this.updateTemplateConfig(config, modules);

        return output;
    }