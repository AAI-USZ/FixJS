function(){

		if($('.navigation').length == 0) return;

		posy = $('.navigation').offset().top;
		wtop = $(window).scrollTop();

		//console.log(posy +' : ' + wtop +' : ' + navtop);
		if(posy <= wtop){
			$('.navigation').css({ position: 'fixed', top: 0, width: navwidth });
		}
		if(posy <= navtop){
			//console.log("inline\n");
			$('.navigation').css({ position: 'inherit' });
		}

	}