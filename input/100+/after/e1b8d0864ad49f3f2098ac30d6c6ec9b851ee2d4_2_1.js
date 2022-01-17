function(content) {
        var markdown = content;

        /* Private Mediawiki to be removed */
        markdown = markdown.replace(/\{\{Reviewneeded\}\}/ig, '');
        markdown = markdown.replace("<div id=\"tableOfContent\">__TOC__</div>", "");
        markdown = markdown.replace(/__TOC__/ig, '');

        markdown = markdown.replace(/\[mandatory\]/ig, "_mandatory_");
        markdown = markdown.replace(/\[optional\]/ig, "_optional_");

        // Code template
        markdown = markdown.replace(/\{\{C\|([^\}\}]+)\}\}/ig, '`$1`');

        // <code>var myvar</code> => `var myvar`
        var tag = 'code';
        var re = new RegExp('<'+tag+'[^><]*>|<.'+tag+'[^><]*>','ig')
        markdown = markdown.replace(re, "`");

        // Links to be transformed to lowercase and with no '-'
        markdown = markdown.replace(/\[\[([^\]\]]+)\]\]/ig, function(match, url) {
            var hash_parts, title_parts = url.split("|");
            var url, hash = false, title = false;
            if (title_parts.length > 1) {
                title = title_parts[1];
            }
            var hash_parts = title_parts[0].split("#");
            if (hash_parts.length > 1) {
                hash = hash_parts[1];
                hash = hash.toLowerCase().replace(/[ _]/g, "-");
            }
            url = hash_parts[0];
            url = url.toLowerCase().replace(/[\?-]/g, "").replace(/__/g, "_");

            return "[["+ url + ( hash ? ("#" + hash ) : "" ) + ( title ? ("|" + title ) : "" ) + "]]";
        });

        // APILinks
        markdown = markdown.replace(/\{\{ATAPILink\|([^\}            content = content.split("|");
            if (content.length > 1) {
            return '['+content[1]+'](http://ariatemplates.com/api/#'+content[0]+')'
            } else {
            return '['+content[0]+'](http://ariatemplates.com/api/#'+content[0]+')'
            }
        });

        markdown = markdown.replace(/http\:\/\/aria\/aria-templates\/apps\/apidocs\//ig, 'http://ariatemplates.com/api/');

        // Missing Samples
        markdown = markdown.replace(/\{\{Missing Samples\|([^\}\}]+)\}\}/ig, '<div data-sample="missing">$1</div>');

        //Snippets
        re = new RegExp('<srcinclude[^<>]*>(.+?)</srcinclude>','ig');
        markdown = markdown.replace(re, function(match, file) {
            file = file.replace(/\\/g, "/");
            return "<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/"+file+"' defer></script>";
        });


        //Samples
        markdown = markdown.replace(/<sample\s+sample=[\'"](.+?)[\'"]\s*?\/>/ig, function(match, file) {
            file = file.replace(/\\/g, "/");
            return "<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/"+file+"/' />";
        });


        return markdown;
    },
