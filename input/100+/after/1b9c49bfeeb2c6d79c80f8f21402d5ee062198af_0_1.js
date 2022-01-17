function(){

	// save hot key for all edit screens
	if($('button[id*="submit"]').length > 0){
		function savePage(e){ $('button[id*="submit"]').trigger('click'); };
		$(document).bind('keydown', hkconf.hk_save, savePage);
	}
	// add hot key for "add new"
	if($('a[href*="add"]').length > 0){
		function addNew(e){ $('a[href*="add"] button').trigger('click'); };
		$(document).bind('keydown', hkconf.hk_addnew, addNew);
	}
	// add hot key for "view" on page edit screen
	if($('a[id="_ProcessPageEditView"]').length > 0){
		function viewPage(){ window.location.href = $('a[id="_ProcessPageEditView"]').attr('href'); };
		$(document).bind('keydown', hkconf.hk_view , viewPage);
	}


	// add hot key for /setup/
	function openSetup(){ window.location.href = $('#topnav a[href*="/setup"]').attr('href'); };
	$(document).bind('keydown', hkconf.hk_opensetup , openSetup);

	// add hot key for /module/
	function openModules(){ window.location.href = $('#topnav a[href*="/module"]').attr('href'); };
	$(document).bind('keydown', hkconf.hk_openmodules , openModules);

	// add hot key for /page/
	function openPages(){ window.location.href = $('#topnav a[href*="/page"]').attr('href'); };
	$(document).bind('keydown', hkconf.hk_openpages , openPages);

	// add hot key for /access/
	function openAccess(){ window.location.href = $('#topnav a[href*="/access"]').attr('href'); };
	$(document).bind('keydown', hkconf.hk_openaccess , openAccess);




	// add hot key for template,field autocomplete edit
	function openHKTemplateList(){
		$('#hk_list').remove();
		prepareHKContainer( hkconf.hk_pwtemplates, 'Edit <a href="'+config.urls.admin+'setup/template/">Template</a>:', 'setup/template/edit', 'template' );
		$('#hk_list').fadeIn( 200, function(){ $(this).find('input:first').focus()} );
	};

	function openHKFieldList(){
		$('#hk_list').remove();
		prepareHKContainer( hkconf.hk_pwfields, 'Edit <a href="'+config.urls.admin+'setup/field/">Field</a>:', 'setup/field/edit', 'field' );
		$('#hk_list').fadeIn( 200, function(){ $(this).find('input:first').focus()});
	};

	function openHKPageList(){
		$('#hk_list').remove();
		prepareHKContainer( function(request, callback){ searchPages(request.term, callback)} , 'Edit <a href="'+config.urls.admin+'page/">Page</a>:', 'page/edit/' , 'page');
		$('#hk_list').fadeIn( 200, function(){ $(this).find('input:first').focus()});
	};


	$(document).bind('keydown', hkconf.hk_templateedit , openHKTemplateList);
	$(document).bind('keydown', hkconf.hk_fieldedit , openHKFieldList);
	$(document).bind('keydown', hkconf.hk_pageedit , openHKPageList);

	function closeHKList(){ $('#hk_list').fadeOut( 200, function(){ $(this).remove(); }); };
	$(document).bind('keydown', "esc", closeHKList);
	$("body").live('click', function(e){
		var node = $(e.target);
		if(node.closest('.hk_list').length == 0) closeHKList();
	});




}