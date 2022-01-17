function (options) {
			
				this[element] = new Element('div', {'class': 'upload-container',
								html: '<iframe id="' + options.id + '_iframe" src="' + options.base + ( options.base.indexOf('?') == -1 ? '?' : '&') + options.id + '" frameborder="no" scrolling="no" style="border:0;overflow:hidden;padding:0;display:block;float:left;height:20px;width:228px; "></iframe>'
								+ '<input type="checkbox" disabled="disabled" style="display:none" name="' + options.name + '" id="' + options.id + '"/>'
								+ '<input type="checkbox" disabled="disabled" style="display:none" name="file_' + options.name + '" id="'+ options.id + '_lfile"/>'
								+ '<span class="upload-span" id="' + options.id + '_label"><a class="cancel-upload" href="' + options.base + '">' + Locale[get]('uploadManager.CANCEL') + '</a></span>'
							}).inject(options.container);
					
				return this[element]
			}