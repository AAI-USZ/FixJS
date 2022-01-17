function(e){
			e.preventDefault();
			e.stopPropagation();
			var color1 = $('input', $(this)).eq(0).val();
			var color2 = $('input', $(this)).eq(1).val();
			var fontsize = $('input', $(this)).eq(2).val();
			console.log(fontsize);
			$('html').css({
				'background' : 'rgba(0, 0, 0, 0) -webkit-radial-gradient(50% 50%, ellipse cover, '+color1+' 0%, '+color2+' 100%)'
			});
			$('#reveal').css({
				'font-size' : fontsize + 'px'
			});
		}