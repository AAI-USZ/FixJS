function(aXml, aCallback) {
      let r = new WBXML.Reader(aXml, ASCP);
      let command = r.document.next().localTagName;
      let xhr = new XMLHttpRequest({mozSystem: true});
      xhr.open("POST", this.baseURL + "?Cmd=" + command + "&User=" +
               this._email + "&DeviceId=v140Device&DeviceType=SmartPhone",
               true, this._email, this._password);
      xhr.setRequestHeader("MS-ASProtocolVersion", "14.0");
      xhr.setRequestHeader("Content-Type", "application/vnd.ms-sync.wbxml");
      xhr.setRequestHeader("User-Agent", "B2G");

      let conn = this;
      xhr.onload = function() {
        if (typeof logXhr == "function") // TODO: remove this debug code
          logXhr(xhr);

        if (xhr.status == 451) {
          conn.baseURL = xhr.getResponseHeader("X-MS-Location");
          conn.doCommand(aXml, aCallback);
          return;
        }
        if (xhr.status != 200) {
          if (typeof print == "function") // TODO: remove this debug code
            print("Error!\n");
          return;
        }

        let r = new WBXML.Reader(new Uint8Array(xhr.response), ASCP);
        if (typeof log == "function") { // TODO: remove this debug code
          log(r.dump());
          r.rewind();
        }

        aCallback(r);
      };

      xhr.responseType = "arraybuffer";
      xhr.send(aXml.buffer);
    }