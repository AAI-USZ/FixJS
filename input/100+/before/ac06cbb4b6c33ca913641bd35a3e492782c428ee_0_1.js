function (w) {
        if (options.type === "js") {
          if (!options.path)
            throw new Error("Must specify path")

          if (w === "client" || w === "server") {
            self.files[w][options.path] = data;
            self.js[w].push(options.path);
          } else {
            throw new Error("Invalid wironment");
          }
        } else if (options.type === "css") {
          if (w !== "client")
            // XXX might be nice to throw an error here, but then we'd
            // have to make it so that packages.js ignores css files
            // that appear in the server directories in an app tree
            return;
          if (!options.path)
            throw new Error("Must specify path")
          self.files.client[options.path] = data;
          self.css.push(options.path);
        } else if (options.type === "head" || options.type === "body") {
          if (w !== "client")
            throw new Error("HTML segments can only go to the client");
          self[options.type].push(data);
        } else if (options.type === "static") {
          self.files[w][options.path] = data;
        } else {
          throw new Error("Unknown type " + options.type);
        }
      }