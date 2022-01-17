function () {

		cslEditor.conformStyleToRepoConventions();

		filename = cslEditor.getStyleId().replace(/.*\//g, "").replace(/[\\/:"*?<>| ]+/g, "-") + '.csl';

		// add comment to start
		cslCode = CSLEDIT.data.getCslCode("This style was created with the Visual CSL Editor (" +
			window.location.href + ")");

		dialog.dialog({
			minWidth : 750,
			minHeight : 450,
			modal : true,
			open :  function () {
				dialog.find('#accordion').accordion({});
				saveButton.find('a').css({
					color : "blue",
					"text-decoration" : "underline"
				});

				saveButton.children().remove();

				saveButton.downloadify({
					swf : '../external/downloadify/downloadify.swf',
					downloadImage : '../external/downloadify/download.png',
					width : 100,
					height : 30,
					filename : filename,
					data : cslCode,
					transparent : true,
					onComplete: function(){
						alert('Your CSL Style Has Been Saved!');
						dialog.dialog('destroy');
					},
					onCancel: function(){ },
					onError: function(){ alert('Error saving file.'); }
				});

				// if it failed, show instructions to install flash player
				if (saveButton.find('object').length === 0) {
					dialog.find('#refManagerInstructions').css({display:"none"});
					dialog.find('#installFlash').html(
						'<h2>Flash Player not found</h2><br/>' + 
						'<h3>To save to disk, you need to:' +
						'<ul>' +
						'<li><a href="http://get.adobe.com/flashplayer/">Install Adobe Flash Player</a></li>' +
						'<li>Reload this page and try again</li>' + 
						'</ul></h3>');
				} else {
					dialog.find('#refManagerInstructions').css({display:"block"});
					dialog.find('#installFlash').html('');
				}
			}
		});
	}