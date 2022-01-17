function insertData(dv, pos, type, data) {

		



		var size = 0;



		if (typeof type === 'string') {

			size = +type;

			for (var i = 0; i < size; i++) {

				dv.setUint8(pos + i, data.charCodeAt(i) || 0);

			}

		} else {

			size = type.byteLength;

			var partSize = size/type.length;

			var cmd = type.toString();

			cmd = cmd.substring(8, cmd.length-6);

			

			for (var i = 0; i < type.length; i++) {

				dv['set'+cmd](pos + partSize*i, data[i] || data, true);

			}



		}



		//console.log(pos, size, type, data);



		return size;

	}