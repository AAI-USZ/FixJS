f


//$('#myModal1').modal({show:false});

//$('#example2').modal({show:false});

//$('#example2').modal('show');







$('#someOtherId').popover(); 

$('td.tenantNameEditorClass a').popover();

$('td.tenantNameClass a').popover();

$('td.roomNumberClass a').popover();

$('td.roomNumberEditorClass a').popover();

$('td.paymentHistoryClass a').popover();

$('td.payRentClass a').popover();

$('td.deleteTenant a').popover();

$('td.tenantActivityClass a').popover();

$('td.checkinOrOutClass a').popover();

$('td.roomRentalStatus a').popover();

$('td.deleteRoomClass a').popover();



$('#currentTenantTableId td.tenantNameEditorClass a').popover();

$('#currentRoomTableId td.roomNumberEditorClass a').popover();









	$('#checkoutHrefId').click(function(){		

		//alert("you click checkout");

		var tenantKey = $(this).data('tenant-key');

		$.ajax({

			url:"checkout?tenant_key=" + tenantKey,

			type:'GET',

			dataType:'json',

			success: function(data_json){

				$('#tenantOrRoomProfile').html(checkoutForm(tenantKey,data_json)).show();

			}

		});

		

			

	

	

	});

	

	//check out a tenant

	$('div.checkout button').click( function (){

		var tenantKey = $(this).data('tenant-key');

		var unpaidrent = $(this).data('tenant-unpaidrent');

		var firstName = $(this).data('tenant-firstname');

		var surname = $(this).data('tenant-surname');



		//var r = confirm("Warnning: Please make sure the rent is clear before checkout!");

		if (unpaidrent > 0 ){

			var r = confirm("Do you want to pay the unpaid rent now?");

			if (r){



				$('#tenantOrRoomProfile').html(payRentForm(tenantKey,firstName,surname)).show();

			}

			

		}else {		

			$.ajax({

				url:"/checkout?tenant_key=" + tenantKey,

				type: 'DELETE',

				success: function(resp) {

				alert(resp.checkoutSuccessNotice);

				window.location.replace("../tenants");				

				}



			});

			return false;		

		}

	

	});

	

	//delete a tenant

	$('#tenantDeletionHrefId').click(function(evt){

	//$('td.deleteTenant button').click(function (evt) {

		var tenantKey = $(this).data('tenant-key');

		//alert(tenantKey);

		var r = confirm("Warnning: Do you want to delete this tenant?");

		if (r) {

			$.ajax({

				url: "/tenantDeletion?tenant_key=" + tenantKey,

				type: 'DELETE',

				success: $.proxy(function (resp) {

					if (resp.tenantDeletionSuccessNotice) {

					$(this).parentsUntil('tr').parent().remove();

					alert(resp.tenantDeletionSuccessNotice);

					} else {

					alert(resp.tenanIsNotCheckoutNotice);

					}

				}, this),

				error: $.proxy(function () {

					alert('failed');

				}, this)

			});

			return false;

		}

	});

	

//delete a room	

	$('td.deleteRoom button').click(function(evt){

		var key = $(this).data('room-key');

		var r = confirm("Warnning: Do you really want to delete this room?");

		if (r) {

			$.ajax({

				url:"/roomDeletion?room_key=" + key,

				type: 'DELETE',

				success: $.proxy(function(resp) {

					if (resp.roomDeletionSuccessNotice) {

						$(this).parentsUntil('tr').parent().remove();

					alert(resp.roomDeletionSuccessNotice);

					

					}else {

						alert(resp.roomIsOccupiedNotice);

					}

				}, this),

					

				error: $.proxy(function() {

					alert('The room was not deleted');

				}, this)

			});

			return false;

		}

		

	});

	

	

	$('#room_key').change(function () {		

		var roomKey = $('#room_key').val();

		var url = "roomInfo?room_key=" + roomKey;

		//$('#roomInfo').html(roomKey);

		//console.log(">>>" + url);

		$('#roomInfo').html('<iframe src="' + url + '">');

		return false;

	});

	

	//Get the profile of the room

	//$('#selectRoom').change(function(){

	//$('.selectRoomClass select').change(function(){ //use container:"selectRoomClass" instead of id:#selectRoom

	$('#tenantFormOrTable').on('change', '.selectRoomClass select', function(){

		var value = $('.selectRoomClass select').val();

		if(value == "title"){

			$('#showRoomInfo').children().remove();

		} else {

			var roomKey = value;

			$.ajax({

				url: 'roomProfileData?room_key=' + roomKey, //get the selected room profile from the server side

				type: 'GET',

				dataType:'json',

				success: function(data_json){

					$('#showRoomInfo').html(creatShowRoomProfileForm(roomKey,data_json)).show();

				}		

			

			});	

		}



	});

	

		

	//$('#showRoomInfo').on('change','#orderRoomForm :checkbox',function(evt){ //attaching "change" event to dynamic html elements

	//$('#showRoomInfo').on('change','#orderRoomForm :radio',function(evt){	//attaching radio "change" event to dynamic html elements	

	$('#tenantFormOrTable').on('change','#orderRoomForm :radio',function(evt){ //attaching radio "change" event to dynamic html elements	

		var $this = $(this),

		checked = $this.is(':checked');		//get the boolean of the radio's status

		$this.parent().find('input[type="text"]').attr('disabled', !checked); //works,Tim's version--enables the text to be changable

		return false;

	});

	



	//reset room information

	$('#tenantFormOrTable').on('click', '#checkInForm input[type = reset]', function(){

		//alert("you want to reset?");	

		$('#showRoomInfo').children().remove();

	});

	

	//cancel checkin

	$('#tenantFormOrTable').on('click', '#checkinFormCancel', function(){

		//alert("you want to cancel?");

		$('#tenantFormOrTable').children().remove();

	});

	



	$('#tenantFormOrTable').on('submit', '#tenantRegister', function(){  //version 2

		//$('#tenantRegister').submit(function() {

			

			var values = $('#tenantRegister').serializeArray(),

				data = {};

			$.each(values, function(index,item){

				if (item.name == 'firstName'){

					data.firstName = item.value;

				} else if (item.name == 'surname') {

					data.surname = item.value;

				} else if (item.name == 'tenant_age') {

					data.age = item.value;

				}else if (item.name == 'tenant_gender') {

					data.gender = item.value;

				} else if (item.name == 'tenant_phoneNumber') {

					data.phoneNumber = item.value;

				} else if (item.name == 'tenant_email') {

					data.email = item.value;

				} else if (item.name == 'contact_name') {

					data.contactName = item.value;

				} else if (item.name == 'contact_phoneNumber') {

					data.contactPhoneNumber = item.value;

				} else if (item.name == 'register_date') {

					data.registerDate = item.value;

				}

			});

			var dataStringJson = JSON.stringify(data);

			console.log('>>>tenantRegister1',dataStringJson );

			$.ajax({			

				url:'tenantRegister',

				type: 'POST',

				data: dataStringJson,

 

				success: function(resp) {

					$('#tenantFormOrTable').children().remove();

					alert(resp.tenantRegisterMsg);

					$('#currentTenantTableId > tbody').append('<tr><td class="tenantNameEditorClass"><a href="#" rel="popover" data-content="click to Edit ' 

					+ data.firstName + '_' + data.surname + ' profile"  data-original-title="Remainder:" >'

					+ data.firstName + ' ' + data.surname +'</a></td><td>'

					+ data.gender + "</td><td>"

					+ data.age + "</td><td>"

					+ data.phoneNumber + "</td><td>" 

					+ data.email + "</td><td>"

					+ data.contactName + "</td><td>"

					+ data.contactPhoneNumber + '</td><td>'

					+ data.registerDate + '</td><td class="checkinOrOutClass">'

					+ '<a href="#" id="checkinHrefId" rel="popover" data-content="click to check'

					+ data.firstName + data.surname + 'out"> Check In </a></td><td>'

					+ 'Delete</td><td>Activities</td></tr>'

					);

				 }



			});



			//console.log('>>>tenantRegister2');

			return false;				

		});		

	

	// Register a New Tenant page

	$('#registerTenant').click(function(){

		//alert("you click register");

		$('#tenantFormOrTable').html(createRegisterTenantForm()).show();

		//alert("validate the tenant form?");

		$('#tenantRegister').validate(		

		);	

	});

	

	

	//remove the tenant register form

	$('#tenantFormOrTable').on('click', '#registerTenantCancel', function(){ //version 2

		$('#tenantFormOrTable').children().remove();

	});

	

	// get the register room form

	$('#registerRoom').click(function(){	//version 2		

		$('#roomFormOrTable').html(createRegisterRoomForm()).show();

		$('#roomRegister').validate();

	

	});

	

	//remove the room register form

	$('#roomFormOrTable').on('click', '#registerRoomCancel', function(){  //version 2

		$('#roomFormOrTable').children().remove();

	});

				

	//submit the register room form

	$('#roomFormOrTable').on('submit', '#roomRegister', function(){ //version 2

		var values = $('#roomRegister').serializeArray(),

			data = { };

		$.each(values, function(index,item){

			if (item.name == 'room_number'){

				data.roomNumber = item.value;

			} else if (item.name == 'room_area') {

				data.roomArea = item.value;

			}else if (item.name == 'room_rent_single') {

				data.rentSingle = item.value;

			} else if (item.name == 'room_rent_double') {

				data.rentDouble = item.value;

			}

		

		});

		var dataStringJson = JSON.stringify(data);

			console.log('>>>roomRegister1',dataStringJson );

		$.ajax({			

			url:'/roomRegister',

			type: 'POST',

			data: dataStringJson,



			success: function(resp) {

				$('#roomFormOrTable').children().remove();

				alert(resp.roomRegisterMsg);

				$('#currentRoomTableId > tbody').append('<tr><td class="roomNumberEditorClass"><a href="#" rel="popover" data-content="click to Edit Room ' 

				+ data.roomNumber + ' profile"  data-original-title="Remainder:" >'

				+ data.roomNumber + '</a></td><td>'

				+ data.roomArea + '</td><td>'

				+ data.rentSingle + '</td><td>'

				+ data.rentDouble + '</td><td class="checkinOrOutClass">'

				+ '<a href="#" id="roomVacantId" rel="popover" data-content="click to check Room '

				+ data.roomNumber + 'status"> Vacant </a></td></tr>'

				);

			}

		});

		return false;

	

	});



	//checkin form validation



		// $('.error').hide();

		// $(".submitButton").click(function(){

			// $('.error').hide();

			// var startDate = $("input#tenant_startDate").val();

			// if (startDate == ""){

				// $("label#startDate_error").show();

				// $("input#tenant_startDate").focus();

				// return false;

			// }

		// });

		

	//get the tenant check in form

	$('#checkinHrefId').click(function(){ //version 2

		var tenantKey = $(this).data('tenant-key');

		

		$.ajax({

			url:"/tenantCheckin?tenant_key=" + tenantKey,

			type:'GET',

			dataType:'json',

			success:function(resp){

				if (resp.noVacancyResponse){

					alert(resp.noVacancyResponse);

				}else{

					var tenant_data,rooms_data;

					for (var i = 0; i < resp.length; i++) {

						tenant_data = resp[i].tenantProfile;

						rooms_data = resp[i].roomsProfile;

					}

					$('#tenantFormOrTable').html(creatCheckinForm(tenantKey,tenant_data,rooms_data)).show();

					$('#checkInForm').validate({

						submitHandler: function(form) {

							alert("submit");

						 		var values = $('#checkInForm').serializeArray(),

								data = { };

								var valuesOrderRoomForm = $('#orderRoomForm').serializeArray();

								console.log('>>>values',values);

								$.each(values, function(index, item) {

									if (item.name == 'tenant_key'){

										data.tenantKey = item.value;

									}

									if (item.name == 'tenant_startDate') {

											data.startDate = item.value;

									}

									if (item.name == 'tenant_payPeriod') {

										data.payPeriod = item.value;

									}

								}); 

								var value = $('.selectRoomClass select').val();

								if(value == "title"){

									alert('please select a room first');

								}else if (!$('#singleRentRadioId').prop('checked')&& !$('#doubleRentRadioId').prop('checked')){

									alert('you did not tick the box');

								} else{

									$.each(valuesOrderRoomForm, function (index, item) {

								

										if (item.name == 'room_rentSingle' || item.name === 'room_rentDouble') {			

											data.actualRent = item.value;

										}else {			

											data[item.name] = item.value;

										}

									});

								

									console.log('>>>data',data);

									var dataStringJson = JSON.stringify(data);

									

									var r = confirm("Do u really want to check in this room?");

									if(r) {

									$.ajax({

										url: '/tenantCheckin',

										type: 'POST',

										data: dataStringJson,

										success: function(resp) {				

											alert(resp.checkinSuccessMessage);

											window.location.replace("../tenants");

										} 

									});					

									return false;

									}

								}

								return false;

						

						}

					

					});



				}

			}		

		

		});

		return false;

	});



	//submit the tenant check in form

	$('#tenantFormOrTable').on('click', '#checkInForm1', function(){  //version 2

		$('#checkInForm').submit();

 		// var values = $('#checkInForm').serializeArray(),

			// data = { };

		// var valuesOrderRoomForm = $('#orderRoomForm').serializeArray();

			// console.log('>>>values',values);

		// $.each(values, function(index, item) {

			// if (item.name == 'tenant_key'){

				// data.tenantKey = item.value;

			// }

			// if (item.name == 'tenant_startDate') {

					// data.startDate = item.value;

			// }

			// if (item.name == 'tenant_payPeriod') {

				// data.payPeriod = item.value;

			// }

		// }); 

		// var value = $('.selectRoomClass select').val();

		// if(value == "title"){

			// alert('please select a room first');

		// }else if (!$('#singleRentRadioId').prop('checked')&& !$('#doubleRentRadioId').prop('checked')){

			// alert('you did not tick the box');

		// } else{

			// $.each(valuesOrderRoomForm, function (index, item) {

		

				// if (item.name == 'room_rentSingle' || item.name === 'room_rentDouble') {			

					// data.actualRent = item.value;

				// }else {			

					// data[item.name] = item.value;

				// }

			// });

		

			// console.log('>>>data',data);

			// var dataStringJson = JSON.stringify(data);

			

			// var r = confirm("Do u really want to check in this room?");

			// if(r) {

			// $.ajax({

				// url: '/tenantCheckin',

				// type: 'POST',

				// data: dataStringJson,

				// success: function(resp) {				

					// alert(resp.checkinSuccessMessage);

					// window.location.replace("../tenants");

				// } 

			// });					

			// return false;

			// }

		// }

		// return false;

	});



// display room profile on bootstrap modal

$('td.roomNumberClass a').click(function () {

	$('#modal1').modal('show');

	var roomKey = $(this).data('room-key');

	$.ajax({

		url:"roomProfileData?room_key="+roomKey,

		type:'GET',

		dataType:'json',

		success: function(data_json){

			$('#modal1').trigger("renderRoomProfileFormEvent", [ data_json ]);		

		}

	});

	

});



//$('#modal1').bind('myCustomEvent',function(e, roomProfileData){ //both "on" and "bind" are working here

$('#modal1').on('renderRoomProfileFormEvent',function(e, roomProfileData){

	$('h3').text("Room Profile");

	$('#displayHereId').html(roomProfileTable(roomProfileData));

});



//display tenant profile on bootstrap modal

$('td.tenantNameClass a').click(function() {

	$('#modal1').modal('show');

	var tenantKey = $(this).data('tenant-key');

	$.ajax({

		url:"tenantProfileData?tenant_key=" + tenantKey,

		type:'GET',

		dataType:'json',// this is important in order to secure the returned data type!!

		success: function(data_json){			

			$('#modal1').trigger("renderTenantInfoFormEvent", [ data_json ]);

		}

	});



});



$('#modal1').on('renderTenantInfoFormEvent',function(e, tenantProfileData){

	$('h3').text("Tenant Profile");

	$('#displayHereId').html(tenantInfoTable(tenantProfileData));

});



//display tenant payment history on bootstrap modal

	$('td.paymentHistoryClass a').click(function(){

		$('#modal1').modal('show');

		var totalPaidRent= $(this).data('totalpaidrent');

		if(!(totalPaidRent == 0)){

			var tenantKey = $(this).data('tenant-key');

			//var tenantState = $(this).data('tenant-state');

			$.ajax({

				url:"paymentHistory?tenant_key=" + tenantKey,

				type:'GET',

				dataType:'json',// this is important in order to secure the returned data type!!

				success: function(data_json){

					$('#modal1').trigger("tenantPaymentHistoryFormEvent", [ data_json ]);

				}				

			});	

		}



	});

		

$('#modal1').on('tenantPaymentHistoryFormEvent', function(e,tenantPaymentHistoryData){

	$('h3').text("Tenant Payment History");

	$('#displayHereId').html(paymentHistoryTable(tenantPaymentHistoryData)) ;



});



//display tenant activities on bootstrap modal

$('td.tenantActivityClass a').click(function(){

	$('#modal1').modal('show');

	var tenantKey = $(this).data('tenant-key');

	$.ajax({

		url:"showActivity?tenant_key=" + tenantKey,

		type: 'GET',

		dataType: 'json',

		success: function(data_json){

			$('#modal1').trigger('tenantActivityFormEvent', [data_json]);

			//$('#showTenantActivities').html(tenantActivityTable(data_json)).show();

		}					

	});



});



$('#modal1').bind('tenantActivityFormEvent', function(e, tenantActivityData){

	$('h3').text("Tenant Activities");

	$('#displayHereId').html(tenantActivityTable(tenantActivityData));



});



	//New toggling the room profile

	$('td.roomNumberClass1 a').toggle(function() {

		var roomKey = $(this).data('room-key');

		var tenantState =$(this).data('tenant-state');

		$.ajax({

			url:"roomProfileData?room_key="+roomKey,

			type:'GET',

			dataType:'json',

			success: function(data_json){

				if(tenantState == "pending") { 

						$('#pendingTenantProfile').html(roomProfileTable(data_json)).show();				

				} else if (tenantState == "cleared") {

						$('#clearedTenantProfile').html(roomProfileTable(data_json)).show();

				} else {

						$('#tenantOrRoomProfile').html(roomProfileTable(data_json)).show();						

				} 							

			

			}

		});

	

	}, function(){

			$('#pendingTenantProfile').hide();

			$('#clearedTenantProfile').hide();

			$('#tenantOrRoomProfile').hide();

			return false;

	});



	

	

//display pay rent form on bootstrap modal

	$('td.payRentClass a').click(function (e) {	

	$('#modal1').modal('show');

	//var tenantKey = $(this).data('tenant-key');

	var firstName = $(this).data('tenant-firstname');

	var surname = $(this).data('tenant-surname');

	var paymentkey = $(this).data('paymentkey');

	$('#modal1').trigger("modalDisplayEvent", [firstName,surname,paymentkey]);		

	



	e.preventDefault();

});





//$('#modal1').bind('myCustomEvent',function(e, roomProfileData){ //both "on" and "bind" are working here

$('#modal1').on('modalDisplayEvent',function(e,firstName,surname,paymentkey){



	$('h3').text("Pay Rent Form");

	$('#displayHereId').html(payRentForm(firstName,surname,paymentkey));

		$('#payRentFormId').validate({	//validate method is called to validate the pay rent form

		rules: {

			 payAmount: {

				required: true,

				number: true,

				minlength: 2 //requires the payment at least 2 digits($10) 

			},

			 payDate: {

				required: true,

				date: true

			 

			 }

		   },

	   messages: {

			payAmount: {

				required: "Please type in the amount you want to pay",

				number: "Please type in a positive number",

				minlength: "please pay at least $10"

			},

			payDate: {			

				required: "please type in the date you want to pay",

				date: "the pay date should be in the format of date"

			}

	   },

	

		submitHandler: function(form) {  //this submitHandler handles the "pay rent form" submit event

			var values = $('.payRentFormClass').serializeArray(),

			data = {};	

			$.each(values, function(index, item) {

				data[item.name] = item.value;

			});

			var dataStringJson = JSON.stringify(data);	

			//alert("you get " + dataStringJson);

			$('#modal1').modal('hide');

			console.trace();

			$.ajax({

				url:'payRent',

				type:'POST',

				data: dataStringJson,

				success:function(resp){

					alert(resp.payRentSuccessNotice);

					window.location.replace("../");				

				}

			});		

		}

    });

	

	e.preventDefault();

});



//$('#modal1 #payRentFormId').validate();

//$(".payRentFormClass").validate();





$('#modal1 .modalSubmitBtn').click(function(){	//this event triggers the dynamic "pay rent form" to be submitted

		$('#payRentFormId').submit();	//this submit is handled by the "submitHandler" in the validate method 	

});



	 



$('#modal1').on('payRentFormSubmitEvent1',function(e){

	//$('#displayHereId').on('submit','#payRentFormId',function(evt){

		alert("here is here");

		console.debug($('#payRentFormId'));

		$('#payRentFormId').validate();

		//var script = document.createElement("script");

		//script.src = 'http://jzaefferer.github.com/jquery-validation/jquery.validate.js';

		//script.type = 'text/javascript';

		//document.getElementsByTagName("form")[0].appendChild(script);

		//document.getElementById("modalBodyId").appendChild(script);

		//$('.payRentFormClass').validate();

	});



//$('#payRentFormId').on('submit', function(){ //call on payRentFormId also works 

$('.payRentFormClass1').on('submit',function(){ 

//$('.payRentFormClass').bind('submit',function(e){ 

//$('#modal1').on('payRentFormSubmitEvent',function(e){

	alert('you click pay now button');

	

	

	//$("#payRentFormId").validate();

	//$('#payRentFormSubmitBtnId').click();

	var values = $('#modal1 .payRentFormClass').serializeArray(),

	data = {};	

	$.each(values, function(index, item) {

		data[item.name] = item.value;

	});

	var dataStringJson = JSON.stringify(data);	

	alert("you get " + dataStringJson);

	//$('#modal1').modal('hide');

	console.trace();

	$.ajax({

		url:'payRent',

		type:'POST',

		data: dataStringJson,

		success:function(resp){

			//alert("heeeee");

			alert(resp.payRentSuccessNotice);

			window.location.replace("../");				

		}

	});			

	preventDefault();

	//return false;

});





	//toggling the tenant's payment history

	$('td.paymentHistoryClass1 a').toggle(function() {

	

		var totalPaidRent= $(this).data('totalpaidrent');

		if(!(totalPaidRent == 0)){

			var tenantKey = $(this).data('tenant-key');

			var tenantState = $(this).data('tenant-state');

			$.ajax({

				url:"paymentHistory?tenant_key=" + tenantKey,

				type:'GET',

				dataType:'json',// this is important in order to secure the returned data type!!

				success: function(data_json){

					if(tenantState == "pending") { 

							$('#pendingTenantProfile').html(paymentHistoryTable(data_json)).show();

							//$('#pendingTenantProfile').html(jqTable).show();					

					} else if (tenantState == "cleared") {

							$('#clearedTenantProfile').html(paymentHistoryTable(data_json)).show();

				

					}

				}				

			});	

		}

	},function() {

		$('#pendingTenantProfile').hide();

		$('#clearedTenantProfile').hide();

		return false;

	});

	



	

	//new toggling the tenant'profile

	$('td.tenantNameClass1 a').toggle(function() { 

		var tenantKey = $(this).data('tenant-key');

		var tenantState = $(this).data('tenant-state');

		$.ajax({

			url:"tenantProfileData?tenant_key=" + tenantKey,

			type:'GET',

			dataType:'json',// this is important in order to secure the returned data type!!

			success: function(data_json){

				if(tenantState == "pending") { 

						$('#pendingTenantProfile').html(tenantInfoTable(data_json)).show();

						//$('#pendingTenantProfile').html(jqTable).show();					

				} else if (tenantState == "cleared") {

						//$('#clearedTenantProfile').html(jqTable).show();

						$('#clearedTenantProfile').html(tenantInfoTable(data_json)).show();

				} else {

						//$('#tenantOrRoomProfile').html(jqTable).show();

						$('#tenantOrRoomProfile').html(tenantInfoTable(data_json)).show();						

				} 							

		}

		});

		},function(){

			$('#pendingTenantProfile').hide();

			$('#clearedTenantProfile').hide();

			$('#tenantOrRoomProfile').hide();

			return false;

		});

		

	//toggling Tenant's Activities Table

	//$('#activityHrefId').toggle(function(){

	$('td.tenantActivityClass1 a').toggle(function() {

	//$('#tenantOrRoomProfile').on('toggle','#tenantActivityHrefId',function(evt){

	//$('#tenantActivityHrefId').toggle(function(){

		var tenantKey = $(this).data('tenant-key');

		//alert("you click activity");

		$.ajax({

			url:"showActivity?tenant_key=" + tenantKey,

			type: 'GET',

			dataType: 'json',

			success: function(data_json){

				$('#showTenantActivities').html(tenantActivityTable(data_json)).show();

			}					

		});

	

	},function(){

			$('#showTenantActivities').hide();

			return false;

	});

		

		

	//toggling tenant history

	$('#tenantHistoryHrefId').toggle(function(){

		$.ajax({

			url:"tenantHistory",

			type:'GET',

			dataType:'json',// this is important in order to secure the returned data type!!

			success: function(data_json){

				$('#tenantOrRoomProfile').html(tenantHistoryTable(data_json)).show();		

			}

		});		

	},function(){

			$('#tenantOrRoomProfile').hide();

			return false;

	});	

	



	

	//New toggling the tenant'profile Editor

	$('td.tenantNameEditorClass a').toggle(function(){

		var tenantKey = $(this).data('tenant-key');

		$.ajax({

			url:"tenantProfileData?tenant_key=" + tenantKey,

			type:'GET',

			dataType:'json',

			success: function(data_json){

				$('#tenantOrRoomProfile').html(tenantProfileEditorTable(tenantKey,data_json)).show();

			}

		});

	

	},function(){

			$('#tenantOrRoomProfile').hide();

			return false;

	});

	

	

	

	//New toggling the room'profile Editor

	$('td.roomNumberEditorClass a').toggle(function() {

		var roomKey = $(this).data('room-key');

		$.ajax({

			url:"roomProfileData?room_key=" + roomKey,

			type:'GET',

			dataType:'json',

			success: function(data_json){

				$('#tenantOrRoomProfile').html(roomProfileEditorTable(roomKey,data_json)).show();

			}

		});

	

	

	},function(){

			$('#tenantOrRoomProfile').hide();

			return false;

	});



	



	

	

	//$('td.payRentClass a').click(function(evt) { //works

	//$('#payRentBtnId1').click(function(evt) {

	//$('#payRentBtnId1').toggle(function() {

	$('td.payRentClass1 a').toggle(function() {

	//$('td.payRentClass a').bind("toggle",(function() {//not working

	//$('#payRentBtnId1').bind("click", (function() { //works 

	//alert("it workssss");



		var tenantKey = $(this).data('tenant-key');

		var firstName = $(this).data('tenant-firstname');

		var surname = $(this).data('tenant-surname');

		var tenantState = $(this).data('tenant-state');

		if(tenantState == "pending") { 



			$('#pendingTenantProfile').html(payRentForm(tenantKey,firstName,surname)).show();

		} else {

			$('#clearedTenantProfile').html(payRentForm(tenantKey,firstName,surname)).show();

		}



	},function() {

		$('#pendingTenantProfile').hide();

		$('#clearedTenantProfile').hide();

		return false;

	});



	//validate payRent form

	//$('.error').hide();

	$(".payRentSubmitButton").click(function(){

	//alert("you click payRent");

		$('.error').hide();

		var payAmount = $("input#pay_Amount").val();

		if (payAmount == "null"|| payAmount == ""){

			$("label#payAmount_error").show();

			$("input#pay_Amount").focus();

			return false;

		}

		

		var payDate = $("input#pay_Date").val();

		if(payDate == ""){

			$("label#payDate_error").show();

			$("input#pay_Date").show();

		

			return false;

		}

	});

	



	

	

	

	

	

	//$('#payRentForm').submit(function(){

	$('#pendingTenantProfile').on('click','#payRentSubmit_btn',function(evt){	//attaching "change" event to dynamic html elements	

	//$('#payRentSubmit_btn').click(function() {

	//$('payRentName').submit(function() {

		//$('#payRentSubmit_btn').attr('disabled', true);

		var values = $('#payRentFormId1').serializeArray(),

		

		data = {};

		$.each(values, function(index, item) {

			data[item.name] = item.value;

		}); 

		var dataStringJson = JSON.stringify(data);

		$.ajax({

			url:'/payRent',

			type:'POST',

			data: dataStringJson,

			success:function(resp){

				alert(resp.payRentSuccessNotice);

				window.location.replace("../");				

			}

		});				

		return false;

	});	

	

	

	$('#clearedTenantProfile').on('click','#payRentSubmit_btn',function(evt){	//attaching "change" event to dynamic html elements	

		var values = $('#payRentFormId1').serializeArray(),		

		data = {};

		$.each(values, function(index, item) {

			data[item.name] = item.value;

		}); 

		var dataStringJson = JSON.stringify(data);

		$.ajax({

			url:'/payRent',

			type:'POST',

			data: dataStringJson,

			success:function(resp){

				alert(resp.payRentSuccessNotice);

				window.location.replace("../");				

			}

		});				

		return false;

	});	



	

});
