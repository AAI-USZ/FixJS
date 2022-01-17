function(match, mCallback) {
          var src = match[1];
          //console.log('image src in style:' + src);
          getRemoteResource({
            "uri": baseUrl + src,
            "encoding": null // return as buffer
          }, function(err, res, body) {
            if (!err && res.statusCode == 200) {
              var mimeType = src.match(/(.*)\.(.*?$)/); // get file extension from src
              mimeType = mimeType[mimeType.length - 1];
              //console.log('image src=' + src + ' mimeType=' + mimeType + ' typeof body:' + typeof body);
              styleText = styleText.replace(match[0], 'url("data:image/' + mimeType + ';base64,' + body.toString('base64') + '")');
              mCallback(null);
            } else {
              mCallback(err);
            }
          });
        }