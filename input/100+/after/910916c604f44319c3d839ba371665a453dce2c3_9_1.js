function processStatics(req, res) {
    //process static file
    var accessUrl = req.url;
    //console.log("static file: " + accessUrl);
    var result = url.parse(accessUrl);
    
    // app/public/
    var staticFile = serverConfig.appPath + '/public' + accessUrl;

    // static file cache
    //read static file
    //@see http://club.cnodejs.org/topic/4f16442ccae1f4aa27001071
    //@todo Etag
    fs.exists(staticFile, function(exists) {
        if (exists) {
            fs.stat(staticFile, function (err, stat) {
                var lastModified = stat.mtime.toUTCString(); //file lastModify
                var ifModifiedSince = "If-Modified-Since".toLowerCase();
                res.setHeader("Last-Modified", lastModified);

                var expires = new Date();
                expires.setTime(expires.getTime() + serverConfig.staticFileExpires * 1000);
                res.setHeader("Expires", expires.toUTCString());
                res.setHeader("Cache-Control", "max-age=" + serverConfig.staticFileExpires);

                if (req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince]) {
                    res.notModify();
                } else {
                    var extName = path.extname(staticFile).substr(1);
                    var callback = null;
                    if (extName == 'less') { //@see http://www.lesscss.net/
                        callback = function(data) {
                            less.render(data, function(e, css) {
                                res.render(css, mimes['css'], true);
                            });
                        };
                    }
                    res.renderFile(staticFile,callback); 
                }
            });
        } else {
            res.notFound();
        }
    });
    return;
}