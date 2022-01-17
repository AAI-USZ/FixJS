function(){

// Oft Gecallte Elemente in variablen speichern, wgn Performance //////////
var scroll = $('.scroll-pane');
var content = $('.content');

var browserWindow = $(window);

console.log(scroll);


var headHeight = $('.head').height();
var sidebarWidth = ($('.sidebar1').width()) + ($('.sidebar2').width());
console.log(headHeight);

var toolheight = function(){
	var height = ((browserWindow.height()) - headHeight).toString();
	console.log(height);
	scroll.css("height", height + "px");
};

var contentWidth = function(){
	if($('.sidebar').length){
	var width = ((browserWindow.width()) - sidebarWidth).toString();
	content.css("width", width + "px");
	}
	//content.css("float", "left");
};

var headerSpacing = function(selector){
	var s1 = $(selector);
	var s1margin = (0 - s1.height() / 2 + 2).toString();
	s1.css('margin-top',s1margin+'px');
}

///////////////////////////////Code Löscht Formulare/////////////////////////////////////////////

function clearForm(form) {
  $(':input', form).each(function() {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); 
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = "";
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};

////////////////////////////////FENSTER GELADEN//////////////////////////////////////////////////

browserWindow.ready( function(){
	toolheight();
 	contentWidth(); 
 	headerSpacing('#projectHead h3'); 
 	headerSpacing('#toolHead h3');
 	headerSpacing('#contentHead h3');
 	browserWindow.trigger('resize');
});
 	
browserWindow.resize(function(){
	contentWidth();
	toolheight();
});

////////////////////////////////SCROLLBAR CODE//////////////////////////////////////////////////

// Scrollbar-Replacement
$(function()
{
	$('.scroll-pane').each(
		function()
		{
			$(this).jScrollPane(
				{
					showArrows: $(this).is('.arrow')
				}
			);
			var api = $(this).data('jsp');
			var throttleTimeout;
			browserWindow.bind(
				'resize',
				function()
				{
					if ($.browser.msie) {
						// IE fires multiple resize events while you are dragging the browser window which
						// causes it to crash if you try to update the scrollpane on every one. So we need
						// to throttle it to fire a maximum of once every 50 milliseconds...
						if (!throttleTimeout) {
							throttleTimeout = setTimeout(
								function()
								{
									api.reinitialise();
									throttleTimeout = null;
								},
								50
							);
						}
					} else {
						api.reinitialise();
					}
				}
			);
		}
	)
});

// Scrollbar-Settings
$(function()
{
	$('.scroll-pane').jScrollPane(
		{
			hijackInternalLinks: true,
			animateScroll: false,
			autoReinitialise: true
		}
	);
});



///////////////////////////////FUNKTIONALER CODE//////////////////////////////////////////////////

//slideUp, Slide Down Toolbar
var add = $('#add');
var details = $('.details');

add.click(function (){
	if( details.css("display") == "none"){
		details.slideDown(350);
	}
});

add.keypress(function(){
	details.slideDown(350);
	$(this).focus();
});

$("#add a").click(function (){
	clearForm($("#add form"));
	details.slideUp(350);
});

//Das Profil-Overlay per Click schließen
$('.overlay .pofileOverlay .closeButton').click($('.overlay').remove());

///////////////////////////////ALL PROJECTS SLIDER //////////////////////////////////////////////////
/*
$('#home').toggle(function() {
	$('#all_projects').slideDown(200);
}, function() {
    $('#all_projects').slideUp(200);
});
*/

///////////////////////////////AUTO DISMISS FLASH//////////////////////////////////////////////
$(function() {
	if("#flash div") {
		$('#flash').delay(2500).fadeOut(1000);
	}
});

$(function() {
	$('a').click(function (){
		$(this).addClass("active");
		})
});


// Check if there is a second sidebar, change Layout accordingly
$(function(){
	if ($('.sidebar2').length) {
		console.log("sidebar2");
		console.log(sidebarWidth);

	} else {
		console.log("no sidebar2");
		console.log(sidebarWidth);
		content.css("left", sidebarWidth);
		content.css("border", "none");
		$('#contentHead').addClass('tool_head_active');
	}
});


// Switch the Tools
//var s = "foo";
//alert(s.indexOf("oo") != -1);

// Check whick tool is active, then apply the active class
$(document).ready(function() {
    var pathname = window.location.pathname;
    console.log(pathname);

    if(pathname.indexOf("settings") != -1 ){
    	$('.settings').addClass("active");

    } else if(pathname.indexOf("coworkers") != -1 ){
    	$('.coworkers').addClass("active");

    } else if(pathname.indexOf("tasklists") != -1 ){
    	$('.milestones').addClass("active");

    } else if(pathname.indexOf("topics") != -1 ){
    	$('.dialogs').addClass("active");

    } else if(pathname.indexOf("dropbox") != -1 ){
    	$('.files').addClass("active");
    
    } else if(pathname.indexOf("github") != -1 ){
    	$('.documents').addClass("active");
    
    } else {
    	$('.overview').addClass("active");
    }

});


// If the unimplemented Account tools are Clicked Flash: Not ready jet

$(function(){
	var flash = $('#flash');
	var disabled_account_tool = $('#account .disabled');
	
	console.log(flash);
	console.log(disabled_account_tool);

	disabled_account_tool.click( function(){
		console.log('click');
		flash.css('display', 'block').html('<div class="alert alert-notice">sorry, this tool isn\'t ready</div>').delay(2000).fadeOut(500);
	});
		

	// $('#account li').click(){
	// 	flash.append('This Tool is not ready jet.');
	// 	flash.fadeIn(500);

	// }

});




}