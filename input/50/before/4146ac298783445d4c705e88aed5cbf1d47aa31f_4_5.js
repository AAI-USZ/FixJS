function _DOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', _DOMContentLoaded, false);

	if(noDocumentReadyState)document.readyState = "interactive";
	
	if(_emulate_scrollX_scrollY)_emulate_scrollX_scrollY();

	if("classList" in document.body.firstChild) {
		//TODO:: no htc available do for(var node in document.all) __ielt8__element_init__(node)
	}
}