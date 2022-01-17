function(e){
			e.preventDefault();
			e.stopPropagation();
			var val1 = $('input', $(this)).eq(0).val();
			var val2 = $('input', $(this)).eq(1).val();
			$('html').css({
				'background' : 'rgba(0, 0, 0, 0) -webkit-radial-gradient(50% 50%, ellipse cover, '+val1+' 0%, '+val2+' 100%)'
			});
		}