function(key, value) {
                    form.append($("<input>",{
                       type  : "hidden",
		       name  : key,
		       value : value,
		       class : "ocupload-" + id  // including the upload id
                    }));

                }