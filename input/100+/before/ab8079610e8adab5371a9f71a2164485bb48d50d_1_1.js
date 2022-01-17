function processPacket(data,connectionId)
	{
		var myPrio = openConnections[connectionId].priorityLevel;

	
		switch(parseInt(data.substr(0,2),16))
		{
			case 0:
				return 'help:'+nnl+nnl+
				'00 help'+nnl+nnl+
				'01 show configuration'+nnl+nnl+
				'02xxyy'+configuration.subpixelOrder+' set Pixel'+nnl+
				'   * xxyy == FFFF : set all pixel'+nnl+nnl+
				((configuration.height==1) ? '02xxrrggbbww set CeilingLED '+nnl+'   * xx   == F1..F4 ; F0 (all) '+nnl+nnl:'')+
				'03'+configuration.subpixelOrder+'..'+configuration.subpixelOrder+' set all '+(configuration.width*configuration.height)+' pixel'+nnl+nnl+
				'04ll set priority level 00..04 , currentLevel: '+myPrio+nnl;

			case 1:
				return  'width='+configuration.width+nnl+
						'height='+configuration.height+nnl+
						'subpixel='+configuration.subpixel+nnl+
						'bpp='+configuration.bpp+nnl+
						'name='+configuration.name+nnl+
						'subpixelOrder='+configuration.subpixelOrder+nnl+
						'hardwareAvailable='+configuration.hardware+nnl;
			case 2:
			
				var x = parseInt(data.substr(2,2),16);
				var y = parseInt(data.substr(4,2),16);
				var r;
				var g;
				var b;

				if(configuration.subpixel == 3){
					r = parseInt(data.substr(6,2),16);
					g = parseInt(data.substr(8,2),16);
					b = parseInt(data.substr(10,2),16);
					if(isNaN(x)||isNaN(y)||isNaN(r)||isNaN(g)||isNaN(b)){
						return 'bad';
					}
				}else{
					g = parseInt(data.substr(6,1),16);
					if(isNaN(x)||isNaN(y)||isNaN(g)){
						return 'bad';
					}
				}

				if((x == 255)&&(y==255)){
					
					if(configuration.subpixel == 3){
						var onePixel = new Buffer([r,g,b]);
						var a;
						for(a = 0 ; a < configuration.width*configuration.height; a++)
						{
							onePixel.copy(displayBuffers[myPrio],a*3);
						};
					}else{
						for(a = 0 ; a < configuration.width*configuration.height/2; a++)
						{
							displayBuffers[myPrio][a] = g*0x10+g;
						};
					}	
					if(myPrio >= currentPrio){

						if(configuration.subpixel == 3){
							wall.setAllPixel3(r,g,b);
						}else{
							wall.setAllPixel(g);
						}
						
						if(currentRecFd){
							
							var buf = new Buffer([x,y,r,g,b]);
							var strBuf = new Buffer(buf.toString('hex'));
							
							if(currentRecStarted == null){
								currentRecStarted = Date.now();
							};
						
							fs.writeSync(currentRecFd,parseInt(Date.now()-currentRecStarted,10)+" 02",null);
							
							fs.writeSync(currentRecFd,strBuf,0,strBuf.length,null);
							fs.writeSync(currentRecFd,"\r\n",null);
						}
					}
				


					for(var j = 0;j < (configuration.width*configuration.height);j++)
					{
						displayBuffers[myPrio][configuration.width*configuration.height*3] = r;
						displayBuffers[myPrio][configuration.width*configuration.height*3+1] = g;
						displayBuffers[myPrio][configuration.width*configuration.height*3+2] = b;
					}
					lastFrame = null;

				}else if ((x < configuration.width)&&(y < configuration.height)){
		
					if(configuration.subpixel == 3){
						displayBuffers[myPrio][(y*configuration.width+x)*3] = r;
						displayBuffers[myPrio][(y*configuration.width+x)*3+1] = g;
						displayBuffers[myPrio][(y*configuration.width+x)*3+2] = b;
					}else{

						var xModulo = x % 2;
						var pixelIdx  = y*(configuration.width/2)+((x-xModulo)/2);
						
						if(xModulo == 0){
							displayBuffers[myPrio][pixelIdx] = g+
							(displayBuffers[myPrio][pixelIdx] & 0xf0);
						}else{
							displayBuffers[myPrio][pixelIdx] = g*0x10+
							(displayBuffers[myPrio][pixelIdx] & 0x0f);
						}
					}
					
					lastFrame = null;

					if(myPrio >= currentPrio){

						if(configuration.subpixel == 3){
							wall.setPixel3(x,y,r,g,b);
						}else{
							wall.setPixel(x,y,g);
						}
						
						if(currentRecFd){
							
							var buf = new Buffer([x,y,r,g,b]);
							var strBuf = new Buffer(buf.toString('hex'));
							
							if(currentRecStarted == null){
								currentRecStarted = Date.now();
							};
						
							fs.writeSync(currentRecFd,parseInt(Date.now()-currentRecStarted,10)+" 02",null);
							
							fs.writeSync(currentRecFd,strBuf,0,strBuf.length,null);
							fs.writeSync(currentRecFd,"\r\n",null);
						}
					}

				
				}else if ((x <= 0xf5)&&(x >= 0xf0)&&(configuration.height==1)){


					if(x == 0xf0){
						ceilBuffers[myPrio] = new Buffer([y,r,g,b,y,r,g,b,y,r,g,b,y,r,g,b,y,r,g,b]);
					}else{
						ceilBuffers[myPrio][(x-0xf1)*4] = y;
						ceilBuffers[myPrio][(x-0xf1)*4+1] = r;
						ceilBuffers[myPrio][(x-0xf1)*4+2] = g;
						ceilBuffers[myPrio][(x-0xf1)*4+3] = b;
					}
					
					lastCeilFrame = null;
		
					if(myPrio >= currentPrio){
						wall.setCeiling(x,y,r,g,b);
						if(currentRecFd){
							
							var buf = new Buffer([x,y,r,g,b]);
							var strBuf = new Buffer(buf.toString('hex'));

							if(currentRecStarted == null){
								currentRecStarted = Date.now();
							};
						
							fs.writeSync(currentRecFd,parseInt(Date.now()-currentRecStarted,10)+" 02",null);
							
							fs.writeSync(currentRecFd,strBuf,0,strBuf.length,null);
							fs.writeSync(currentRecFd,"\r\n",null);
						}
					}
				
				}else{
					return 'bad'
				}

				return 'ok';

			case 3:
				
				
				var strFrame = data.substr(2,frameSize);
		
				if(strFrame.length != frameSize){
					return 'bad';
				}

		

				var buf;

				if(configuration.subpixel != 1){

					var buf2 = new Buffer(strFrame);
				
					try
					{
						buf = buf2.fromHex();
					}catch(e)
					{
						console.log(strFrame);
						return 'bad';
					}

				}else{

					var buf2 = new Buffer(strFrame);
				
					try
					{
						buf = buf2.fromG3d2Encoding();
					}catch(e)
					{
						console.log(strFrame);
						return 'bad';
					}
				}


				displayBuffers[myPrio] = buf;



				if(myPrio >= currentPrio){
					wall.setFrame(buf);
					if(currentRecFd){
						
						var strBuf = new Buffer(strFrame);
						
						if(currentRecStarted == null){
							currentRecStarted = Date.now();
						};
					
						fs.writeSync(currentRecFd,parseInt(Date.now()-currentRecStarted,10)+" 03",null);
						
						fs.writeSync(currentRecFd,strBuf,0,strBuf.length,null);
						fs.writeSync(currentRecFd,"\r\n",null);
					}

				}
		
				return 'ok';
			
			case 4:
					
				var targetPrio = parseInt(data.substr(2,2),16);

				if(isNaN(targetPrio) || (targetPrio > 4)){
					return 'bad';
				}

				openConnections[connectionId].priorityLevel = targetPrio;

				updateCurrentPrio();

				return 'ok';
			
			case 5:
				// start recodring


				fs.open(configuration.recordingPath+Date.now()+'.rec','a',0666,function(err,fd) {

					console.log('start rec '+err);

					if(err === null)
					{
						currentRecFd = fd;
						currentRecStarted = null;
					}

				
				});

				return 'ok';

			case 6:
				// stop recording
					
				if((currentRecFd)&&(currentRecFd !== null))
				{
					fs.close(currentRecFd,function() { console.log('recording done') });
					currentRecFd = null;
					currentRecStarted = null;
					return 'ok';
				}
				else
				{
					return 'bad'; 
				}

			case 9:
				// subscribe to message channel
				var chan = parseInt(data.substr(2,2),16);
				var cmd = parseInt(data.substr(4,2),16);

				if(isNaN(chan)){
					return 'bad';
				}

				if(cmd == 1)
				{
					openConnections[connectionId].messageChannelSubscription[chan] = true;
					return 'ok';
				}
				if(cmd == 0)
				{
					if(openConnections[connectionId].messageChannelSubscription[chan])
					{
						delete openConnections[connectionId].messageChannelSubscription[chan];
						return 'ok';
					}
					return 'bad';
				}
				return 'bad';

			case 11:


				return 'ioSocket:'+util.inspect(ioSockets,false,1)+'\r\n\r\nopenConnections:'+util.inspect(openConnections, false, 1)+'\r\n\r\ncurrentPrio:'+currentPrio;
			
			case 10:
				// push message
				
				var chan = parseInt(data.substr(2,2),16);
				var strData = data.substr(4,data.length-4);
		
				if(isNaN(chan)){
					return 'bad';
				}

				var buf = new Buffer(strData.length/2);

				for(var a = 0; a < strData.length/2;a++){
					buf[a] = parseInt(strData.substr(a*2,2),16);
					if(isNaN(buf[a]))	{
						return 'bad';
					}
				}
				for(var connId in openConnections){
					if(openConnections[connId].messageChannelSubscription[chan] == true){

						openConnections[connId].connectionSocket.write("09"+data.substr(2,2)+buf.toString('hex')+nnl);

					
					}
				}
				return 'ok';

			default:
				return 'bad';
		}
	}