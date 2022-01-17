function () {
	//Content grid/table switching
	$('a.update_holder').live('click', function(event){
		event.preventDefault();
		target_url = $(this).attr('href')
		$.ajax({
			url: target_url,
			dataType: "html",
			cache: false,
			success: function(data) {
				$("#content_holder").fadeOut(100, function(){
					$("#content_holder").html("").html(data).fadeIn('slow')
				});
			}
		});
	});
	
	// enable history
	if (history && history.pushState) {
    $(function () {
      $('a[data-remote=true]').live('click', function (e) {
        $.getScript(this.href);
        history.pushState(null, document.title, this.href);
        e.preventDefault();
      });
    
      $(window).bind("popstate", function () {
        $.getScript(location.href);
      });
    })
  }
  
  // flash-banner display animation
  if ( $("#flash-banner").not(':empty') ) {
    var topmenuHeight = $("#TM").height();
    $("#flash-banner").animate({
      top: '+=' + topmenuHeight
    }, 1000, function() {
      // first animation is complete, so move it back up after 4 seconds:
      $("#flash-banner").delay(4000).animate({
        top: '0'
      }, 1000, function() {});
    });
  }
}