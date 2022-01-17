function(index, value) {
                        var search = new RegExp(input_value, 'gi');
                        if(value.txt){
                        	 if(value.txt.match(search)) {
	                            info.data.search_values[index] = {
	                                'val':value.val, 
	                                'txt':value.txt
	                            };
	                        } 
                        }
                    }