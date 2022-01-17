function (optionName) {
            /*if ($P.STATS) include('stats.js');*/
            var includePattern = new RegExp('\\/\\*\\if \\(' + optionName.replace(/\$/g, '\\$') + '\\)\\s+include\\(\'([a-z-_\\.]+)\'\\);?\\s*\\*\\/', ''),
                patchContent = '',
                match;

            // Add plugin
            if (config[flagName]) {
                // apply: remove left & right side
                match = lmd_js.match(includePattern);
                if (match && match[1]) {
                    patchContent = fs.readFileSync(LMD_JS_SRC_PATH + 'plugin/' + match[1]);
                }
            }
            lmd_js = lmd_js.replace(includePattern, patchContent);
        }