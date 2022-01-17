function hyperlinkone(target) {

	var postname = archive ? 'article':'blockquote';

	if(target.nodeName.toLowerCase() != postname) {

		var elems = target.getElementsByTagName(postname);

		for(var i = 0; i < elems.length; i++) {

			hyperlinkone(elems[i]);

		}

	}else{

		var repeat = true;

		while (repeat) {

			repeat = false;

			var a = null;

			var p = null;

			if (!archive) {

				p = target;

				a = byClass(target.parentNode.getElementsByTagName('a'), 'fileThumb');

				if (!a) continue;

			}else{

				a = byClass(target.getElementsByTagName('a'), 'thread_image_link');

				p = byClass(target.getElementsByTagName('div'), 'text');

				

				if (!a || !p) continue;

			}

			for (var j = 0; j < p.childNodes.length; j++) {

				var match = null;

				var node = p.childNodes[j];

				if (node.nodeType != 3) {

					if(node.className != "spoiler" && node.className != 'quote') {

						continue;

					}else{

						for(var k = 0; k < node.childNodes.length; k++) {

							

							var subnode = node.childNodes[k];

							if(subnode.nodeType != 3) {continue;}

							if (!(match = subnode.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) {

								continue;

							}

							addLoadAllLink(p);

							repeat = true;

							var href = a.href;

							var code = match[2];

							var link = document.createElement('a');

							link.innerHTML = '[' + code + ']';

							link.className = 'soundlink';

							//link.href = href;

							link.href = "#";

							link.realhref = href;

							link.tag = code;

							var sp = null;

							if(sp = code.match(/(.*?)\.([0-9].*)/)){

								if(playerSplitImages.indexOf(sp[2]) == -1){

									playerSplitImages[sp[2]] = [];

								}

								

								link.splittag = sp[2];

								link.splitid = sp[3];

								playerSplitImages[sp[2]].push(link);

							}

							

							

							link.addEventListener('click', function(e) {

								if(link.splittag){

									var arr = playerSplitImages[link.splittag];

									loadSplitSounds(arr);

									/*for(var i = 0; i < arr.length;i++){

										

									}*/

								}

								e.preventDefault();

								this.innerHTML = '[loading]';

								xmlhttp(link.realhref, function(data, rlink) {   

									showPlayer();

									addMusic(findOggWithFooter(data, rlink.tag),rlink.tag,rlink.realhref);

									rlink.innerHTML = '[' + rlink.tag + ']';

								},this);

							});

							subnode.nodeValue = match[1];

							insertAfter(subnode, link);

							var text = document.createTextNode(match[3]);

							insertAfter(link, text);

						}

					}

				}else{

					if (!(match = node.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) {

						continue;

					}

					repeat = true;

					

					addLoadAllLink(p);

					var href = a.href;

					var code = match[2];

					var link = document.createElement('a');

					link.innerHTML = '[' + code + ']';

					link.className = 'soundlink';

	

					link.href = "#";

					link.realhref = href;

					link.tag = code;

					link.addEventListener('click', function(e) {

						e.preventDefault();

						this.innerHTML = '[loading]';

						xmlhttp(this.realhref, function(data, rlink) {   

							showPlayer();

							addMusic(findOggWithFooter(data, rlink.tag),rlink.tag,rlink.realhref);

							rlink.innerHTML = '[' + rlink.tag + ']';

						},this);

					});

					node.nodeValue = match[1];

					insertAfter(node, link);

					var text = document.createTextNode(match[3]);

					insertAfter(link, text);

				}

			}

		}

	}

}