function(record /* record */, data){

    var index = exports.find(record, data);

    if (index == -1){
	    return false;
    } else {
	    var o = data[index];
	    for(var e in record){
	        if (record.hasOwnProperty(e) && o.hasOwnProperty(e)){
		        o[e] = record[e];
	        }	    
	    }
	    return record;
    }    
}