function (result) {
			                if (result && result.length) {
								//console.log(result);
			                    $(that).fileupload('option', 'done')
			                        .call(that, null, {result: result[0].message.done});
			                }
			            }