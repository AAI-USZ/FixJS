function(){
		reloadContent(); refreshCtrlTable();
		CTRL_UpdateSubmitClick(tab.ajout);
		$('#CTRL h2').text("Duplication Contrôle");
		$('#CTRL #num').val('');
		$('#CTRL #date').val(getFormatedDate());
		$('#CTRL #date').change()
		$('#numS').val('');
		$('#numC').val('');	
		$('#technicien').children("option:selected").removeAttr("selected");
		$('#technicien').children("option").first().attr("selected","selected");
		$('#technicien').next().val('');
		$('#jugement').children("option:selected").removeAttr("selected");
		$('#jugement').children("option").first().attr("selected","selected");
		$('#jugement').next().val('');
		$('#observation').val('');
	    }