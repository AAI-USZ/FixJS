function numOnly(val) {
			if (val===undefined) return 0;
			if ( isNaN( parseFloat(val) ) ){
				if(val.replace){
					val = val.replace(/[^0-9.-]/, "");
				} else return 0;
			}  
            return parseFloat(val);
        }