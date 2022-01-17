function( box_name, side, css, transitionStartFct, transitionEndFct  ) {

	// do not create handle if box does not contain a toggle button

	var toggle = document.getElementById( box_name + '-toggle');

	if( toggle == null ) {

		console.log("[error] No toggle button for " + box_name);

		return;

	}

	

	// create handle DOM elements

	var wrapper = document.createElement('div');

	wrapper.id = box_name + '-handle-wrapper';

	wrapper.className = 'not-selectable box-wrapper box-handle-wrapper-'+side;

	wrapper.style.cssText += css;

	var content = document.createElement('div');

	content.id = box_name + '-handle-content';

	content.className = 'box-content box-handle-content-'+side;

	var icon = document.createElement('div');

	icon.id = box_name + '-handle-icon';

	icon.className = 'iconic-button';

	

	content.appendChild(icon);

	wrapper.appendChild(content);

	document.body.appendChild(wrapper);

	

	// create attributes

	this._box = document.getElementById( box_name + '-wrapper' );

	this._class = this._box.className;

	this._width = this._box.clientWidth;

	this._side = side;

	this._handle = wrapper;

	this._box_group = null;

	this._transitionEndFct = transitionEndFct;



	// hide box and show handle by default

	this._box.style[this._side]=-this._width+"px";

	this._box_visible = false;

	this._box.style.visibility="hidden";

	this._handle.style.visibility="visible";



	// add functionality

	var full_fct = transitionStartFct ? OSRM.concat(this._toggle, transitionStartFct) : this._toggle;

	var fct = OSRM.bind( this, full_fct );

	toggle.onclick = fct;

	icon.onclick = fct;

	

	var full_fct = transitionEndFct ? OSRM.concat(this._onTransitionEnd, transitionEndFct) : this._onTransitionEnd;

	var fct = OSRM.bind( this, full_fct );	

	if( OSRM.Browser.FF3==-1 && OSRM.Browser.IE6_9==-1 ) {

		var box_wrapper = document.getElementById(box_name + '-wrapper');

		box_wrapper.addEventListener("transitionend", fct, false);

		box_wrapper.addEventListener("webkitTransitionEnd", fct, false);

		box_wrapper.addEventListener("oTransitionEnd", fct, false);

		box_wrapper.addEventListener("MSTransitionEnd", fct, false);

	} else {

		this._legacyTransitionEndFct = fct;			// legacy browser support

	}

}