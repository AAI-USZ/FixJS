function(place, options) {
		var locale = macro.locale;
		if(readOnly) {
			$('<div class="annotation" />').text(locale.membersOnly).
				appendTo(place);
			return;
		}
		var bag = options.bag;
		options.callback = options.callback ? options.callback :
			function(place, fileName, workspace, baseurl) {
				macro.displayFile(place, fileName, workspace);
				displayMessage(locale.loadSuccess.format(fileName));
				$("input[type=text]", place).val("");
			};
		var defaults = config.defaultCustomFields;
		place = $("<div />").addClass("container").appendTo(place)[0];
		var workspace = bag ? "bags/%0".format(bag) : config.defaultCustomFields["server.workspace"];
		var baseURL = defaults["server.host"];
		baseURL += (baseURL[baseURL.length - 1] !== "/") ? "/" : "";
		baseURL = "%0%1/tiddlers".format(baseURL, workspace);
		//create the upload form, complete with invisible iframe
		var iframeName = "binaryUploadiframe%0".format(Math.random());
		// do not refactor following line of code to work in IE6.
		var form = $('<form action="%0" method="POST" enctype="multipart/form-data" />'.
					format(baseURL)).addClass("binaryUploadForm").
			appendTo(place)[0];
		macro.renderInputFields(form, options);
		$(form).
			append('<div class="binaryUploadFile"><input type="file" name="file" /></div>').
			append('<div class="binaryUploadSubmit"><input type="submit" value="Upload" disabled /></div>').
			submit(function(ev) {
				this.target = iframeName;
				options.target = iframeName;
				macro.uploadFile(place, baseURL, workspace, options);
			})
			.find('[type="file"]').bind('change', function() {
				$(form).find('[type="submit"]').prop('disabled', false);
			}).end();
		$('<div />').addClass("uploadProgress").text(locale.uploadInProgress).hide().appendTo(place);
		$("input[name=file]", place).change(function(ev) {
			var target = $(ev.target);
			var fileName = target.val();
			var title = $("input[type=text][name=title]", place);
			if(!title.val()) {
				title.val(fileName);
			}
		});
	}