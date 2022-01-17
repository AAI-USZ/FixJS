function apply(dir, widget) {
     var DC = DirConfig[dir],
       OC = DirConfig[dir ^ 1],
       measures = DC.measures,
       cSize = 0, cClientSize = false, cPaddedSize = false, noStretch = false;

     var container = topLevel ? widget.parentNode : null,
       containerParent = topLevel ? container.parentNode : null;

     if (DC.maxSize === 0) {
       if (container) {
	 var pc = WT.css(container, 'position');

	 if (pc === 'absolute')
	   cSize = WT.pxself(container, DC.size);

	 if (cSize === 0) {
	   if (!DC.initialized) {
	     if (pc !== 'absolute') {
	       cSize = dir ? container.clientHeight : container.clientWidth;

	       cClientSize = true;

	       if (dir == 0 && cSize == 0 && WT.isIElt9) {
		 cSize = container.offsetWidth;
		 cClientSize = false;
	       }

	       /*
		* heuristic to switch to layout-sizes-container mode
		*/
	       var minSize, ieCSize;

	       if ((WT.hasTag(container, "TD") || WT.hasTag(container, "TH"))
		   && !(WT.isIE && !WT.isIElt9)) {
		 minSize = 0;
		 ieCSize = 1;
	       } else {
		 minSize = measures[TOTAL_MINIMUM_SIZE];
		 ieCSize = 0;
	       }

	       if ((WT.isIElt9 && cSize == ieCSize)
		   || (cSize == minSize + padding(container, dir))) {
		 if (debug)
		   console.log('switching to managed container size '
			       + dir + ' ' + id);
		 DC.maxSize = 999999;
	       }
	     }
	   }

	   if (cSize === 0 && DC.maxSize === 0) {
	     cSize = dir ? container.clientHeight : container.clientWidth;
	     cClientSize = true;
	   }
	 }
       } else {
	 cSize = WT.pxself(widget, DC.size);
	 cPaddedSize = true;
       }
     }

     if (DC.maxSize) {
       // (2) adjust container width/height
       if (measures[TOTAL_PREFERRED_SIZE] < DC.maxSize) {
	 setCss(container, DC.size,
		(measures[TOTAL_PREFERRED_SIZE] + sizePadding(container, dir))
		+ 'px');
	 cSize = measures[TOTAL_PREFERRED_SIZE];
	 cPaddedSize = true;
	 noStretch = true;
       } else {
	 cSize = DC.maxSize;
	 cClientSize = false;
       }
     }

     DC.cSize = cSize;

     if (dir == VERTICAL && container && container.wtResize) {
       var w = OC.cSize,
	   h = DC.cSize;
       container.wtResize(container, w, h);
     }

     if (!cPaddedSize) {
       var p = 0;

       if (!DC.initialized) {
	 if (cClientSize)
	   p = padding(container, dir);
	 else
	   p = sizePadding(container, dir);

	 DC.cPadding = p;
       } else
	 p = DC.cPadding;

       cSize -= p;
     }

     DC.initialized = true;

     if (debug)
       console.log("apply " + id + ': '
		   + dir + " ps " + measures[PREFERRED_SIZE]
		   + " cSize " + cSize);

     if (container && cSize <= 0)
       return;

     // (2a) if we can't satisfy minimum sizes, then overflow container
     if (cSize < measures[TOTAL_MINIMUM_SIZE])
       cSize = measures[TOTAL_MINIMUM_SIZE];

     $(widget).children("." + OC.handleClass)
       .css(DC.size,
	    (cSize - DC.margins[MARGIN_RIGHT] - DC.margins[MARGIN_LEFT])
	    + 'px');

     // (3) compute column/row widths
     var targetSize = [], dirCount = DC.config.length,
       otherCount = OC.config.length;

     if (cSize > measures[TOTAL_MINIMUM_SIZE]) {
       // (1) fixed size columns/rows get their fixed width
       // (2) other colums/rows:
       //   if all columns are not stretchable: make them all stretchable
       //
       //   can non-stretchable ones get their preferred size ?
       //      (assuming stretchables take minimum size)
       //    -> yes: do so;
       //       can stretchable ones get their preferred size ?
       //       -> yes; do so and distribute excess
       //       -> no: shrink according to their preferred size
       //              - min size difference
       //    -> no: shrink non-stretchable ones according to their preferred
       //           size - min size difference
       //       set stretchable ones to minimum size

       /** @const */ var FIXED_SIZE = -1;
       /** @const */ var HIDDEN = -2;
       /** @const */ var NON_STRETCHABLES = 0;
       /** @const */ var STRETCHABLES = 1;

       var toDistribute = cSize - measures[TOTAL_MARGIN];

       var stretch = [];
       var totalMinimum = [0, 0], totalPreferred = [0, 0],
	 totalStretch = 0;

       for (var di = 0; di < dirCount; ++di) {
	 if (measures[MINIMUM_SIZE][di] > -1) {

	   var fs = -1;
	   if (typeof DC.fixedSize[di] !== "undefined")
	     fs = DC.fixedSize[di];
	   else if ((DC.config[di][RESIZABLE] !== 0)
		    && (DC.config[di][RESIZABLE][RS_INITIAL_SIZE] >= 0)) {
	     fs = DC.config[di][RESIZABLE][RS_INITIAL_SIZE];
	     if (DC.config[di][RESIZABLE][RS_PCT])
	       fs = (cSize - measures[TOTAL_MARGIN]) * fs / 100;
	   }

	   if (fs >= 0) {
	     stretch[di] = FIXED_SIZE;
	     targetSize[di] = fs;
	     toDistribute -= targetSize[di];
	   } else {
	     var category;
	     if (DC.config[di][STRETCH] > 0) {
	       category = STRETCHABLES;
	       stretch[di] = DC.config[di][STRETCH];
	       totalStretch += stretch[di];
	     } else {
	       category = NON_STRETCHABLES;
	       stretch[di] = 0;
	     }

	     totalMinimum[category] += measures[MINIMUM_SIZE][di];
	     totalPreferred[category] += measures[PREFERRED_SIZE][di];

	     targetSize[di] = measures[PREFERRED_SIZE][di];
	   }
	 } else
	   stretch[di] = HIDDEN;
       }

       if (totalStretch == 0) {
	 for (di = 0; di < dirCount; ++di)
	   if (stretch[di] == 0) {
	     stretch[di] = 1;
	     ++totalStretch;
	   }

	 totalPreferred[STRETCHABLES] = totalPreferred[NON_STRETCHABLES];
	 totalMinimum[STRETCHABLES] = totalMinimum[NON_STRETCHABLES];

	 totalPreferred[NON_STRETCHABLES] = 0;
	 totalMinimum[NON_STRETCHABLES] = 0;
       }

       if (toDistribute >
	   totalPreferred[NON_STRETCHABLES] + totalMinimum[STRETCHABLES]) {
	 toDistribute -= totalPreferred[NON_STRETCHABLES];

	 if (toDistribute > totalPreferred[STRETCHABLES]) {
	   if (DC.fitSize) {
	     // enlarge stretchables according to their stretch factor
	     toDistribute -= totalPreferred[STRETCHABLES];

	     var factor = toDistribute / totalStretch;

	     for (di = 0; di < dirCount; ++di) {
	       if (stretch[di] > 0)
		 targetSize[di] += Math.round(stretch[di] * factor);
	     }
	   }
	 } else {
	   // shrink stretchables up to their minimum size

	   var category = STRETCHABLES;

	   if (toDistribute < totalMinimum[category])
	     toDistribute = totalMinimum[category];

	   var factor;

	   if (totalPreferred[category] - totalMinimum[category] > 0)
	     factor = (toDistribute - totalMinimum[category])
	       / (totalPreferred[category] - totalMinimum[category]);
	   else
	     factor = 0;

	   for (di = 0; di < dirCount; ++di) {
	     if (stretch[di] > 0) {
	       var s = measures[PREFERRED_SIZE][di]
		 - measures[MINIMUM_SIZE][di];
	       targetSize[di] = measures[MINIMUM_SIZE][di]
		 + Math.round(s * factor);
	     }
	   }
	 }
       } else {
	 for (di = 0; di < dirCount; ++di)
	   if (stretch[di] > 0)
	     targetSize[di] = measures[MINIMUM_SIZE][di];
	 toDistribute -= totalMinimum[STRETCHABLES];

	 // shrink non-stretchables up to their minimum size
	 var category = NON_STRETCHABLES;

	 if (toDistribute < totalMinimum[category])
	   toDistribute = totalMinimum[category];

	 var factor;

	 if (totalPreferred[category] - totalMinimum[category] > 0)
	   factor = (toDistribute - totalMinimum[category])
	     / (totalPreferred[category] - totalMinimum[category]);
	 else
	   factor = 0;

	 for (di = 0; di < dirCount; ++di) {
	   if (stretch[di] == 0) {
	     var s = measures[PREFERRED_SIZE][di]
	       - measures[MINIMUM_SIZE][di];
	     targetSize[di] = measures[MINIMUM_SIZE][di]
	       + Math.round(s * factor);
	   }
	 }
       }
     } else
       targetSize = measures[MINIMUM_SIZE];

     DC.sizes = targetSize;

     if (debug)
       console.log(" -> targetSize: " + targetSize);

     // (4) set widths/heights of cells
     var left = 0, first = true, resizeHandle = false, oi, di;

     for (di = 0; di < dirCount; ++di) {
       if (targetSize[di] > -1) {
	 var thisResized = resizeHandle;
	 if (resizeHandle) {
	   var hid = id + "-rs" + dir + "-" + di;
	   var handle = WT.getElement(hid);
	   if (!handle) {
	     handle = document.createElement('div');
	     handle.setAttribute('id', hid);
	     handle.di = di;
	     handle.style.position='absolute';
	     handle.style[OC.left] = OC.margins[MARGIN_LEFT] + 'px';
	     handle.style[DC.size] = DC.margins[SPACING] + 'px';
	     handle.className = DC.handleClass;
	     widget.insertBefore(handle, widget.firstChild);

	     handle.onmousedown = handle.ontouchstart = function(event) {
	       var e = event||window.event;
	       startResize(dir, this, e);
	     };
	   }

	   left += RESIZE_HANDLE_MARGIN;
	   setCss(handle, DC.left, left + 'px');
	   left += RESIZE_HANDLE_MARGIN;
	 }

	 resizeHandle = DC.config[di][RESIZABLE] !== 0;

	 if (first) {
	   left += DC.margins[MARGIN_LEFT];
	   first = false;
	 } else
	   left += DC.margins[SPACING];

	 for (oi = 0; oi < otherCount; ++oi) {
	   var item = DC.getItem(di, oi);
	   if (item && item.w) {
	     var w = item.w;

	     var ts = targetSize[di];
	     if (item.span) {
	       var si;

	       var rs = resizeHandle;
	       for (si = 1; si < item.span[dir]; ++si) {
		 if (rs)
		   ts += RESIZE_HANDLE_MARGIN * 2;
		 rs = DC.config[di + rs][RESIZABLE] !== 0;
		 ts += DC.margins[SPACING];
		 ts += targetSize[di + si];
	       }
	     }

	     var off;

	     w.style.visibility = '';

	     var alignment = (item.align >> DC.alignBits) & 0xF;
	     var ps = item.ps[dir];

	     if (ts < ps)
	       alignment = 0;

	     if (!alignment) {
	       var m = margin(item.w, dir);

	       /*
		* Chrome:
		*  - some elements loose their margin as soon as you give
		*    them a size, we thus need to correct for that, or
		*    confirm their initial margin
		*/
	       var tsm = ts;
	       if (WT.isIElt9 ||
		   (!WT.hasTag(w, 'BUTTON') && !WT.hasTag(w, 'INPUT') &&
		    !WT.hasTag(w, 'SELECT') && !WT.hasTag(w, 'TEXTAREA')))
		 tsm = Math.max(0, tsm - m);

	       /*
		* IE: a button expands to parent container width ?? WTF ?
		*/
	       var setSize = false;
	       if (WT.isIE && WT.hasTag(w, 'BUTTON'))
		 setSize = true;

	       if (setSize || ts != ps || item.layout) {
		 if (setCss(w, DC.size, tsm + 'px'))
		   setItemDirty(item);
		 item.set[dir] = true;
	       } else {
		 if (!item.fs[dir]) {
		   if (setCss(w, DC.size, ''))
		     setItemDirty(item);
		   item.set[dir] = false;
		 } else if (dir == HORIZONTAL)
		   setCss(w, DC.size, item.fs[dir] + 'px');
	       }

	       off = left;
	       item.size[dir] = tsm;
	       item.psize[dir] = ts;
	     } else {
	       switch (alignment) {
	       case ALIGN_LEFT: off = left; break;
	       case ALIGN_CENTER: off = left + (ts - ps)/2; break;
	       case ALIGN_RIGHT: off = left + (ts - ps); break;
	       }

	       if (item.layout) {
		 if (setCss(w, DC.size, ps + 'px'))
		   setItemDirty(item);
		 item.set[dir] = true;
	       } else if (ts >= ps && item.set[dir]) {
		 if (setCss(w, DC.size, ps + 'px'))
		   setItemDirty(item);
		 item.set[dir] = false;
	       }

	       item.size[dir] = ps;
	       item.psize[dir] = ps;
	     }

	     if (!progressive)
	       setCss(w, DC.left, off + 'px');
	     else
	       if (thisResized) {
		 setCss(w, DC.left, (RESIZE_HANDLE_MARGIN * 2) + 'px');
		 var pc = WT.css(w, 'position');
		 if (pc !== 'absolute')
		   w.style.position = 'relative';
	       } else
		 setCss(w, DC.left, '0px');

	     if (dir == VERTICAL) {
	       if (w.wtResize)
		 w.wtResize(w, item.size[HORIZONTAL], item.size[VERTICAL]);

	       item.dirty = false;
	     }
	   }
	 }

	 left += targetSize[di];
       }
     }
   }