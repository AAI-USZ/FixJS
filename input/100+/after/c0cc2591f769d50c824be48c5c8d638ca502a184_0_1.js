function(response, status, xhr){
                    if(status == 'error') { 
                    	$("#osx-modal").modal({
                    		overlayId: 'osx-overlay',
                		containerId: 'osx-container',
                    	});
                    	//alert("Sorry, there was an error.");
                    	parent.history.back();
                    };
                    $("#contentwrapper").css({'visibility':'hidden', 'display': 'block'});
                    var height = $("#contentwrapper").height();
                    $("#contentwrapper").css({'visibility':'', 'display': 'none'});
                    $(".content").animate({height: height}, 500, function(){
                    		$(".content").removeClass("content-loading");
                            $("#contentwrapper").fadeIn(150, function(){
                                    $(".content").css('height','');
                            });
                    });
                }