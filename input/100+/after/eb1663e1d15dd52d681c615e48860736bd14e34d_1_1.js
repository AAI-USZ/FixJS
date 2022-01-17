function() {
			var merge = {
				bold: { txtExec: ["[b]", "[/b]"] },
				
				h1: { txtExec: ["[h1]", "[/h1]"] },
				h2: { txtExec: ["[h2]", "[/h2]"] },
				h3: { txtExec: ["[h3]", "[/h3]"] },
				h4: { txtExec: ["[h4]", "[/h4]"] },
				h5: { txtExec: ["[h5]", "[/h5]"] },
				h6: { txtExec: ["[h6]", "[/h6]"] },
				italic: { txtExec: ["[i]", "[/i]"] },
				underline: { txtExec: ["[u]", "[/u]"] },
				strike: { txtExec: ["[s]", "[/s]"] },
				subscript: { txtExec: ["[sub]", "[/sub]"] },
				superscript: { txtExec: ["[sup]", "[/sup]"] },
				left: { txtExec: ["[left]", "[/left]"] },
				center: { txtExec: ["[center]", "[/center]"] },
				right: { txtExec: ["[right]", "[/right]"] },
				justify: { txtExec: ["[justify]", "[/justify]"] },
				font: { txtExec: function(caller) {
					var editor = this;
					
					$.sceditor.command.get('font')._createDropDown(
						editor,
						caller,
						function(fontName) {
							editor.insertText("[font="+fontName+"]", "[/font]");
						}
					);
				} },
				size: { txtExec: function(caller) {
					var editor = this;
					
					$.sceditor.command.get('size')._createDropDown(
						editor,
						caller,
						function(fontSize) {
							editor.insertText("[size="+fontSize+"]", "[/size]");
						}
					);
				} },
				color: { txtExec: function(caller) {
					var editor = this;
					
					$.sceditor.command.get('color')._createDropDown(
						editor,
						caller,
						function(color) {
							editor.insertText("[color="+color+"]", "[/color]");
						}
					);
				} },
				bulletlist: { txtExec: ["[ul][li]", "[/li][/ul]"] },
				orderedlist: { txtExec: ["[ol][li]", "[/li][/ol]"] },
				table: { txtExec: ["[table][tr][td]", "[/td][/tr][/table]"] },
				horizontalrule: { txtExec: ["[hr]"] },
				code: { txtExec: ["[code]", "[/code]"] },
				image: { txtExec: function(caller, selected) {
					var url = prompt(this._("Enter the image URL:"), selected);
					
					if(url)
						this.insertText("[img]" + url + "[/img]");
				} },
				email: { txtExec: function(caller, selected) {
					var	email	= prompt(this._("Enter the e-mail address:"), selected || "@"),
						text	= prompt(this._("Enter the displayed text:"), email) || email;
					
					if(email)
						this.insertText("[email=" + email + "]" + text + "[/email]");
				} },
				link: { txtExec: function(caller, selected) {
					var	url	= prompt(this._("Enter URL:"), selected || "http://"),
						text	= prompt(this._("Enter the displayed text:"), url) || url;
					
					if(url)
						this.insertText("[url=" + url + "]" + text + "[/url]");
				} },
				quote: { txtExec: ["[quote]", "[/quote]"] },
				youtube: { txtExec: function(caller, selected) {
					var url = prompt(this._("Enter the YouTube video URL or ID:"), selected);
					
					if(url)
					{
						if(url.indexOf("://") > -1)
							url = url.replace(/^[^v]+v.(.{11}).*/,"$1");
						
						this.insertText("[youtube]" + url + "[/youtube]");
					}
				} },
				rtl: { txtExec: ["[rtl]", "[/rtl]"] },
				ltr: { txtExec: ["[ltr]", "[/ltr]"] }
			};

			return $.extend(true, {}, merge, $.sceditor.commands);
		}