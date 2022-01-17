function (dto) {
            totalToSave--;
            if (!dto)
              errors++;
            if (totalToSave < 1)
              returnToPhantom(errors > 0);
          }