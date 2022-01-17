function (e, data) {
                if (data.context) {
                	var progress = parseInt(data.loaded / data.total * 100, 10);
                    data.context.find('.bar').css(
                        'width',
                        progress + '%'
                    ).parent().attr(
                    	'aria-valuenow',
                    	progress
                    ).attr(
                    	'aria-valuetext',
                    	progress + '%'
                    );
                }
            }