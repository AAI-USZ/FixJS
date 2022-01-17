function(element) {
		this.Element = $(element);
		
		$(element).css({ position: "absolute", left: "-1000000px" });
		div = $("<div>").addClass("select");
		tester = $("<div>").css({ position: "absolute", top: "-1000px", left: "-1000px", "font-size": "16px", "white-space": "nowrap" });
		$("body").append(tester);
		maxwidth = 0;
		
		html = "";
		selected = "";
		for (i = 0; i < element.options.length; i++) {
			op = element.options[i];
			this.Options[i] = op;
			
			// Get the size of this text.
			tester.html(op.text);
			width = tester.width();
			if (width > maxwidth) {
				maxwidth = width;
			}
			
			if (i == 0) {
				selected = op.text;
				html += '<span>' + op.text + '</span><datalist style="display: none;">';
			}
			html += '<data value="' + op.value + '">' + op.text + '</data>';
			
			if (op.selected) {
				selected = op.text;
			}
		}
		html += '</datalist>';
		div.html(html);
		
		spanwidth = maxwidth;
		// If we're in a section cell we may need to be smaller.
		if ($(element).parent().get(0).tagName.toLowerCase() == "section") {
			sectionwidth = $(element).parent().width();
			if (sectionwidth < (maxwidth + 56)) {
				spanwidth = sectionwidth - 56;
			}
		}
		
		div.find("span").css({ width: spanwidth + "px", height: "30px" }).html(selected).click($.proxy(this.click,this));
		div.find("datalist").css({ width: (maxwidth + 54) + "px" });
		div.find("data").click($.proxy(this.select,this));
		
		$(element).after(div);
		
		this.Container = div;
		
		// Observe focus on the select that's been hidden.
		this.Element.focus($.proxy(this.focus,this));
		this.Element.blur($.proxy(this.blur,this));
	}