function openHKTemplateList(){
		$('#hk_list').remove();
		prepareHKContainer( hkconf.hk_pwtemplates, 'Edit <a href="'+config.urls.admin+'setup/template/">Template</a>:', 'setup/template/edit', 'template' );
		$('#hk_list').fadeIn( 200, function(){ $(this).find('input:first').focus()} );
	}