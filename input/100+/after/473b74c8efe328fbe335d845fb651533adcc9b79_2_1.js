function(n, self, direction) {
		
		// if it is not possible to undo or redo then return false.
		if ( ( direction === true && ! this.canRedo(n) ) || ( direction === false && ! this.canUndo(n) ) ) return false
	
		// set the new version.
		self.currentVersion = direction ? self.currentVersion + (n || 1) : self.currentVersion - (n || 1)
	
		// clear the array instance.
		Array.prototype.splice.call(this, 0, this.length)
	
		var newValue = self.persistence ? self.replaceKeysWithValues(self.versions[self.currentVersion]) : self.versions[self.currentVersion]
	
		if ( self.persistence ) {
			self.persistence.save({
				'versions' : self.versions,
				'currentVersion' : self.currentVersion,
				'store' : self.store
			})
		}
	
		// push the new version onto the array instance.
		return Array.prototype.push.apply(this, newValue)
	}