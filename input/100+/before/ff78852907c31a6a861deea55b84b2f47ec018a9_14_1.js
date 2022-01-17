function(c) {
                var moduleSameName = find({kind: 'module', longname: c.longname});
                if (moduleSameName.length) {
                    c.name = c.name.replace('module:', 'require("')+'")';
                    moduleClasses++;
                    moduleSameName[0].module = c;
                }
                if (moduleClasses !== -1 && moduleClasses < classNames.length) {
                    nav += '<h3>Classes</h3><ul>';
                    moduleClasses = -1;
                }
                if ( !hasOwnProperty.call(seen, c.longname) ) nav += '<li>'+linkto(c.longname, c.name)+'</li>';
                seen[c.longname] = true;
            }