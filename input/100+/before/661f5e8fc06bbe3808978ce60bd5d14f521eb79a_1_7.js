function (options) {
			
				this[element] = new Element('div', {
						'class': 'upload-container',
						html: '<div style="display:inline-block;padding:3px" class="upload-progress"><span style="display:none">&nbsp;</span><span><input id="' + options.id + '_input" type="file" name="' + options.id + '_input"' + (options.multiple ? ' multiple="multiple"' : '') + '/>'
						+ '<input type="checkbox" disabled="disabled" style="display:none" name="' + options.name + '" id="' + options.id + '"/>'
						+ '<input type="checkbox" disabled="disabled" style="display:none" name="file_' + options.name + '" id="'+ options.id + '_lfile"/>'
						+ '<label for="'+ options.id + '"></label>'
						+ '</span></div><a class="cancel-upload" href="' + options.base + '">' + Locale[get]('uploadManager.CANCEL') + '</a><a class="resume-upload" style="display:none" href="' + options.base + '">' + Locale[get]('uploadManager.RETRY') + '</a>'
					}).inject(options.container);
					
				this[element].getLast()[addEvent]('click', function (e) {
				
					e.stop();
					this.initUpload()
					
				}.bind(this));
				
				return this[element]
			}