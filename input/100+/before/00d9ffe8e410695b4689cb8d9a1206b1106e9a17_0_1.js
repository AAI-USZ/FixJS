function(err, stats) {
        if (err) throw err;

        if (stats.isDirectory()) {
          fs.readdir(file, function(err, fs) {
            if (err) throw err;

            files_to_load += fs.length;
            locations_to_check--;
            fs.forEach(function(f) {
              this.load_dictionary(file + '/' + f, load_dict_callback);
            }.bind(this));
          }.bind(this));
        } else {
          files_to_load++;
          locations_to_check--;
          this.load_dictionary(file, load_dict_callback);
        }
      }