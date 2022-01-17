function INNER ($, INNERCONTEXT) {
	'use strict';

	$.log('Script initializing.');

	INNERCONTEXT.UTILITY.extend(INNERCONTEXT,
		{ DATA      : {}
		, DOM       : { body       : $(document.body)
		              , head       : $(document.head)
		              , xhrComlink : $('#xhrComlink')
                      }
		, TEMPLATES : { MENUS : {} }
		}
	);

	INNERCONTEXT.UTILITY.extend(INNERCONTEXT.UTILITY, {
		addClass : function addClass (e) {
			$.single( this ).addClass(e.data['class']);
		},

		addCommas : function addCommas (numberString) {
			// Converts a number into a comma-separated string.
			$.log('Inserting commas.');

			var x  = ('' + numberString).split('.')
			  , x1 = x[0]
			  , x2 = x.length > 1 ? '.' + x[1] : ''
			  , separatorRegexp = /(\d+)(\d{3})/
			  ;

			while (separatorRegexp.test(x1)) {
				x1 = x1.replace(separatorRegexp, '$1' + ',' + '$2');
			}
			return x1 + x2;
		},

		antiSquish: function antiSquish (init) {
			/* http://musicbrainz.org/artist/{mbid} does not set a width for the title or checkbox columns.
			   This prevents those columns getting squished when the table-layout is set to fixed layout. */
			$.log('AntiSquishing...', 1);

			var rules = [];

			void 0 !== init && $('.CAAantiSquish').remove();
			$('th.pos').remove();
			for (var $th = $(document.getElementsByTagName('th')), i = 0, len = $th.length; i < len; i++) {
				rules.push(
					[ 'thead > tr > th:nth-child(', (i + 1), ')'
					, '{ width:', ($th.quickWidth(i) + 10), 'px!important;}'
					].join('')
				);
			}
			$.addRule(rules.join(''), '', { 'class': 'CAAantiSquish' });
		},

		adjustContainerHeights : function adjustContainerHeights () {
			var containerHeight = $('#Main‿div‿imageContainer').height() - $('#Main‿div‿previewContainer').height() - 42 + 'px';
			$('#Main‿div‿imageHolder').css({ 'height'     : containerHeight
			                                , 'max-height' : containerHeight
			                                });
		},

		assemble : function assemble (constructor, components) {
			var eles = []
			  , children
			  ;

			if (void 0 === components) {
				components = constructor;
				constructor = 'GenericElement';
			}

			components.length > 0 && components.forEach(function (component) {
				if (component.constructor === Array && eles.length > 0) {
					eles[eles.length-1].appendAll( INNERCONTEXT.UTILITY.assemble(constructor, component) );
				} else if (component.constructor === $) {
					eles.push( component );
				} else {
					eles.push( INNERCONTEXT.UI[constructor](component).make() );
				}
			});
			return eles;
		},

		changeImageSize : function changeImageSize (e) {
			var $shrink    = INNERCONTEXT.DOM['Main‿div‿imageShrink']
			  , $magnify   = INNERCONTEXT.DOM['Main‿div‿imageMagnify']
			  , data       = INNERCONTEXT.DATA
			  ;

			data.sizeStatus += e.data.change;

			switch (data.sizeStatus) {
				case 0: data.sizeStatus = 1;
						/* falls through */
				case 1:
						$shrink.vis(0);
						$magnify.vis(1);
						$.imagesTiny();
						break;
				case 2:
						$shrink.add($magnify)
							   .vis(1);
						$.imagesSmall();
						break;
				case 3:
						$shrink.add($magnify)
							   .vis(1);
						$.imagesMedium();
						break;
				case 5: data.sizeStatus = 4;
						/* falls through */
				case 4:
						$shrink.vis(1);
						$magnify.vis(0);
						$.imagesLarge();
						break;
			}
		},

		checkScroll : function checkScroll ($caaDiv) {
			// This function ensures that the horizontal scrollbar on CAA rows only shows when it needs to.
			$.log('Adjusting negative right margin.', 1);

			void 0 === $caaDiv.data('width') && $caaDiv.data('width', $caaDiv.quickWidth(0));
			var $parents   = $caaDiv.parents()
			  , $dropboxes = $caaDiv.find('.CAAdropbox')
			  , divWidth   = $dropboxes.length * $dropboxes.filter(':first').outerWidth(true)
			  ;

			$caaDiv.css('margin-right', Math.min(0, $caaDiv.data('width') - divWidth - 115) + 'px');
			$parents.filter('td.imageRow').css('width', $parents.filter('.tbl:first').outerWidth(true) + 'px');
		},

		clearImageStore : function clearImageStore () {
			INNERCONTEXT.UTILITY.setLSValue('imageCache', '[]');
			INNERCONTEXT.DOM['Options‿input‿button‿clear_storage'].prop('disabled', true);
			INNERCONTEXT.DATA.cachedImages = [];
		},

		closeDialogGeneric : function closeDialogGeneric (e) {
			$.single( this ).parent()
			              .find('.dropBoxImage') // Any image in the drop box
			              .appendTo($('#Main‿div‿imageContainer'))
			              .addClass('localImage')
			              .removeClass('dropBoxImage');
			INNERCONTEXT.UTILITY.removeWrappedElement(e);
		},

		closeDialogImageEditor : function closeDialogImageEditor (e) {
			$('#CAAimageEditor').animate({ height  : 'toggle'
			                             , opacity : 'toggle'
			                             }, 'slow');
			$('#CAAoverlay').fadeOut('fast');
			$('#CAAimageEditor, #CAAoverlay').remove();
			INNERCONTEXT.UTILITY.closeDialogGeneric(e);
		},

		getEditColor : function getEditColor ($ele) {
			// Checks that an editbox has both an image and a cover type.  Returns the associated color for the current editbox' status.
			$.log('Testing edit status to determine background color for dropbox.');

			var state = ($ele.find(':selected').length && $ele.find('img').hasProp('src'));
			return INNERCONTEXT.UTILITY.getColor(state ? 'COMPLETE' : 'INCOMPLETE');
		},

		getLSValue : function getLSValue (key, unprefixed) {
			var storedValue = INNERCONTEXT.DATA[key];

			if (!storedValue) {
				var lsKey = !unprefixed ? [INNERCONTEXT.CONSTANTS.NAMESPACE, '_', key].join('') : key;
				storedValue = INNERCONTEXT.DATA[key] = localStorage.getItem(lsKey);
			}

			return storedValue;
		},

		getRemoteFile : function getRemoteFile (uri, imageType) {
			$.make('pre', { 'class'     : 'image' })
			 .data({ 'uri'  : uri
			       , 'type' : imageType || 'jpg'
			       })
			 .text(uri)
			 .appendTo('#xhrComlink')
			 .trigger('click');
			// At this point, the event handler for #xhrComlink, in the other javascript scope, takes over.
		},

		handleDroppedResources : function handleDroppedResources (e) {
			var $util        = INNERCONTEXT.UTILITY
			  , dataTransfer = e.dataTransfer
			  , getData      = dataTransfer.getData
			  , getText      = getData( 'Text' )
			  ;

			$util.removeClass( e, 'over' );
			$util.preventDefault( e );
			e = e.originalEvent || e;

			var dropped = { file_list : dataTransfer.files
			              , base      : $( getText ).find( 'base' ).attr( 'href' ) || ''
			              , text      : getText.match( INNERCONTEXT.CONSTANTS.REGEXP.uri ) || ''
			              , uri       : getData( 'text/uri-list' )
			              , e         : e
			              };

			$.log(dropped);
			$util.handleURIs( dropped );
		},

		handleURIs : function handleURIs (uris) {
			var $domIC = INNERCONTEXT.DOM['Main‿div‿imageContainer'];

			var walkURIArray = function walkURIArray (uri) {
				$domIC.trigger({ type: 'haveRemote', uri: uri }, [INNERCONTEXT.UTILITY.supportedImageType(uri)]);
			};

			switch (!0) {
				case (!!uris.file_list && !!uris.file_list.length): // local file(s)
					$domIC.trigger({ type: 'haveLocalFileList' , list: uris.e });
					break;
				case (!!uris.uri && !!uris.uri.length): // remote image drag/dropped
					uris.uri.forEach(walkURIArray);
					break;
				case (!!uris.text && !!uris.text.length): // plaintext list of urls drag/dropped
					uris.text.forEach(walkURIArray);
					break;
				default:
					$.log('This is not something which can provide a usable image.');
			}
		},

		inherit : function inherit (child, parent) {
		   child.prototype = parent.prototype;
		},

		 loadLocalFile : function loadLocalFile (event) {
			var file, name, type
			  , e = event.data.e
			  , debugMsg = ''
		      , files = (e.files || e.dataTransfer.files || e.file_list)
		      , len = files.length
		      , i = len
		      , $util = INNERCONTEXT.UTILITY
		      ;
			while (0 < i--) {
				file = files[i];
				name = file.name;
				type = $util.supportedImageType(name);
				INNERCONTEXT.CONSTANTS.DEBUGMODE && (debugMsg = ['loadLocalFile: for file "', name, '", file ', (i+1), ' of ', len].join(''));
				if (!type) {
					$.log(debugMsg + ', unusable file type detected');
					continue;
				}
				$.log([debugMsg, ', usable file type "', type, '" detected'].join(''));
//				"jpg" === type ? addImageToDropbox(file, "local")
//							   : convertImage(file, type, name);
			}
		},

		loadRowInfo : function loadRowInfo (e) {
			var $row         = $.single(this).parents('td.imageRow')
			  , ui           = INNERCONTEXT.UI
			  , $loadBtn     = $('.caaLoad:first')
			  , $tblParent   = $loadBtn.parents('table:first')
			  , $widthEle    = !$tblParent.hasClass('tbl') ? $tblParent.parents('td:first') : $loadBtn.parents('td:first')
			  , dropboxCount = Math.max(3, ($widthEle.quickWidth(0) / 132 << 0) - 5)
			  , $self        = $(this)
			  ;

			$row.trigger('loading');

			while (dropboxCount--) {
				$self.after(ui.$makeDropbox());
			}

			$.ajax(
				{ cache   : false
				, context : this
				, url     : 'http://coverartarchive.org/release/' + $self.data('entity')
				, error   : function handler(jqXHR, textStatus, errorThrown, data) {
					            // Reference http://tickets.musicbrainz.org/browse/CAA-24
					            $.log('Ignore the XMLHttpRequest error.  CAA returned XML stating that CAA has no images for this release.');
					            $row.trigger('loaded');
					        }
				, success : function caa_response_mediator(response, textStatus, jqXHR) {
					            return INNERCONTEXT.UTILITY.processCAAResponse(response, textStatus, jqXHR, { $row: $row });
					        }
				}
			);
		},

		makeEleName : function makeEleName (prefix, eleType, disambig, type) {
			var name = [prefix, eleType];
			if (void 0 !== type) {
				name.push(type);
			}
			name.push(disambig);
			return name.join('‿');
		},

		preventDefault : function preventDefault (e) {
			e.preventDefault();
		},

		removeClass : function removeClass (e, classToRemove) {
			$.single(e.target).removeClass(e.data['class'] || classToRemove);
		},

		setLSValue : function setLSValue (e) {
			var value = ''
			  , $self = $.single( this )
			  ;

			switch (e.data.type) {
				case 'text'     : value = $self.val(); break;
				case 'checkbox' : value = $self.is(':checked'); break;
				case 'select'   : value = $self.find(':selected').val();
			}
			localStorage.setItem([INNERCONTEXT.CONSTANTS.NAMESPACE, '_', e.data.key].join(), value);
			INNERCONTEXT.DATA[e.data.key] = value;
		},

		redTintImage : function redTintImage ($image) {
			$.log('Tinting image');

			var $tint = $.make('figure', { 'class': 'tintWrapper' }).css({ height : ($image.quickHeight(0) + 6) + 'px'
			                                                             , width  : ($image.quickWidth(0) + 6) + 'px'
			                                                             });
			$image.wrap($tint)
				  .data('oldtitle', $image.prop('title'))
				  .prop('title', $.l('Remove image'))
				  .addClass('tintImage');
		},

		removeWrappedElement : function removeWrappedItem (e) {
			$(e.target).parent().remove();
		},

		supportedImageType : function supportedImageType (uri) {
			var matches = INNERCONTEXT.CONSTANTS.REGEXP.image.exec(uri);
			if (matches === null) {
				return false;
			}
			var matched = matches[0];
			$.log('Testing file with extension "' + matched + '" to see if it is a supported extension.');
			switch (matched) {
				// JPEG
				case '.jpg'   : // falls through
				case '.jpeg'  : // falls through
				case '.jpe'   : // falls through
				case '.jfif'  : // falls through
				case '.jif'   : // falls through
				// Progressive JPEG
				case '.pjp'   : // falls through
				case '.pjpeg' : return 'jpg';
				// Portable Network Graphics
				case '.png'   : return 'png';
				// GIF
				case '.gif'   : return 'gif';
				// Bitmap
				case '.bmp'   : return 'bmp';
				// Google WebP
				case '.webp'  : return 'webp';
				// Icon
				case '.ico'   : return 'ico';
				// JPEG Network Graphics
				case '.jng'   : return 'jng';
				// JPEG2000
				case '.j2c'   : // falls through
				case '.j2k'   : // falls through
				case '.jp2'   : // falls through
				case '.jpc'   : // falls through
				case '.jpt'   : return 'jp2';
				// ZSoft IBM PC Paintbrush
				case '.pcx'   : return 'pcx';
				// Lotus Picture
				case '.pic'   : return 'pic';
				// Macintosh
				case '.pict'   : return 'pict';
				// MacPaint file format
				case '.pnt'   : return 'pnt';
				// Targa file format
				case '.tga'   : return 'tga';
				// Aldus Tagged Image File Format
				case '.tif'   : // falls through
				case '.tiff'  : return 'tiff';
				default       : return false;
			}
		},

        toggleRedTint : function toggleRedTint (e) {
			if (INNERCONTEXT.DOM['Options‿input‿checkbox‿remove_images'].prop('checked')) {
				var $target = $(e.target)
				  , type    = e.type
				  ;

				if (type === 'mouseenter') {
					INNERCONTEXT.UTILITY.redTintImage($target);
				} else if (type === 'mouseleave') {
					INNERCONTEXT.UTILITY.unTintImage($target);
				}
			}
		},

		unTintImage : function unTintImage ($image) {
			$.log('Untinting image');

			if ($image.parents('.tintWrapper:first').length) {
				$image.removeClass('tintImage')
				      .prop('title', $image.data('oldtitle'))
				      .unwrap();
			}
		}

	});

	INNERCONTEXT.WIDGETS =
		(function defineINNERCONTEXT_WIDGETS () {
			var getVal = INNERCONTEXT.UTILITY.getLSValue;
			return {
				IMAGES: { about   : getVal('infoIcon', 1)
					    , zoomIn  : getVal('magnifyingGlassBase', 1) + getVal('magnifyingGlassMinus', 1)
					    , zoomOut : getVal('magnifyingGlassBase', 1) + getVal('magnifyingGlassPlus', 1)
					    , options : getVal('iconSettings', 1)
					    }
			};
		}());

	INNERCONTEXT.UI = {
		addNewImageDropBox : function addNewImageDropBox ( $div ) {
			$.log('Add new CAA image space button triggered.');

			$div = $div.append ? $div : $.single( $div.target ).nextAll( '.caaDiv' );
			$div.append( INNERCONTEXT.UI.$makeDropbox() );
			INNERCONTEXT.UTILITY.checkScroll( $div );
		},

		addImageRow : function addImageRow (event) {
			var $releaseAnchor = $.single( this );

			if ( $releaseAnchor[0].nodeName === 'TABLE' ) { // Detect bitmap's script's expandos.

				/* DOMNodeInserted is triggered for each new element added to the table by bitmap's script.
				   This looks for the editing tr he adds at the end, since that is the last DOMNodeInserted which is
				   triggered when a RG is expanded.  He does not add that row for expanded releases, so this only
				   kicks in when a RG is expanded, and only when that entire expando has been inserted. */

				var $editRow = $releaseAnchor.find('a[href^="/release/add?release-group"]').parent();

				if ( $editRow.length ) {
					$editRow.remove();
					$releaseAnchor.find( 'a' )
								  .filter( '[href^="/release/"]' )
								  .each( INNERCONTEXT.UI.addImageRow );
				}
				return;
			}

			var $releaseRow = $releaseAnchor.parents('tr:first');
			INNERCONTEXT.UTILITY.assemble(
				INNERCONTEXT.TEMPLATES.image_row(
					{ $row : $releaseRow
					, cols: $releaseRow[0].getElementsByTagName('td').length
					, MBID: INNERCONTEXT.CONSTANTS.REGEXP.mbid.exec($releaseAnchor.attr('href'))
					}
				)
			)[0].insertAfter($releaseRow);
		},

		convertEmptyDropbox : function convertEmptyDropbox ($dropBox, comment) {
			$dropBox.detach(function convertEmptyDropbox_internal () {
				$.single(this).removeClass('newCAAimage')
				              .find('input')
				              .replaceWith($.make('div').text(comment))
				              .end()
				              .find('br, .closeButton')
				              .remove()
				              .end()
				              .find('select')
				              .prop('disabled', true);
			});
		},

		lowsrc : function lowsrc ($dropBox, imageURI) {

			/* This code does the same thing as the lowsrc attribute used to do.  This should
			   be easy, but lowsrc no longer exists in HTML5, and Chrome has dropped support for it.

			   reference: http://www.ssdtutorials.com/tutorials/title/html5-obsolete-features.html */

			var $img = $dropBox.find( 'img' );
			$img[0].src = INNERCONTEXT.CONSTANTS.THROBBER;
			$img.css( 'padding-top', '20px' );
			var realImg = new Image();
			realImg.src = imageURI;
			realImg.onload = function lowsrc_onload () {
				$img.data( 'resolution', realImg.naturalWidth + ' x ' + realImg.naturalHeight );
				$.ajax(
					{ url: realImg.src
					, success: function lowsrc_onload_success ( request ) {
						$img.data( 'size', INNERCONTEXT.UTILITY.addCommas( request.length ))
						    .prop( 'src', realImg.src )
						    .css( 'padding-top', '0px' );
					}
				});
			};
		},

		$makeAddDropboxButton : function $makeAddDropboxButton () {
			$.log('Creating add dropbox button.', 1);

			var widgets = INNERCONTEXT.WIDGETS;

			if (void 0 === widgets.$addDropboxButton) {
				widgets.$addDropboxButton = $.make('input', { 'class' : 'caaAdd'
				                                            , title   : $.l('Add image one release')
				                                            , type    : 'button'
				                                            , value   : '+'
				                                            });
			}
			return widgets.$addDropboxButton.quickClone(false);
		},

		$makeCloseButton : function $makeCloseButton () {
			/* Creates a generic close button.  */
			return $.make('header', { 'class': 'closeButton' }).text('x');
		},

		$makeCoverTypeSelect : function $makeCoverTypeSelect () {
			$.log('Creating CAA type select.');

			var widgets = INNERCONTEXT.WIDGETS;

			if (void 0 === widgets.$coverTypeSelect) {
				var types = INNERCONTEXT.CONSTANTS.COVERTYPES
				  , $typeList = $.make('select', { 'class'  : 'caaSelect'
				                                 , multiple : 'multiple'
				                                 , size     : types.length
				                                 })
				  ;

				var $makeCoverTypeOption = function $makeCoverTypeOption (type, i) {
					return $.make('option', { value : i+1 }).text($.l('coverType:' + type));
				};

				widgets.$coverTypeSelect = $typeList.appendAll(types.map($makeCoverTypeOption));
			}
			return widgets.$coverTypeSelect.quickClone(true);
		},

		$makeDropbox : function $makeDropbox () {
			$.log('Creating dropbox.');

			var widgets = INNERCONTEXT.WIDGETS;

			if (void 0 === widgets.$dropBox) {
				widgets.$dropBox = INNERCONTEXT.UTILITY.assemble(INNERCONTEXT.TEMPLATES.dropbox)[0];
			}
			return widgets.$dropBox.quickClone(true);
		},

		$makeIcon : function $makeIcon (which) {
			return [ $(INNERCONTEXT.WIDGETS.IMAGES[which]) ];
		},

		$makeLoadDataButton : function $makeLoadDataButton () {
			$.log('Creating add dropbox button.');

			var widgets = INNERCONTEXT.WIDGETS;

			if (void 0 === widgets.$loadDataButton) {
				widgets.$loadDataButton = $.make('input', { 'class' : 'caaLoad'
				                                          , title : $.l('Load text one release')
				                                          , type  : 'button'
				                                          , value : $.l('Load CAA images')
				                                          });
			}
			return widgets.$loadDataButton.quickClone(false);
		},

		$makeColorsList : function $makeColorsList () {
			var colors		= Object.keys(INNERCONTEXT.CONSTANTS.COLORS)
			  , colorsMap	 = []
			  , $colorOptions = []
			  ;

			var prepColorList = function prep_color_list_for_sorting (color, i) {
				colorsMap.push({ index: i
							   , value: $.l(color).toLowerCase()
							   });
			};

			var sortColors = function sort_color_list (a, b) {
				return a.value > b.value ? 1 : -1;
			};

			var makeColorList = function make_colors_list (map) {
				var colorItem   = colors[map.index]
				  , color	   = INNERCONTEXT.CONSTANTS.COLORS[colorItem]
				  , lsItemName  = 'colors_' + colorItem
				  , $thisOption = $.make('option', { 'class' : 'colorOption'
												   , value   : colorItem
												   }).data('default', color)
													 .text($.l(colorItem));
				if (null === INNERCONTEXT.UTILITY.getLSValue(lsItemName)) {
					$.log(['Initializing localStorage for ', lsItemName, ' to ', color].join(''));
					INNERCONTEXT.UTILITY.setLSValue(lsItemName, color);
				}
				$colorOptions.push($thisOption);
			};

			colors.forEach(prepColorList);
			colorsMap.sort(sortColors).map(makeColorList);
			return $colorOptions;
		},

		$makeCreditsList : function makeCreditsList () {
			var $who		= $.make('div', { 'class': 'CAAcreditWho' })
			  , $what	   = $.make('span', { 'class': 'CAAcreditWhat' })
			  , $pre		= $.make('span').html(' [ ')
			  , $post	   = $.make('span').html(' ]')
			  , $thisWho
			  , $thisWhat
			  , $thisMB
			  , credits
			  ;

			var sortCredits = function sort_credits_list (a, b) {
				return a.what > b.what ? 1 : -1;
			};

			var makeRoleListPerCredit = function makeRoleListPerCredit (credit) {
//TODO: This function is UGLY!
				$thisWho  = $who.quickClone().text(credit.name);
				$thisWhat = $what.quickClone().text(credit.what);
				void 0 !== credit.urlN && ($thisWho = $.make('a', { href : 'http://' + credit.urlN }).append($thisWho));
				void 0 !== credit.urlW && ($thisWhat = $.make('a', { href : 'http://' + credit.urlW }).append($thisWhat));
				var $dd = $.make('dd').append($thisWho);
				$thisWhat = $.make('dt').append($thisWhat);
				if (void 0 !== credit.mb) {
					$thisMB = $.make('span', { 'class': 'caaMBCredit' })
					           .appendAll([ $pre.quickClone()
					                      , $.make('a', { href : 'http://musicbrainz.org/user/' + credit.mb })
					                         .text(credit.name.match(/\w+\s/)[0] + '@ MusicBrainz')
					                      , $post.quickClone()
					                      ])
					           .appendTo($dd);
					void 0 !== credit.what ? credits.push($thisWhat, $dd) : credits.push($dd);
				} else if (void 0 !== credit.what) {
					credits.push($thisWhat, $dd);
				} else {
					credits.push($dd);
				}
			};

			var makeCreditListPerRole = function makeCreditListPerRole (role) {
				credits = [];
				INNERCONTEXT.CONSTANTS.CREDITS[role].sort(sortCredits)
													.forEach(makeRoleListPerCredit);
				return $.make('h5').text($.l(role))
								   .after($.make('dl').appendAll(credits));
			};

			return Object.keys(INNERCONTEXT.CONSTANTS.CREDITS)
						 .map(makeCreditListPerRole);
		},

		$makeLanguagesList : function makeLanguagesList () {
			var languages = [];

			Object.keys(INNERCONTEXT.CONSTANTS.TEXT).forEach(function make_languages_list (key) {
				languages.push([key, INNERCONTEXT.CONSTANTS.TEXT[key].languageName]);
			});
			languages.sort(function sort_languages_list (a, b) {
				return a[1] === b[1] ? 0				 // a[1] == b[1] ->  0
									 : a[1] > b[1] ? 1   // a[1] >  b[1] ->  1
												   : -1; // a[1] <  b[1] -> -1
			});
			var userLang = INNERCONTEXT.UTILITY.getLSValue('language') || 'en';
			var makeLanguageOptions = function make_language_options (language) {
										  return $.make('option', { selected : (language[0] === userLang)
																 , value	: language[0]
																 }).text(language[1]);
									  };
			return languages.map(makeLanguageOptions);
		},

		showLoading : function showLoading (e) {
		    var $row = $.single(e.target);

			$row.find('.loadingDiv').show();
			$row.find('.caaLoad').hide();
			$row.find('.caaDiv').slideUp();
		},

		showImageRow : function showImageRow (e) {
		    var $row = $.single(e.target);

			$row.find('.loadingDiv, .caaAdd').toggle();
			$row.find('.caaDiv').slideDown('slow');
		}
	};

	/** @constructor */
	INNERCONTEXT.UI.GenericElement = function GenericElement () {
		this.args = arguments[0];

		if (!(this instanceof GenericElement)) {
			return new GenericElement(arguments[0]);
		}

		for (var args = this.args, list = ['css', 'html', 'text', 'ele', 'data', 'hide'], i = list.length; 0 < i--;) {
			var current   = list[i]
			  , storedArg = args[current]
			  ;

			if (void 0 !== args[current]) {
				delete args[current];
				this[current] = storedArg;
			}
		}
		this.addedClasses = [''];
		this.prefix = "Main";
	};

	INNERCONTEXT.UI.GenericElement.prototype.counter = 0;

	INNERCONTEXT.UI.GenericElement.prototype.make = function GenericElement_prototype_make () {
		var namespace = INNERCONTEXT.CONSTANTS.NAMESPACE
		  , args	  = this.args
		  , eleName   = INNERCONTEXT.UTILITY.makeEleName(this.prefix, this.ele, args.id || Object.getPrototypeOf(this).counter++, args.type)
		  ;

		namespace = ' ' + namespace;
		args.id = eleName;
		args['class'] = $.trim( [ $.trim( args['class'] ) || '', namespace, this.addedClasses.join(namespace) ].join('') );
		this.ele = $.make(this.ele, args);
		void 0 !== this.text ? this.ele.text(this.text)
		                     : void 0 !== this.html && this.ele.html( this.html );
		this.css && Object === this.css.constructor && this.ele.css( this.css );
		this.data && Object === this.data.constructor && this.ele.data( this.data );
		!!this.hide && this.ele.hide();
		INNERCONTEXT.DOM[eleName] = this.ele;

		return this.ele;
	};

	INNERCONTEXT.UI.GenericElement.prototype.get = function GenericElement_prototype_get () {
		return void 0 === this.ele ? this.make()
								   : this.ele;
	};

	/** @constructor */
	INNERCONTEXT.UI.OptionsElement = function OptionsElement () {
		if (!(this instanceof OptionsElement)) {
			return new OptionsElement(arguments[0]);
		}

		INNERCONTEXT.UI.GenericElement.apply(this, arguments);
		this.prefix = "Options";
		this.addedClasses.push('Options');
	};
	INNERCONTEXT.UTILITY.inherit(INNERCONTEXT.UI.OptionsElement, INNERCONTEXT.UI.GenericElement);

	/** @constructor */
	INNERCONTEXT.UI.AboutElement = function AboutElement () {
		if (!(this instanceof AboutElement)) {
			return new AboutElement(arguments[0]);
		}

		INNERCONTEXT.UI.GenericElement.apply(this, arguments);
		this.prefix = "About";
		this.addedClasses.push('About');
	};
	INNERCONTEXT.UTILITY.inherit(INNERCONTEXT.UI.AboutElement, INNERCONTEXT.UI.GenericElement);

	/** @constructor */
	INNERCONTEXT.UI.PreviewElement = function PreviewElement () {
		if (!(this instanceof PreviewElement)) {
			return new PreviewElement(arguments[0]);
		}

		INNERCONTEXT.UI.GenericElement.apply(this, arguments);
		this.prefix = "Preview";
		this.addedClasses.push('Preview');
	};
	INNERCONTEXT.UTILITY.inherit(INNERCONTEXT.UI.PreviewElement, INNERCONTEXT.UI.GenericElement);

	INNERCONTEXT.TEMPLATES.image_preview =
		[ { ele: 'h1', id: 'preview', text: $.l('Preview Image') }
		, { ele: 'img', id: 'preview_image', draggable: false } // Do *not* put an alt attribute on the image!
		, { ele: 'dl', id: 'info', hide: true }
		,	[ { ele: 'dt', 'class': 'previewDT', text: $.l('(Image) Resolution') }
			, { ele: 'dd', id: 'resolution' }
			, { ele: 'dt', 'class': 'previewDT', text: $.l('File size') }
			, { ele: 'dd', id: 'filesize' }
			]
		];

	INNERCONTEXT.TEMPLATES.MENUS.about =
		[ { ele: 'fieldset', id: 'main', hide: true }
		,	[ { ele: 'legend', text: $.l('About') }
			, { ele: 'h4', text: 'Cover Art Archive Bulk Image Editor' }
			, { ele: 'span', text: ['Caabie ', $.l('Version'), ' ', INNERCONTEXT.CONSTANTS.VERSION].join(''), 'class': 'CAAversion' }
			, { ele: 'div' }
			,	INNERCONTEXT.UI.$makeCreditsList()
			]
		];

	INNERCONTEXT.TEMPLATES.MENUS.options =
		[ { ele: 'fieldset', id: 'main', hide: true}
		,	[ { ele: 'legend', text: $.l('Options') }
			, { ele: 'span', text: [$.l('Version'), ' ', INNERCONTEXT.CONSTANTS.VERSION].join(''), 'class': 'CAAversion' }
			, { ele: 'input', id: 'remove_images', title: $.l('Remove (help)'), type: 'checkbox' }
			, { ele: 'label', 'for': 'Options‿input‿checkbox‿remove_images', id: 'remove_images', title: $.l('Remove (help)'), text: ('Remove images') }
			, { ele: 'br' }
			, { ele: 'input', id: 'parse', title: $.l('Parse (help)'), type: 'checkbox' }
			, { ele: 'label', 'for': 'Options‿input‿checkbox‿parse', id: 'parse', title: $.l('Parse (help)'), text: $.l('Parse web pages') }
			, { ele: 'br' }
			, { ele: 'input', id: 'autoedit', 'class': 'autoedit', type: 'checkbox', title: $.l('Submit as autoedits'), hide: true }
			, { ele: 'label', 'for': 'Options‿input‿checkbox‿autoedit', 'class': 'autoedit', id: 'autoedit', title: $.l('Submit as autoedits'), text: $.l('Submit as autoedits'), hide: true }
			, { ele: 'br' }
			, { ele: 'input', id: 'clear_storage', title: $.l('Remove stored images nfo'), type: 'button', value: $.l('Remove stored images'), disabled: INNERCONTEXT.UTILITY.getLSValue('imageCache') === '[]' }
			, { ele: 'br' }
			, { ele: 'label', 'for': 'Options‿select‿language', id: 'language', title: $.l('Changed language note'), text: $.l('Language') + ':' }
			,	[ { ele: 'select', id: 'language', size: 3, title: $.l('Changed language note') }
				,	INNERCONTEXT.UI.$makeLanguagesList()
				]
			, { ele: 'fieldset', id: 'colors' }
			,	[ { ele: 'legend', text: $.l('Colors') }
				, { ele: 'select', id: 'colors', size: 5, title: $.l('Changed colors note') }
				,	INNERCONTEXT.UI.$makeColorsList()
				, { ele: 'input', id: 'colors', title: $.l('Changed colors note'), type: 'color', value: '66ff00', 'class': 'CAAbutton' }
				, { ele: 'input', id: 'colors', title: $.l('Changed colors note'), type: 'button', value: $.l('default'), 'class': 'CAAbutton' }
				, { ele: 'div', id: 'shadow' }
				,	[ { ele: 'label', 'for': 'Options‿input‿number‿shadow', id: 'shadow', title: $.l('How dark the bkgrnd'), text: $.l('How dark the bkgrnd') }
					,	[ { ele: 'input', id: 'shadow', type: 'number', step: 1, 'min': 0, 'max': 100, value: INNERCONTEXT.UTILITY.getLSValue('editorShadow') || INNERCONTEXT.CONSTANTS.IESHADOWLVL, title: $.l('How dark the bkgrnd') }
						]
					]
				  ]
			 , { ele: 'div', id: 'note', text: $.l('take effect next time') }
			 ]
		];

	INNERCONTEXT.TEMPLATES.image_row = function (info) {
			return [ { ele: 'tr', 'class': info.$row.prop('class') }
			        ,    [ { ele: 'td', 'class': 'imageRow', colspan: info.cols }
				         ,    [ INNERCONTEXT.UI.$makeAddDropboxButton().hide()
					          , { ele: 'div', 'class': 'loadingDiv', hide: true }
						      ,    [ { ele: 'img', 'class': 'throbberImage', src: INNERCONTEXT.CONSTANTS.THROBBER }
						           , { ele: 'span', text: $.l('loading') }
						           ]
					          , $.make('div', { 'class' : 'caaDiv' })
					          ,    [ INNERCONTEXT.UI.$makeLoadDataButton().data('entity', info.MBID)
						           ]
					          ]
				         ]
			        ];
	};

	INNERCONTEXT.TEMPLATES.dropbox =
		[ { ele: 'figure', 'class': 'CAAdropbox' }
		,   [ INNERCONTEXT.UI.$makeCloseButton()
			, { ele: 'div' }
			,	[ { ele: 'img', 'class': 'dropBoxImage', draggable : false }
				]
			, { ele: 'figcaption' }
			,	[ { ele: 'input', type: 'text', placeholder : 'image comment' }
				, { ele: 'br' }
				, INNERCONTEXT.UI.$makeCoverTypeSelect()
				]
			]
		];

	INNERCONTEXT.INIT = {
		standardizeBrowser : function standardizeBrowser () {
			document.head = document.head || document.getElementsByTagName('head')[0];
			document.body = document.body || document.getElementsByTagName('body')[0];
			window.TEMPORARY = window.TEMPORARY || 0;

			// Polyfill to add FileSystem API support to Firefox.
			void 0 === (window.requestFileSystem || window.webkitRequestFileSystem) && $.addScript('idbFileSystem');
			window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

			// Firefox renders slideToggle() badly; use toggle() instead.
			$.browser.mozilla && ( $.fn.slideToggle = $.fn.toggle );
		}(),

		initializeLocalStorage : function initializelocalStorage (util) {
			null === util.getLSValue('imageCache') && util.setLSValue('imageCache', []);
		},

		initializePage : function initializePage (constants, util) {
			$.make('base').appendTo(document.head);

			$(document.body).css({ 'background-color': '#FFF' });

			document.getElementById('sidebar').innerHTML = '';

			// Resize the sidebar
			$('#sidebar').addClass('CAAsidebar');
			$('#content').css('margin-right', (constants.SIDEBARWIDTH + 20) + 'px');

			// Get rid of the existing sidebar divider
			$('#page').css('background', '#FFF');

			// Get rid of the checkboxes
			$('tr').find('th, td').filter(':first-child:has(input)').remove();
			$('tr.subh > th').each(function () {
				var colSpan = $.single( this ).attr('colspan') - 1;
				colSpan ? $.single( this ).attr('colspan', $.single( this ).attr('colspan') - 1)
						: $.single( this ).remove(); // Fixes broken colspan on http://musicbrainz.org/release-group/{mbid}
			});

			// Lock the tables' column widths
			util.antiSquish(true);
			$.addRule('table.tbl', '{ table-layout: fixed; }', { id : 'tblStyle1' });

			// Change the page to use border-box layout
			$.addRule('*', [ '{ -moz-box-sizing: border-box;'
						   , '  -webkit-box-sizing: border-box;'
						   , '          box-sizing: border-box;'
						   , '}'
						   ].join('')
					 );
		},

		initializeImages : function initializeImages (constants, data, util) {
			$.imagesSmall();
			data.sizeStatus = 2;

			// This forces the throbber to be already be loaded, so that the throbber shows up faster later.
			$(document.body).append($.make('img', { src: constants.THROBBER }).hide());

			data.cachedImages = util.getLSValue('imageCache');
		},

		initializeRegexps : function initializeRegexps (constants) {
			// This defines the regexp constants.  Because regexps get compiled, this cannot be stringified as part of OUTERCONTEXT.
			constants.REGEXP = { image: /\.(?:p?j(?:pg?|peg?|f?if)|bmp|gif|j(?:2c|2k|p2|pc|pt)|jng|pcx|pict?|pn(?:g|t)|tga|tiff?|webp|ico)$/i
			                   , mbid: /\w{8}\-\w{4}\-\w{4}\-\w{4}-\w{12}/
			                   , uri: /\b(?:https?|ftp):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|]/gi
			                   };
		},

		initializeFileSystem : function initializeFileSystem (constants, data) {
			// Create temporary local file system to use to store remote image files.
			requestFileSystem( TEMPORARY
							 , constants.FILESYSTEMSIZE * 1024 * 1024
							 , function store_file_system (fsObj) {
								   $.log(['Creating local file system succeeded.', fsObj]);
								   data.localFileSystem = fsObj;
							   }
							 , function request_file_system_error (error) {
								   $.log(['Creating local file system failed.', error]);
							   }
							 );
		},

		defineMainTemplate : function defineMainTemplate (templates, ui, util) {

			/* This is separated from the other templates, as it calls INNERCONTEXT.UTILITY.assemble, and there is
			   no need to assemble those templates on page load, rather than when the script is actually being run. */

			templates.main =
				[ { ele: 'h1', id: 'imageHeader', text: $.l('Images') }
				, { ele: 'div', id: 'about_control', title: $.l('About') }
				,	ui.$makeIcon('about')
				, { ele: 'div', id: 'image_size' }
				,	[ { ele: 'div', 'class': 'imageSizeControl', id: 'imageMagnify', title: $.l('Magnify image') }
					,	ui.$makeIcon('zoomOut')
					, { ele: 'div', 'class': 'imageSizeControl', id: 'imageShrink', title: $.l('Shrink image') }
					,	ui.$makeIcon('zoomIn')
					]
				, { ele: 'div', id: 'options_control', title: $.l('Options') }
				,	ui.$makeIcon('options')
				, { ele: 'div', id: 'imageContainer' }
				,	[ { ele: 'div', id: 'imageHolder' }
					,	util.assemble('AboutElement', templates.MENUS.about)
					,	util.assemble('OptionsElement', templates.MENUS.options)
					, { ele: 'div', id: 'previewContainer' }
					,	util.assemble('PreviewElement', templates.image_preview)
					]
				];
		},

		initializeUI : function initializeUI (dom, templates, ui, util) {
			/* Create the UI */

			this.defineMainTemplate(templates, ui, util);
			$('#sidebar').appendAll( util.assemble(templates.main) );

			/* Adjust the height of the image area based on the height of the preview area.  */
			util.adjustContainerHeights();

			/* Autoeditor check */
			var autoeditorList = JSON.parse(util.getLSValue('autoeditors', 1)),
				thisEditor = $('.account > a:first').text();
			if (-1 !== $.inArray(thisEditor, autoeditorList)) {
				/* The following non-typical bool test is required here!  localStorage.getItem actually returns a Storage
				   object, even though it *looks* like it is returning a string. */
				dom['Options‿input‿checkbox‿autoedit'][0].checked = (util.getLSValue('autoedit') === "true");
				$('.autoedit').show();
			}

			// Add a 'load info' button to each release row
			$( '#content' ).detach( function addImageRows () {
				$.single( this ).find( 'a' )
				                .filter( '[resource^="[mbz:release/"]' )
				                .each( ui.addImageRow );
			});

		},

		initializeSubscribers : function initializeSubscribers (ui, util, dom) {
			var change  = 'change'
			  , click   = 'click'
			  ;

			var slideToggle = function (e) {
				dom[e.data.element].slideToggle();
			};

            // Toggle control for options menu
			dom['Main‿div‿options_control'].on( click, { element: 'Options‿fieldset‿main' }, slideToggle );

            // Toggle control for about menu
			dom['Main‿div‿about_control'].on( click, { element: 'About‿fieldset‿main' }, slideToggle );

			// Image size controls
			dom['Main‿div‿imageShrink'].on( click, { change: -1 }, util.changeImageSize );
			dom['Main‿div‿imageMagnify'].on( click, { change: 1 }, util.changeImageSize);

			// remember preference: parse webpages checkbox
			dom['Options‿input‿checkbox‿parse'].on( change, { key: 'parse', type: 'checkbox' }, util.setLSValue );

			// remember preference: autoedit checkbox
			dom['Options‿input‿checkbox‿autoedit'].on( change, { key: 'autoedit', type: 'checkbox' }, util.setLSValue );

			// remember preference: language selector
			dom['Options‿select‿language'].on( change, { key: 'language', type: 'select' }, util.setLSValue );

			// remember preference: image editor shadow level
			dom['Options‿input‿number‿shadow'].on( change, { key: 'editorShadow', type: 'text' }, util.setLSValue );

			// Clear image storage button
			dom['Options‿input‿button‿clear_storage'].on( click, util.clearImageStore );

			// Add functionality to close buttons
			dom.body.on( click, '.closeButton', util.closeDialogGeneric ) // Generic close buttons
			        .on( click, '#CAAeditiorCancelBtn', util.closeDialogImageEditor ) // Image editor's cancel button
			        .on( click, '.caaAdd', ui.addNewImageDropBox) // Add new image dropboxes
			        .on( click, '.caaLoad', util.loadRowInfo); // Load release info

			dom['Main‿div‿imageContainer'].on( click, '.tintImage', util.removeWrappedElement )	// Remove images (in remove image mode)
			                              .on( 'mouseenter mouseleave', '.localImage', util.toggleRedTint )	// Tint images (in remove image mode)
			                              .on({ dragenter : util.addClass // Highlight field
			                                  , dragleave : util.removeClass // Unhighlight field
			                                  }, { 'class': 'over' })
			                              .on({  dragover    : util.preventDefault // Required for drag events to work
			                                  ,  drop        : util.handleDroppedResources // Handle drops into the drop area
			                                  , 'haveRemote' : // Handle remote non-image resources to be loaded
			                                      function ( e, type ) {
			                                          type ? util.getRemoteFile( e.data.uri, type ) : util.getRemotePage( e.data.uri );
			                                      }
			                                  , 'haveLocalFileList' : // Handle local images to be loaded
			                                      function (e) {
			                                          util.loadLocalFile(e.list);
			                                      }
			                                  });

			// Handle a signal that a new remote image has been retreived and is ready to use
			dom.xhrComlink.on( 'dblclick', '.image', util.addRemoteImage );

			$('form[action*="merge_queue"]').on( 'loading', '.imageRow', ui.showLoading)
			                                .on( 'loaded', '.imageRow', ui.showImageRow);
		},

		init : function init (inner) {
			var constants = inner.CONSTANTS
			  , data      = inner.DATA
			  , dom       = inner.DOM
			  , templates = inner.TEMPLATES
			  , ui        = inner.UI
			  , util      = inner.UTILITY
			  ;

			this.initializeLocalStorage(util);
			this.initializePage(constants, util);
			this.initializeImages(constants, data, util);
			this.initializeRegexps(constants);
			this.initializeFileSystem(constants, data);
			this.initializeUI(dom, templates, ui, util);
			this.initializeSubscribers(ui, util, dom);

			delete templates.main;
			delete templates.image_preview;
			delete templates.MENUS;
			delete ui.AboutElement;
			delete ui.OptionsElement;
			delete ui.PreviewElement;
			delete ui.$makeColorsList;
			delete ui.$makeCoverTypeSelect;
			delete ui.$makeCreditsList;
			delete ui.$makeLanguagesList;
			delete util.AboutElement;
			delete util.OptionsElement;
			delete util.PreviewElement;
			delete inner.INIT;
		}
	};

	!function add_manual_starter_for_init() {
		$.log('Adding manual starter link.');

		var $triggerLink = $.make('a', { id: 'triggerLink' })
		                    .text($.l('Add cover art'))
		                    .wrap('<li>')
		                    .on('click',
		                        function start_cover_art_script() {
		                            $.single( this ).remove();
		                            INNERCONTEXT.INIT.init(INNERCONTEXT);
		                        })
		                    .parent();
		$('ul.links').find('hr:first')
		             .before($triggerLink);
	}();
}