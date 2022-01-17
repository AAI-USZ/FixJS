function() {
			var val, vleft, vright;
	
			// MARGIN
			// TODO: move the magic number "2", etc
			val = subv.settings.margin;
			if (subv.settings.margin !== 0 && !subv.settings.margin) {
				val = 2;
			}
			//subv.log("margin is 0 " + val + "%");
			(function(marginVal) {
				setTimeout(function() {
					$("#wrapper").css({
						"margin-left": marginVal + "%",
						"margin-right": marginVal + "%"
					});
				}, 1000);
			})(val);
			$("#width-margin").val(val);
	
			// SPLITTER
			vleft = subv.settings.splitter || 42;
			vright = 100 - vleft;
			if (vright === 0) {
				vright = 100;
			}
			$("#items").css({ "width": vleft + "%" });
			$("#item").css({ "width": vright + "%" });
			$("#width-splitter").val(vleft);
	
			// EXPAND
			val = subv.settings.expandMode || "inline";
			$(".js-expand-mode").removeClass("active");
			$("#js-expand-mode-" + val).addClass("active");
		}