function parseContent(mdown){
    var toc = [], result = {
        html: '',
        toc: []
    };

    // generate TOC
    var tocIndex = mdown.search( new RegExp('^'+ getHeaderHashes() +'[^#]+', 'm') ), //first header
        pre = mdown.substring(0, tocIndex),
        post = mdown.substring(tocIndex),
        tocContent = getHeaderHashes() +' Table of Contents <a id="toc"></a>\n\n<ul id="toc-list"></ul>\n\n';

    mdown = pre + tocContent + post;
    result.html = showdownParse(mdown);

    // add deep-links
    result.html = result.html.replace(/<(h\d) id="([^"]+)">([^\n]*)<\/(h\d)>/g, function(m, header, id, inner, close_header) {
        result.toc.push({
            title: inner,
            href: '#' + id
        });
        return '<' + header + ' id="' + id + '">' + inner + ' <a href="#' + id + '" class="deep-link">#</a></' + header + '>';
    });

    tocContent = '';
    result.toc.forEach(function(val, i){
        tocContent += '<li><a href="'+ val.href +'">'+ val.title +'</a></li>\n';
    });

    result.html = result.html.replace(/<ul id="toc-list"><\/ul>/g, '<ul id="toc-list">' + tocContent + '</ul>');

    return result;
}