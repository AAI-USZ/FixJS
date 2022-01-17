function(done) {
	
		var self = this,
	
			// settings object.
			settings = this.settings = {},
	
			// persistant storage instance.
			persistence = new Persistence('vibeSettings'),
			
			// reference to this.
			self = this
	
		/**
		 * readSettings
		 * @description reads the contents of settings.json into the settings object.
		 */
		;(function readSettings() {
		
			settings = persistence.load() || {}
		
		})()
		
		/**
		 * writeSettings
		 * @description write the settings object back into settings.json.
		 */
		var writeSettings = function() {
		
			// convert the object into a string and overwrite the persistent storage.
			persistence.save(settings)
		}
	
		/**
		 * set
		 * @description set a setting.
		 * @param key (string) - the setting key.
		 * @param value (string) - the value for the setting.
		 */
		this.set = function(key,value) {
		
			// set a setting.
			settings[key] = value
		
			// commit the setting.
			writeSettings()
		}
		
		/**
		 * unset
		 * @description Delete a setting.
		 * @param key (string) - the key to unset.
		 */
		this.unset = function(key) {
		
			// make sure there is a key.
			if ( settings[key] ) {
				// delete the key.
				delete settings[key]
			
				// write the change to settings.json.
				writeSettings()
			}
			else {
				// if there is no key then log it.
				console.error("Unable to unset '" + key + "' as it does not exist.")
			}
		}
		
		/**
		 * get
		 * @description Get a setting.
		 * @param key (string) - the name of the setting.
		 */
		this.get = function(key) {
		
			// return the value.
			return settings[key]
		}
		
		// alias.
		this.clear = function() {
			
			persistence.clear()
		}
		
		// Modal Dialogue definitions for the Settings User Interface.
		this.dialogueDefinitions = {
		
			// connection settings dialogue.
			connection : {
				title : "Connection",
				body : "Set the Vibe Server's details.",
				form : {
					name : "connection",
					inputs : [{
						name : 'host',
						title : 'Host',
						placeholder : self.get('host') || 'localhost'
					},{
						name : 'port',
						type : 'number',
						title : 'Port',
						placeholder : self.get('port') || 6232
					}],
					callback : function(input, callback) {
					
						var host = input.host.value || input.host.placeholder
						
						var port = input.port.value || input.port.placeholder
					
						if ( host !== input.host.placeholder || port !== input.port.placeholder ) {
						
							self.set('host', host)
							
							self.set('port', port)
						
							location.reload() 
						}
					}
				}
			},
			
			// user interface settings dialogue.
			userInterface : {
				title : "User Interface",
				body : "Configure the User Interface.",
				form : {
					name : "interface",
					inputs : [{
						'name' : 'collectionRootType',
						'title' : 'Order Collection By ',
						'type' : 'select',
						'options' : ['Genre', 'Artist', 'Album', 'Track'],
						'placeholder' : self.get('collectionRootType') || 'Genre'
					},{
						'name' : 'notifications',
						'title' : 'Desktop Notifications',
						'type' : 'checkbox',
						'checked' : self.get('notifications')
					}],
					callback : function(inputs) {
					
						if ( inputs.collectionRootType.value !== inputs.collectionRootType.placeholder ) {
						
							self.super.collection.populateWithType(inputs.collectionRootType.value)
						
							self.set('collectionRootType', inputs.collectionRootType.value)
						
						}
						
						if ( inputs.notifications.checked ) {
						
							if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
								
								window.webkitNotifications.requestPermission(function() {
								
									self.set('notifications', true)
								})
								
							} else {
							
								self.set('notifications', true)
							}
							
						} else {
							self.set('notifications', false)
						}
					}
				}
			},
			
			// advanced options (debugging, etc.) dialogue
			advanced : {
				title : "Developer",
				body : "Advanced configuration options for developmental purposes.",
				form : {
					name : "developer",
					inputs : [{
						'name' : 'debug',
						'title' : 'Debugging',
						'type' : 'checkbox',
						'checked' : self.get('debug')
					},{
						'name' : 'Clear Settings',
						'type' : 'button',
						'callback' : function() {
						
							// clear localstorage.
							localStorage.clear()
							
							location.reload(true)
						
						}
					}],
					callback : function(input) {
					
						if ( input.debug.checked != self.get('debug') ) {
						
							self.set('debug', input.debug.checked)
							
							location.reload(true)
						}
					}
				}
			},
			
			// about Vibe pane. (no settings.)
			about : {
				title : (function() {
				
					var build = util.getMetaContent('vibe-build')
				
					if (build) {
					
						return "About Vibe (Build " + build +  " )"
					}
					else {
					
						return "About Vibe (Version " + util.getMetaContent('vibe-version') + ")"
					}
				})(),
				navTitle : "About Vibe",
				body : "<p><img src='./images/shared.icon_alt.png' alt style='float:left' />Vibe is a next-generation Web Application that will stream music from a Vibe Server and allow it to be played on the browser. Vibe aims to provide an intuitive and fast User Interface by using the latest Web Technologies available.</p>" + "<p>Although the major components of this program are done, it still requires serious polish and won't be fully ready for some time.</p>",
				alignment : "justify"
			}
		}
	}