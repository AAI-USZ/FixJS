function () {
					$this = $(this);
					url = pe.url($this.attr('href'));					
					if (($this.attr('data-replace-hash') === undefined && (url.hash.length > 0 && window.location.hostname === url.host)) || ($this.attr('data-replace-hash') !== undefined && $this.attr('data-replace-hash') === true)) {
						$this.attr('href', url.removehash() + (url.params.length > 0 ? "&amp;" : "?") + 'hashtarget=' + url.hash);
					}
				}