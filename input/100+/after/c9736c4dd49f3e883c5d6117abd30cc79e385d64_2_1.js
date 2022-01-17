function(httpMethod,serviceName,methodName,params,successFnc){

			Ext.Viewport.setMasked({
				xtype:'loadmask',
				message:'please wait...'
			});
			if(httpMethod == 'GET')
			{
				Ext.Ajax.request({
					url:'http://staging.wfic.ca/api/'+serviceName+'/'+methodName,
					params:params,
					headers:{
						'Content-Type':'application/json'
					},
					method:'GET',
					scope:this,
					success:function(response){
						Ext.Viewport.setMasked(false);
						var resultObj = eval("("+response.responseText+")");
						successFnc(resultObj,this);
					}
					});
			}
			else
			{
				Ext.Ajax.request({
					url:'http://staging.wfic.ca/api/'+serviceName+'/'+methodName,
					jsonData:params,
					params:{
						'htoken':mpToken,
						'returnType':'json'
					},
					headers:{
						'Content-Type':'application/json'
					},
					method:httpMethod,
					scope:this,
					success:function(response){
						Ext.Viewport.setMasked(false);
						var resultObj = eval("("+response.responseText+")");
						successFnc(resultObj,this);
					}
					});
			}


		}