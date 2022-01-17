function videolist(video_map, layout)
				{
					function updateData(qs)
					{
						function parseQueryString(qs)
						{
							object = {};

							qs.split('&').map(function(part) {
								kv = part.split('=');
								object[decodeURIComponent(kv[0])] =
									decodeURIComponent(kv[1]);
							});

							return object;
						}

						var fmt_map = {};
						var data = parseQueryString(qs);
						var fmt = data['fmt_list'];
						if (fmt) {
							fmt = fmt.split(',').map(function(a) {
								return a.split('/')[0];
							});

							var streams = data['url_encoded_fmt_stream_map'].split(',')
								.map(parseQueryString);

							for (var i = 0; i < fmt.length; i++) {
								fmt_map[fmt[i]] = streams[i]['url'];
							}
						}
						this.videoLinks = fmt_map;
					}

					function changeFormat(f)
					{
						function pad(n) {
							return ("000" + n).slice(-3);
						}

						this.removeAttribute('href');
						this.rawLink.innerText = '';
						this.rawLink.removeAttribute('href');
						if (this.videoLinks && this.videoLinks[f]) {
							var link = this.videoLinks[f]
								+ '&title='
								+ encodeURIComponent(pad(this.videoNumber)
													 + ' ' + this.innerText);
							this.setAttribute('href', link);
							this.rawLink.innerText = link;
							this.rawLink.setAttribute('href', link);
						}
					}

					var vlist = document.createElement('div');

					for (v in layout) {
						var video = layout[v];

						if (video && video.nugget_key) {
							video = video_map[video.nugget_key];

							if (video.media && video.media.youtube_id) {
								// or could check (video.nuggetType == 'lecture')
								var el = document.createElement('div');
								vlist.appendChild(el);
								var li = document.createElement('li');
								el.appendChild(li);

								el = document.createElement('div');
								el.setAttribute('class', 'udacity-dl-direct-link');
								li.appendChild(el);

								var throbber = document.createElement('img');
								throbber.setAttribute('src', chrome.extension.getURL(
									"throbber.gif"));
								el.appendChild(throbber);

								var el2 = document.createElement('a');
								el.appendChild(el2);

								el = document.createElement('div');
								el.setAttribute('style', 'overflow-x:auto;width:95%');
								el.setAttribute('class', 'udacity-dl-raw-link');
								li.appendChild(el);

								el2.setAttribute('style', '-webkit-user-select:text');
								el2.appendChild(document.createTextNode(video.name));
								el2.videoNumber = videolist.count++;
								el2.updateData = updateData;
								el2.changeFormat = changeFormat;
								el2.rawLink = document.createElement('a');
								el2.progress = throbber;
								el.appendChild(el2.rawLink);
								el2.rawLink.setAttribute('style', '-webkit-user-select:text;white-space:nowrap;margin:2ex');
								if (directlinks[video.media.youtube_id]) {
									errmsg = document.createElement('div');
									errmsg.appendChild(document.createTextNode("Duplicate video.  Please check the discussion forum for updates."));
									errmsg.setAttribute('class', 'error');
									el2.appendChild(errmsg);
								}
								else {
									directlinks[video.media.youtube_id] = el2;
								}

								el = document.createElement('div');
								el.setAttribute('class', 'udacity-dl-youtube-id');
								var el2 = document.createElement('a');
								el2.setAttribute('style', 'margin-left:2em;-webkit-user-select:text');
								el2.setAttribute('target', '_blank');
								el2.setAttribute('href', 'http://www.youtube.com/watch?v='
												 + video.media.youtube_id);
								el.appendChild(el2);
								el2.appendChild(document.createTextNode(video.media.youtube_id));
								li.appendChild(el);
							}
						}
						else if (video) {
							vlist.appendChild(videolist(video_map, video));
						}
					}

					return vlist;
				}