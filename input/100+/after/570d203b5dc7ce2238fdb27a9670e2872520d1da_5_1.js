function (filename, data) {
    var ext = path.extname(filename);
    if (ext === '.json') {
        var doc = JSON.parse(data);
        doc.__format = 'json';
    }
    if (ext === '.yml' || ext === '.yaml') {
        var doc = yaml.load(data);
        doc.__format = 'yaml';
    }
    if (ext === '.md' || ext === '.markdown') {
        var r = wmd(data, {
            preprocessors: [
                wmd.preprocessors.yamlFrontMatter,
                wmd.preprocessors.fencedCodeBlocks,
                wmd.preprocessors.underscores
            ]
        });
        var doc = _.extend(r.metadata, {
            __format: 'markdown',
            body: r.markdown,
            html: r.html
        });
    }
    return _.extend(doc, {
        __filename: filename,
        __raw: data
    });
}