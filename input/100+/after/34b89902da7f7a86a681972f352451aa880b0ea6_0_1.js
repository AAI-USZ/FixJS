function start(){
			// If we're already invoked ignore.
			if( AtKit.internal.__invoked ) return;
			
			if(API.$("#sbarGhost").length == 0) showLoader();

			// Insert the bar holder 
			API.$( API.$('<div>', { id: 'sbar' }) ).insertAfter("#sbarGhost");
			
			// Insert the logo.
			
			// Are we in RTL mode? Work out where we should be positioned.
			var align = API.settings.isRightToLeft ? "right" : "left";
			
			API.$(
				API.$("<a>", { id: 'sbarlogo', click: function(){ showAbout() } }).append(
					API.$("<img>", { "src": API.settings.logoURL, "align": align, "border": "0", "title": API.settings.name + "Logo", "style": "margin-top:10px;float:" + align }) 
				)
			).appendTo('#sbar');
			
			API.$("<img>", { "src": AtKit.internal.__APIURL + "stat.php?channel=" + AtKit.internal.__channel + "-" + API.settings.name + "&version=" + AtKit.internal.__version.toFixed(1) + "." + AtKit.internal.__build }).appendTo("#sbar");		
		
	
			// add the close button (if we have been told to use this)
			if( API.settings.allowclose ){
				API.addButton('atkit-unload', API.localisation("exit"), AtKit.internal.__assetURL + 'images/close.png', function(){ API.close(); }, null, null, {'cssClass':'fright'});
			}
					
			// add the reset button (if we have been told to use this)
			if( API.settings.allowreset ){
				API.addButton('atkit-reset', API.localisation("reset"), AtKit.internal.__assetURL + 'images/reset.png', function(){ API.reset(); }, null, null, {'cssClass':'fright'});
			}
				
			// Add buttons.
			for(b in API.__env.buttons){
				API.$( renderButton(b) ).appendTo('#sbar');
			}
			
			// Apply CSS
			applyCSS();
			
			// Apply site fixes
			siteFixes();

			// IE 6 fix
			if ( API.$.browser == "msie" && API.$.browser.version == 6 ) {
				API.$('#sbarGhost').remove();
			} else {
				API.$('#sbarGhost').html("&nbsp;");
			}
			
			// Set state to invoked.
			AtKit.internal.__invoked = true;

			// Set unload function
			API.__env.global.unloadFn['default'] = function(){
				API.$('#sbarGhost, #sbar').remove();
			}
			
			API.__env.global.resetFn['default'] = function(){
				location.reload(true);
			}
			
			API.$('body').trigger('AtKitRenderComplete');
		}