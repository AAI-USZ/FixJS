function(content) {
        var markdown = content;
            
        /* Private Mediawiki to be removed */
        markdown = markdown.replace(/\{\{Reviewneeded\}\}/ig, '');
        markdown = markdown.replace("<div id=\"tableOfContent\">__TOC__</div>", "");
        markdown = markdown.replace(/__TOC__/ig, '');
 
        markdown = markdown.replace(/http\:\/\/aria\/aria-templates\/apps\/apidocs\//ig, 'http://ariatemplates.com/api/');
    
        // Code template
        markdown = markdown.replace(/\{\{C\|([^\}\}]+)\}\}/ig, '`$1`');
        //var tag = 'code';
        //var re = new RegExp('<'+tag+'[^><]*>|<.'+tag+'[^><]*>','ig')
        //markdown = markdown.replace(re, "`");
    
        // APILinks
        markdown = markdown.replace(/\{\{ATAPILink\|([^\}            content = content.split("|");
            if (content.length > 1) {
            return '['+content[1]+'](http://ariatemplates.com/aria/guide/apps/apidocs/#'+content[0]+')'
            } else {
            return '['+content[0]+'](http://ariatemplates.com/aria/guide/apps/apidocs/#'+content[0]+')'
            }
        });
        
        // Missing Samples
        markdown = markdown.replace(/\{\{Missing Samples\|([^\}\}]+)\}\}/ig, '<div data-sample="missing">$1</div>');
    
        return markdown;
    }
