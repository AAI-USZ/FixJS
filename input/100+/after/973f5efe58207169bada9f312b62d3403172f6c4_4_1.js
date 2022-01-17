function findOggWithFooter(raw,tag) {

	var tagU = s2ab(tag);

	var tag8 = new Uint8Array(tagU);

	var data = new Uint8Array(raw);

	var footU = s2ab('4SPF');

	var foot8 = new Uint8Array(footU);

	var match = true;

	for(var i = 0; i < 4 ;i++){

		if(foot8[i] != data[data.length-4+i])

			match = false;

	}

	//x y 4 S P F

	//6 5 4 3 2 1

	if(match){

		var fstart = data.length - 6 - toUInt16(data,data.length-6);

		//alert(fstart);

		for(var i = fstart; i < data.length; i++){

			var tagmatch = true;

			for (var j = 0; j < tag8.byteLength; j++)

			{

				if (data[i+j] != tag8[j])

				{

					tagmatch = false;

					break;

				}

			}

			if (!tagmatch)

			{

				continue;

			}

			i += tagU.byteLength;

			var start = toUInt32(data,i);

			i += 4;

			var end = toUInt32(data,i);

			return {data:raw.slice(start,end+1),tag:tag};

		}

		return findOgg(raw,tag);

	}else

		return findOgg(raw,tag);

}