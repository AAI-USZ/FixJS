function report() {
          // If there were errors saving any of the files, it was because
          // those files were already in the db. That means they're changed
          // files not new files, and we'll report them later.
          // Carefully remove those new files, taking care about the
          // shifting indexes
          if (errors.length > 0) {
            errors.forEach(function(i) { newfiles[errors[i]] = null; });
            newfiles = newfiles.filter(function(f) { return f != null; });
          }

          // Finally, call the onchange handler about the new files
          // if there are any
          if (newfiles.length > 0 && media.onchange)
            media.onchange('created', newfiles);

          // Finally, move on to the next thing
          next();
        }