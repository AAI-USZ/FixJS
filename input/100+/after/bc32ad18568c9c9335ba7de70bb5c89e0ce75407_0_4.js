function(slider,knob,initial,team) {
							  var poff = new Slider(slider,knob,{
							    minstep:1,
							    maxstep:5,
							    initial:initial,
							    minortick:1,
							    onTick:function(step) {
							      knob.set("text",maps.playoff[step-1]);
							    },
							    onChange:function(step) {
							      var setPOScore = new MBB.req('setposcore.php',function(response) {
								//don't think there is anything to do
							      });
							      setPOScore.get({'cid':params.cid,'tid':team,'pscore':maps.playoff[step-1]});
							    }
							  });
							}