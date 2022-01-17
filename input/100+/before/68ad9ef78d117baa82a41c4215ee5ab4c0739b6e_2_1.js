function loadAllWithFooter(raw,link) {

		var data = new Uint8Array(raw);

		var footU = s2ab('4SPF');

		var foot8 = new Uint8Array(footU);

		var match = true;

		for(var i = 0; i < 4 ;i++){

			if(foot8[i] != data[data.length-4+i])

				match = false;

		}

		if(match) {

			var tags=[];

			var fstart = data.length - 6 - toUInt16(data,data.length-6);

			for(var i = fstart;i < data.length-6;){

				var taglen = data[i];

				i++;

				var tag = ""

				for(var j = 0; j < taglen;j++){

					tag += String.fromCharCode(data[i+j]);

				}

				i+=taglen;

				var start = toUInt32(data,i);

				i+=4;

				var end = toUInt32(data,i);

				i+=4;

				tags.push({tag:tag,start:start,end:end});

			}

			showPlayer();

			for(var i = 0; i < tags.length;i++){

				addMusic({data:raw.slice(tags[i].start,tags[i].end),tag:tags[i].tag},tags[i].tag,link);

			}

		}else{

			loadAllFromLocal(raw,link);

		}

}