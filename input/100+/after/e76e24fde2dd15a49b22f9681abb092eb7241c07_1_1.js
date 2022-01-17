function(rpcHandler, params) {
		// inherit from RPCWebinosService
		this.base = RPCWebinosService;
		this.base({
			api:'http://webinos.org/api/tv',
			displayName:'TV ('+(params.impl?params.impl:_TV_MODULE_IMPLEMENTATION_)+' service)',
			description:'TV control and managment.'
		});
		
		if (typeof params.impl !== 'undefined') {
			tvmodule = require('./webinos.service_tv.' + params.impl + '.js');
			if(tvmodule.tv_setConf)tvmodule.tv_setConf(params);
			tvmodule=tvmodule.tv;
		} else {
			tvmodule = require('./webinos.service_tv.' + _TV_MODULE_IMPLEMENTATION_ + '.js').tv;
		}
		
		/**
		 * Add event listener.
		 * @param params Array, first item being event type.
		 * @param successCallback Success callback.
		 * @param errorCallback Error callback.
		 * @param RPC object reference.
		 */
		this.display.addEventListener = function ( params,  successCallback,  errorCallback, objectRef) {
			if(params[0]==='channelchange'){
				var useCapture = params[2];
			
			tvmodule.tv.display.addEventListener('channelchange',function(channel){
				var json = rpcHandler.createRPC(objectRef, "onchannelchangeeventhandler", channel);
				rpcHandler.executeRPC(json);
			},useCapture);
			
			}
		};
	}