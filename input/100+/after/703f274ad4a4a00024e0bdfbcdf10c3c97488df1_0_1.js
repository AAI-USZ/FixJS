function( jQuery ) {

	// IE is collapsing the top margin of 1px; detect and adjust accordingly
	var ie = jQuery("#static-1").offset().top === 6,
		swarmy = document.documentMode === 8 && window.location.search.indexOf("swarmURL") >= 0;

	expect( swarmy? 68 : 80 );

	// get offset
	var tests = [
		{ id: "#static-1",     top: ie ?   6 :   7, left:  7 },
		{ id: "#static-1-1",   top: ie ?  13 :  15, left: 15 },
		{ id: "#static-1-1-1", top: ie ?  20 :  23, left: 23 }
	];
	if ( !swarmy ) {
		tests.push({ id: "#static-2", top: ie ? 121 : 122, left: 7 });
	}
	jQuery.each( tests, function() {
		equal( jQuery( this.id ).offset().top,  this.top,  "jQuery('" + this.id + "').offset().top" );
		equal( jQuery( this.id ).offset().left, this.left, "jQuery('" + this.id + "').offset().left" );
	});


	// get position
	tests = [
		{ id: "#static-1",     top: ie ?   5 :   6, left:  6 },
		{ id: "#static-1-1",   top: ie ?  12 :  14, left: 14 },
		{ id: "#static-1-1-1", top: ie ?  19 :  22, left: 22 }
	];
	if ( !swarmy ) {
		tests.push({ id: "#static-2", top: ie ? 120 : 121, left: 6 });
	}
	jQuery.each( tests, function() {
		equal( jQuery( this.id ).position().top,  this.top,  "jQuery('" + this.top  + "').position().top" );
		equal( jQuery( this.id ).position().left, this.left, "jQuery('" + this.left +"').position().left" );
	});


	// set offset
	tests = [
		{ id: "#static-2",     top: 200, left: 200 },
		{ id: "#static-2",     top: 100, left: 100 },
		{ id: "#static-1-1-1", top:  50, left:  50 },
		{ id: "#static-1-1-1", top:  10, left:  10 },
		{ id: "#static-1-1-1", top:  -1, left:  -1 },
		{ id: "#static-1-1-1", top:  22, left:  22 },
		{ id: "#static-1-1",   top:  25, left:  25 },
		{ id: "#static-1-1",   top:  10, left:  10 },
		{ id: "#static-1-1",   top:  -3, left:  -3 },
		{ id: "#static-1-1",   top:  14, left:  14 },
		{ id: "#static-1",     top:  30, left:  30 },
		{ id: "#static-1",     top:   2, left:   2 },
		{ id: "#static-1",     top:  -2, left:  -2 },
		{ id: "#static-1",     top:   7, left:   7 }
	];
	if ( !swarmy ) {
		tests.push(
			{ id: "#static-2", top:  -2, left:  -2 },
			{ id: "#static-2", top: 121, left:   6 }
		);
	}
	jQuery.each( tests, function() {
		jQuery( this.id ).offset({ top: this.top, left: this.left });
		equal( jQuery( this.id ).offset().top,  this.top,  "jQuery('" + this.id + "').offset({ top: "  + this.top  + " })" );
		equal( jQuery( this.id ).offset().left, this.left, "jQuery('" + this.id + "').offset({ left: " + this.left + " })" );

		jQuery( this.id ).offset({ top: this.top, left: this.left, using: function( props ) {
			jQuery( this ).css({
				top:  props.top  + 1,
				left: props.left + 1
			});
		}});
		equal( jQuery( this.id ).offset().top,  this.top  + 1, "jQuery('" + this.id + "').offset({ top: "  + (this.top  + 1) + ", using: fn })" );
		equal( jQuery( this.id ).offset().left, this.left + 1, "jQuery('" + this.id + "').offset({ left: " + (this.left + 1) + ", using: fn })" );
	});
}