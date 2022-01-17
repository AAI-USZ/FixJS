function(){
			var self = this;
			var $this = $(this);
			var data = $this.data();
			var debug = data.debug;
			var param = {};
			
			if (data.instName !== '' && insts[data.instName] ){
				param = {
					inst : insts[data.instName].inst,
					max : insts[data.instName].max,
					min : insts[data.instName].min
				};
			}else if (data.inst !== ''){
				for (var name in insts) {
					if (insts[name].inst = data.inst){
						param = {
							inst : insts[name].inst,
							max : insts[name].max,
							min : insts[name].min
						};
						break;
					}
				}
			}
			console.log(param);
			param.mml = mml_sanitize($this.contents()[0].nodeValue);	// MML配列

			$this.before(mml_player(param,false, debug));
		}