function(ed, url) {
			if(newButtons.indexOf("ljuser") > -1){
				ed.addCommand('mce-ljuser', function() {
					var newcontent = '[userid type="ljuser"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
			});
				ed.addButton('ljuser', {
					title : 'ljuser',
					cmd : 'mce-ljuser',
					image : url + '/img/ljuser.gif'
				});
			}
			if(newButtons.indexOf("ljcomm") > -1){
				ed.addCommand('mce-ljcomm', function() {
					var newcontent = '[userid type="ljcomm"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('ljcomm', {
					title : 'ljcomm',
					cmd : 'mce-ljcomm',
					image : url + '/img/ljcomm.gif'
				});
			}
			if(newButtons.indexOf("liruman") > -1){
			ed.addCommand('mce-liruman', function() {
					var newcontent = '[userid type="liruman"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
			});
				ed.addButton('liruman', {
					title : 'liruman',
					cmd : 'mce-liruman',
					image : url + '/img/liruman.gif'
				});
			}
			if(newButtons.indexOf("lirugirl") > -1){
				ed.addCommand('mce-lirugirl', function() {
					var newcontent = '[userid type="lirugirl"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('lirugirl', {
					title : 'lirugirl',
					cmd : 'mce-lirugirl',
					image : url + '/img/lirugirl.gif'
				});
			}
			if(newButtons.indexOf("ljr") > -1){
				ed.addCommand('mce-ljr', function() {
					var newcontent = '[userid type="ljr"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('ljr', {
					title : 'ljr',
					cmd : 'mce-ljr',
					image : url + '/img/ljr.gif'
				});
			}
			if(newButtons.indexOf("vk") > -1){
				ed.addCommand('mce-vk', function() {
					var newcontent = '[userid type="vk"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('vk', {
					title : 'vk',
					cmd : 'mce-vk',
					image : url + '/img/vk.gif'
				});
			}
			if(newButtons.indexOf("twitter") > -1){
				ed.addCommand('mce-twitter', function() {
					var newcontent = '[userid type="twitter"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('twitter', {
					title : 'twitter',
					cmd : 'mce-twitter',
					image : url + '/img/twitter.gif'
				});
			}
			if(newButtons.indexOf("facebook") > -1){
				ed.addCommand('mce-facebook', function() {
					var newcontent = '[userid type="facebook"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('facebook', {
					title : 'facebook',
					cmd : 'mce-facebook',
					image : url + '/img/facebook.gif'
				});
			}
			if(newButtons.indexOf("google_plus") > -1){
				ed.addCommand('mce-google_plus', function() {
					var newcontent = '[userid type="google_plus"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('google_plus', {
					title : 'google_plus',
					cmd : 'mce-google_plus',
					image : url + '/img/google_plus.gif'
				});
			}
			if(newButtons.indexOf("wordpress") > -1){
				ed.addCommand('mce-wordpress', function() {
					var newcontent = '[userid type="wordpress"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('wordpress', {
					title : 'wordpress',
					cmd : 'mce-wordpress',
					image : url + '/img/wordpress.gif'
				});
			}
			if(newButtons.indexOf("habrahabr") > -1){
				ed.addCommand('mce-habrahabr', function() {
					var newcontent = '[userid type="habrahabr"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('habrahabr', {
					title : 'habrahabr',
					cmd : 'mce-habrahabr',
					image : url + '/img/habrahabr.gif'
				});
			}
			if(newButtons.indexOf("github") > -1){
				ed.addCommand('mce-github', function() {
					var newcontent = '[userid type="github"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton('github', {
					title : 'github',
					cmd : 'mce-github',
					image : url + '/img/github.gif'
				});
			}
		}