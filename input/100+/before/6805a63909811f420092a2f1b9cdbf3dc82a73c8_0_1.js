function() {
				var c = this.constants,
					f,
					onload = this.onload;

				switch (xhr.readyState) {
					case 0: c.readyState = this.UNSENT; break;
					case 1: c.readyState = this.OPENED; break;
					case 2: c.readyState = this.LOADING; break;
					case 3: c.readyState = this.HEADERS_RECEIVED; break;
					case 4:
						clearTimeout(this._timeoutTimer);
						this._completed = 1;
						c.readyState = this.DONE;

						if (!this._aborted) {
							debugger;
							if (f = this.file) {
								f = Filesystem.getFile(f);
								f.writable && f.write(xhr.responseText);
							}

							c.responseText = xhr.responseText;
							c.responseData = new Blob({
								data: xhr.responseText,
								length: xhr.responseText.length,
								mimeType: xhr.getResponseHeader("Content-Type") || "text/plain"
							});
							c.responseXML = xhr.responseXML;

							has("ti-instrumentation") && (instrumentation.stopTest(this._requestInstrumentationTest, this.location));

							xhr.status >= 400 && (onload = this._onError);
							is(onload, "Function") && onload.call(this);
						}
				}

				this._fireStateChange();
			}