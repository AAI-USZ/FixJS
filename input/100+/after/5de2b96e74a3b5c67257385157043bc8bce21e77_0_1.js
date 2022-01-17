function(err, data) {
        opts.context = {
            project_name: opts.project_name,
            site_config: data || '{}',
            build_dt: Date.now(),            
            fetcher: fetcher
        };

        fetcher.get(konf, function(err, data, resolved) {
            if (err) {
                // Konf file missing.
                // When using the `mobify` command locally, site folder
                // requests should go through the `src` folder.
                // - Are you running mobify.js from your site folder?
                // - Check that path is localhost:8080/src/
                // - Check that <file>.konf exists.
                err.url = resolved;
                err.message = '"' + path + '" resolved to "' + resolved + '"'
                            + ' which could not be retrieved.'
                return cb(err);
            }

            compileDustyJs(resolved, data, cb, opts);
        });
    }