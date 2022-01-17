function (err, msg) {
          if (err) {
            nodeca.client.fontomas.util.notify('error',
              nodeca.client.fontomas.render('error:rpc', {
                error: (err.message || String(err))
              }));
            return;
          }

          if ('error' === msg.data.status){
            nodeca.client.fontomas.util.notify('error',
              nodeca.client.fontomas.render('error:rpc', {
                error: (msg.data.error || "Unexpected error.")
              }));
            return;
          }

          if ('finished' === msg.data.status) {
            // TODO: normal notification about success
            nodeca.logger.info("Font successfully generated. " +
                               "Your download link: " + msg.data.url);
            start_download(font_id, msg.data.url);
            return;
          }

          if (/^(?:enqueued|processing)$/.test(msg.data.status)) {
            // TODO: notification about queue
            nodeca.logger.info("Your request is in progress and will be available soon.");
            setTimeout(poll_status, 500);
            return;
          }

          // Unexpected behavior
          nodeca.logger.error("Unexpected behavior");
        }