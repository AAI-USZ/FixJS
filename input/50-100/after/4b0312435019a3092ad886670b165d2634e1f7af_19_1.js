function() {
      var meta, neatFile, neatFilePath;
      neatFilePath = "" + this.neatRoot + "/.neat";
      try {
        neatFile = fs.readFileSync(neatFilePath);
      } catch (e) {
        return error("" + (missing(neatFilePath)) + "\n\n" + neatBroken);
      }
      meta = cup.read(neatFile.toString());
      return meta || error("Invalid .neat file at:\n" + neatFilePath.red + "\n\n" + neatBroken);
    }