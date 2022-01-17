function (options) {
			
				this[element] = new Element('div', {
						'class': 'upload-container',
						html: '<div style="display:inline-block;padding:3px" class="upload-progress"><span style="display:none">&nbsp;</span><span><input id="' + options.id + '_input" type="file" name="' + options.id + '_input"' + (options.multiple ? ' multiple="multiple"' : '') + '/>'
						+ '<input type="checkbox" disabled="disabled" style="display:none" name="' + options.name + '" id="' + options.id + '"/>'
						+ '<input type="checkbox" disabled="disabled" style="display:none" name="file_' + options.name + '" id="'+ options.id + '_lfile"/>'
						+ '<input type="hidden" disabled="disabled" name="guid_' + options.name + '" id="'+ options.id + '_gfile"/>'
						+ '<label for="'+ options.id + '"></label>'
						+ '</span></div><a class="cancel-upload" href="' + options.base + '">' + Locale[get]('uploadManager.CANCEL') + '</a><a class="pause-upload" style="display:none" href="' + options.base + '">' + Locale[get]('uploadManager.PAUSE') + '</a>'
					}).inject(options.container);
					
				var pause = this[addEvents]({load: function () { if(this.options.pause) pause.style.display = '' }, success: function () {
				
					pause.destroy()
				}})[element].getLast('.pause-upload')[addEvent]('click', function (e) {
			
					e.stop();
					
					this[pause.hasClass('resume-upload') ? 'resume' : 'pause']()
					
				}.bind(this));
					
				return this[element]
			}