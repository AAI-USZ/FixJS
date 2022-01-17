function(){



	//For all, set the user siderbar active class

    var url = document.URL;//取得当前页的URL

    $(".nav-list li").removeClass("active");

	$(".nav-list li").each(function(){

		href = $(this).children("a").attr("href");

		if(href && new RegExp(href).test(url.toLowerCase())){

			$(this).addClass("active");

			$(this).children("a").children("i").addClass("icon-white");

		}

	});	



	//For admin, edit user infomation

	$(".edituser").live("click", function(){

		var id = $(this).data('id');

		$.get(WEB_ROOT + '/admin/usereditreq/' + id, function(data) {

			//alert(data);

			  $('.placehoderhtml').html(data);

			  $('#editmodal').modal('show');

			});

		return false;

	});

	

	//For admin, del user 

	$(".deluser").live("click", function(){

		var id = $(this).data('id');

		$.get(WEB_ROOT + '/admin/userdelreq/' + id, function(data) {

			//alert(data);

			  $('.placehoderhtml').html(data);

			  $('#delmodal').modal('show');

			});

		return false;

	});

	

}