function parseContent(mdown){
    var toc = [], result = {};

    // generate TOC
    var tocIndex = mdown.search( new RegExp('^'+ getHeaderHashes() +'[^#]+', 'm') ), //first header
        pre = mdown.substring(0, tocIndex),
        post = mdown.substring(tocIndex),
        tocContent = getHeaderHashes() +' Table of Contents <a href="#toc" id="toc" class="deep-link">#</a>\n\n<ul id="toc-list"></ul>';

    mdown = pre + tocContent + post;
    result.html = showdownParse(mdown);

    // add deep-links
    result.html = result.html.replace(/<(h\d) id="([^"]+)">(.*)<\/$1>/, function(m, header, id, inner) {
        result.toc.push({
        });
        return '<' + header + ' id="' + id + '">' + inner + ' <a href="#' + id + '" class="deep-link">#</a></' + header + '>';
    });

    tocContent = ''
    result.toc.forEach(function(val, i){
        tocContent += '<li><a href="'+ val.href +'">'+ val.name +'</a></li>\n';
    });

    result.html.replace(/<ul id="toc-list"><\/ul>/g, '<ul id="toc-list">' + tocContent + '</ul>');

    return result;
}