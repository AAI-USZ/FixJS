function(src, callback) {
        if (callback == null) callback = function() {};

        var ext = findExt(src);

        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'png':
            case 'bmp':
                game.assets[src] = enchant.Surface.load(src);
                game.assets[src].addEventListener('load', callback);
                break;
            case 'mp3':
            case 'aac':
            case 'm4a':
            case 'wav':
            case 'ogg':
                game.assets[src] = enchant.Sound.load(src, 'audio/' + ext);
                game.assets[src].addEventListener('load', callback);
                break;
            default:
                var req = new XMLHttpRequest();
                req.open('GET', src, true);
                req.onreadystatechange = function(e) {
                    if (req.readyState == 4) {
                        if (req.status != 200 && req.status != 0) {
                            throw new Error(req.status + ': ' + 'Cannot load an asset: ' + src);
                        }

                        var type = req.getResponseHeader('Content-Type') || '';
                        if (type.match(/^image/)) {
                            game.assets[src] = enchant.Surface.load(src);
                            game.assets[src].addEventListener('load', callback);
                        } else if (type.match(/^audio/)) {
                            game.assets[src] = enchant.Sound.load(src, type);
                            game.assets[src].addEventListener('load', callback);
                        } else {
                            game.assets[src] = req.responseText;
                            callback();
                        }
                    }
                };
                req.send(null);
        }
    }