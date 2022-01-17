function(){
	object = wp.getPostStatusList(1);
	equal(true, typeof object == "object", "OK")
	equal(typeof object.draft, "object", "Have draft");
	equal(typeof object.pending, "object", "Have pending");
	equal(typeof object.private, "object", "Have private");
	equal(typeof object.publish, "object", "Have publish");
}