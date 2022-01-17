function (e) {
	        Cloud.onsendstream = Cloud.ondatastream = null;
            if (e.success) {
                alert('Created!');
                name.value = '';
            } else {
                error(e);
            }
            button.show();
        }