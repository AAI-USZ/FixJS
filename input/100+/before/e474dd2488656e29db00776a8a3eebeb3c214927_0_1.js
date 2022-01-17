function(i, $Link) {
			var showPreviousImageLink = i === 0 ? "hide" : "";
			var showNextImage = i < ($Link.Total - 1) ? "hide" : "";
			var thisImageTemplate = imageTemplate;
			thisImageTemplate = replaceAll(thisImageTemplate, "{{Link}}", $Link.Link);
			thisImageTemplate = replaceAll(thisImageTemplate, "{{Index}}", i);
			thisImageTemplate = replaceAll(thisImageTemplate, "{{PreviousImage}}", showPreviousImageLink);
			thisImageTemplate = replaceAll(thisImageTemplate, "{{NextImage}}", showNextImage);
			thisImageTemplate = replaceAll(thisImageTemplate, "\t", "");
			$(thisImageTemplate).appendTo("#content");
		}