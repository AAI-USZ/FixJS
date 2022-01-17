function (urls) {
    var url, filename, content_type, type, base, split, mojit,
        resources = {
            'mojits': {},
            'app': {assets: {}, binders: {}, autoload: {}, models: {}},
            'images': {}
        },
        mojits = this._mojits;
    for(mojit in mojits) {
        if(mojit !== 'DaliProxy' && mojit !== 'HTMLFrameMojit' && mojit !== 'LazyLoad'){
            resources.mojits[mojit] = {assets: {}, binders: {}, autoload: {}, views: {}, models: {}, addons: {}};
        }
    }

    for (url in urls) {
        filename = urls[url];
        content_type = mime.lookup(filename);
        type = content_type.split('/')[0];

        if (content_type in {'application/javascript': 1, 'text/css': 1, 'text/html': 1}) {
            base = url.substring(this._prefix.length + 1);
            split = base.split('/', 2); // [mojit_name, subdir]
            if (split[0] === this._root) {
                if (split[1] in resources.app) {
                    resources.app[split[1]][url] = filename;
                }
            } else if (split[0] in resources.mojits) { // mojit
                if (split[1].indexOf('controller.') === 0) {
                    resources.mojits[split[0]].controller = filename;

                } else if (split[1] in resources.mojits[split[0]]) {  // asset type
                    resources.mojits[split[0]][split[1]][url] = filename;
                }
            }
        } else if (type === 'image') {
            resources.images[url] = filename;
        }
    }
    console.log(JSON.stringify(resources, null, '\t'));
    return resources;
}