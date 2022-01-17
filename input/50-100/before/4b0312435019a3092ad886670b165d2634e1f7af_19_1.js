function() {
      var meta, neatFile, neatFilePath;
      neatFilePath = "" + this.neatRoot + "/.neat";
      try {
        neatFile = fs.readFileSync(neatFilePath);
      } catch (e) {
        return puts("" + (missing(neatFilePath)) + "\n\n" + neatBroken);
      }
      meta = cup.read(neatFile.toString());
      return meta || puts(error("Invalid .neat file at:\n" + neatFilePath.red + "\n\n" + neatBroken));
    }