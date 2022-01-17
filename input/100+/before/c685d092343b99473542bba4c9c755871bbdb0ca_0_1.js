function(e) {

		var

		control = $(this).attr('id'),

		uploadId = (new Date()).getTime() + '_upload',

		$parent = $(this).parent();

		$('<iframe id="' + uploadId + '" style="display:none;"></iframe>').appendTo('body');

		$uploadForm = $('<form action="/admin/upload/' + control + '/" method="post" target="' + uploadId + '" id="form_' + uploadId + '" enctype="multipart/form-data"><input type="hidden" name="uploadId" value="' + uploadId + '" /></form>');

		$parent.append('<span class="uploader" id="loader_' + uploadId + '">Uploading...</span>');

		$(this).appendTo($uploadForm);

		$uploadForm.submit();

	}