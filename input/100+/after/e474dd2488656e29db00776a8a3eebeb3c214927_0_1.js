function(i, $Link) {
			var showPreviousImageLink = i === 0;;
			var showNextImage = i > ($Link.Total - 1);
			var thisImageTemplate = imageTemplate;
			thisImageTemplate = replaceAll(thisImageTemplate, "{{Link}}", $Link.Link);
			thisImageTemplate = replaceAll(thisImageTemplate, "{{Index}}", i);
			thisImageTemplate = replaceAll(thisImageTemplate, "{{PreviousImage}}", showPreviousImageLink ? "hide" : "");
			thisImageTemplate = replaceAll(thisImageTemplate, "{{NextImage}}", showNextImage ? "hide" : "");
			thisImageTemplate = replaceAll(thisImageTemplate, "\t", "");
			$(thisImageTemplate).appendTo("#content");
		}