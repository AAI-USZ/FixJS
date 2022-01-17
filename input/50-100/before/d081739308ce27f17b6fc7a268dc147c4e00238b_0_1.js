function simulateDownload(err, chain) {
          if (err) throw err;

          if (!blocks[blockDesc.name]) {
            throw new Error("Test block "+blockDesc.name+" was not " +
                            "generated successfully.");
          }

          var callback = this.parallel();
          console.log(blockDesc.name);
          chain.add(
            blocks[blockDesc.name],
            blockTxs[blockDesc.name],
            function (err) {
              callback(null, chain);
            }
          );
        }