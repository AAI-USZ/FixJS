function(to_form, field) {

			var data = this.data, editor = this.editor,

				mediaPlugin = editor.plugins.media, ext, src, typeInfo, defaultStates, src;



			defaultStates = {

				// QuickTime

				quicktime_autoplay : true,

				quicktime_controller : true,



				// Flash

				flash_play : true,

				flash_loop : true,

				flash_menu : true,



				// WindowsMedia

				windowsmedia_autostart : true,

				windowsmedia_enablecontextmenu : true,

				windowsmedia_invokeurls : true,



				// RealMedia

				realmedia_autogotourl : true,

				realmedia_imagestatus : true

			};



			function parseQueryParams(str) {

				var out = {};



				if (str) {

					tinymce.each(str.split('&'), function(item) {

						var parts = item.split('=');



						out[unescape(parts[0])] = unescape(parts[1]);

					});

				}



				return out;

			};



			function setOptions(type, names) {

				var i, name, formItemName, value, list;



				if (type == data.type || type == 'global') {

					names = tinymce.explode(names);

					for (i = 0; i < names.length; i++) {

						name = names[i];

						formItemName = type == 'global' ? name : type + '_' + name;



						if (type == 'global')

						list = data;

					else if (type == 'video' || type == 'audio') {

							list = data.video.attrs;



							if (!list && !to_form)

							data.video.attrs = list = {};

						} else

						list = data.params;



						if (list) {

							if (to_form) {

								setVal(formItemName, list[name], type == 'video' || type == 'audio' ? name : '');

							} else {

								delete list[name];



								value = getVal(formItemName);

								if ((type == 'video' || type == 'audio') && value === true)

									value = name;



								if (defaultStates[formItemName]) {

									if (value !== defaultStates[formItemName]) {

										value = "" + value;

										list[name] = value;

									}

								} else if (value) {

									value = "" + value;

									list[name] = value;

								}

							}

						}

					}

				}

			}



			if (!to_form) {

				data.type = get('media_type').options[get('media_type').selectedIndex].value;

				data.width = getVal('width');

				data.height = getVal('height');



				// Switch type based on extension

				src = getVal('src');

				if (field == 'src') {

					ext = src.replace(/^.*\.([^.]+)$/, '$1');

					if (typeInfo = mediaPlugin.getType(ext))

						data.type = typeInfo.name.toLowerCase();



					setVal('media_type', data.type);

				}



				if (data.type == "video" || data.type == "audio") {

					if (!data.video.sources)

						data.video.sources = [];



					data.video.sources[0] = {src: getVal('src')};

				}

			}



			// Hide all fieldsets and show the one active

			get('video_options').style.display = 'none';

			get('audio_options').style.display = 'none';

			get('flash_options').style.display = 'none';

			get('quicktime_options').style.display = 'none';

			get('shockwave_options').style.display = 'none';

			get('windowsmedia_options').style.display = 'none';

			get('realmedia_options').style.display = 'none';

			get('embeddedaudio_options').style.display = 'none';



			if (get(data.type + '_options'))

				get(data.type + '_options').style.display = 'block';



			setVal('media_type', data.type);



			setOptions('flash', 'play,loop,menu,swliveconnect,quality,scale,salign,wmode,base,flashvars');

			setOptions('quicktime', 'loop,autoplay,cache,controller,correction,enablejavascript,kioskmode,autohref,playeveryframe,targetcache,scale,starttime,endtime,target,qtsrcchokespeed,volume,qtsrc');

			setOptions('shockwave', 'sound,progress,autostart,swliveconnect,swvolume,swstretchstyle,swstretchhalign,swstretchvalign');

			setOptions('windowsmedia', 'autostart,enabled,enablecontextmenu,fullscreen,invokeurls,mute,stretchtofit,windowlessvideo,balance,baseurl,captioningid,currentmarker,currentposition,defaultframe,playcount,rate,uimode,volume');

			setOptions('realmedia', 'autostart,loop,autogotourl,center,imagestatus,maintainaspect,nojava,prefetch,shuffle,console,controls,numloop,scriptcallbacks');

			setOptions('video', 'poster,autoplay,loop,muted,preload,controls');

			setOptions('audio', 'autoplay,loop,preload,controls');

			setOptions('embeddedaudio', 'autoplay,loop,controls');

			setOptions('global', 'id,name,vspace,hspace,bgcolor,align,width,height');



			if (to_form) {

				if (data.type == 'video') {

					if (data.video.sources[0])

						setVal('src', data.video.sources[0].src);



					src = data.video.sources[1];

					if (src)

						setVal('video_altsource1', src.src);



					src = data.video.sources[2];

					if (src)

						setVal('video_altsource2', src.src);

                } else if (data.type == 'audio') {

                    if (data.video.sources[0])

                        setVal('src', data.video.sources[0].src);

                    

                    src = data.video.sources[1];

                    if (src)

                        setVal('audio_altsource1', src.src);

                    

                    src = data.video.sources[2];

                    if (src)

                        setVal('audio_altsource2', src.src);

				} else {

					// Check flash vars

					if (data.type == 'flash') {

						tinymce.each(editor.getParam('flash_video_player_flashvars', {url : '$url', poster : '$poster'}), function(value, name) {

							if (value == '$url')

								data.params.src = parseQueryParams(data.params.flashvars)[name] || data.params.src || '';

						});

					}



					setVal('src', data.params.src);

				}

			} else {

				src = getVal("src");



				// YouTube *NEW*

				if (src.match(/youtu.be\/[a-z1-9.-_]+/)) {

					data.width = 425;

					data.height = 350;

					data.params.frameborder = '0';

					data.type = 'iframe';

					src = 'http://www.youtube.com/embed/' + src.match(/youtu.be\/([a-z1-9.-_]+)/)[1];

					setVal('src', src);

					setVal('media_type', data.type);

				}



				// YouTube

				if (src.match(/youtube.com(.+)v=([^&]+)/)) {

					data.width = 425;

					data.height = 350;

					data.params.frameborder = '0';

					data.type = 'iframe';

					src = 'http://www.youtube.com/embed/' + src.match(/v=([^&]+)/)[1];

					setVal('src', src);

					setVal('media_type', data.type);

				}



				// Google video

				if (src.match(/video.google.com(.+)docid=([^&]+)/)) {

					data.width = 425;

					data.height = 326;

					data.type = 'flash';

					src = 'http://video.google.com/googleplayer.swf?docId=' + src.match(/docid=([^&]+)/)[1] + '&hl=en';

					setVal('src', src);

					setVal('media_type', data.type);

				}

				

				// Vimeo

				if (src.match(/vimeo.com\/([0-9]+)/)) {

					data.width = 425;

					data.height = 350;

					data.params.frameborder = '0';

					data.type = 'iframe';

					src = 'http://player.vimeo.com/video/' + src.match(/vimeo.com\/([0-9]+)/)[1];

					setVal('src', src);

					setVal('media_type', data.type);

				}

            

				// stream.cz

				if (src.match(/stream.cz\/((?!object).)*\/([0-9]+)/)) {

					data.width = 425;

					data.height = 350;

					data.params.frameborder = '0';

					data.type = 'iframe';

					src = 'http://www.stream.cz/object/' + src.match(/stream.cz\/[^/]+\/([0-9]+)/)[1];

					setVal('src', src);

					setVal('media_type', data.type);

				}

				

				// Google maps

				if (src.match(/maps.google.([a-z]{2,3})\/maps\/(.+)msid=(.+)/)) {

					data.width = 425;

					data.height = 350;

					data.params.frameborder = '0';

					data.type = 'iframe';

					src = 'http://maps.google.com/maps/ms?msid=' + src.match(/msid=(.+)/)[1] + "&output=embed";

					setVal('src', src);

					setVal('media_type', data.type);

				}



				if (data.type == 'video') {

					if (!data.video.sources)

						data.video.sources = [];



					data.video.sources[0] = {src : src};



					src = getVal("video_altsource1");

					if (src)

						data.video.sources[1] = {src : src};



					src = getVal("video_altsource2");

					if (src)

						data.video.sources[2] = {src : src};

                } else if (data.type == 'audio') {

                    if (!data.video.sources)

                        data.video.sources = [];

                    

                    data.video.sources[0] = {src : src};

                    

                    src = getVal("audio_altsource1");

                    if (src)

                        data.video.sources[1] = {src : src};

                    

                    src = getVal("audio_altsource2");

                    if (src)

                        data.video.sources[2] = {src : src};

				} else

					data.params.src = src;



				// Set default size

                setVal('width', data.width || (data.type == 'audio' ? 300 : 320));

                setVal('height', data.height || (data.type == 'audio' ? 32 : 240));

			}

		}