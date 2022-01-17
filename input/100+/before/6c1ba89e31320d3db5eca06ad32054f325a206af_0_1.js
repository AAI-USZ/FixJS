function () {
			
			// add listeners for events
			
			dojo.connect( 'onfocus', on_focus_gain );
			dojo.connect( 'onblur', on_focus_lose );
			
            dojo.connect( document, dojo.touch.press, on_input_press );
            dojo.connect( document, dojo.touch.move, on_input_move );
            dojo.connect( document, dojo.touch.release, on_input_release );
            dojo.connect( document, dojo.touch.cancel, on_input_cancel );
			
			dojo.connect( document, dojox.gesture.tap, on_input_tap );
            dojo.connect( document, dojox.gesture.tap.hold, on_input_tap_hold );
            dojo.connect( document, dojox.gesture.tap.doubletap, on_input_tap_double );
            dojo.connect( document, dojox.gesture.swipe, on_input_swipe );
            dojo.connect( document, dojox.gesture.swipe.end, on_input_swipe_end );
			
			dojo.connect( document, ( !dojo.isMozilla ? "onmousewheel" : "DOMMouseScroll" ), on_input_scroll );
			
			dojo.connect( document, 'onkeypress', on_key_press );
			dojo.connect( document, 'onkeyup', on_key_up );
			
			eventHandles[ 'onwindowdeviceorientation' ] = dojo.connect( document, ( !dojo.isMozilla ? "deviceorientation" : "MozOrientation" ), on_window_device_orientation );
			dojo.connect( window, 'onresize', on_window_resize );
			dojo.connect( window, 'onerror', on_error );
			
			// loader
			
			loader.active = false;
			loader.listCount = 0;
			loader.lists = [];
			loader.listLocations = {};
			loader.listLoaded = {};
			loader.listMessages = {};
			loader.listCallbacks = {};
			loader.loading = [];
			loader.loadingListIDs = [];
			loader.started = [];
			loader.loaded = [];
			loader.loadingOrLoaded = [];
			loader.listCurrent = '';
			loader.loadTypeBase = 'script';
			loader.tips = [];
			
			Object.defineProperty( main, 'loadingHeader', {
				set: function ( header ) { 
					
					if ( typeof loader.progressBar !== 'undefined' ) {
						
						loader.progressBar.header = header;
						
					}
					
				}
			});
			
			Object.defineProperty( main, 'loadingTips', {
				set: function ( tips ) { 
					
					if ( is_array( tips ) ) {
						
						loader.tips = tips.slice( 0 );
						
					}
					
				}
			});
			
			add_loaded_locations( libList );
			
			// public functions
			
			main.type = type;
			main.is_number = is_number;
			main.is_array = is_array;
			main.is_image = is_image;
			main.is_image_ext = is_image_ext;
			
			main.extend = extend;
			main.time_test = time_test;
			main.get_mouse = get_mouse;
			main.generate_dom_image = generate_dom_image;
			
			main.ensure_array = ensure_array;
			main.ensure_not_array = ensure_not_array;
			main.modify_array = modify_array;
			main.index_of_object_with_property_value = index_of_object_with_property_value;
			
			main.get_asset_path = get_asset_path;
			main.get_ext = get_ext;
			main.add_default_ext = add_default_ext;
			main.remove_ext = remove_ext;
			main.get_alt_path = get_alt_path;
			
			main.handle_touch_event = handle_touch_event;
			
			main.load = load;
			main.get_is_loaded = get_is_loaded;
			main.get_is_loading = get_is_loading;
			main.get_is_loading_or_loaded = get_is_loading_or_loaded;
			
			main.asset_register = asset_register;
			main.asset_require = asset_require;
			main.asset_ready = asset_ready;
			main.set_asset = set_asset;
			main.get_asset = get_asset;
			main.get_asset_data = get_asset_data;
			
			// load for setup
			
			asset_require( setupList, init_setup, true );
			
		}