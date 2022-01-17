function(){
			//@todo do inline validation 
				//get  selected
				var c = a; 
				var c1 = $(".contribute1 option:selected").val();
				// When
				var c1_1 = $(".contribute1-1 option:selected").val();
				//how long
				var c2 = $(".contribute2 option:selected").val();
				//area	
				var c3 = $(".contribute3 option:selected").val();
				var url = "contribute/switch?type="+ c+"&c1="+c1+"&c1_1="+c1_1+"&c2="+c2+"&c3="+c3;
				
				$.get(url, {
			}, 
			function(data){   		 
				//append the required notice
	           $(".endContainer").show();
			    $(".endContainer .alert").append(data + " Many Thanks! ");
			});
         }