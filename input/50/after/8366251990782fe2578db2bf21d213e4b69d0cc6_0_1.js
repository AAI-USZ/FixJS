function handleDownloadSuccess(e) {
      // Start another download for the next batch of blocks
      this.startDownload(e.invs[0].hash, null, e.conn);
    }