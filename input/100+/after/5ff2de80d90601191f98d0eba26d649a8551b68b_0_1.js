function getPngInfo(file){

	try{

		if(Buffer.isBuffer(file)){

			buf = file;

		}else{

			var fd = fs.openSync(file,'r');

			var buf = new Buffer(29);

			read(fd, buf, 0, 29);

			//read tRNS block

		}

		if(buf[0] == 137){

			var trns = false;

			var info = {

				width:buf.readUInt32BE(16),

				height:buf.readUInt32BE(20),

				depth:buf[24],

				type:buf[25],

				compression:buf[26],

				filter:buf[27],

				interlace:buf[28],

			}

			var position = 33;

			while(read(fd, buf, position, 18)){

				var offset = fd?0:position;

				var len = buf.readUInt32BE(offset);

				var next = buf.toString('ascii',offset+4,offset+8);

				//console.log(len,next)

				if(next == 'IDAT'){

					break;

				}else if(next == 'tRNS'){

					//console.log(len,buf[offset+8],buf.toString('ascii',offset+9,offset+18))

					var alpha = buf[offset+8];

					trns = len>1 || alpha!=0 && alpha!=255;

				}

				position += (len+12);

			}

			info.alpha = trns || info.type>4

			return info;

		}

	}finally{

		if(fd){fs.close(fd);}

	}

}