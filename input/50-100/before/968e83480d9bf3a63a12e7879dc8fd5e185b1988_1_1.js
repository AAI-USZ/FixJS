function(longLink) {

      // Added the link successfully
      promise.resolve(longLink);

      // Log activity
      db.logActivity({ message: 'Link hit', linkID: id }).then(null, function(err) {

        // Problem logging the activity, write to the error log
        // Already resolved the client promise though, so just ignore it
        db.logError({
          message: 'Database error writing to the activity log',
          error: err.error,
          code: err.code
        }).then(null, throwImmediately);
      });

    }