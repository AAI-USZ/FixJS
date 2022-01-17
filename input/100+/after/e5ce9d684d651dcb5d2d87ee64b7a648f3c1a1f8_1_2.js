function() {
		if(!self.parser2part){
			var r=parser.popmsg(self,["result"])
			if(!r)return 
			if(r.ok){
				return {ok:true,result:r.result}
			}else{
				self.parser2part=r;
			}				
		}else{
			var r=parser.popmsg(self,["info"],false)
			if(!r)return
			var res={ok:false,
					info:r.info,
					result:self.parser2part.result}
			self.parser2part=null;
			return res
		}
	}