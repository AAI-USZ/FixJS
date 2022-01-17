function load(task, count) {

				var step = count || 0;

				if (task.length == step) {

					df.resolve();

					return;

				}

				var filePath = task[step];

				var absolutePath = toAbsoluteUrl(filePath);

				if (!that.accessingUrls[absolutePath]) {

					that.accessingUrls[absolutePath] = h5.ajax(filePath);

				}



				that.accessingUrls[absolutePath].then(

						function(result, statusText, obj) {

							delete that.accessingUrls[absolutePath];

							var templateText = obj.responseText;

							// IE8以下で、テンプレート要素内にSCRIPTタグが含まれていると、jQueryが</SCRIPT>をunknownElementとして扱ってしまうため、ここで除去する

							var $elements = $(templateText).filter(

									function() {

										// nodeType:8 コメントノード

										return (this.tagName && this.tagName.indexOf('/') === -1)

												&& this.nodeType !== 8;

									});

							var filePath = this.url;



							if ($elements.not('script[type="text/ejs"]').length > 0) {

								df.reject(createRejectReason(ERR_CODE_TEMPLATE_FILE,

										[ERR_REASON_SCRIPT_ELEMENT_IS_NOT_EXIST], {

											url: absolutePath,

											path: filePath

										}));

							}

							var compileData = null;

							try {

								compileData = compileTemplatesByElements($elements

										.filter('script[type="text/ejs"]'));

							} catch (e) {

								e.detail.url = absolutePath;

								e.detail.path = filePath;

								df.reject(e);

							}

							try {

								var compiled = compileData.compiled;

								var data = compileData.data;

								data.path = filePath;

								data.absoluteUrl = absolutePath;

								$.extend(ret, compiled);

								datas.push(data);

								that.append(absolutePath, compiled, filePath);

								load(task, ++step);

							} catch (e) {

								df.reject(createRejectReason(ERR_CODE_TEMPLATE_FILE, null, {

									error: e,

									url: absolutePath,

									path: filePath

								}));

							}

						}).fail(

						function(e) {

							delete that.accessingUrls[absolutePath];

							df.reject(createRejectReason(ERR_CODE_TEMPLATE_AJAX, [e.status,

									absolutePath], {

								url: absolutePath,

								path: filePath,

								error: e

							}));

							return;

						});



				return df.promise();

			}