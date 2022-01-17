function () {
	/*************************** UTILITIES ***************************/
	jQuery.fn.exists = function(){return this.length>0;}
	
	if($('.tmpltzr-photoset').exists()){
		$('.tmpltzr-photoset').each(function(){
			var id = $(this).attr('id');
			id = '#' + id;
			console.log('$(id): ' + $(id));
			$(id).jcarousel({
    			scroll: 1,
    			visible: 1,
    			start: 1,
    			width: 500,
    			buttonPrevHTML: '<div></div>',
    			buttonNextHTML: '<div></div>'
    		});
		});
    }
	
    /*************************** MENU ***************************/
	var scrollMenu = function(){
		var target = $('#main-menu ul li.active-trail');
		
		if($('#main-menu ul li.active-trail').exists()){
			if($('#main-menu ul li.active-trail li.active-trail').exists()){
				$('#main-menu').scrollTo( target, 0 );
			}else{
				$('#main-menu').scrollTo( target, 800, {easing:'linear'} );
			}
		}
	}
	
	//scrollMenu(); //scrolls highest level of .active-trail to the top of the menu
	
	/* 
		Adds a dot to all menu items that link to pages off the site
	*/		
	var addDotToMenu = function(m){
		$('li',m).each(function(){
			var anchor = $('a', this);
			var href = anchor.attr('href');
			href = href.substring(0,4);
			if(href == 'http'){
				anchor.append(" •");
				anchor.attr("target", "_blank"); //make sure it opens in a new tab/window
			}
		});
	}
	
	var menu = $("#main-menu ul.menu");
	addDotToMenu(menu);

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
			$('a:eq(0)', this).css('color', '#00D6FF');
		});
	}
	
	menuActiveTrailColor();
	
	
	
	
	/*************************** COURSE BLOGS INDEX ***************************/
	/*
		Evenly arranges columns of links to course blogs based on screen width
	*/
	var evenColumnsCourseBlogsIndex = function(wrapped){
		$('.view-courseblogs').each( function(i){ 
			if(wrapped){ console.log('wrapped'); $('.view-content .views-row', this).unwrap(); }
			var count = $('.view-content .views-row', this).length;
			switch($('#three_col_rt #content').css('width')){
				case "520px":
					var colCount = Math.max(1,Math.floor(count/2));
					$('.view-content .views-row', this).slice(0, colCount).wrapAll('<div class="col" />');
					$('.view-content .views-row', this).slice(colCount, count).wrapAll('<div class="col" />');
					break;
				case "800px":
					var colCount = Math.max(1,Math.floor(count/3));
					$('.view-content .views-row', this).slice(0, colCount).wrapAll('<div class="col" />');
					$('.view-content .views-row', this).slice(colCount, (2*colCount)).wrapAll('<div class="col" />');
					$('.view-content .views-row', this).slice((2*colCount), count).wrapAll('<div class="col" />');
					break;
				default:
					break;
			}
		});
	}
	
	
		$('#semester-list .term-list a.term-index-term').each(function(){
			$(this).bind('click',function(){
				console.log('target');
				var href1 = $(this).attr('href');
				href1 = "#" + href1;
				console.log("href1: " + href1);
				$(window).scrollTo( href1, 200 );
				return false;
			});
		});
	

	//scrollCourseBlogsIndex();
	
	$(document).scroll(function() {
		console.log($(document).scrollTop());
		if($(document).scrollTop() >= 270){
			$("#fixed-header").addClass('fix-header');
			$("#course-blogs-index-listing").css('margin-top','395px');
		}else{
			$("#fixed-header").removeClass('fix-header');
			$("#course-blogs-index-listing").css('margin-top','0');
		}
	});

	/*************************** RESIZE ***************************/
	var resized = false; 
	var resizeFunc = function(post){
	
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
				$('#tmpltzr .tmpltzr-secondaryquote').css('width', '200px').css('margin-top', '0');
				$('#tmpltzr .tmpltzr-secondary-float').parent('.views-row').css('float', 'right');
				}
		}else{
			$('#three_col_rt #content').css('width', '520px');
			//$('#tmpltzr .tmpltzr-secondary').css('float', 'none');
			//$('#tmpltzr .tmpltzr-primary').css('float', 'none');
			$('#tmpltzr .tmpltzr-secondary-float').parent('.views-row').css('float', 'left');
			$('#tmpltzr .tmpltzr-secondaryquote').css('width', '460px').css('margin-top', '-50px');
		}
		evenColumnsCourseBlogsIndex(resized); //even out columns in course blog index
		resized = true; //set to true after the resize function has run once
	}
	
	resizeFunc(); //run the resize function on page load
	$(window).resize(resizeFunc); //bind the resize function to the page
	
	
	
	/*************************** LAYOUT ***************************/
	
   
}