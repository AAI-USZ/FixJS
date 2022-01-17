function(url, parameters, fileFieldName) {
         
            this._set("bytesUploaded", 0);
            
            this._set("xhr", new XMLHttpRequest());
            this._set("boundEventHandler", Bind(this._uploadEventHandler, this));
                         
            var uploadData = new FormData(),
                fileField = fileFieldName || "Filedata",
                xhr = this.get("xhr"),
                xhrupload = this.get("xhr").upload,
                boundEventHandler = this.get("boundEventHandler");

            Y.each(parameters, function (value, key) {uploadData.append(key, value);});
            uploadData.append(fileField, this.get("file"));




            xhr.addEventListener ("loadstart", boundEventHandler, false);
            xhrupload.addEventListener ("progress", boundEventHandler, false);
            xhr.addEventListener ("load", boundEventHandler, false);
            xhr.addEventListener ("error", boundEventHandler, false);
            xhrupload.addEventListener ("error", boundEventHandler, false);
            xhrupload.addEventListener ("abort", boundEventHandler, false);
            xhr.addEventListener ("abort", boundEventHandler, false);
            xhr.addEventListener ("loadend", boundEventHandler, false); 
            xhr.addEventListener ("readystatechange", boundEventHandler, false);

            xhr.open("POST", url, true);

            xhr.withCredentials = this.get("xhrWithCredentials");

            Y.each(this.get("xhrHeaders"), function (value, key) {
                 xhr.setRequestHeader(key, value);
            });

            xhr.send(uploadData);
      
            /**
             * Signals that this file's upload has started. 
             *
             * @event uploadstart
             * @param event {Event} The event object for the `uploadstart` with the
             *                      following payload:
             *  <dl>
             *      <dt>xhr</dt>
             *          <dd>The XMLHttpRequest instance handling the file upload.</dd>
             *  </dl>
             */
             this.fire("uploadstart", {xhr: xhr});

        }