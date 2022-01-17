function(view, changeSize, resultSize){
			// summary:
			//		resize view.
			//
			// view: Object
			//		view instance needs to do layout.

			var node = view.domNode;
			// set margin box size, unless it wasn't specified, in which case use current size
			if(changeSize){
				dgeometry.setMarginBox(node, changeSize);
				// set offset of the node
				if(changeSize.t){ node.style.top = changeSize.t + "px"; }
				if(changeSize.l){ node.style.left = changeSize.l + "px"; }
			}

			// If either height or width wasn't specified by the user, then query node for it.
			// But note that setting the margin box and then immediately querying dimensions may return
			// inaccurate results, so try not to depend on it.
			var mb = resultSize || {};
			lang.mixin(mb, changeSize || {});	// changeSize overrides resultSize
			if( !("h" in mb) || !("w" in mb) ){
				mb = lang.mixin(dgeometry.getMarginBox(node), mb);	// just use dojo/_base/html.marginBox() to fill in missing values
			}

			// Compute and save the size of my border box and content box
			// (w/out calling dojo/_base/html.contentBox() since that may fail if size was recently set)
			var cs = dstyle.getComputedStyle(node);
			var me = dgeometry.getMarginExtents(node, cs);
			var be = dgeometry.getBorderExtents(node, cs);
			var bb = (view._borderBox = {
				w: mb.w - (me.w + be.w),
				h: mb.h - (me.h + be.h)
			});
			var pe = dgeometry.getPadExtents(node, cs);
			view._contentBox = {
				l: dstyle.toPixelValue(node, cs.paddingLeft),
				t: dstyle.toPixelValue(node, cs.paddingTop),
				w: bb.w - pe.w,
				h: bb.h - pe.h
			};

			this._doLayout(view);

			// do selectedChild layout
			if(view.selectedChild){
				this._doResize(view.selectedChild);
			}
		}