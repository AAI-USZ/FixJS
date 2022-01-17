function(){
//	$('#content').css({height:'500px'});

	
	$(".datefield").live("focus", function(){
		$(".datefield").datepicker();
	});
	
		
	 $("#sortable").sortable({
	      handle : '.handle',
	      update : function () {
		var order = $('#sortable').sortable('serialize');
			  alert(order);
	      }
    });
		$("table thead").addClass("theader");
//	$("table tr:nth-child(even)").addClass("striped");

	 
	$('.home').live('click',
		function(event){
			document.location="index.php";
		}//end function(event);
	);//end home.click
	
	$('.submit_feedback').live('click',function(event){
		$.get('ajax.switch.php',{target:'feedback'},function(data){
			showPopup('Submit Feedback',data,'auto');
		});
	});
	
	$('.searchYear').live('change',function(){
		var myYear=$(this).val();
		if(myYear != 0){
			var endYear=parseInt(myYear) + 1;
			$('.yearEnd').val(endYear);
		}else{
			$('.yearEnd').val("");
		}
	});

	$(".email_create").live("click",function(){
		 form_data = {
				ajax: '1'
		};
		 myUrl = base_url + "index.php/email/create";
		$.ajax({
			type:"get",
			url: myUrl,
			data: form_data,
			success: function(data){
				showPopup("Create New System Email",data,"auto");
			}
		});
		return false;
	});
	
	$(".email_edit").live("click",function(){
		var myId = this.id.split("_")[1];
		 form_data = {
				kEmail:myId,
				ajax: '1'
		};
		
		 myUrl = base_url + "index.php/email/edit/" + myId;
		$.ajax({
			type:"post",
			url: myUrl,
			data: form_data,
			success: function(data){
				showPopup("Edit System Email Record", data,"auto");
			}
		});
		
	});
	
	$(".log_search").live("click",function(){
		$.ajax({
			type: "get",
			url: base_url +  "index.php/admin/search_log",
			success: function(data){
				showPopup("Search System Logs", data, "auto");
			}
		});
	});
	
	
/*** MISCELLANEOUS SCRIPTS ****/	
	
	$('.closeThis').live('click',
			function(event){
				$("#popupContainer").fadeOut();
				$("#popupSidebar").fadeOut();
   });//end function(event);
	
	$('#close-sidebar').live('click',function(){
		$("#sidebar").fadeOut();
		$("#content").animate({width: "100%"});
		$("narrText").css({width:"100%"});
//		closeSidebar();
	});
	
	
	$('.help').live('click',
			function(event){
				var keys=this.id.split("_");//expect the id to be in the format "helpTopic_helpSubtopic"
				var myTopic=keys[0];
				var mySubtopic=keys[1];
				 myUrl = base_url + "index.php/help/get";
				 form_data = {
						helpTopic: myTopic,
						helpSubtopic: mySubtopic,
						ajax: '1'
				};
				$.ajax({
					type: "get",
					url: myUrl,
					data: form_data,
					success: function(data){
						var title="Help with "+ myTopic + "->"+ mySubtopic;
						showPopup(title, data, "300px");
					}
				});
		});//end function(event)
	
	
	$('.edit_preference').mouseup( function(event){
		 myTeach=$('#kTeach').val();
		var myType=this.id;
		var myValue=$('#'+this.id).val();
		var myTarget="stat"+myType;
		$('#'+myTarget).html("").show();
		 myUrl = base_url + "index.php/preference/update/";
		 form_data = {
				kTeach: myTeach,
				type: myType,
				value: myValue,
				ajax: 1
		};
		$.ajax({
			url: myUrl,
			type: "POST",
			data: form_data,
			success: function(data){
				$('#'+myTarget).html(data).fadeOut(3000);
			}
		});
	});
	
	$('.edit_preference_type').live("click", function(event){
		var myType = this.id.split("!")[1];
		 myUrl = base_url + "preference_type/edit";
		form_data = {
				type: myType,
				ajax: '1'
		};
		$.ajax({
			url: myUrl,
			type: "GET",
			data: form_data,
			success: function(data){
				showPopup("Edit Preference Type", data, "auto");
			}
			
		});
		
	});
	
	$('.create_preference_type').live("click", function(event){
		 myUrl = base_url + "preference_type/create";
		form_data = {
				ajax: '1'
		};
		
		$.ajax({
			url: myUrl,
			type: "GET",
			data: form_data,
			success: function(data){
				showPopup("Create Preference Type", data, "auto");
			}
		});
	});
	
	$('.delete_preference_type').live("click",function(event){
		var myType = this.id.split("!")[1];
		form_data = {
			type: myType,
			ajax: 1
		};
		$question = confirm("Are you sure you want to delete " + myType + "? This cannot be undone!");
		if($question){
			$ask_again = confirm("Are you really, really sure? This could be problematic if users are taking advantage of this preference!");
			if($ask_again){
				$.ajax({
					url: base_url + "preference_type/delete",
					type: "POST",
					data: form_data,
					success: function(data){
						alert(data);
						$("#ptdisplay-" + myType ).hide();
					}
					
				});
			}
		}
	});
	

	$("select.required").live('change', function(event) {
		var fieldName = $(this).attr('name');
		var fieldValue = $(this).val();
		validateField(fieldName, fieldValue);
	});
	
	$("input.required").live('blur', function(event) {
		if ($(this).val() == '') {
			$(this).addClass('error');
			$("form input[type='submit'].button").prop('disabled',true);
			$("form input[type='submit'].button").addClass("active");
		} else {
			$(this).removeClass('error');
			$("form input[type='submit'].button").removeClass("active");
			$("form input[type='submit'].button").prop('disabled',false);
		}
	});
	// $("select.required[value='']").next().html("Required
	// Field!");

	
	$("#browser_warning").live('click',
		function(){
			$(".notice").fadeOut();
		}
	);
	
	}