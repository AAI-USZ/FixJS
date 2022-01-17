function(){

// Oft Gecallte Elemente in variablen speichern, wgn Performance //////////
var scroll = $('.scroll-pane');
var content = $('.content');

var browserWindow = $(window);

console.log(scroll);


var headHeight = $('.head').height();
var sidebarWidth = ($('.sidebar').width())*2 + 1;
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
		$('#flash').delay(5000).slideUp(350);
	}
});

$(function() {
	$('a').click(function (){
		$(this).addClass("active");
		})
});

}