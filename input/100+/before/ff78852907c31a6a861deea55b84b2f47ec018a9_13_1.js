function(file) {
        match = file.match(finder);

        // any filetype that can apply to tutorials
        if (match) {
            name = fs.toFile(match[1]);
            content = fs.readFileSync(file);

            switch (match[2].toLowerCase()) {
                // HTML type
                case 'xml':
                case 'xhtml':
                case 'html':
                case 'htm':
                    type = tutorial.TYPES.HTML;
                    break;

                // Markdown typs
                case 'md':
                case 'markdown':
                    type = tutorial.TYPES.MARKDOWN;
                    break;

                // configuration file
                case 'js':
                case 'json':
                    conf[name] = JSON.parse(content);

                // how can it be? check `finder' regexp
                default:
                    // not a file we want to work with
                    return;
            }

            current = new tutorial.Tutorial(name, content, type);
            exports.addTutorial(current);
        }
    }