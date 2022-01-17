function (err) {
        if (err) {
          nodeca.logger.error(log_prefix + (err.stack || err.message || err.toString()));

          jobs[font_id].status  = 'error';
          jobs[font_id].error   = (err.message || err.toString());
        } else {
          // remove job from the cache as we check filesystem
          // to decide whenever job is done or not
          delete jobs[font_id];
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

        self.finished = true;
      }