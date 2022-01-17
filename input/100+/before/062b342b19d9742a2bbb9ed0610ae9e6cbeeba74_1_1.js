function() {

					var templateId = $.trim(this.id);

					var templateString = $.trim(this.innerHTML);

					if (!templateId) {

						// 空文字または空白ならエラー

						throwFwError(ERR_CODE_TEMPLATE_INVALID_ID, null, {});

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

							error: e

						});

					}

				}