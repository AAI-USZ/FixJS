function(record /* record */, data){

    if (record.id){
	    return exports.replace(record, data);
    }else {
	    return exports.insert(record, data);
    }
}