function(res){
					res.requestId = e.requestId;
					w.gotAllSnapshots(res);
					w.flush();
				}