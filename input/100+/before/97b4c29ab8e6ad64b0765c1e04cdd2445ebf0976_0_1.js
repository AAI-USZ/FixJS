function(){
		//console.log('hiya!');
	/*
    $('.button').raptorize({
	    'enterOn' : 'timer'
	});*/
	
	
    runLightboxInit();
    if($('#feature_experiment').length > 0) {
        $('#feature_experiment').click(function(){
            $('#feature_experiment').hide();
            $('#loading_msg').show();
            if($(this).attr("checked")) {
                // Make Featured
                $.get('actions/experiments.php', { action:"addfeature", id:$(this).val() }, function(data){
                    $('#feature_experiment').show();
                    $('#loading_msg').hide();
                });
            }
            else {
                // Remove Feature
                $.get('actions/experiments.php', { action:"removefeature", id:$(this).val() }, function(data){
                    $('#feature_experiment').show();
                    $('#loading_msg').hide();
                });
            }
        });
    }

    if($('input.feature_experiment').length > 0) {
        $('input.feature_experiment').click(function(){
            //$('input.feature_experiment').hide();			This stuff is commented out because it
            //$('loading_msg').show();						hides/shows all boxes. It looks weird.
            if($(this).attr("checked")) {
				$('#pickimage_' + $(this).val()).show();
                // Make Featured
                $.get('actions/experiments.php', { action:"addfeature", id:$(this).val() }, function(data){
                    //$('input.feature_experiment').show();
                    //$('loading_msg').hide();
                });
            }
            else {
				$('#pickimage_' + $(this).val()).hide();
                // Remove Feature
                $.get('actions/experiments.php', { action:"removefeature", id:$(this).val() }, function(data){
                    //$('input.feature_experiment').show();
                    //$('loading_msg').hide();
                });
            }
        });
    }

	if($('input.feature_vis').length > 0){
		$('input.feature_vis').click(function(){
			//$('input.feature_vis').hide();				This stuff is commented out because it
            //$('loading_msg').show();						hides/shows all boxes. It looks weird.
			if($(this).attr("checked")) {
				$('#pickimage_' + $(this).val()).show();
				$.get('browse.php', { action:"addfeature", id:$(this).val() }, function(data){
                    //$('input.feature_vis').show();
                    //$('loading_msg').hide();
                });
			} else {
				$('#pickimage_' + $(this).val()).hide();
				$.get('browse.php', { action:"removefeature", id:$(this).val() }, function(data){
                   //$('input.feature_vis').show();
                   //$('loading_msg').hide();
                });
			}
		})
	}
	
	if($('img.selectvisimage').length > 0){
		$('img.selectvisimage').click(function(){
			$('img.selectvisimage').css( 'border', '0px none #fff' );
			$('img.selectvisimage').css( 'margin', '5px' );
			$('img.selectvisimage').css( 'padding', '0px')
			$(this).css( 'border', '4px solid #2396e6' );
			$(this).css( 'padding', '1px' );
			$(this).css( 'margin', '0px' );
			$(this).css( 'background', '#fff');
			//alert( "URL: " + $(this).attr("src") + "\nVIS ID: " + $('#storedvisid').val() );
			$.get('/actions/vis.php', { action:"changeimage", purl:$(this).attr("src"), vid:$('#storedvisid').val() }, function(data){});
		});
	}
	
	if($('img.selectexpimage').length > 0){
		$('img.selectexpimage').click(function(){
			$('img.selectexpimage').css( 'border', '0px none #fff' );
			$('img.selectexpimage').css( 'margin', '5px' );
			$('img.selectexpimage').css( 'padding', '0px')
			$(this).css( 'border', '4px solid #2396e6' );
			$(this).css( 'padding', '1px' );
			$(this).css( 'margin', '0px' );
			$(this).css( 'background', '#fff');
			//alert( "URL: " + $(this).attr("src") + "\nVIS ID: " + $('#storedexpid').val() );
			$.get('/actions/experiments.php', { action:"changeimage", purl:$(this).attr("src"), eid:$('#storedexpid').val() }, function(data){});
		});
	}
    
    if($('#hide_experiment').length > 0) {
        $('#hide_experiment').click(function(){
            $('#hide_experiment').hide();
            $('#hidden_loading_msg').show();
            if($(this).attr("checked")) {
                // Make Featured
                $.get('actions/experiments.php', { action:"hide", id:$(this).val() }, function(data){
                    $('#hide_experiment').show();
                    $('#hidden_loading_msg').hide();
                });
            }
            else {
                // Remove Feature
                $.get('actions/experiments.php', { action:"unhide", id:$(this).val() }, function(data){
                    $('#hide_experiment').show();
                    $('#hidden_loading_msg').hide();
                });
            }
        });
    }
    
    if($('#session_hidden').length > 0) {
        $('#session_hidden').click(function(){
            if($(this).attr("checked")) {
                // Make Featured
                $.get('actions/experiments.php', { action:"hideSes", id:$(this).attr('name') }, function(data){
                    alert(data);
                });
            } else {
                // Remove Feature
                $.get('actions/experiments.php', { action:"unhideSes", id:$(this).attr('name') }, function(data){
                    alert(data);
                });
            }
        });
    }

	if($('.star').length > 0) {
	    for(var i = 1; i < 6; i++) {
    		if(!$('#star'+i).hasClass('unclickable')) {
    			$('#star'+i).click(function(){
    					var id = this.id;
    					var score = id.substring(4,5);

    					$.get('actions/experiments.php', { action:"rate", id:$('#feature_experiment').val(), value:score },
    								function(data) {
    									if($('div#rating_prompt').length > 0) {
    										$('div#rating_prompt').text('Thank you for rating!');
    									}
    								});
    			});
    		}
    	}
    }

	if($('#rating').length > 0) {
		var rate = parseInt($('#rating').val()) + 1;
		for(var i = 1; i < rate; i++) {
			$("#star"+i).addClass("star-rating-hover");
		}
	}

	$('#datetime').datepicker({
		altField:'#date'
	});
    
    if($('#experiment_tags').length) {
        $("#experiment_tags").autocomplete("actions/create.php", {multiple: true, autoFill: true});
    }
    
    if($('#start').length > 0) {
        $('#start').datepicker();
    }
    
    if($('#end').length > 0) {
        $('#end').datepicker();
    }
    
    if($('#file_upload').length > 0) {
        $('#file_upload').click(function(){
            $('#type_file').toggle();
            $('#type_manual').toggle();
        });
    }
    
    if($('#manual_upload').length > 0) {
        $('#manual_upload').click(function(){
            $('#type_file').toggle();
            $('#type_manual').toggle();
        });
    }
    
    if($('#custom_field_type_1').length > 0){
      $('#custom_field_type_1').change(filterUnits);
    }
    

		$('div.rating_canel').css('display', 'none');
}