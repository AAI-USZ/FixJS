function(data) {
        var rows = my.parseCSV(dataset.data, dataset);
        dfd.resolve({
          records: rows,
          useMemoryStore: true
        });
      }