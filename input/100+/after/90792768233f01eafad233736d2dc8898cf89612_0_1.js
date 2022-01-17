function () {

	if (window.FileReader) {

		var	oPreviewImg = null, oFReader = new window.FileReader(),

			rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

		oFReader.onloadend = function (oFREvent) {

			$("#imagePreview img")[0].src = oFREvent.target.result;

		};



		return function () {

			var aFiles = document.getElementById("user_image_url").files;

			if (aFiles.length === 0) { return; }

			if (!rFilter.test(aFiles[0].type)) { alert("You must select a valid image file!"); return; }

			oFReader.readAsDataURL(aFiles[0]);

		}



	}

	if (navigator.appName === "Microsoft Internet Explorer") {

		return function () {

			document.getElementById("imagePreview").filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = document.getElementById("imageInput").value;



		}

	}

}