function(ed, url) {
		for ( i in newButtons) {
			var itemTitle = newButtons[i];
			(function(itemTitle) {
				var itemCommand = 'mce'+itemTitle;
				ed.addCommand(itemCommand, function() {
					var newcontent = '[userid type="'+itemTitle+'"]' + tinyMCE.activeEditor.selection.getContent({format : 'raw'}) + '[/userid]';
					tinyMCE.activeEditor.selection.setContent(newcontent);
				});
				ed.addButton(itemTitle, {
					title : itemTitle,
					cmd : itemCommand,
					image : url + '/img/'+itemTitle+'.gif'
				});
			})(itemTitle);
		}
	}