function() {
        var result = cursor.result;
        if (result) {
          processNewFile(result);
        }
        else {// When no more files
          if (newfiles.length > 0) {
            // report new files we found, then do a full scan
            saveAndReportQuickScanResults(fullScan); 
          }
          else {
            // If we didn't find any new files, go direct to the full scan
            fullScan();                         // do full scan
          }
        }
      }