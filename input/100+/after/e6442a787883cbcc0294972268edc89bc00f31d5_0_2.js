function measure(dir, widget, container)
   {
     var DC = DirConfig[dir],
         OC = DirConfig[dir ^ 1],
         measures = DC.measures,
         dirCount = DC.config.length,
         otherCount = OC.config.length,
         maxSize = DC.maxSize;

     if (!itemDirty && !layoutDirty)
       return;

     if (container && typeof DC.minSize == 'undefined') {
       DC.minSize = WT.px(container, 'min' + DC.Size);
       if (DC.minSize > 0)
	 DC.minSize -= sizePadding(container, dir);
     }

     var prevMeasures = measures.slice();
     if (prevMeasures.length == 5) {
       prevMeasures[PREFERRED_SIZE] = prevMeasures[PREFERRED_SIZE].slice();
       prevMeasures[MINIMUM_SIZE] = prevMeasures[MINIMUM_SIZE].slice();
     }

     var preferredSize = [], minimumSize = [],
       totalPreferredSize = 0, totalMinSize = 0, di, oi;

     var measurePreferredForStretching = true;

     for (di = 0; di < dirCount; ++di) {
       var dPreferred = 0;
       var dMinimum = DC.config[di][MIN_SIZE];
       var allHidden = true;

       for (oi = 0; oi < otherCount; ++oi) {
	 var item = DC.getItem(di, oi);
	 if (item) {
	   if (!item.w) {
	     var $w = $("#" + item.id);
	     item.w = $w.get(0);
	     (function() { var citem = item;
	       $w.find("img").load(function() { setItemDirty(citem); });
	     })();

	     item.w.style[DC.left] = item.w.style[OC.left] = NA_px;
	   }

	   if (!progressive && item.w.style.position != 'absolute') {
	     item.w.style.position = 'absolute';
	     item.w.style.visibility = 'hidden';

	     if (!item.w.wtResize) {
	       item.w.style.boxSizing = 'border-box';
	       var cssPrefix = WT.cssPrefix('BoxSizing');
	       if (cssPrefix)
		 item.w.style[cssPrefix + 'BoxSizing'] = 'border-box';
	     }
	   }

	   if (!item.ps)
	     item.ps = []; // preferred size

	   if (!item.ms)
	     item.ms = []; // minimum size

	   if (!item.size)
	     item.size = []; // set size

	   if (!item.psize)
	     item.psize = []; // set size (incl. margins, like preferred size)

	   if (!item.fs)
	     item.fs = []; // fixed size (size defined by inline size or CSS)

	   if (!item.set)
	     item.set = [false, false];

	   if (item.w) {
	     if (WT.isIE)
	       item.w.style.visibility = '';

	     if (debug)
	       console.log("measure " + dir + " "
	 		   + item.id + ': ' + item.ps[0] + ',' + item.ps[1]);

	     if (item.dirty || layoutDirty) {
	       var wMinimum = calcMinimumSize(item.w, dir);
	       if (wMinimum > dMinimum)
		 dMinimum = wMinimum;
	       item.ms[dir] = wMinimum;

	       /*
		* if we do not have an size set, we can and should take into
		* account the size set for a widget by CSS. But we can't really
		* read this -- computedStyle for width or height measures
		* instead of interpreting the stylesheet ... !
		*/
               if (!item.set[dir]) {
		 if (dir == HORIZONTAL) {
		   var fw = WT.pxself(item.w, DC.size);
		   if (fw)
		     item.fs[dir] = fw + margin(item.w, dir);
		   else
		     item.fs[dir] = 0;
		 } else {
		   var fw = WT.px(item.w, DC.size);
		   if (fw > Math.max(sizePadding(item.w, dir), wMinimum))
		     item.fs[dir] = fw + margin(item.w, dir);
		   else
		     item.fs[dir] = 0;
		 }
   	       }

	       var alignment = (item.align >> DC.alignBits) & 0xF;
	       var wPreferred = item.fs[dir];

	       if (alignment
		   || measurePreferredForStretching
		   || (DC.config[di][STRETCH] <= 0)) {

		 if (!item.layout) {
		   var calculated = calcPreferredSize(item.w, dir);

		   /*
		    * If we've set the size then we should not take the
		    * set size as the preferred size, instead we revert
		    * to a previous preferred size.
		    *
		    * If this is an item that is stretching, then we should
		    * not remeasure the preferred size since it might confuse
		    * the user with constant resizing
		    */
		   if ((typeof item.ps[dir] === 'undefined'
			|| DC.config[di][STRETCH] <= 0)
		     && (!item.set[dir] || (calculated != item.psize[dir])))
		     wPreferred = Math.max(wPreferred, calculated);
		   else
		     wPreferred = Math.max(wPreferred, item.ps[dir]);

		   item.ps[dir] = wPreferred;
		 } else {
		   wPreferred = Math.max(wPreferred, item.ps[dir]);
		   item.ps[dir] = wPreferred;
		 }
	       } else if (item.layout)
		 wPreferred = Math.max(wPreferred, item.ps[dir]);

	       if (!item.span || item.span[dir] == 1)
		 if (wPreferred > dPreferred)
		   dPreferred = wPreferred;
	     } else {
	       if (!item.span || item.span[dir] == 1) {
		 if (item.ps[dir] > dPreferred)
		   dPreferred = item.ps[dir];
		 if (item.ms[dir] > dMinimum)
		   dMinimum = item.ms[dir];
	       }
	     }

	     if (debug)
	       console.log(" ->" + item.id + ': ' + item.ps[0] + ","
			   + item.ps[1]);

	     // XXX second condition is a hack for WTextEdit
	     if (item.w.style.display !== 'none'
		 || (WT.hasTag(item.w, 'TEXTAREA') && item.w.wtResize))
	       allHidden = false;
	   }
	 }
       }

       if (!allHidden) {
	 if (dMinimum > dPreferred)
	   dPreferred = dMinimum;
       } else {
	 // make minimum width/height consistent with preferred
	 dMinimum = dPreferred = -1;
       }

       preferredSize[di] = dPreferred;
       minimumSize[di] = dMinimum;

       if (dMinimum > -1) {
	 totalPreferredSize += dPreferred;
	 totalMinSize += dMinimum;
       }
     }

     var totalMargin = 0, first = true, rh = false;
     for (di = 0; di < dirCount; ++di) {
       if (minimumSize[di] > -1) {
	 if (first) {
	   totalMargin += DC.margins[MARGIN_LEFT];
	   first = false;
	 } else {
	   totalMargin += DC.margins[SPACING];
	   if (rh)
	     totalMargin += RESIZE_HANDLE_MARGIN * 2;
	 }

	 rh = DC.config[di][RESIZABLE] !== 0;
       }
     }

     if (!first)
       totalMargin += DC.margins[MARGIN_RIGHT];

     totalPreferredSize += totalMargin;
     totalMinSize += totalMargin;

     if (debug)
       console.log("measured " + id + ': ' + dir + " ps " + preferredSize);

     DC.measures = [
	     preferredSize,
	     minimumSize,
	     totalPreferredSize,
	     totalMinSize,
	     totalMargin
	     ];

     /*
      * If we are directly in a parent layout, then we want to
      * mark the corresponding cell as dirty if the TOTAL_PREFERRED_SIZE
      * has changed.
      */
     if (parent) {
       if (prevMeasures[TOTAL_PREFERRED_SIZE]
	   != DC.measures[TOTAL_PREFERRED_SIZE]) {
	 parent.setChildSize(parentItemWidget, dir,
			     DC.measures[TOTAL_PREFERRED_SIZE]
			     + parentMargin[dir]);
       }
     }

     /*
      * If our minimum layout requirements have changed, then we want
      * to communicate this up using the minimum widths
      *  -- FIXME IE6
      */
     if (container
	 && DC.minSize != 0
	 && prevMeasures[TOTAL_MINIMUM_SIZE] != DC.measures[TOTAL_MINIMUM_SIZE]
	 && container.parentNode.className != 'Wt-domRoot') {
       var w = DC.measures[TOTAL_MINIMUM_SIZE] + 'px';
       if (setCss(container, 'min' + DC.Size, w))
	 if (self.ancestor)
	   self.ancestor.setContentsDirty(container);
     }

     if (container) {
       if (dir == HORIZONTAL && container && WT.hasTag(container, "TD")) {
	 /*
	  * A table will otherwise not provide any room for this 0-width cell
	  */
	 setCss(container, DC.size, DC.measures[TOTAL_PREFERRED_SIZE] + 'px');
       }
     }
   }