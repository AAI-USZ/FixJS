function (f) {
			try{
				f();
			} catch(ex) {
				setTimeout(function (){
					throw ex;
				}, 0);
			}
		}