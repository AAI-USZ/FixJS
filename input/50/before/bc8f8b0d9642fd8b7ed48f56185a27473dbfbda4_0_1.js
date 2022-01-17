function() {
				$("#toAnnotate").annotateImage({
					getUrl: "/api/public/tags.json",
					saveUrl: "/tags/save",
					deleteUrl: "delete.html",
					editable: true
				});
			}