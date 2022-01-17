function openHKTemplateList(){
		$('#hk_list').remove();
		prepareHKContainer( hkconf.hk_pwtemplates, 'Edit <a href="'+config.urls.admin+'setup/template/">Template</a>:', 'setup/template/edit' );
		$('#hk_list').fadeIn().find('input:first').focus();
	}