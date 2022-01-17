function (task) {
          task.description = task.text;
          delete task.text;
          testStorage.save(task, function (dto) {
            totalToSave--;
            if (!dto)
              errors++;
            if (totalToSave < 1)
              returnToPhantom(errors > 0);
          });
        }