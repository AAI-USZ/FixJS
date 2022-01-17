function() {
        var result = cursor.result;
        if (result) {
          processNewFile(result);
        }
        else {// When no more files
          if (newfiles.length > 0)
            saveAndReportQuickScanResults();  // report new files we found
          fullScan();                         // do full scan
        }
      }