function() {
      return this.data = path.existsSync(this.dataPath) ? JSON.parse(fs.readFileSync(this.dataPath)) : {};
    }