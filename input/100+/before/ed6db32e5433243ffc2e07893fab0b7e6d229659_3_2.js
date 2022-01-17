function convertJSON(json, path) {
        var data = [];

        jQuery.each(json, function(idx,item) {
            var pathname   = item.pathname,
                type       = item.type,
                interfaces = item.interfaces,
                name = openmdao.Util.getName(pathname);

            if (filter_beg.indexOf(name[0])<0) {
                interfaces = JSON.stringify(interfaces);
                var node = { 'data': name  };
                node.attr = {
                     'type'  : type,
                     'path'  : pathname,
                     'interfaces' : interfaces
                };
                if (item.children) {
                    node.children = convertJSON(item.children,pathname);
                }
                data.push(node);
            }
        });
        return data;
    }