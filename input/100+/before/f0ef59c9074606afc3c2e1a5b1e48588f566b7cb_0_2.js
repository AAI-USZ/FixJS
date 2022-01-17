function initButtons() {
	    $('button').button({
                           icons:{
                               primary:"ui-icon-gear",
                               secondary:"ui-icon-triangle-1-s"
                           },
                           text:false
                       }).click(function (event) {
                                    var currentIdMenu = "#menu_actions_" + this.id;
                                    $(currentIdMenu).css("left", this.offsetLeft);
                                  
                                  	$('button').removeClass("active");
                                    $(this).addClass("active");
                                    
                                    // calcul de l'offsetTop
                                    var hauteurMenu = $(currentIdMenu).height() ;
                                    var hauteurBouton =  $(this).height() ;
                                    var offsetTopDefaut = $(this).offset().top + hauteurBouton;
                                    var marginTopDefaut = $(this).marginTop;
                                    if (offsetTopDefaut + hauteurMenu - document.body.scrollTop  > $(window).innerHeight()) {
                                       var offsetTopCible = hauteurMenu + hauteurBouton;
                                        $(currentIdMenu).css("marginTop", - offsetTopCible) ;
                                        $(currentIdMenu).addClass("top");
                                    } else {
                                        $(currentIdMenu).css("marginTop","0") ;
                                        $(currentIdMenu).removeClass("top");
                                    }
									
									$('.tdbase-menu-actions').hide();
                                    $(currentIdMenu).toggle();
                                    
                                    event.stopPropagation();
                                });
      
    //Hide the menus if visible                        
	$('html').click(function() { 
		$('.tdbase-menu-actions').hide();
		$('button').removeClass("active");
	});
	// Hide on leave block
	$('div.portal-default_results-list>div').mouseleave(function(){
	  $('.tdbase-menu-actions').hide();
	  $('button').removeClass("active");
	});

}