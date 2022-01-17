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