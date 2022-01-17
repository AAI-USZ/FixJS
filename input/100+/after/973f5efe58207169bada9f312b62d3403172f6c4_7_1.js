function rehyperlink(target,second) {

	var list = target.getElementsByClassName('playerLoadAllLink');

	for(var i = 0; i < list.length;i++){

		if(list[i].rehypered) continue;

		list[i].rehypered = true;

		list[i].addEventListener('click',function(e) {

			e.preventDefault();

			e.target.innerHTML = " loading...";

			var a = null;

			if(!archive){

			var a = e.target.parentNode.parentNode.getElementsByClassName('fileThumb')[0];

			}else{

				a = byClass(e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('a'), 'thread_image_link');

			}

			if(a)

				loadAll(a.href,function(){e.target.innerHTML = " Load all sounds"});

		});

	}

	var links = target.getElementsByClassName('soundlink');

	if(links.length < 1) {

		if(second) return;

		else

		setTimeout(function() {rehyperlink(target, true); },200);

	}

	var post = target.getElementsByTagName(archive ? 'article':'blockquote')[0];

	var a = null;

	var p = null;

	if (!archive) {

		p = post;

		a = byClass(target.getElementsByTagName('a'), 'fileThumb');

		if (!a) return;

	}else{

		a = byClass(post.getElementsByTagName('a'), 'thread_image_link');

		p = byClass(post.getElementsByTagName('div'), 'text');		

		if (!a || !p) return;

	}

	for(var i = 0;i < links.length;i++){

	

		var link = links[i];



		

		if(link.rehypered) continue;

		link.rehypered = true;

		

		var sp = null;

		if(sp = link.match(/(.*?)\.([0-9].*)/)){

			if(!playerSplitImages.hasOwnProperty(sp[1])){

				playerSplitImages[sp[1]] = [];

			}

			link.splittag = sp[1];

			link.splitid = sp[2];

			playerSplitImages[sp[1]].push(link);

		}



		link.realhref = a.href;

		link.tag = link.innerHTML.replace("[","").replace("]","");

		link.addEventListener('click', function(e) {

			e.preventDefault();

			if(this.splittag){

				var arr = playerSplitImages[this.splittag];

				loadSplitSounds(arr);

			}else{

				this.innerHTML = '[loading]';

				xmlhttp(this.realhref, function(data,rlink) {   

					showPlayer();

					addMusic(findOggWithFooter(data, rlink.tag),rlink.tag,rlink.realhref);
					rlink.innerHTML = '[' + rlink.tag + ']';
				},this);

			}

		});

	}

}