function getHTML5() {

		var html5 = mapCache.html5;



		if (!html5) {

			html5 = mapCache.html5 = unpack({

					A : 'id|accesskey|class|dir|draggable|item|hidden|itemprop|role|spellcheck|style|subject|title',

					B : '#|a|abbr|area|audio|b|bdo|br|button|canvas|cite|code|command|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|keygen|label|link|map|mark|meta|' +

						'meter|noscript|object|output|progress|q|ruby|samp|script|select|small|span|strong|sub|sup|svg|textarea|time|var|video',

					C : '#|a|abbr|area|address|article|aside|audio|b|bdo|blockquote|br|button|canvas|cite|code|command|datalist|del|details|dfn|dialog|div|dl|em|embed|fieldset|' +

						'figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|i|iframe|img|input|ins|kbd|keygen|label|link|map|mark|menu|meta|meter|nav|noscript|ol|object|output|' +

						'p|pre|progress|q|ruby|samp|script|section|select|small|span|strong|style|sub|sup|svg|table|textarea|time|ul|var|video'

				}, 'html[A|manifest][body|head]' +

					'head[A][base|command|link|meta|noscript|script|style|title]' +

					'title[A][#]' +

					'base[A|href|target][]' +

					'link[A|href|rel|media|type|sizes][]' +

					'meta[A|http-equiv|name|content|charset][]' +

					'style[A|type|media|scoped][#]' +

					'script[A|charset|type|src|defer|async][#]' +

					'noscript[A][C]' +

					'body[A][C]' +

					'section[A][C]' +

					'nav[A][C]' +

					'article[A][C]' +

					'aside[A][C]' +

					'h1[A][B]' +

					'h2[A][B]' +

					'h3[A][B]' +

					'h4[A][B]' +

					'h5[A][B]' +

					'h6[A][B]' +

					'hgroup[A][h1|h2|h3|h4|h5|h6]' +

					'header[A][C]' +

					'footer[A][C]' +

					'address[A][C]' +

					'p[A][B]' +

					'br[A][]' +

					'pre[A][B]' +

					'dialog[A][dd|dt]' +

					'blockquote[A|cite][C]' +

					'ol[A|start|reversed][li]' +

					'ul[A][li]' +

					'li[A|value][C]' +

					'dl[A][dd|dt]' +

					'dt[A][B]' +

					'dd[A][C]' +

					'a[A|href|target|ping|rel|media|type][C]' +

					'em[A][B]' +

					'strong[A][B]' +

					'small[A][B]' +

					'cite[A][B]' +

					'q[A|cite][B]' +

					'dfn[A][B]' +

					'abbr[A][B]' +

					'code[A][B]' +

					'var[A][B]' +

					'samp[A][B]' +

					'kbd[A][B]' +

					'sub[A][B]' +

					'sup[A][B]' +

					'i[A][B]' +

					'b[A][B]' +

					'mark[A][B]' +

					'progress[A|value|max][B]' +

					'meter[A|value|min|max|low|high|optimum][B]' +

					'time[A|datetime][B]' +

					'ruby[A][B|rt|rp]' +

					'rt[A][B]' +

					'rp[A][B]' +

					'bdo[A][B]' +

					'span[A][B]' +

					'ins[A|cite|datetime][B]' +

					'del[A|cite|datetime][B]' +

					'figure[A][C|legend|figcaption]' +

					'figcaption[A][C]' +

					'img[A|alt|src|height|width|usemap|ismap][]' +

					'iframe[A|name|src|height|width|sandbox|seamless][]' +

					'embed[A|src|height|width|type][]' +

					'object[A|data|type|height|width|usemap|name|form|classid][param]' +

					'param[A|name|value][]' +

					'details[A|open][C|legend]' +

					'command[A|type|label|icon|disabled|checked|radiogroup][]' +

					'menu[A|type|label][C|li]' +

					'legend[A][C|B]' +

					'div[A][C]' +

					'source[A|src|type|media][]' +

					'audio[A|src|autobuffer|autoplay|loop|controls][source]' +

					'video[A|src|autobuffer|autoplay|loop|controls|width|height|poster][source]' +

					'hr[A][]' +

					'form[A|accept-charset|action|autocomplete|enctype|method|name|novalidate|target][C]' +

					'fieldset[A|disabled|form|name][C|legend]' +

					'label[A|form|for][B]' +

					'input[A|type|accept|alt|autocomplete|checked|disabled|form|formaction|formenctype|formmethod|formnovalidate|formtarget|height|list|max|maxlength|min|' +

						'multiple|pattern|placeholder|readonly|required|size|src|step|width|files|value|name][]' +

					'button[A|autofocus|disabled|form|formaction|formenctype|formmethod|formnovalidate|formtarget|name|value|type][B]' +

					'select[A|autofocus|disabled|form|multiple|name|size][option|optgroup]' +

					'datalist[A][B|option]' +

					'optgroup[A|disabled|label][option]' +

					'option[A|disabled|selected|label|value][]' +

					'textarea[A|autofocus|disabled|form|maxlength|name|placeholder|readonly|required|rows|cols|wrap][]' +

					'keygen[A|autofocus|challenge|disabled|form|keytype|name][]' +

					'output[A|for|form|name][B]' +

					'canvas[A|width|height][]' +

					'map[A|name][B|C]' +

					'area[A|shape|coords|href|alt|target|media|rel|ping|type][]' +

					'mathml[A][]' +

					'svg[A][]' +

					'table[A|summary][caption|colgroup|thead|tfoot|tbody|tr]' +

					'caption[A][C]' +

					'colgroup[A|span][col]' +

					'col[A|span][]' +

					'thead[A][tr]' +

					'tfoot[A][tr]' +

					'tbody[A][tr]' +

					'tr[A][th|td]' +

					'th[A|headers|rowspan|colspan|scope][B]' +

					'td[A|headers|rowspan|colspan][C]'

			);

		}



		return html5;

	}