function() {

		/** To check the pilot project modules during next/previous actions **/

		var fromPage = $('#fromPage').val();

		if (fromPage == "") {

			if($("#selectedPilotProject").val() != "None") {

				isPilotSelected = true;

			} else {

				isPilotSelected = false;

			}

//			alert("inside document ready before calling getPilotProjectModules()..");

			getPilotProjectModules(isPilotSelected);

		}



		/** show version of the default modules **/

		$("input[type=radio]:checked").each(function(i) {

			var version = $(this).val();

			var moduleId = $(this).attr('name');

			$("p[id='" + moduleId + "version']").html(version);

		});

		

		/** Accordian starts **/

		var showContent = 0;

	    

	    $('.siteaccordion').bind('click',function(e){

	        var _tempIndex = $('.siteaccordion').index(this);

	            $('.siteaccordion').removeClass('openreg').addClass('closereg');

	            $('.mfbox').each(function(e){

	                if($(this).css('display')=='block'){

	                    $(this).find('.scrollpanel').slideUp('300');

	                    $(this).slideUp('300');

	                }

	            })

	        if($('.mfbox').eq(_tempIndex).css('display')=='none'){

	            $(this).removeClass('closereg').addClass('openreg');

	            $('.mfbox').eq(_tempIndex).slideDown(300,function(){

	                $('.mfbox').eq(_tempIndex).find('.scrollpanel').slideDown('300');

	            });

	            

	        }

	    });

	    /** Accordian ends **/

		

		changeStyle("features");

		

		$('#finish').click(function() {

			showProgessBar("Creating project...", 100);

			featureUpdate('save');

			return true;

		});



		$('#update').click(function() {

			showProgessBar("Updating project...", 100);

			featureUpdate('update');

			return true;

		});

	         

		$('#previous').click(function() {

		    $("input[type=checkbox]:disabled").each ( function() {

		        $(this).attr('disabled', false)

		    });

		   	var params = "";

	    	if (!isBlank($('form').serialize())) {

	    		params = $('form').serialize() + "&";

	    	}

			params = params.concat("fromPage=");

			params = params.concat($('#fromPage').val());

			params = params.concat("&customerId=");

	    	params = params.concat($("#customerId").val());

			showLoadingIcon($("#tabDiv")); // Loading Icon

		    performAction('previous', params, $('#tabDiv'));

		});

	

		// Description popup js codes

		$("a[name='ModuleDesc']").click(function() {

			var description = $(this).attr("descrContent");

			if (description != "") {

				var imgUrl = $(this).attr("descImage");

				$(".desc_text").empty();

				$(".desc_text").html(description);

				$("#featureImg").attr("src", imgUrl);

				enableModuleDesc('block');

			}

		});

		

		$('#close').click(function() {

			enableModuleDesc('none');

		});

		

		$('#closeDesc').click(function() {

			enableModuleDesc('none');

		});

		

		// Check box change function

		$("input[type=checkbox]").change(function() {

			var checkboxChecked = $(this).is(":checked");

			var moduleId = $(this).val();

			if (!checkboxChecked) {

				var toUncheckVersion = $("p[id='" + moduleId + "version']").html();

				$("input[name='" + moduleId + "']").prop("checked", false);

				$("p[id='" + moduleId + "version']").empty();

				uncheckDependency(moduleId, $(this).attr('class'), toUncheckVersion);

				var name = $(this).attr('class');

				$("input:checkbox[name='" + name + "']").prop("checked", false);

			} else {

				$("input:radio[name='" + moduleId + "']:first").prop("checked", true);

				var version = $("input:radio[name='" + moduleId + "']:first").val();

				$("p[id='" + moduleId + "version']").html(version);

				checkDependency(moduleId, $(this).attr("class"), version);

			}

		});

		

		$('#cancel').click(function() {

			var params = "";

	    	if (!isBlank($('form').serialize())) {

	    		params = $('form').serialize() + "&";

	    	}

			params = params.concat("fromPage=");

			params = params.concat("edit");

			showLoadingIcon($("#container")); // Loading Icon

			performAction('applications', params, $('#container'));

		});

	}