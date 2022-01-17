function(err) {
        var errFile;
        if (err) {
          errFile = err.toString().match(/migrations\/([^:]+):/)[1];
          Fs.writeFileSync("migrations/errfile", errFile);
          console.error("FILE", errFile);
          console.error(err);
          return process.exit(1);
        } else {
          if (existsSync("migrations/errfile")) {
            Fs.unlinkSync("migrations/errfile");
          }
          console.log("OK");
          return process.exit();
        }
      }