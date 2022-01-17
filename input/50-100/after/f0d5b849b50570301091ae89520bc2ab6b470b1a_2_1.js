function (e, data) {
                if (data.context) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    data.context.find('.progress')
                        .attr('aria-valuenow', progress)
                        .find('.bar').css(
                            'width',
                            progress + '%'
                        );
                }
            }