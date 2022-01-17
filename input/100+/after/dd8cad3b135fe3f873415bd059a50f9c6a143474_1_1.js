function submitForm() {
        button.hide();
		if (Ti.UI.createProgressBar) {
			uploadProgress.value = 0;
			Cloud.onsendstream = function (evt) {
				uploadProgress.value = evt.progress * 0.5;
			};
			Cloud.ondatastream = function (evt) {
				uploadProgress.value = (evt.progress * 0.5) + 0.5;
			};
		}
        Cloud.Files.create({
	        name: name.value,
	        // The example file is located in the windows/files subfolder of the project resources
	        file: Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'windows/files/' + fileName.value)
        }, function (e) {
	        Cloud.onsendstream = Cloud.ondatastream = null;
            if (e.success) {
                alert('Created!');
                name.value = '';
            } else {
                error(e);
            }
            button.show();
        });
    }