function() {
			testGc('<P class="article">', '<p class="article"></p>');
			testGc('<BR class="aloha-end-br">', '<br class="aloha-end-br"/>');
			testGc('<P style="color:red">', ['<p style="color:red"></p>', '<p style="color: red"></p>']);
			testGc('<BR style="color:red">', ['<br style="color:red"/>', '<br style="color: red"/>']);
		}