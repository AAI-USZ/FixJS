function(){
			var elem = this.element,
				sibHeight = 0;
			elem.siblings(":visible").each(function(){
				sibHeight += $(this).outerHeight(true);
			});
			elem.height(elem.parent().height() - sibHeight-1);
			this._trigger("resize", 0, this);
		}