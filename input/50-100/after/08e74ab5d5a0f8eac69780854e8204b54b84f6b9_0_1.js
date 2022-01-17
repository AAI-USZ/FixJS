function test_localContacts_setup() {		
        param = {};
		param.usr = "";
		param.pwd = "";
		param.type = "local";
		param.addressBookName=(document.URL.split('/').slice(0, -1).join('/')+'/' + "abook.mab").replace("file://","");
	}