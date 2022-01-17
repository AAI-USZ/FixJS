function (inst) {

                var that = this,

                    e = null,

                    _html;



                _html = function () {

					var text = inst.options.previewText;

					if (!text) {

						text = inst._getRegional('previewText');

					}

					text = text.replace('\n', '<br/>');



					var html = '<div class="ui-fontpicker-preview-text">'+text+'</div>';

                    var prev = '<div class="ui-fontpicker-preview">'+html+'</div>';

                    var inner = '<div class="ui-fontpicker-preview-inner">'+prev+'</div>';

                    var outer = '<div class="ui-fontpicker-preview-outer">'+inner+'</div>';



					return outer;

                };



                this.init = function () {

                    e = $(_html()).appendTo($('.ui-fontpicker-preview-container', inst.dialog));

                };



                this.repaint = function () {

					$('.ui-fontpicker-preview-text', e).attr('style', inst.font.toCSS(true));

				};

            }