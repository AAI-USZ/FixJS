function wipejobFail( data ) {
		$wipejobErr.hide().text( data.error && data.error.info || 'Action failed.' ).slideDown();
	}