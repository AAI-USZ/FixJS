function loadAllFromLocal(raw,link,cb) {

	var oggU = s2ab('OggSxx');

	var ogg8 = new Uint8Array(oggU);

	ogg8[4] = 0;

	ogg8[5] = 2;

	var data = new Uint8Array(raw);

	var sounds = [];

	var cont = true;

	var oldptr = 0;

	do{

		var ptr = 0;

		for (var i = oldptr; i < data.byteLength - 10; i++)

		{

			var match = true;

			for (var j = 0; j < ogg8.byteLength; j++)

			{

				if (data[i+j] != ogg8[j])

				{

					match = false;

					break;

				}

			}

			if (match)

			{

				ptr = i;

				break;

			}

		}

		if (ptr > oldptr)

		{

			var ofs = [-1,-1];

			var find = s2ab('[]');

			var fin8 = new Uint8Array(find);

			for (var j = ptr; j > ptr - 100; j--)

			{

				if (data[j] == fin8[0] && ofs[1] > 0)

				{

					ofs[0] = j+1;

					break;

				}

				else if (data[j] == fin8[1] && ofs[0] < 0)

				{

					ofs[1] = j-1;

				}

			}

			if (ofs[0] > 0 && ofs[1] > 0)

			{

				var tag = '';

				for (var j = ofs[0]; j <= ofs[1]; j++)

				{

					tag += String.fromCharCode(data[j]);

				}

				sounds.push({data: null,start:ptr,tag: tag});

				if(sounds.length > 1) {

					var id = sounds.length-2;

					sounds[id].data = raw.slice(sounds[id].start,ptr - sounds[id].tag.length);

				}

			}

			oldptr = ptr;

		}else{

			cont = false;

		}

	}while(cont);

	if(sounds.length > 0) {

		var id = sounds.length-1;

		sounds[id].data = raw.slice(sounds[id].start);

		showPlayer();		

		for(var i = 0; i < sounds.length;i++){

			var tag = sounds[i].tag;

			addMusic({data:sounds[i].data,tag:tag},tag,link);

			cb();

		}

	}

}