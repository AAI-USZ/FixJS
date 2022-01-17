function() {

	equals(K.formatUrl(K.query("#test01").value, "absolute", 'http://localhost', '/ke/test'), '/ke/images/xxx.gif');

	equals(K.formatUrl(K.query("#test01").value, "relative", 'http://localhost', '/ke/test'), '../images/xxx.gif');

	equals(K.formatUrl(K.query("#test01").value, "domain", 'http://localhost', '/ke/test'), 'http://localhost/ke/images/xxx.gif');

	equals(K.formatUrl(K.query("#test01").value), '../images/xxx.gif');



	equals(K.formatUrl(K.query("#test02").value, "absolute", 'http://localhost:8080', '/ke/test'), '/images/xxx.gif');

	equals(K.formatUrl(K.query("#test02").value, "relative", 'http://localhost:8080', '/ke/test'), '../../images/xxx.gif');

	equals(K.formatUrl(K.query("#test02").value, "domain", 'http://localhost:8080', '/ke/test'), 'http://localhost:8080/images/xxx.gif');

	equals(K.formatUrl(K.query("#test02").value), './../../images/xxx.gif');



	equals(K.formatUrl(K.query("#test03").value, "absolute", 'http://localhost', '/ke/test'), '/ke/images/xxx.gif');

	equals(K.formatUrl(K.query("#test03").value, "relative", 'http://localhost', '/ke/test'), '../images/xxx.gif');

	equals(K.formatUrl(K.query("#test03").value, "domain", 'http://localhost', '/ke/test'), 'http://localhost/ke/images/xxx.gif');

	equals(K.formatUrl(K.query("#test03").value), '/ke/images/xxx.gif');



	equals(K.formatUrl(K.query("#test04").value, "absolute", 'http://localhost', '/ke/test'), '/ke/images/xxx.gif');

	equals(K.formatUrl(K.query("#test04").value, "relative", 'http://localhost', '/ke/images'), 'xxx.gif');

	equals(K.formatUrl(K.query("#test04").value, "domain", 'http://localhost', '/ke'), 'http://localhost/ke/images/xxx.gif');

	equals(K.formatUrl(K.query("#test04").value), 'http://localhost/ke/images/xxx.gif');



	equals(K.formatUrl(K.query("#test05").value, "absolute", 'http://localhost', '/ke'), 'http://www.163.com/images/xxx.gif');

	equals(K.formatUrl(K.query("#test05").value, "relative", 'http://localhost', '/ke'), 'http://www.163.com/images/xxx.gif');

	equals(K.formatUrl(K.query("#test05").value, "domain", 'http://localhost', '/ke'), 'http://www.163.com/images/xxx.gif');

	equals(K.formatUrl(K.query("#test05").value), 'http://www.163.com/images/xxx.gif');



	equals(K.formatUrl(K.query("#test06").value, "absolute", 'http://kindsoft.net', '/'), '/kindeditor/plugins/emoticons/etc_01.gif');

	equals(K.formatUrl(K.query("#test06").value, "relative", 'http://kindsoft.net', '/'), 'kindeditor/plugins/emoticons/etc_01.gif');

	equals(K.formatUrl(K.query("#test06").value, "domain", 'http://kindsoft.net', '/'), 'http://kindsoft.net/kindeditor/plugins/emoticons/etc_01.gif');

	equals(K.formatUrl(K.query("#test06").value), 'http://kindsoft.net/kindeditor/plugins/emoticons/etc_01.gif');



	equals(K.formatUrl(K.query("#test07").value, "absolute", 'http://kindsoft.net', '/'), 'mailto:test@test.com');

	equals(K.formatUrl(K.query("#test07").value, "relative", 'http://kindsoft.net', '/'), 'mailto:test@test.com');

	equals(K.formatUrl(K.query("#test07").value, "domain", 'http://kindsoft.net', '/'), 'mailto:test@test.com');

	equals(K.formatUrl(K.query("#test07").value), 'mailto:test@test.com');



	equals(K.formatUrl('http://static.domain.com/img//123.png'), 'http://static.domain.com/img/123.png');



}