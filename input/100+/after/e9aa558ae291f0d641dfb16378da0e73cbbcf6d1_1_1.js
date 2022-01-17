function (err) {
        if (err) {
          nodeca.logger.error(log_prefix + (err.stack || err.message || err.toString()));
        }

        // push final checkpoint
        times.push(Date.now());

        // log some statistical info
        nodeca.logger.info(log_prefix + "Generated in " +
                          ((times[2] - times[0]) / 1000) + "ms " +
                          "(real: " + ((times[1] - times[0]) / 1000) + "ms)");

        stats.push({
          glyphs: config.glyphs.length,
          time:   (times[2] - times[0]) / 1000,
        });

        delete jobs[font_id];
        self.finished = true;
      }