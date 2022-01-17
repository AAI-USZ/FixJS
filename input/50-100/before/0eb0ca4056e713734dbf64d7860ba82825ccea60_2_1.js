function(e) {

		

	e.preventDefault();

	 

	 

			 var jqXHR = $.ajax({

		         url: $(this).attr('href'),

		         context: $(this),

		         doNotRetry: false

		     });

			

			

		     if (jqXHR) {

		         jqXHR.done(function (data) {

		        $(this).parents().first().replaceWith(data); 

		         	  });

		     }

		     

		    jqXHR.fail(alert("Erro ao conectar o servidor"));

		  

	 

}