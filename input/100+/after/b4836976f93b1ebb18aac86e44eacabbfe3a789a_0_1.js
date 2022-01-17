function() 
{
	
	//get list of subcats for add exercise page
	$('#categorySelect').change(function(){
		var catid = $(this).val();
		
		if(catid != -1)
		{
			$.ajax({
				url: "index_ajax.php",
				dataType: "json",
				data: { pag: "getsubcats", catid: catid},
				success: function(data){
					$('#subcategorySelect').html(data.innerHTML);
				}
			});
		}
		
	});
	
	$('#clientsList').dialog({  autoOpen: false, resizable: false })
	$('#pdfInfo').dialog({  autoOpen: false, resizable: false, title: "Info" })
	
	$('.clientList .clientListRow .actions a.program, #add_patient_button').click(function(){
		
		if($('#clientsList div').html() == '')
		{
			$('#clientsList').dialog( "option" , "title", $(this).attr('ptitle') );
			
			var pid = $(this).attr('pid');
		
			$.ajax({
				url: "index_ajax.php",
				dataType: "json",
				data: { pag: "getclients", pid: pid},
				success: function(data){
					$('#clientsList').css('height', '300px');
					
					$('#clientsList div').html(data.innerHTML);
					
					if(typeof($('#clientsList').jScrollPane()) != 'undefined')
						$('#clientsList').jScrollPane();
					
					$('#clientsList').css('width', '300px');
					$('.jspContainer').css('width', '300px');
				}
			});
		}
		
		$('#clientsList').dialog('open');
	});
	
	$('#pdfInfoImg').click(function(){
		$('#pdfInfo').dialog('open');
	});
	
	
	$( "#clientsList div" ).bind( "dialogclose", function(event, ui) {
		$('#clientsList div').html('');
	});
	
	//add scroll
	if(typeof($('.clientListDynamic').jScrollPane()) != 'undefined')
		$('.clientListDynamic').jScrollPane();
		
	if(typeof($('.jsScrollDiv').jScrollPane()) != 'undefined')
		$('.jsScrollDiv').jScrollPane();
			

	$('#filterPatientsUrl').click(function(e){
		e.preventDefault();
		window.location = $(this).attr('href') + '&query=' + $('#filterPatientsValue').val();
	});
	
	$('#searchExerciseButton').click(function(e){
		e.preventDefault();
		window.location = $(this).attr('href') + '&query=' + $('#searchExerciseInput').val();
	});
	
	$('.changeVideoUrl').click(function(){
		var newUrl = "http://www.youtube.com/v/"+$(this).attr('url')+"?version=3&f=videos&app=youtube_gdata&autoplay=0";
		$('#currentVideo').attr('src', newUrl);
	})
	
	//posX = null;
	//posY = null;
	redirect_url = null;
	
	window.bodyClicked = false;
	window.pageReload = false;
	
	$.post("index_ajax.php", { test: "test"}, function(data){
		if(data == 'error' || parseInt(data) == NaN)
		{
			jQuery(".changeURL a").each(function(){
				jQuery(this).attr('href', 'index.php?pag=profile');
			});
		}
	});
	
	$('body').click(function(){
		window.bodyClicked = true;
		setTimeout('restoreDefaultBodyClicked', 500);
	});
	
	$('body').keypress(function(event) {
		if ( event.keyCode == 116 ) {
			window.pageReload = true;
			setTimeout('restoreDefaultPageReload', 500);
		}
	});

	//$(document).bind('mousemove', function(e){
	//	if (typeof e == 'undefined')
	//		myEvent = window.event;
	//	else
	//		myEvent = e;
	//	posX = myEvent.clientX;
	//	posY = myEvent.clientY;
	//});

 	$(window).bind('beforeunload', function(event) {
		if(jQuery('input[name="act"]').val()=='client-update_exercise_plan')
		{
			//if(posY == null || posY <= 25)
			if(!window.bodyClicked)
			{
				redirect_url = jQuery('.preview_buttons .moreBtn:first').attr('href');
			}
			else
				redirect_url = null;
		}
		else 	if(jQuery('input[name="act"]').val()=='client-update_exercise')
		{
			//if(posY == null || posY <= 25)
			if(!window.bodyClicked)
			{
				redirect_url = 'index.php?pag=dashboard';
			}
			else
				redirect_url = null;
		}
	});
		
	$(window).bind('unload', function() {
		if(window.pageReload)
		{
			window.location.reload;
		}
 	 	else if(jQuery('input[name="act"]').val()=='client-update_exercise_plan' && redirect_url != null)
		{
			var redirect = redirect_url;
			redirect_url = null;
			window.location = redirect;
		}
		else if(jQuery('input[name="act"]').val()=='client-update_exercise' && redirect_url != null)
		{
			var redirect = redirect_url;
			redirect_url = null;
			window.location = redirect;
		}
	});
	
	//add submenu
	function show_submenu(obj, submenu)
	{
		hovered = true;
		obj.addClass('topForSubMenu');
		var parOffset = obj.offset();
		var parHeight = obj.css('height');
		submenu.css('top', parOffset.top+parseInt(parHeight));
		submenu.css('left', parOffset.left+'px');
		submenu.css('display', 'block');
		if(submenu.data('hideTimeout'))
			window.clearTimeout(submenu.data('hideTimeout'));
	}
	
	var hovered = false;
	var current = false;
	var parent = false;
	

	function hide_submenu(selector)
	{
      if(hovered)
      {
		$('.item1').removeClass('topForSubMenu');
		$(selector).data('hideTimeout', setTimeout(function(){$(selector).hide(0);}, 1));
      }
	}
	$('.navMenu .item1').hover(
		function()
		{
			var el = $(this);
			if(el.attr('href') == 'index.php?pag=profile')
			{
				parent = el;
				current = $('#submenuList');
				show_submenu(el, current);
			}
			else if(el.attr('href') == 'index.php?pag=programs')
			{
				parent = el;
				current = $('#submenuProgramList');
				show_submenu(el, current);
			}
		},
		function()
		{
			if(hovered)
			{
				hide_submenu(current);
			}
		});
		
	$('#submenuList').hover(
		function(){
			hovered = true;
			parent.addClass('topForSubMenu');
			if($(this).data('hideTimeout'))
				window.clearTimeout($(this).data('hideTimeout'));
		},
		function(){
			$('.item1').removeClass('topForSubMenu');
			hide_submenu('#submenuList');
			hovered = false;
		}
	);	
	
	$('#submenuProgramList').hover(
		function(){
			hovered = true;
			parent.addClass('topForSubMenu');
			if($(this).data('hideTimeout'))
				window.clearTimeout($(this).data('hideTimeout'));
		},
		function(){
			$('.item1').removeClass('topForSubMenu');
			hovered = true;
			hide_submenu("#submenuProgramList");
		}
	);
		
	//save minimized li to cookies
	$('.program_menu li span').click(function(){
		var cokieId = $(this).parent().attr('id');
		var cookieVal = $(this).parent().hasClass('on');
		var cookieOption = {
			path: '/',
			expiresAt: new Date( 2020, 1, 1 )
		};
	
		if(cookieVal)
		{
			$.cookies.set(cokieId , 'on', cookieOption);
		}else
		{
			$.cookies.set(cokieId , 'off', cookieOption);
		}
	});
	
	$('.breadcrumb span.buttons a').click(function(){
		var cookieName = 'currentExerciseViewType';
		var hasNeededClass = $(this).hasClass('details');
		var cookieVal = 'compact';
		if(hasNeededClass)
			cookieVal = 'details';
		var cookieOption = {
			path: '/',
			expiresAt: new Date( 2020, 1, 1 )
		};
		$.cookies.set(cookieName , cookieVal, cookieOption);
	});
	
	$('.item img, .itemCompact img').click(function(){
		var clickedImgUrl = $(this).attr('src');
		clickedImgUrl = clickedImgUrl.match(/([\w]+?)\.jpg/);
		var lightBox = $('<div id="innerLightBoxDiv"><img src="phpthumb/phpThumb.php?src=../upload/'+clickedImgUrl[1]+'.jpg&wl=300&hp=300" /></div>');
		$('#imgLightBox').css('left', '500px');
		$('#imgLightBox').css('top', '200px');
		$('#imgLightBox').css('z-index', '9999999');
		$('#imgLightBox').html(lightBox);
		$('#imgLightBox').show();
	});
	
	$('#innerLightBoxDiv').live('click', function(){
		$(this).parent().hide();
	});
	
	$("#scrollToTop").click(function(){
		$(".jspPane").css('top', 0);
		$(".jspDrag").css('top', 0);
		$(".scrolledList").scrollTop(0);
		$(window).scrollTop(0);
	});
	
	$('#submitPayment').click(function(e){
		e.preventDefault();
		if($(this).data('planChosen')!=true)
		{
			alert('Your trial has expired. Please select another plan.');
			return false;
		}
		else
			window.location = $(this).attr('href');
	});
	
	$('.showLimitError').click(function(e){
		e.preventDefault();
		if(confirm("Trial user can't add more than 5 programs. Do you want to upgrade your plan?"))
		{
			window.location = 'index.php?pag=profile_payment';
		}
		else
		{
			return false;
		}
	});
	
		// error messages box
	$(".info a,.success a,.warning a,.error a").live('click',function(e)
	{
		$(this).parent().fadeOut("slow");
		e.preventDefault();
		e.stopPropagation();
	});

	// make the category / subcategory list menu for the ADD CLIENT EXERCISE PAGE
	if($(".programCategoryList").length > 0)
	{
		$('.programCategoryList ul li.parent span').live('click',function(e){
			$(this).parent().find('ul').toggle("slow");
			$(this).parent().toggleClass("on");
		//	e.preventDefault();
			e.stopPropagation();
		});
		if($('.programCategoryList ul li.parent ul').length > 0)
			$('.programCategoryList ul li.parent ul').parent().toggleClass("on");
	}

	// PREPARE to add program to client
	if($(".programText").length > 0)
	{
	   $('.moreBtn').live('click',function(e)
		{
			if($(this).hasClass('programBtn'))
			{
				var pid = $(this).attr('id');
				var epid = $(this).attr('epid');
				e.stopPropagation();	
				e.preventDefault();
				$.post("index_ajax.php", { pag: "pgetexercise", pid: pid, epid: epid }, function(data){ doExercise(data); });
			}
			else
			{
				var pid = $(this).attr('id');
				var cid = $(this).attr('cid');
				e.stopPropagation();	
				e.preventDefault();
				$.post("index_ajax.php", { pag: "xgetexercise", pid: pid, cid: cid }, function(data){ doExercise(data); });
			}
				//	$.getJSON('index_ajax.php?pag=xgetexercise&pid='+pid, function(data) { doExercise(data); });
		});	
	}
	
	if($(".programCompact").length > 0)
	{
	   $('.moreBtn').live('click',function(e)
		{
			if($(this).hasClass('programBtn'))
			{
				var pid = $(this).attr('id');
				var epid = $(this).attr('epid');
				e.stopPropagation();	
				e.preventDefault();
				$.post("index_ajax.php", { pag: "pgetexercise", pid: pid, epid: epid }, function(data){ doExercise(data); });
			}
			else
			{
				var pid = $(this).attr('id');
				var cid = $(this).attr('cid');
				e.stopPropagation();	
				e.preventDefault();
				$.post("index_ajax.php", { pag: "xgetexercise", pid: pid, cid: cid }, function(data){ doExercise(data); });
			}
			//	$.getJSON('index_ajax.php?pag=xgetexercise&pid='+pid, function(data) { doExercise(data); });
		});	
	}
	
	$("#exerciseAdd").bind('click',function(e)
	{
		window.bodyClicked = true;
		e.stopPropagation();	
		e.preventDefault();
		doSave();
	});
	makeSortable();
	makeDelete();
	doExerciseDetails();
	doExerciseCompactViewDetails();
	
	$('.lang a').click(function(){
		var lang = $(this).attr('value');
		document.cookie = 'language' + "=" + escape(lang) + "; expires=" + new Date( 2020, 1, 1 ) +  "; path=/";
	});
	
	//delete image preview
	$('img.delete_image').click(function(e){
		$.ajax({url: "index_ajax.php",
				dataType: "json",
				data: { programs_id: $("input.[name='programs_id']").val(), act: 'member-delete_image' }
				})
			.done(function( msg ) {
				if(msg.failure == false){
					$('img.delete_image, .image_preview').hide(200);
					$('#image_uploaded').val('0');
				}
			}
		);
	});
	
	// make current url for different languages at top flags
	var regExpr = /\/..\/.*/i;					
	if(regExpr.exec(window.location.pathname)){
		$('#lang_en').attr('href', (window.location.pathname+window.location.search).toString().substr(3));
		$('#lang_us').attr('href', (window.location.pathname+window.location.search).toString());
	}else{
		$('#lang_en').attr('href', (window.location.pathname+window.location.search).toString());
		$('#lang_us').attr('href', ('/us'+window.location.pathname+window.location.search).toString());
	}
	
	$('#modify_program_button').click(function(e){
		if($(this).attr('href') == 'javascript:void(0);')
			return false;
		
		e.preventDefault(); 
		var url = $(this).attr('href');
		var first = escape($('#first_name').val());
		var surname = escape($('#surname').val());
		var appeal = escape($('#appeal').val());
		var email = escape($('#email').val());
		url += '&first='+first+'&surname='+surname+'&appeal='+appeal+'&email='+email;
		location.href = url;
	});
	
}