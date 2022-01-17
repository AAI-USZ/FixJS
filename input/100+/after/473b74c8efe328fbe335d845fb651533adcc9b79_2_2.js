function(context, arguments, method) {
	
		// if there are versions ahead of the current version remove them.
		if ( this.versions.length > this.currentVersion ) this.versions.splice(this.currentVersion + 1)
	
		if ( ! this.disabled ) {
			// create a new version.
			this.newVersion()
		}
		
		// apply the mutator to the value.
		if ( method != 'sort' ) Array.prototype[method].apply(context, arguments)
		
		// things to do if we're using persistence.
		if ( this.persistence ) {
			
			if ( /^(splice|pop)$/.test(method) ) {
				
				if ( method == 'splice' && arguments.length > 2 ) {
				
					var startIndex = arguments[0],
						itemsToRemove = arguments[1],
						additions = this.replaceValuesWithKeys(Array.prototype.splice.call(arguments, 2, arguments.length))
					
					additions.unshift(startIndex, itemsToRemove)
					
					var result = Array.prototype.splice.apply(this.versions[this.currentVersion], additions)
				} 
				else {
				
					var result = Array.prototype[method].apply(this.versions[this.currentVersion], arguments)
						
					result = this.replaceKeysWithValues(result)
				}
			}
			
			else if ( method == 'reverse' ) {
			
				var result = Array.prototype.reverse.apply(this.versions[this.currentVersion])
				
				result = this.replaceKeysWithValues(result)
			}
			
			else if ( method == 'sort' ) {
			
				var values = this.replaceKeysWithValues(this.versions[this.currentVersion])
				
				var result = Array.prototype.sort.apply(values, arguments)
				
				Array.prototype.splice.call(context, 0, context.length)
				
				Array.prototype.push.apply(context, values)
				
				this.versions[this.currentVersion] = this.replaceValuesWithKeys(values)
			}
			
			else {
			
				// convert the values to keys and apply the mutator.
				var result = Array.prototype[method].apply(this.versions[this.currentVersion], this.replaceValuesWithKeys(arguments))
			}
			
			// update the persistence.
			this.persistence.save({
				'versions' : this.versions,
				'currentVersion' : this.currentVersion,
				'store' : this.store
			})
		}
		
		else {
		
			// apply the mutator to the version.
			var result = Array.prototype[method].apply(this.versions[this.currentVersion], arguments)
		}
		
		return result
	}