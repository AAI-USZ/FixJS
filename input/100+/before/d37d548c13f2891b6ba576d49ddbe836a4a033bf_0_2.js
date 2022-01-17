function () {
	/*************************** UTILITIES ***************************/
	jQuery.fn.exists = function(){return this.length>0;}
	
    /*************************** MENU ***************************/
	var scrollMenu = function(){
		var target = $('#main-menu ul li.active-trail');
		
		if($('#main-menu ul li.active-trail li.active-trail').exists()){
			$('#main-menu').scrollTo( target, 0 );
		}else{
			$('#main-menu').scrollTo( target, 800, {easing:'linear'} );
		}
	}
	
	scrollMenu();

	/*
		Resizes the height of the menu based on the actual page size
	*/

	var resizeMenu = function(){
		var wh = window.innerHeight;
		var hh = $("#header").height();
		$("#main-menu").css('height', wh-hh);
	}
	
	/*
		Colors the active section of the menu in Columbia Blue
	*/
	var menuActiveTrailColor = function(){
		$("#main-menu .active-trail").each(function(){
			$('a:eq(0)', this).css('color', '#A6B7C8');
		});
	}
	
	menuActiveTrailColor();


	/*************************** RESIZE ***************************/

	var resizeFunc = function(){
	
		resizeMenu(); //resize the height of the menu
	
		var ww = window.innerWidth;
		$('#tmpltzr .tmpltzr-primaryfull').parent('.views-row').css('clear', 'left'); //for primary-quarters to not float
		$('#tmpltzr .tmpltzr-primaryembed').parent('.views-row').css('clear', 'left'); //for primary-quarters to not float
		$('#tmpltzr .tmpltzr-primaryhalf').parent('.views-row').css('clear', 'left'); //for primary-quarters to not float
		$('#tmpltzr .tmpltzr-primaryimage').parent('.views-row').css('clear', 'left'); //for primary-quarters to not float
		if(ww >= 1270){
			$('#three_col_rt #content').css('width', '800px');
			if(!$('#tmpltzr .tmpltzr-secondary').parent('.views-row').hasClass('views-row-first')){
				$('#tmpltzr .tmpltzr-secondary').parent('.views-row').css('float', 'right');
				}
		}else{
			$('#three_col_rt #content').css('width', '520px');
			//$('#tmpltzr .tmpltzr-secondary').css('float', 'none');
			//$('#tmpltzr .tmpltzr-primary').css('float', 'none');
			$('#tmpltzr .tmpltzr-secondary').parent('.views-row').css('float', 'left');
			
		}
	}
	
	resizeFunc(); //run the resize function on page load
	$(window).resize(resizeFunc); //bind the resize function to the page
	
	
	
	/*************************** LAYOUT ***************************/
	/*
		Function to test for any primaryquarter modules and make sure they don't
		migrate to the top the way secondary modules do
	*/
	var isEven = false;
	$('#tmpltzr .tmpltzr-primaryquarter').each(function(index){	
		if(index == 0){
			if($(this).parent('.views-row').hasClass('views-row-even')){
				$(this).parent('.views-row').css('clear', 'both');
				isEven = true;
			}else{
				$(this).parent('.views-row').css('clear', 'both');
			}
		}else{
			if(isEven){
				$(this).parent('.views-row-even').css('clear', 'both');
			}else{
				$(this).parent('.views-row-odd').css('clear', 'both');
			}
		}
	});
   
}