function(resource) {
      if (path.existsSync(resource)) {
        try {
          config = JSON.parse(fs.readFileSync(resource))
        } catch (err) {
          throw new Error("Could not parse JSON config at "+path.resolve(resource))
        }
      }
    }