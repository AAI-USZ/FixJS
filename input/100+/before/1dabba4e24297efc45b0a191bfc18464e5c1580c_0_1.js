function ($) {

	"use strict";



	$.fontpicker = new function() {

		this.regional = [];

		this.regional[''] =	{

			ok:					'OK',

			cancel:				'Cancel',

			none:				'None',

			button:				'Font',

			title:				'Pick a font',

			family:				'Family:',

			style:				'Style:',

			size:				'Size:',

			'line-height':		'Line height',

			'letter-spacing':	'Letter spacing',

			'small-caps':		'Small caps',

			'underline':		'Underline',

			'overline':			'Overline',

			'line-through':		'Strike through',

			previewText:	'The quick brown fox jumps\nover the lazy dog.'

		};

	};



	var _fontpicker_index = 0,



		_container_popup = '<div class="ui-fontpicker ui-fontpicker-dialog ui-dialog ui-widget ui-widget-content ui-corner-all" style="display: none;"></div>',



		_container_inline = '<div class="ui-fontpicker ui-fontpicker-inline ui-dialog ui-widget ui-widget-content ui-corner-all"></div>',



		_parts_lists = {

			'full':		['header', 'family', 'style', 'size', 'settings', 'preview', 'footer'],

			'popup':	['family', 'style', 'size', 'settings', 'preview', 'footer'],

			'inline':	['family', 'style', 'size', 'settings', 'preview']

		},



		_is_numeric = function(value) {

			return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);

		},



		_layoutTable = function(layout, callback) {

			var bitmap,

				x,

				y,

				width, height,

				columns, rows,

				index,

				cell,

				html;



			layout.sort(function(a, b) {

				if (a.pos[1] == b.pos[1]) {

					return a.pos[0] - b.pos[0];

				}

				return a.pos[1] - b.pos[1];

			})



			// Determine dimensions of the table

			width = 0;

			height = 0;

			for (index in layout) {

				width = Math.max(width, layout[index].pos[0] + layout[index].pos[2]);

				height = Math.max(height, layout[index].pos[1] + layout[index].pos[3]);

			}



			// Initialize bitmap

			bitmap = [];

			for (x = 0; x < width; ++x) {

				bitmap.push(new Array(height));

			}



			// Mark rows and columns which have layout assigned

			rows	= new Array(height);

			columns = new Array(width);

			for (index in layout) {

				// mark columns

				for (x = 0; x < layout[index].pos[2]; x += 1) {

					columns[layout[index].pos[0] + x] = true;

				}

				for (y = 0; y < layout[index].pos[3]; y += 1) {

					rows[layout[index].pos[1] + y] = true;

				}

			}



			// Generate the table

			html = '';

			cell = layout[index = 0];

			for (y = 0; y < height; ++y) {

				html += '<tr>';

				for (x = 0; x < width;) {

					if (cell !== undefined && x == cell.pos[0] && y == cell.pos[1]) {

						// Create a "real" cell

						var w,

							h;



						html += callback(cell, x, y);



						for (h = 0; h < cell.pos[3]; h +=1) {

							for (w = 0; w < cell.pos[2]; w +=1) {

								bitmap[x + w][y + h] = true;

							}

						}



						x += cell.pos[2];

						cell = layout[++index];

					} else {

						// Fill in the gaps

						var colspan = 0;

						var walked = false;



						while (x < width && bitmap[x][y] === undefined && (cell === undefined || y < cell.pos[1] || (y == cell.pos[1] && x < cell.pos[0]))) {

							if (columns[x] === true) {

								colspan += 1;

							}

							walked = true;

							x += 1;

						}



						if (colspan > 0) {

							html += '<td colspan="'+colspan+'"></td>';

						} else if (!walked) {

							x += 1;

						}

					}

				}

				html += '</tr>';

			}



			return '<table cellspacing="0" cellpadding="0" border="0"><tbody>' + html + '</tbody></table>';

		},



		_setWord = function(sentence, word, set) {

			var words = sentence? sentence.split(' ') : [];

			var index = $.inArray(word, words);

			if (set && index < 0) {

				words.push(word);

			} else if (!set && index >= 0) {

				words.splice(index, 1);

			}

			return words.length > 0? words.join(' ') : null;

		},



		_hasWord = function(sentence, word) {

			var r = new RegExp('\\b'+word+'\\b', 'i');

			return r.test(sentence);

		},



		_settings = {

			'line-height':	function (inst) {

				var that	= this;



				this.paintTo = function(container) {

                    $('<input step="5" min="0" max="9999" type="number" value=""/>').appendTo(container).change(function() {

						var value = $(this).val();

						inst.font.css['line-height'] = value? value+'%' : null;

						inst._change();

					}).after('%');

				};



				this.label = function() {

					return inst._getRegional('line-height');

				};

			},



			'small-caps':	function (inst) {

				var that	= this;



				this.paintTo = function(container) {

                    $('<input type="checkbox"/>').appendTo(container).change(function() {

						inst.font.css['font-variant'] = $(this).is(':checked')? 'small-caps' : null;

						inst._change();

					});

				};



				this.label = function() {

					return inst._getRegional('small-caps');

				};

			},



			'underline':	function (inst) {

				var that	= this;



				this.paintTo = function(container) {

                    $('<input type="checkbox"/>')

					.attr('checked', _hasWord(inst.font.css['text-decoration'], 'underline'))

					.appendTo(container)

					.change(function() {

						inst.font.css['text-decoration'] = _setWord(inst.font.css['text-decoration'], 'underline', $(this).is(':checked'));

						inst._change();

					});

				};



				this.label = function() {

					return inst._getRegional('underline');

				};

			},



			'overline':	function (inst) {

				var that	= this;



				this.paintTo = function(container) {

                    $('<input type="checkbox"/>')

					.attr('checked', _hasWord(inst.font.css['text-decoration'], 'overline'))

					.appendTo(container)

					.change(function() {

						inst.font.css['text-decoration'] = _setWord(inst.font.css['text-decoration'], 'overline', $(this).is(':checked'));

						inst._change();

					});

				};



				this.label = function() {

					return inst._getRegional('overline');

				};

			},



			'line-through':	function (inst) {

				var that	= this;



				this.paintTo = function(container) {

                    $('<input type="checkbox"/>')

					.attr('checked', _hasWord(inst.font.css['text-decoration'], 'line-through'))

					.appendTo(container)

					.change(function() {

						inst.font.css['text-decoration'] = _setWord(inst.font.css['text-decoration'], 'line-through', $(this).is(':checked'));

						inst._change();

					});

				};



				this.label = function() {

					return inst._getRegional('line-through');

				};

			},



			'letter-spacing':	function (inst) {

				var that	= this,

					input	= null;



				this.paintTo = function(container) {

                    input = $('<input type="number" min="-999" max="9999" value=""/>').appendTo(container);

					//input.after('px');

					input.after('%');



					input.change( function() {

						var value = $(this).val();

						inst.font.css['letter-spacing'] = value && value != 0? value+'px' : null;

						inst._change();

					});

				};



				this.label = function() {

					return inst._getRegional('letter-spacing');

				};

			}

		},



        _parts = {

            header: function (inst) {

                var that = this,

                    e = null,

                    _html;



                _html = function () {

                    var title = inst.options.title ? inst.options.title :  inst._getRegional('title');



                    return '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">'

                        + '<span class="ui-dialog-title">' + title + '</span>'

                        + '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button">'

                        + '<span class="ui-icon ui-icon-closethick">close</span></a></div>';

                };



                this.init = function () {

                    e = $(_html()).prependTo(inst.dialog);

                    var close = $('.ui-dialog-titlebar-close', e);

                    inst._hoverable(close);

                    inst._focusable(close);



                    close.click( function() {

                        inst.close()

                    });

                };

            },



            family: function (inst) {

                var that		= this,

                    e			= null,

                    _html		= function () {

									var html = '<div>'+inst._getRegional('family')+'</div>';

									html += '<div style="padding-right:4px;"><input class="ui-fontpicker-family-text" type="text"/></div>';

									html += '<div><select class="ui-fontpicker-family-select" size="8">';

									$.each(_families(), function(index, family) {

										html += '<option value="'+family.name+'">'+family.name+'</option>';

									});

									html += '</select></div>';

									return '<div class="ui-fontpicker-family">'+html+'</div>';

								},

					_families	= function() {

									var families = inst.options.families.slice();

									if (inst.options.nullable) {

										families.unshift({

											name: '',

											faces: null

										});

									}

									return families;

								},

					_set		= function(name) {

									$.each(_families(), function(index, family) {

										if (family.name.toLowerCase() == name.toLowerCase()) {

											inst.font.css['font-family'] = family.faces;

											inst._change();

											return false;	// break

										}

									});

								};



                this.init = function () {

                    e = $(_html()).appendTo($('.ui-fontpicker-family-container', inst.dialog));



					$('.ui-fontpicker-family-text', e).on('change keyup', function() {

						_set($(this).val());

					});



					$('.ui-fontpicker-family-select', e).change(function() {

						_set($(this).val());

					});

                };



                this.repaint = function () {

					var face = inst.font.css['font-family'] ? inst.font.css['font-family'][0] : '';

					$.each(_families(), function(index, family) {

						if (family.faces == inst.font.css['font-family']) {

							$('.ui-fontpicker-family-text,.ui-fontpicker-family-select', e).not(':focus').val(face);

							return false;	// break

						}

					});

				};

            },



            style: function (inst) {

                var that	= this,

                    e		= null,

                    _html	= function () {

								var html = '<div>'+inst._getRegional('style')+'</div>';

								html += '<div style="padding-right:4px;"><input class="ui-fontpicker-style-text" type="text"/></div>';

								html += '<div><select class="ui-fontpicker-style-select" size="8">';

								$.each(inst.options.styles, function(index, style) {

									html += '<option value="'+style.name+'">'+style.name+'</option>';

								});

								html += '</select></div>';

								return '<div class="ui-fontpicker-style">'+html+'</div>';

							},

					_set	= function(name) {

								$.each(inst.options.styles, function(index, style) {

									if (style.name.toLowerCase() == name.toLowerCase()) {

										inst.font.css['font-weight']	= style.weight == 'normal' ? null : style.weight;

										inst.font.css['font-style']		= style.style == 'normal' ? null : style.style;

										inst._change();

										return false;	// break

									}

								});

							};



                this.init = function () {

                    e = $(_html()).appendTo($('.ui-fontpicker-style-container', inst.dialog));



					$('.ui-fontpicker-style-text', e).on('change keyup', function() {

						_set($(this).val());

					});



					$('.ui-fontpicker-style-select', e).change(function() {

						_set($(this).val());

					});

                };



                this.repaint = function () {

					var bold	= inst.font.css['font-weight'] || 'normal',

						italic	= inst.font.css['font-style'] || 'normal';

					$.each(inst.options.styles, function(index, style) {

						if (style.weight	== bold

						 && style.style		== italic) {

							$('.ui-fontpicker-style-text,.ui-fontpicker-style-select', e).not(':focus').val(style.name);

							return false;	// break

						}

					});

				};

            },



            size: function (inst) {

                var that	= this,

                    e		= null,

                    _html	= function () {

								var html = '<div>'+inst._getRegional('size')+'</div>';

								html += '<div style="padding-right:4px;"><input class="ui-fontpicker-size-text" type="text"/></div>';

								html += '<div><select class="ui-fontpicker-size-select" size="8">';

								$.each(_sizes(), function(index, size) {

									html += '<option value="'+size+'">'+size+'</option>';

								});

								html += '</select></div>';

								return '<div class="ui-fontpicker-size">'+html+'</div>';

							},

					_sizes	= function() {

								var sizes = inst.options.sizes.slice();

								if (inst.options.nullable) {

									sizes.unshift('');

								}

								return sizes;

							},

					_set	= function(size) {

								inst.font.css['font-size'] = size? Math.max(1, parseInt(size))+'px' : null;

								inst._change();

							};



                this.init = function () {

                    e = $(_html()).appendTo($('.ui-fontpicker-size-container', inst.dialog));



					$('.ui-fontpicker-size-text', e).on('change keyup', function() {

						_set($(this).val());

					});



					$('.ui-fontpicker-size-select', e).change( function() {

						_set($(this).val());

					});

                };



                this.repaint = function () {

					var size = inst.font.css['font-size'] ? parseInt(inst.font.css['font-size']) : '';

					$('.ui-fontpicker-size-text,.ui-fontpicker-size-select', e).not(':focus').val(size);

				};

            },



            settings: function (inst) {

                var that		= this,

                    e			= null,

                    _html		= function () {

									return '<div class="ui-fontpicker-settings"><ul/></div>';

								};



                this.init = function () {

                    e = $(_html()).appendTo($('.ui-fontpicker-settings-container', inst.dialog));



					inst.settings = {};

					$.each(inst.options.settings, function(label, settings) {

						var id = 'ui-fontpicker-settings-'+label.toLowerCase()+'-'+_fontpicker_index;



						$('ul', e).append('<li><a href="#'+id+'">'+label+'</a></li>');



						var page = $('<div id="'+id+'"></div>').appendTo(e);



						var columns = 3;

						var chunk_size = Math.ceil(settings.length / columns);



						//@todo Better chunking algorithm that prefers columns over chunk_size

						var chunks = [].concat.apply([],

							settings.map(function(elem, i) {

								return i % chunk_size? [] : [settings.slice(i, i + chunk_size)];

							})

						);



						var table = $('<table class="ui-fontpicker-settings-table"/>').appendTo(page);

						for (var r = 0; r < chunk_size; ++r) {

							var row = $('<tr/>').appendTo(table);

							for (var c = 0; c < columns; ++c) {

								if (chunks[c] && chunks[c][r]) {

									var item = new _settings[chunks[c][r]](inst);

									$('<td class="ui-fontpicker-settings-label"/>').text(item.label()).appendTo(row);

									item.paintTo($('<td/>').appendTo(row));

								} else {

									$('<td width="'+(100 / columns)+'%" colspan="2"/>').appendTo(row);

								}

							}

						}

					});



					e.tabs();

                };

            },



            preview: function (inst) {

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

            },



            footer: function (inst) {

                var that = this,

                    e = null,

					id_none = 'ui-fontpicker-special-none-'+_fontpicker_index,

                    _html;



                _html = function () {

                    var html = '';



                    if (!inst.inline && inst.options.showNoneButton) {

                        html += '<div class="ui-fontpicker-buttonset">';



                        if (!inst.inline && inst.options.showNoneButton) {

                            html += '<input type="radio" name="ui-fontpicker-special" id="'+id_none+'"><label for="'+id_none+'">' + inst._getRegional('none') + '</label>';

                        }

                        html += '</div>';

                    }



                    if (!inst.inline) {

                        html += '<div class="ui-dialog-buttonset">';

                        html += '<button class="ui-fontpicker-cancel">' + inst._getRegional('cancel') + '</button>';

                        html += '<button class="ui-fontpicker-ok">' + inst._getRegional('ok') + '</button>';

                        html += '</div>';

                    }



                    return '<div class="ui-dialog-buttonpane ui-widget-content">' + html + '</div>';

                };



                this.init = function () {

                    e = $(_html()).appendTo(inst.dialog);



                    $('.ui-fontpicker-ok', e).button().click(function () {

                        inst.close();

                    });



                    $('.ui-fontpicker-cancel', e).button().click(function () {

                        inst.font = $.extend({}, inst.currentFont);

                        inst._change(inst.font.set);

                        inst.close();

                    });



                    $('.ui-fontpicker-buttonset', e).buttonset();



                    $('#'+id_none, e).click(function () {

                        inst._change(false);

                    });

                };

            }

        },



        Font = function () {

			this.toCSS = function() {

				var css = '';

				$.each(this.css, function(tag, value) {

					if (value !== null) {

						if ($.isArray(value)) {

							var parts = [];

							$.each(value, function(index, part) {

								parts.push(/^\S+$/.test(part)? part : '"'+part+'"');

							});

							if (parts.length > 0) {

								css += tag+':'+parts.join(',')+';';

							}

						} else {

							css += tag+':'+value+';';

						}

					}

				});

				return css;

			};



			this.set		= false;



			this.css		= {

//				'font-family':		null

//			,	'font-size':		null

//			,	'color':			null

//			,	'text-decoration':	null

//			,	'letter-spacing':	null

//			,	'font-weight':		null

//			,	'font-style':		null

//			,	'line-height':		null

//			,	'font-variant':		null

			};

		};



	$.widget("vanderlee.fontpicker", {

		options: {

			altField:			'',			// selector for DOM elements which matches changes.

			altOnChange:		true,		// true to update on each change, false to update only on close.

			autoOpen:			false,		// Open dialog automatically upon creation

			buttonImage:		'images/ui-fontpicker.png',

			buttonImageOnly:	false,

			buttonText:			null,		// Text on the button and/or title of button image.

			closeOnEscape:		true,		// Close the dialog when the escape key is pressed.

			closeOnOutside:		true,		// Close the dialog when clicking outside the dialog (not for inline)

			duration:			'fast',

			regional:			'',

			layout: {

				family:		[0, 0, 1, 1],	// Left, Top, Width, Height (in table cells).

				style:		[1, 0, 1, 1],

				size:       [2, 0, 1, 1],

				settings:	[0, 1, 3, 1],

				preview:	[0, 2, 3, 1]

			},

			modal:				false,		// Modal dialog?

			parts:				'',			// leave empty for automatic selection

			showAnim:			'fadeIn',

			showNoneButton:		false,

			showOn:				'focus',	// 'focus', 'button', 'both'

			showOptions:		{},

			title:				null,

			previewText:		null,

			families:			[	{	name: 'Arial',

										faces: ['Arial', 'Helvetica', 'sans-serif']

									},

									{	name: 'Arial Black',

										faces: ['Arial Black', 'Gadget', 'sans-serif']

									},

									{	name: 'Comic Sans MS',

										faces: ['Comic Sans MS', 'cursive', 'sans-serif']

									},

									{	name: 'Courier New',

										faces: ['Courier New', 'Courier', 'monospace']

									},

									{	name: 'Georgia',

										faces: ['Georgia', 'serif']

									},

									{	name: 'Impact',

										faces: ['Impact', 'Charcoal', 'sans-serif']

									},

									{	name: 'Lucida Console',

										faces: ['Lucida Console', 'Monaco', 'monospace']

									},

									{	name: 'Lucida Sans Unicode',

										faces: ['Lucida Sans Unicode', 'Lucida Grande', 'sans-serif']

									},

									{	name: 'Palatino Linotype',

										faces: ['Palatino Linotype', 'Book Antiqua', 'Palatino', 'serif']

									},

									{	name: 'Tahoma',

										faces: ['Tahoma', 'Geneva', 'sans-serif']

									},

									{	name: 'Times New Roman',

										faces: ['Times New Roman', 'Times', 'serif']

									},

									{	name: 'Trebuchet MS',

										faces: ['Trebuchet MS', 'Helvetica', 'sans-serif']

									},

									{	name: 'Verdana',

										faces: ['Verdana', 'Geneva', 'sans-serif']

									}

								],

			styles:				[	{	name:	'Normal',

										weight:	'normal',

										style:	'normal'

									},

									{	name:	'Bold',

										weight:	'bold',

										style:	'normal'

									},

									{	name:	'Italic',

										weight:	'normal',

										style:	'italic'

									},

									{	name:	'Bold italic',

										weight:	'bold',

										style:	'italic'

									}

								],

			sizes:				[	6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 21, 24, 36, 48, 60, 72 ],

			settings:			{	'Character': [

										'letter-spacing',

										'small-caps',

										'underline',

										'overline',

										'line-through'

									],

									'Paragraph': [

										'line-height'

									]

								},

			nullable:			true,



			close:              null,

			select:             null

		},



		_create: function () {

			var that = this;



			++_fontpicker_index;



			that.widgetEventPrefix = 'font';



			that.opened		= false;

			that.generated	= false;

			that.inline		= false;

			that.changed	= false;



			that.dialog		= null;

			that.button		= null;

			that.image		= null;

			that.overlay	= null;



			if (this.element[0].nodeName.toLowerCase() === 'input') {

				that._setFont(that.element.val());



				that.currentFont	= $.extend({}, that.font);	//@todo right place?



				this._callback('init');



				$('body').append(_container_popup);

				that.dialog = $('.ui-fontpicker:last');



				// Click outside/inside

				$(document).mousedown(function (event) {

					if (!that.opened || event.target === that.element[0]) {

						return;

					}



					// Check if clicked on any part of dialog

					if ($(event.target).closest('.ui-fontpicker').length > 0) {

						that.element.blur();	// inside window!

						return;

					}



					// Check if clicked on button

					var p,

						parents = $(event.target).parents();

					for (p in parents) {

						if (that.button !== null && parents[p] === that.button[0]) {

							return;

						}

					}



					// no closeOnOutside

					if (!that.options.closeOnOutside) {

						return;

					}



					that.close();

				});



				$(document).keydown(function (event) {

					if (event.keyCode == 27 && that.opened && that.options.closeOnEscape) {

						that.close();

					}

				});



				if (that.options.showOn === 'focus' || that.options.showOn === 'both') {

					that.element.focus(function () {

						that.open();

					});

				}

				if (that.options.showOn === 'button' || that.options.showOn === 'both') {

					if (that.options.buttonImage !== '') {

						var text = that.options.buttonText ? that.options.buttonText : that._getRegional('button');



						that.image = $('<img/>').attr({

							'src':		that.options.buttonImage,

							'alt':		text,

							'title':	text

						});

					}



					if (that.options.buttonImageOnly && that.image) {

						that.button = that.image;

					} else {

						that.button = $('<button type="button"></button>').html(that.image || that.options.buttonText).button();

						that.image = that.image ? $('img', that.button).first() : null;

					}

					that.button.insertAfter(that.element).click(function () {

						that[that.opened ? 'close' : 'open']();

					});

				}



				if (that.options.autoOpen) {

					that.open();

				}



				that.element.keydown(function (event) {

					if (event.keyCode === 9) {

						that.close();

					}

				}).keyup(function (event) {

					//@todo Font parsing from text input

//					var rgb = _parseHex(that.element.val());

//					if (rgb) {

//						that.color = (rgb === false ? new Font() : new Font(rgb[0], rgb[1], rgb[2]));

//						that._change();

//					}

				});

			} else {

				that.inline = true;



				$(this.element).html(_container_inline);

				that.dialog = $('.ui-fontpicker', this.element);



				that._generate();



				that.opened = true;

			}



			return this;

		},



		destroy: function() {

			this.element.unbind();



			if (this.image !== null) {

				this.image.remove();

			}



			if (this.button !== null) {

				this.button.remove();

			}



			if (this.dialog !== null) {

				this.dialog.remove();

			}



			if (this.overlay) {

				this.overlay.destroy();

			}

		},



		_setOption: function(key, value){

			var that = this;



			switch (key) {

			case "disabled":

				if (value) {

					that.dialog.addClass('ui-fontpicker-disabled');

				} else {

					that.dialog.removeClass('ui-fontpicker-disabled');

				}

				break;

			}



			$.Widget.prototype._setOption.apply(that, arguments);

		},



		/**

		 * If an alternate field is specified, set it according to the current font.

		 */

		_setAltField: function () {

			if (this.options.altOnChange && this.options.altField) {

				$(this.options.altField).attr('style', this.font.set? this.font.toCSS() : '');

			}

		},



		_setFont: function(style) {

			var that = this;



            that.font			= new Font();



			var normal_tests = {

				'text-decoration':	'none'

			,	'letter-spacing':	'normal'

			,	'font-weight':		'normal'

			,	'font-style':		'normal'

			,	'line-height':		'normal'

			,	'font-variant':		'normal'

			};



			var inherit_tests = {

				'font-family':		[ 'sans-serif', 'serif' ]

			,	'font-size':		[ '10px', '20px' ]

			,	'color':			[ 'black', 'white' ]

			};



			//@todo this.font = _parseFont(text); //@todo parseFont from text (css-like?) return Font object

			var shell = $('<div>').appendTo('body');

			var item = $('<div style="'+style+'"/>').appendTo(shell);



			var results = {};



			$.each(normal_tests, function(tag, value) {

				shell.css(tag, value);

				var actual = item.css(tag);

				if (actual != value) {

					that.font.css[tag] = actual;

				}

			});



			$.each(inherit_tests, function(tag, values) {

				shell.css(tag, values[0]);

				var actual = item.css(tag);

				shell.css(tag, values[1]);

				if (actual == item.css(tag)) {

					if (tag == 'font-family') {

						var faces = actual.split(/,/);

						actual = null;

						$.each(faces, function(index, face) {

							face = $.trim(face.replace(/^(['"])(.*)\1$/, '$2'));

							$.each(that.options.families, function(index, family) {

								if (face == family.name) {

									actual = family.faces;

									return false;

								}

							});

							return actual === null;

						});

					}



					that.font.css[tag] = actual;

				}

			});



			shell.remove();

		},



		setFont: function(text) {

			this._setFont(text);

			this._change(this.font.set);

		},



		_generate: function () {

			var that = this,

				index,

				part,

				parts_list;



			// Set font based on element?

			//that._setFont(that.inline? that.options.font : that.element.val());

			//@todo Re-parse font from textbox/options?



			// Determine the parts to include in this fontpicker

			if (typeof that.options.parts === 'string') {

				if (that.options.parts in _parts_lists) {

					parts_list = _parts_lists[that.options.parts];

				} else {

					// automatic

					parts_list = _parts_lists[that.inline ? 'inline' : 'popup'];

				}

			} else {

				parts_list = that.options.parts;

			}



			// Add any parts to the internal parts list

			that.parts = {};

			$.each(parts_list, function(index, part) {

				if (_parts[part]) {

					that.parts[part] = new _parts[part](that);

				}

			});



			if (!that.generated) {

				var layout_parts = [];



				$.each(that.options.layout, function(part, pos) {

					if (that.parts[part]) {

						layout_parts.push({

							'part': part,

							'pos':  pos

						});

					}

				});



				$(_layoutTable(layout_parts, function(cell, x, y) {

					var classes = ['ui-fontpicker-' + cell.part + '-container'];



					if (x > 0) {

						classes.push('ui-fontpicker-padding-left');

					}



					if (y > 0) {

						classes.push('ui-fontpicker-padding-top');

					}



					return '<td class="' + classes.join(' ') + '"'

						+ (cell.pos[2] > 1 ? ' colspan="' + cell.pos[2] + '"' : '')

						+ (cell.pos[3] > 1 ? ' rowspan="' + cell.pos[3] + '"' : '')

						+ ' valign="top"></td>';

				})).appendTo(that.dialog).addClass('ui-dialog-content ui-widget-content');



				that._initAllParts();

				that._updateAllParts();

				that.generated = true;

			}

		},



		_effectGeneric: function (show, slide, fade, callback) {

			var that = this;



			if ($.effects && $.effects[that.options.showAnim]) {

				that.dialog[show](that.options.showAnim, that.options.showOptions, that.options.duration, callback);

			} else {

				that.dialog[(that.options.showAnim === 'slideDown' ?

								slide

							:	(that.options.showAnim === 'fadeIn' ?

									fade

								:	show))]((that.options.showAnim ? that.options.duration : null), callback);

				if (!that.options.showAnim || !that.options.duration) {

					callback();

				}

			}

		},



		_effectShow: function (callback) {

			this._effectGeneric('show', 'slideDown', 'fadeIn', callback);

		},



		_effectHide: function (callback) {

			this._effectGeneric('hide', 'slideUp', 'fadeOut', callback);

		},



		open: function () {

			var that = this;



			if (!that.opened) {

				that._generate();



				var offset = that.element.offset(),

					x = offset.left,

					y = offset.top + that.element.outerHeight();

				x -= Math.max(0, (x + that.dialog.width()) - $(window).width() + 20);

				y -= Math.max(0, (y + that.dialog.height()) - $(window).height() + 20);

				that.dialog.css({'left': x, 'top': y});



				// Automatically find highest z-index.

				var zIndex = 0;

				$(that.element[0]).parents().each(function() {

					var z = $(this).css('z-index');

					if ((typeof(z) === 'number' || typeof(z) === 'string') && z !== '' && !isNaN(z)) {

						zIndex = z;

						return false;

					}

				});



				//@todo zIndexOffset option, to raise above other elements?

				that.dialog.css('z-index', zIndex += 2);



				that.overlay = that.options.modal ? new $.ui.dialog.overlay(that) : null;



				that._effectShow();

				that.opened = true;



				// Without waiting for domready the width of the map is 0 and we

				// wind up with the cursor stuck in the upper left corner

				$(function() {

					that._repaintAllParts();

				});

			}

		},



		close: function () {

			var that = this;



			that.currentFont	= that.font.copy();

			that.changed = false;



			// tear down the interface

			that._effectHide(function () {

				that.dialog.empty();

				that.generated	= false;



				that.opened		= false;

				that._callback('close');

			});



			if (that.overlay) {

				that.overlay.destroy();

			}

		},



		_callback: function (callback) {

			var that = this;



			if (that.font.set) {

				that._trigger(callback, null, {

					style:	that.font.toCSS(),

					css:	that.font.css

				});

			} else {

				that._trigger(callback, null, {

					style:	'',

					css:	{}

				});

			}

		},



		_initAllParts: function () {

			$.each(this.parts, function (index, part) {

				if (part.init) {

					part.init();

				}

			});

		},



		_updateAllParts: function () {

			$.each(this.parts, function (index, part) {

				if (part.update) {

					part.update();

				}

			});

		},



		_repaintAllParts: function () {

			$.each(this.parts, function (index, part) {

				if (part.repaint) {

					part.repaint();

				}

			});

		},



		_change: function (set /* = true */) {

			this.font.set = (set !== false);



			this.changed = true;



			// update input element content

			if (!this.inline) {

				if (!this.font.set) {

					this.element.val('');

				} else {

					var css = this.font.toCSS();

					if (this.element.val() != css) {

						this.element.val(css);

					}

				}



				this._setAltField();

			}



			if (this.opened) {

				this._repaintAllParts();

			}



			// callback

			this._callback('select');

		},



		// This will be deprecated by jQueryUI 1.9 widget

		_hoverable: function (e) {

			e.hover(function () {

				e.addClass("ui-state-hover");

			}, function () {

				e.removeClass("ui-state-hover");

			});

		},



		// This will be deprecated by jQueryUI 1.9 widget

		_focusable: function (e) {

			e.focus(function () {

				e.addClass("ui-state-focus");

			}).blur(function () {

				e.removeClass("ui-state-focus");

			});

		},



		_getRegional: function(name) {

			return $.fontpicker.regional[this.options.regional][name] !== undefined ?

				$.fontpicker.regional[this.options.regional][name] : $.fontpicker.regional[''][name];

        }

	});



}