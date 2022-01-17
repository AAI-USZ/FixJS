function(driver, values, callback){
	config.set(driver.name, values);
	config.save(end_setup);
}