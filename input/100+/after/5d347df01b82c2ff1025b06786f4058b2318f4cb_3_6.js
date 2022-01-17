function startResize(e){
			var s = g._getSrc(e),src= s.src,e=baidu.event.get(e);
			headerLeft= baidu.dom.getPosition(g.ref.gheader).left;
			if (src && baidu.dom.hasClass(src,"header-col-resizer")) {
				cell = s.cell;
				l = baidu.dom.getPosition(cell).left;
				var x = baidu.event.getPageX(e);
				g.ref.resizerproxy.style.left = (x - headerLeft) + "px";
				g.ref.resizerproxy.style.height = g.element.clientHeight+"px";
				g.ref.resizerproxy.style.display = "block";
				isResizing = true;
				g.clearSelection();
				e.stopPropagation();
			}
		}