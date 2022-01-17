function(){
		var 
		_this = this,
		parentDoc = window['parent'].document,
		$parent = $( window['parent'].document ),
		$iframe = $( this.getFsTarget() ),
		parentContext = window['parent'];
		
		mw.log("PlayerControlsBuilder:: restoreParentIframeFullscreen> verticalScrollPosition:" + this.verticalScrollPosition );

		// Restore document zoom:
		if( this.orginalParnetViewPortContent ){
			$parent.find('meta[name="viewport"]').attr('content', this.orginalParnetViewPortContent );
		} else{
			// Restore user zoom: ( NOTE, there does not appear to be a way to know the
			// initial scale, so we just restore to 1 in the absence of explicit viewport tag )
			// In order to restore zoom, we must set maximum-scale to a valid value
			$parent.find('meta[name="viewport"]').attr('content', 'initial-scale=1; maximum-scale=8; minimum-scale=1;' );
		}
		if( this.orginalParentIframeLayout ) {
			$iframe[0].style.cssText = this.orginalParentIframeLayout.style;
			$iframe.attr({
				'width': this.orginalParentIframeLayout.width,
				'height': this.orginalParentIframeLayout.height
			});
		}
		// Restore any parent absolute pos:
		$parent.find( _this.parentsAbsoluteList ).each( function() {
			$( this ).css( 'position', 'absolute' );
		} );
		$parent.find( _this.parentsRelativeList ).each( function() {
			$( this ).css( 'position', 'relative' );
		} );

		// Scroll back to the previews position
		window.scroll( 0, this.verticalScrollPosition );
	}