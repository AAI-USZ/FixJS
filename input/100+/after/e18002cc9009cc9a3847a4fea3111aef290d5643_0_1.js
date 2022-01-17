function (result) {
			                if (result && result.length) {
								for(var i=0; i < result[0].message.done.length; i++) {
									var tmp_str = result[0].message.done[i].value.replace(' ', '');
									var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?\^=%&amp;:\/~\+#]*[\w\-\@?\^=%&amp;\/~\+#])?/;
									var tmp_str1 = tmp_str.match(reg);
									if(tmp_str1 && tmp_str1.length > 0) {
										result[0].message.done[i].download_url = tmp_str1[0];
									} else {
										result[0].message.done[i].download_url = '#';
									}
								}								
								//console.log(result);
			                    $(that).fileupload('option', 'done')
			                        .call(that, null, {result: result[0].message.done});
			                }
			            }