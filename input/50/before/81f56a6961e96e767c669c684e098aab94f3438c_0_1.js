function () {
          if (Uint8Array)
            return new Uint8Array(resultBytes);
          else
            return resultBytes;
        }