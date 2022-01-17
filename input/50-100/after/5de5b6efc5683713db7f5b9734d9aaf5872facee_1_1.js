function(r) {
		me.savingflag = false;		
		if(!me.meta.istable && r) {
			me.refresh(r.docname);
		}

		if(call_back){
			call_back(r);
		}
	}