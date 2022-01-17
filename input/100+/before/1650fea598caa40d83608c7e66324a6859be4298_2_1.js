function insertData(dv, pos, type, size, data) {

		//console.log(pos, type, data);

		if (type === 'c') {

			for (var i = 0; i < size; i++) {

				dv.setUint8(pos + i, data.charCodeAt(i) || 0);

			}

		} else if (type === '-') {

			dv['setInt'+size](pos, data, true);

		} else if (type === '+') {

			dv['setUint'+size](pos, data, true);

		} else if (type === 'f') {

			dv['setFloat'+size](pos, data, true);

		}

	}