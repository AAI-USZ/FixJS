    set fullUrl(value) {
      var protocolIdx = value.indexOf('://');

      this.domain = value;
      this.url = '/';

      if (protocolIdx !== -1) {
        protocolIdx += 3;
        // next chunk
        var domainChunk = value.substr(protocolIdx);
        var pathIdx = domainChunk.indexOf('/');


        if (pathIdx !== -1) {
          pathIdx = pathIdx + protocolIdx;

          this.url = value.substr(pathIdx);
          this.domain = value.substr(0, pathIdx);
        }

      }
    },
