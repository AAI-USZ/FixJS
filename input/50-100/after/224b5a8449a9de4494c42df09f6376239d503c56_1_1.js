function() {
      if (fs.existsSync(this.options.conf)) {
        return this.logger.info("" + this.options.conf + " already exists");
      } else {
        fs.writeFileSync(this.options.conf, sample_conf);
        return this.logger.info("Wrote " + this.options.conf);
      }
    }