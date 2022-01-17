function() {
				$("#toAnnotate").annotateImage({
					getUrl: "/api/public/tags.json?filename=" + postfilename,
					saveUrl: "/tags/save",
					deleteUrl: "/tags/delete",
					editable: true
				});
			}