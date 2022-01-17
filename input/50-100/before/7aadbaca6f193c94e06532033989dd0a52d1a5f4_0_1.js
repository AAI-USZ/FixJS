function(fname){
        var ext = path.extname(fname),
            fileDir = path.dirname(fname).replace(o.inputDir, '');

        paths.push({
            input : fname,
            output : path.join(o.outputDir, fileDir, path.basename(fname, ext) + o.outputExt)
        });
    }