function (event) {
            var xhr = this.get("xhr");

            switch (event.type) {
                case "progress":
                  /**
                   * Signals that progress has been made on the upload of this file. 
                   *
                   * @event uploadprogress
                   * @param event {Event} The event object for the `uploadprogress` with the
                   *                      following payload:
                   *  <dl>
                   *      <dt>originEvent</dt>
                   *          <dd>The original event fired by the XMLHttpRequest instance.</dd>
                   *      <dt>bytesLoaded</dt>
                   *          <dd>The number of bytes of the file that has been uploaded.</dd>
                   *      <dt>bytesTotal</dt>
                   *          <dd>The total number of bytes in the file (the file size)</dd>
                   *      <dt>percentLoaded</dt>
                   *          <dd>The fraction of the file that has been uploaded, out of 100.</dd>
                   *  </dl>
                   */
                   this.fire("uploadprogress", {originEvent: event,
                                               bytesLoaded: event.loaded, 
                                               bytesTotal: this.get("size"), 
                                               percentLoaded: Math.min(100, Math.round(10000*event.loaded/this.get("size"))/100)
                                               });
                   this._set("bytesUploaded", event.loaded);
                   break;

                case "load":
                  /**
                   * Signals that this file's upload has completed and data has been received from the server.
                   *
                   * @event uploadcomplete
                   * @param event {Event} The event object for the `uploadcomplete` with the
                   *                      following payload:
                   *  <dl>
                   *      <dt>originEvent</dt>
                   *          <dd>The original event fired by the XMLHttpRequest instance.</dd>
                   *      <dt>data</dt>
                   *          <dd>The data returned by the server.</dd>
                   *  </dl>
                   */

                   if (xhr.status >= 200 && xhr.status <= 299) {
                        this.fire("uploadcomplete", {originEvent: event,
                                                     data: event.target.responseText});
                        var xhrupload = xhr.upload,
                            boundEventHandler = this.get("boundEventHandler");
    
                        xhrupload.removeEventListener ("progress", boundEventHandler);
                        xhrupload.removeEventListener ("error", boundEventHandler);
                        xhrupload.removeEventListener ("abort", boundEventHandler);
                        xhr.removeEventListener ("load", boundEventHandler); 
                        xhr.removeEventListener ("error", boundEventHandler);
                        xhr.removeEventListener ("readystatechange", boundEventHandler);
                        
                        this._set("xhr", null);
                   }
                   else {
                        this.fire("uploaderror", {})
                   }                   
                   break;

                case "error":
                  /**
                   * Signals that this file's upload has encountered an error. 
                   *
                   * @event uploaderror
                   * @param event {Event} The event object for the `uploaderror` with the
                   *                      following payload:
                   *  <dl>
                   *      <dt>originEvent</dt>
                   *          <dd>The original event fired by the XMLHttpRequest instance.</dd>
                   *      <dt>status</dt>
                   *          <dd>The status code reported by the XMLHttpRequest</dd>
                   *      <dt>statusText</dt>
                   *          <dd>The text of the error event reported by the XMLHttpRequest instance</dd>
                   *  </dl>
                   */
                   this.fire("uploaderror", {originEvent: event,
                                                  status: xhr.status,
                                                  statusText: xhr.statusText});
                   break;

                case "abort":

                  /**
                   * Signals that this file's upload has been cancelled. 
                   *
                   * @event uploadcancel
                   * @param event {Event} The event object for the `uploadcancel` with the
                   *                      following payload:
                   *  <dl>
                   *      <dt>originEvent</dt>
                   *          <dd>The original event fired by the XMLHttpRequest instance.</dd>
                   *  </dl>
                   */
                   this.fire("uploadcancel", {originEvent: event});
                   break;

                case "readystatechange":

                  /**
                   * Signals that XMLHttpRequest has fired a readystatechange event. 
                   *
                   * @event readystatechange
                   * @param event {Event} The event object for the `readystatechange` with the
                   *                      following payload:
                   *  <dl>
                   *      <dt>readyState</dt>
                   *          <dd>The readyState code reported by the XMLHttpRequest instance.</dd>
                   *      <dt>originEvent</dt>
                   *          <dd>The original event fired by the XMLHttpRequest instance.</dd>
                   *  </dl>
                   */
                   this.fire("readystatechange", {readyState: event.target.readyState,
                                                  originEvent: event});
                   break;
            }
        }