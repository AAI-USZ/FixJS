function copyChapters() {
    for(var i=0; i<toc.length; i++) {
        var file = toc[i].filename;
        var fd = fs.createWriteStream(out+"/"+file);
        var body = fs.readFileSync(src+"/"+file);
        //  add standard header 
        fd.write(chapter_header);
        fd.write("<div class='chapnav top'>\n");
        if(i > 0) {
            fd.write("<a class='prevchap' href='"+toc[i-1].filename+"'>previous</a>\n");
        }
        fd.write("<span>&nbsp;</span>\n");
        if(i+1 < toc.length) {
            fd.write("<a class='nextchap' href='"+toc[i+1].filename+"'>next</a>\n");
        }
        fd.write("</div>\n");
        fd.write(body);
        // add standard footer
        
        fd.write("<div class='chapnav bottom'>\n");
        if(i > 0) {
            fd.write("<a class='prevchap' href='"+toc[i-1].filename+"'>previous</a>\n");
        }
        fd.write("<span>&nbsp;</span>\n");
        if(i+1 < toc.length) {
            fd.write("<a class='nextchap' href='"+toc[i+1].filename+"'>next</a>\n");
        }
        fd.write("</div>\n");
        
        fd.write(chapter_footer);
        //  save to disk
        fd.end();
    }
}