function(longLink) {

          // Added the link successfully
          promise.resolve(longLink);

          // Log the new link hit
          logging.log({
            message: 'Link hit',
            linkID: id
          });

        }