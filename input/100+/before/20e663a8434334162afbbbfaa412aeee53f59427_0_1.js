function showMenu(data){
		var coords = data.currentEl.offset(),
		candidates = correction(data.currentEl.text()),
		buffer = '',
		list = [];
		$('.menu ul .words').remove();

		console.log(typeof(candidates));

		if(typeof(candidates) != 'string'){
			//sort candidates in descending order so that highest rank word shows first.
			for(candidate in candidates){
				list.push(candidate);
			}
			list.sort(function(a,b){return a+b});


			
			for(i = 0; i < list.length && i < 5; i++){
				//$('.menu ul').prepend('<li class="words"><a href="#">' + candidates[list[i]] + '</a></li>');	
				buffer += '<li class="words"><a href="#">' + candidates[list[i]] + '</a></li>';
			}

			$('.menu ul').prepend(buffer);
		}

		$('.words').click(function(){
			data.currentEl.text($(this).text()).removeClass('incorrect').attr('contenteditable', true);
			read($(this).text());
			
			$('.menu').hide();
		});

		$('.menu ul li.add-to-dictionary').live('click',function(){
			//remove highlight on all instances of word.
			$('.incorrect:contains(' + data.currentEl.text() + ')').removeClass('incorrect').attr('contenteditable', true);
			read(data.currentEl.text());
			
			$('.menu').hide();
		});

		$('.menu').show().css({
			top: coords.top + 25,
			left: Math.round(coords.left)
		}).data('siblings', data.adjacentEl);
	}