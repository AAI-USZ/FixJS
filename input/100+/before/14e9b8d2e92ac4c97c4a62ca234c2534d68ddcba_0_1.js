function(html, cssClass, autoResize, onLoadCallback, onCloseCallback){

	var modalId = '__FUEL_modal__';
	if (!cssClass) cssClass = '';
	var $context = $('body', window.document);
	if (!$('#' + modalId, $context).size()){
		var modalHTML = '<div id="' + modalId + '"><div class="loader"></div><a href="#" class="modal_close jqmClose"></a><div class="modal_content"></div></div>';
	} else {
		$('#' + modalId, $context).html('<div class="loader"></div><a href="#" class="modal_close jqmClose"></a><div class="modal_content"></div>');
	}
	
	
	var modalOnHide = function(){
		$('#' + modalId, $context).hide();
		$('.jqmOverlay', $context).hide();
		if (onCloseCallback) onCloseCallback();
	}	
	
	$context.append(modalHTML);
	$modal = $('#' + modalId, $context);
	$modal.attr('class', '__fuel__ __fuel_modal__ jqmWindow ' + cssClass)
	
	var modalWidth = $modal.outerWidth();
	var centerWidth = -((modalWidth/2));
	$modal.css('marginLeft', centerWidth + 'px');

	
	// show it first so we don't get the cancellation error in the console
	
	// set jqm window options
	var jqmOpts = { onHide: modalOnHide, toTop:true };
	if (onLoadCallback){
		jqmOpts.onLoad = onLoadCallback;
	}
	
	$modal.jqm(jqmOpts).jqmShow();
	$modal.find('.modal_content').empty().append(html);
	$modal.find('iframe').load(function(){
		$('.jqmWindow .loader', $context).hide();
		var iframe = this;
		var contentDoc = iframe.contentDocument;

		$('.cancel', contentDoc).add('.modal_close').click(function(){
			$modal.jqmHide();
		})

		if (autoResize){
			setTimeout(function(){
					// if ($('#login', contentDoc).size()){
					// 	var docHeight = $('#login', contentDoc).outerHeight(); // bottom margin is added... not sure from what though
					// } else {
					// 	var docHeight = fuel.calcHeight('#fuel_main_top_panel, #fuel_actions, #fuel_notification, #fuel_main_content_inner, #list_container, .instructions', contentDoc) + 30;
					// }
					docHeight = fuel.calcHeight(contentDoc);
				//	docHeight = iframe.contentDocument.body.scrollHeight;
					//console.log(iframe.contentWindow.parent.document.title + ' ' + $(iframe.contentWindow.parent.document).height() )
					if (docHeight > 480) {
						docHeight = 480;
					} else {
						docHeight += 30;
					}
					//console.log(iframe.contentWindow.document.title)

					//console.log($(iframe.contentWindow.parent.parent).find('iframe'))
					// set the height of the parent iframe if it needs to be bigger
					//if ($(iframe.contentWindow.parent.document).height() < docHeight){
						$(iframe.contentWindow.parent.document).find('iframe').height(docHeight)
				//	}
					fuel.cascadeIframeWindowSize(iframe.contentWindow, docHeight);
					//docHeight = docHeight - (fuel.windowLevel() * 50);
					$(iframe).height(docHeight);
			}, 250);
		}
		
	})
	
	return $modal;
}