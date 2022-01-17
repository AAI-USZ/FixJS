function(data,index) {
	var toydata = specfactory.Game2Factory.ToyData(0);
	toydata.image_id = data.image_id;
	toydata.text_id = data.text_id;
	toydata.div_id = data.div_id;
	if(toydata.image_id != null) {
		toydata.image_data = data.image_data(index);
		toydata.image_data.position = data.image_path(index);
	}
	if(toydata.text_id != null) {
		toydata.text_data = data.text_data(index);
		toydata.text_data.position = data.text_path(index);
	}
	return toydata;
}