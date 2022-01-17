function() {

	$('#isotope p').click(function(){
		//$('table').find('.descr:visible').hide();
		$(this).find('.descr').slideToggle( animated ? speed : 0, function() { $container.isotope('reLayout'); })
			.click(function(){ $(this).slideUp( animated ? speed : 0, function(){ $container.isotope('reLayout'); }); return false; });
		return false;
	});

	$('.section:not("#index") h3').attr({title:'click to toggle descriptions'});
	$('.section:not("#index") h3').bind('click', function(){
		parent = $(this).parent('.cat');
		if( parent.find('.descr:visible').length > 0 ) {
			parent.find('.descr').slideUp( animated ? speed : 0, function(){ $container.isotope('reLayout'); });
		}
		else {
			parent.find('.descr').slideDown( animated ? speed : 0, function(){ $container.isotope('reLayout'); });
		}
	});

	$("body").live('click',function(e) {
		var node = $(e.target);

		if( node.closest('.section').length == 0
			&& node.closest('.cols').length == 0
			&& node.closest('.mode').length == 0 ){
			$('input#filter').attr({'value':''});
			resetSheet();
		}
	});

	$('input[name="mode"]').bind('change',function() {
		if($(this).is(":checked")){
			$(this).parent('label').addClass('checked');
			$.cookie("mode", 'advanced',{expires:3600});
			advanced = true;
			resetSheet();
			$('.toggle_advanced').hide();
			$('input#filter').attr({'value':''});
			$('input#filter').liveUpdate('table');
		} else {
			$(this).parent('label').removeClass('checked');
			$.cookie("mode", 'simple',{expires:3600});
			advanced = false;
			resetSheet();
			$('.toggle_advanced').show();
			$('#filter').attr({'value':''});
			$('#filter').liveUpdate('table');
		}
	});

	$('input[name="isotopeanim"]').bind('change',function() {
		if($(this).is(':checked')){
			animated = true;
			$(this).parent('label').addClass('checked');
			$.cookie('isotopeanim', 1,{expires:3600});
			$('#isotope .section').removeClass('no-transition');
		} else {$
			animated = false;
			$(this).parent('label').removeClass('checked');
			$.cookie('isotopeanim', 0,{expires:3600});
			$('#isotope .section').addClass('no-transition');
		}
	});

	// $('input#columns').live("change",function() {
	// 	columns = $(this).val();
	// 	$.cookie("cols", columns ,{expires:3600});
	// 	resizeColumns();
	// 	//$('input#filter').attr({'value':''});
	// 	//$('input#filter').liveUpdate('table');
	// });

	$('.cols a').bind("click",function(e) {
		e.preventDefault();
		columns = $(this).data('cols');
		$(this).siblings('a').removeClass('active');
		$(this).addClass('active');
		$.cookie("cols", columns ,{expires:3600});
		resizeColumns();
		//$('input#filter').attr({'value':''});
		//$('input#filter').liveUpdate('table');
	});


	// index filter navigation
	$('#index a').bind('click',function(e){
		e.preventDefault();
		$(this).siblings('a').removeClass('active');
		$(this).toggleClass('active');
		var id = $(this).attr('rel');
		//$('.section:not("#index")').hide();
		//$(id).show();
		$container.isotope({ filter: id });
	});


	//$('#filter').liveUpdate('table');
	$('#filter').live('click *',function(e){
		//console.log($(this).val());
		if($(this).val().length < 1){
			resetSheet();
			$(this).keyup();
		}
	});


	$('#filter').liveUpdate('#isotope');


	// fire event function on window scroll
	var navtop = $('.navigation').offset().top - 1;
	var navwidth = $('.navigation').width();

	$(window).scroll(function(){

		if($('.navigation').length == 0) return;

		posy = $('.navigation').offset().top;
		wtop = $(window).scrollTop();

		//console.log(posy +' : ' + wtop +' : ' + navtop);
		if(posy <= wtop){
			$('.navigation').css({ position: 'fixed', top: 0, width: navwidth });
		}
		if(posy <= navtop){
			//console.log("inline\n");
			$('.navigation').css({ position: 'inherit' });
		}

	});

}