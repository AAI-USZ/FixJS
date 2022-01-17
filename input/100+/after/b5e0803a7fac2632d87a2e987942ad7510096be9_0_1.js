function (xhr, uri, type) {
			var typed = type.toLowerCase().capitalize(),
			    l     = location,
			    state = null,
			    s, o, cors, r, t;

			switch (true) {
				case xhr.readyState === 2:
					uri.fire("received" + typed);
					break;
				case xhr.readyState === 4:
					uri.fire("afterXHR", {xhr: xhr, uri: uri});
					try {
						switch (xhr.status) {
							case 200:
							case 201:
							case 202:
							case 203:
							case 204:
							case 205:
							case 206:
							case 301:
								s    = abaaso.state;
								o    = client.headers(xhr, uri, type);
								cors = client.cors(uri);

								switch (true) {
									case type === "head":
										return uri.fire("afterHead", o.headers);
									case type !== "delete" && /200|301/.test(xhr.status):
										t = typeof o.headers["Content-Type"] !== "undefined" ? o.headers["Content-Type"] : "";
										r = client.parse(xhr, t);
										if (typeof r === "undefined") throw Error(label.error.serverError);
										cache.set(uri, "response", (o.response = r));
										break;
								}

								// Application state change triggered by hypermedia (HATEOAS)
								if (s.header !== null && Boolean(state = o.headers[s.header]) && s.current !== state) typeof s.change === "function" ? s.change(state) : s.current = state;

								switch (xhr.status) {
									case 200:
									case 201:
									case 202:
									case 203:
									case 206:
										uri.fire("after" + typed, utility.clone(o.response));
										break;
									case 204:
										uri.fire("after" + typed);
										break;
									case 205:
										uri.fire("reset");
										break;
									case 301:
										uri.fire("moved", utility.clone(o.response));
										break;
								}
								break;
							case 401:
								throw Error(label.error.serverUnauthorized);
								break;
							case 403:
								cache.set(uri, "!permission", client.bit([type]));
								throw Error(label.error.serverForbidden);
								break;
							case 405:
								cache.set(uri, "!permission", client.bit([type]));
								throw Error(label.error.serverInvalidMethod);
								break
							case 0:
							default:
								throw Error(label.error.serverError);
						}
					}
					catch (e) {
						error(e, arguments, this, true);
						uri.fire("failed" + typed, {response: client.parse(xhr), xhr: xhr});
					}
					break;
				case client.ie && client.cors(uri): // XDomainRequest
					var r, x;

					switch (true) {
						case Boolean(x = json.decode(/[\{\[].*[\}\]]/.exec(xhr.responseText))):
							r = x;
							break;
						case (/<[^>]+>[^<]*]+>/.test(xhr.responseText)):
							r = xml.decode(xhr.responseText);
							break;
						default:
							r = xhr.responseText;
					}

					cache.set(uri, "permission", client.bit(["get"]));
					cache.set(uri, "response", r);
					uri.fire("afterGet", r);
					break;
			}
			return uri;
		}