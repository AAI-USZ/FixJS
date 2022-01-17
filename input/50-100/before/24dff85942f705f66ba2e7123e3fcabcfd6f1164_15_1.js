function() {
        var tags = ID3.getAllTags(file.name);

        metadata.album = tags.album;
        metadata.artist = tags.artist;
        metadata.title = tags.title;

        callback(metadata);
      }