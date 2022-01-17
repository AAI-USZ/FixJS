function(iocfg){
			
			iocfg.method = 'POST';
			iocfg.headers = {
				'Content-Type': 'application/json',
			};
			
			var data = this.toJSON();
			data.lastTaskCount = 0;
			
			iocfg.data = Y.JSON.stringify(data);
			
			Y.io('/data/project/create', iocfg);
		}