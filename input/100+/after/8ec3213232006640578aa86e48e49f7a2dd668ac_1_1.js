function() {



//resize body onload

		body_resize();



//code to deal with header dropdown

	//header dropdown animation	

	$("#drop,#dropdown").hover(

	

		function() {

				$("#dropdown").css('z-index','2');

				$("#dropdown").stop().animate({top:'0px'},300);

		},

		function() {

				

				//if focused on username textbox,

				//don't animate div to closed

				if(!$('.username').is(':focus')){

						$("#dropdown").css('z-index','-1');

						$("#dropdown").stop().animate({top:'-70px'},300);

				}

	})

	

	//expand div when focus on username

	//textbox

	$('.username').focus(function() {

			$("#dropdown").stop().css({height:'70px'})

	})

	

	//clear boxes for username and 

	//pw when clicked

	$(".username").click(function() {

			if($(this).val()=='Username/email' || $(this).val()=='password'){

					$(this).val('');

			}

	})

	

	//change background color of input boxes in case they have been

	//turned red due to validate()

	$('input[type=text],input[type=password]').focus(function(){

			$(this).css('background-color','#313131');

		});

	



//end "ready" function

}