function parseContent(mdown, toc){

    // add deep-links

    var i = 0, cur;

    mdown = mdown.replace(getHeaderRegExp(), function(str){
        cur = toc[i++];
        return str +' <a href="#'+ cur.href +'" id="'+ cur.href +'" class="deep-link">#</a>';
    });

    // generate TOC

    var tocIndex = mdown.search( new RegExp('^'+ getHeaderHashes() +'[^#]+', 'm') ), //first header
        pre = mdown.substring(0, tocIndex),
        post = mdown.substring(tocIndex),
        tocContent = getHeaderHashes() +' Table of Contents <a href="#toc" name="toc" class="deep-link">#</a>\n\n';

    toc.forEach(function(val, i){
        tocContent += ' - ['+ val.name +'](#'+ val.href +')\n';
    });

    return showdownParse( pre + tocContent + post );
}