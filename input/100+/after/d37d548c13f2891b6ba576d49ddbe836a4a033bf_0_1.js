function(){
	
		resizeMenu(); //resize the height of the menu
	
		var ww = window.innerWidth;
		//$('#tmpltzr .tmpltzr-primaryfull').parent('.views-row').css('clear', 'left'); //for primary-quarters to not float
		//$('#tmpltzr .tmpltzr-primaryembed').parent('.views-row').css('clear', 'left'); //for primary-quarters to not float
		//$('#tmpltzr .tmpltzr-primaryhalf').parent('.views-row').css('clear', 'left'); //for primary-quarters to not float
		//$('#tmpltzr .tmpltzr-primaryimage').parent('.views-row').css('clear', 'left'); //for primary-quarters to not float
		
		$('#tmpltzr .tmpltzr-primaryquarter').parent('.views-row').wrapAll('<div class="tmpltzr-primaryquarter-container" />');
		
		
		if(ww >= 1270){
			$('#three_col_rt #content').css('width', '800px');
			if(!$('#tmpltzr .tmpltzr-secondary-float').parent('.views-row').hasClass('views-row-first')){
				$('#tmpltzr .tmpltzr-secondary-float').parent('.views-row').css('float', 'right');
				}
		}else{
			$('#three_col_rt #content').css('width', '520px');
			//$('#tmpltzr .tmpltzr-secondary').css('float', 'none');
			//$('#tmpltzr .tmpltzr-primary').css('float', 'none');
			$('#tmpltzr .tmpltzr-secondary-float').parent('.views-row').css('float', 'left');
			
		}
	}