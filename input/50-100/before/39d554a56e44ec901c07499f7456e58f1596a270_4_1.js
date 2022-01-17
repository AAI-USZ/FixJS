function(){
	
		if ( ajaxInterface.submiting )
			return;
			
		ajaxInterface.submiting = true;
	
        var gd = ajaxInterface.construcGamedata();
        
        
        
        $.ajax({
            type : 'POST',
            url : 'gamedata.php',
            dataType : 'json',
            data: gd,
            success : ajaxInterface.successSubmit,
            error : ajaxInterface.errorSubmit
        });
        
        gamedata.goToWaiting();
    }