function (response) {
				
				var dom = createDOM(response, /<ol[^>]+id="vm-playlist-video-list-ol"[^>]*>([\s\S]*)<\/ol>/i);
				self.videos = {};
				
				// get the video items
				$( ".vm-video-item", dom, true ).forEach(function (item) {

					var thumb  = $(".yt-thumb-clip img", item)[0],
						time   = $(".video-time", item)[0],
						title  = $(".vm-video-title a", item)[0],
						upload = $(".vm-video-info:nth-of-type(2)", item)[0],
						clicks = $(".vm-video-metrics dd:first-of-type", item)[0],
						vid = title.href.match(/v=([^&]{11})/)[1];

					self.videos[vid] = getVideo(self, {
						vid:   vid,
						title: strip(title.textContent),
						thumb:    thumb  ? thumb.getAttribute("data-src") : "",
						duration: time   ? strip(time.textContent)        : "0:00",
						uploaded: upload ? strip(upload.textContent)      : "not found",
						clicks:   clicks ? strip(clicks.textContent)      : "NaN"
					});
				});
				
				// now extend the information we already have
				var headerData = response.match(/<div[^>]+id="vm-page-subheader"[^>]+>\s*<h3>\s*<a[^>]+href="([^"]*)"/i);
				self.href = headerData == null ? "Javascript: alert('url not found, sorry!')" : headerData[1];
				self.titleObj.href = self.href;
				//self.href = $("#vm-page-subheader h3 a", dom)[0].href;
				//self.titleObj.href = self.href;
				
				// remove the dom to reduce memory use
				dom = null;
				
				// rebuild the list
				self.buildList();
				self.removeLoader();
			
				// callback
				if (callback) callback();
			}