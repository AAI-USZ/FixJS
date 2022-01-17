function(url) {
        var dotLocation = url.lastIndexOf('.');
        if (dotLocation < 0) {
            console.log("skipped no dot: " + url);
            return false;
        }
        var extension = url.substring(dotLocation);
        
        if (goodExtensions.indexOf(extension) >= 0) {
            return true;
        } else {
            //console.log("skipped bad extension: " + url);
            return false;
        }
        
        
    }