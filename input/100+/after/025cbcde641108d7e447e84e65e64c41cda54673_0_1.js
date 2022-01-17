function(url, options) {
        options = options || {}

        var host = hosts[URLHash(url) % hosts.length]
          , bits = [host];

        // If projectName is set on defaults and truthy, put it in resized image urls
        if (defaults.projectName) {
            var projectIdeintifier = "project-" + defaults.projectName;
            bits.push(projectIdeintifier);
        }

        if (options.format) {
            bits.push(options.format + (options.quality || ''));
        }

        if (options.maxWidth) {
            bits.push(options.maxWidth)

            if (options.maxHeight) {
                bits.push(options.maxHeight);
            }
        }

        bits.push(url);
        return bits.join('/');
    }