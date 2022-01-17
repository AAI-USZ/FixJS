function(iocfg){
			iocfg.method = 'POST';
			iocfg.headers = {
				'Content-Type': 'application/json',
			};
			
			var data = this.toJSON();
			data.lastTaskCount = Y.Task.lastCount;
			
			iocfg.data = Y.JSON.stringify(data);
			
			Y.io('/data/project/update', iocfg);
		}