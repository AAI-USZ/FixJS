function(data) {
        var rows = my.parseCSV(data, dataset);
        dfd.resolve({
          records: rows,
          useMemoryStore: true
        });
      }