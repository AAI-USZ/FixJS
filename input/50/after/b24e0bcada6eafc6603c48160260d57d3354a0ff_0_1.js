function() {
      return this.data = fs.existsSync(this.dataPath) ? JSON.parse(fs.readFileSync(this.dataPath)) : {};
    }