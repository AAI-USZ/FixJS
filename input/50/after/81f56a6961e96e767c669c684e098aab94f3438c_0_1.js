function () {
          if (typeof (Uint8Array) !== "undefined")
            return new Uint8Array(resultBytes);
          else
            return resultBytes;
        }