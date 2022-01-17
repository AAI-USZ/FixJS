function(resourcePaths) {

			var ret = {};

			var tasks = [];

			var datas = [];



			var that = this;

			/**

			 * キャッシュからテンプレートを取得します。

			 * 

			 * @param {String} url ファイルの絶対パス

			 * @returns {Object} テンプレートIDがkeyである、コンパイル済みテンプレートオブジェクトを持つオブジェクト

			 */

			var getTemplateByURL = function(url) {

				var ret = that.cache[url].templates;

				that.deleteCache(url, true);

				that.cacheUrls.push(url);

				return ret;

			};



			/**

			 * テンプレートをEJS用にコンパイルされたテンプレートに変換します。

			 * 

			 * @param {jQuery} $templateElements テンプレートが記述されている要素(<script type="text/ejs">...</script>)

			 * @returns {Object}

			 *          テンプレートIDがkeyである、コンパイル済みテンプレートオブジェクトを持つオブジェクトと、テンプレートを取得したファイルパスと絶対パス(URL)を保持するオブジェクト

			 */

			function compileTemplatesByElements($templateElements) {

				if ($templateElements.length === 0) {

					return;

				}



				/**

				 * テンプレート読み込み結果オブジェクト

				 */

				var compiled = {};

				/**

				 * 読み込んだテンプレートのIDを覚えておく

				 */

				var ids = [];



				$templateElements.each(function() {

					var templateId = $.trim(this.id);

					var templateString = $.trim(this.innerHTML);



					if (!templateId) {

						// 空文字または空白ならエラー

						throwFwError(ERR_CODE_TEMPLATE_INVALID_ID, null, {

							error: null

						});

					}



					try {

						var compiledTemplate = new EJS.Compiler(templateString, DELIMITER);

						compiledTemplate.compile();

						compiled[templateId] = compiledTemplate.process;

						ids.push(templateId);

					} catch (e) {

						var lineNo = e.lineNumber;

						var msg = lineNo ? ' line:' + lineNo : '';

						throwFwError(ERR_CODE_TEMPLATE_COMPILE, [h5.u.str.format(

								ERR_REASON_SYNTAX_ERR, msg, e.message)], {

							id: templateId,

							error: e,

							lineNo: lineNo

						});

					}

				});

				return {

					compiled: compiled,

					data: {

						ids: ids

					}

				};

			}



			function load(absolutePath, filePath) {

				var df = getDeferred();



				h5.ajax(filePath).done(

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

								return;

							}



							var compileData = null;



							try {

								compileData = compileTemplatesByElements($elements

										.filter('script[type="text/ejs"]'));

							} catch (e) {

								e.detail.url = absolutePath;

								e.detail.path = filePath;

								df.reject(e);

								return;

							}



							try {

								var compiled = compileData.compiled;

								var data = compileData.data;

								data.path = filePath;

								data.absoluteUrl = absolutePath;

								$.extend(ret, compiled);

								datas.push(data);

								that.append(absolutePath, compiled, filePath);

							} catch (e) {

								df.reject(createRejectReason(ERR_CODE_TEMPLATE_FILE, null, {

									error: e,

									url: absolutePath,

									path: filePath

								}));

								return;

							}



							df.resolve();

						}).fail(function(e) {

					delete that.accessingUrls[absolutePath];

					df.reject(createRejectReason(ERR_CODE_TEMPLATE_AJAX, null, {

						url: absolutePath,

						path: filePath,

						error: e

					}));

					return;

				});



				return df.promise();

			}



			// キャッシュにあればそれを結果に格納し、なければajaxで取得する。

			for ( var i = 0; i < resourcePaths.length; i++) {

				var path = resourcePaths[i];

				var absolutePath = toAbsoluteUrl(path);

				if (this.cache[absolutePath]) {

					$.extend(ret, getTemplateByURL(absolutePath));

					datas.push({

						absoluteUrl: absolutePath

					});

					continue;

				}

				tasks.push([load, [absolutePath, path]]);

			}





			var retDf = getDeferred();

			var tasksDf = getDeferred();

			var loadDf = getDeferred().resolve();



			$.each(tasks, function() {

				var task = this;



				loadDf = loadDf.pipe(function() {

					return task[0].apply(task[0], task[1]).fail(function(e) {

						tasksDf.reject(e);

					});

				});

			});



			loadDf.pipe(function() {

				return tasksDf.resolve();

			});



			tasksDf.done(function() {

				retDf.resolve(ret, datas);

			}).fail(function(e) {

				retDf.reject(e);

			});



			return retDf.promise();

		}