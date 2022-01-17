function(record /* record */, data){

    if (record.id){
	    exports.replace(record, data);
    }else {
	    exports.insert(record, data);
    }
}