function(response) {
                    try {
                        response = JSON.parse(response);
                    } catch (jsonError) {
                        log.warning('JSON error: ', jsonError);
                        return;
                    }
                    if (response.ready || test_request.download_request_number > 50) {
                        clearInterval(test_request.download_ID);
                        test_request.spinner.removeClass('loading');
						if (!response.ready) {
							fd.error.alert('XPI download failed',
								'XPI is not yet prepared, giving up');
						}
                    }
                    if (response.ready) {
                        var url = '/xpi/download/'+hashtag+'/'+filename+'/';
                        log.debug('downloading ' + filename + '.xpi from ' + url );
                        dom.window.getNode().open(url, 'dl');
                    }
                }