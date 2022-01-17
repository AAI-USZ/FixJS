function() {

		equals(iframe.contentDocument.getElementById("test_img").src, "",

				"图片链接被替换为空");

		iframe.contentWindow.scroll(0, 20);

	}