function innerHighlight( node, ioStats, ioHistory, inHighlightOption) {
        var skip = 0;
        if (node.nodeType === 3) { // 3 - Text node
            var pos = node.data.search( inTermsGroup.getRegex() );
            if (pos >= 0 && node.data.length > 0) { // .* matching "" causes infinite loop
                var match = node.data.match( inTermsGroup.getRegex() ); // get the match(es), but we would only handle the 1st one, hence /g is not recommended
                var middleBit = node.splitText(pos); // split to 2 nodes, node contains the pre-pos text, middleBit has the post-pos

		if ( jQuery.inArray( middleBit.parentNode.className, theIgnoreClassesArray) >= 0) {  // (AGR) Check not already done!
			// Skip
		}
		else {
                        var spanNode = document.createElement('span');

                        if (wantTermTracking) {
                                var histKeyToUse = adjustAssocArrayKeyCase( ioHistory, match[0]);
                                var histObj = ioHistory[ histKeyToUse ];

                                if ( histObj == null) {
                                    if (inTermsGroup.getHighlightClass() === 'highlightIgnore') {
                                        ioHistory[ histKeyToUse ] = /* Poison: */ {node: null, c: -999};
                                    } else {
                                        ioHistory[ histKeyToUse ] = {node: spanNode, c: 1};
                                    }

                                    if (isHighlightFirstMode) {
                                        spanNode.className = inTermsGroup.getHighlightClass();
                                    }
                                } else if ( histObj.c > 0) {
                                    ioHistory[ histKeyToUse ].c = histObj.c + 1;

                                    if (isHighlightFirstMode) {
                                        spanNode.className = inTermsGroup.getHighlightClass() + '_ul';
                                    }
                                } else {
                                    // Ignore poison - don't deal with ignored terms!
                                }

                                // console.log("adding...", histKeyToUse);
                        }

                        if ( !isHighlightFirstMode && inHighlightOption !== 'disable') {
                            spanNode.className = inTermsGroup.getHighlightClass();

                            if (inHighlightOption === 'u_all') {
                                spanNode.className = inTermsGroup.getHighlightClass() + '_ul';
                            }
                        }

                        spanNode.title = inTermsGroup.getSpanTitle();

		        if ( ioStats != null && inTermsGroup.getHighlightClass() != 'highlightIgnore') {
				var keyToUse = adjustAssocArrayKeyCase( ioStats, match[0]);
				var obj = ioStats[keyToUse];

				if ( obj == null) {
				    ioStats[keyToUse] = {t: ( inTermsGroup.getHighlightClass() == 'highlightCore' ? 'C': 'E'),c:1};
				    ioStats['$meta'].uniqueTerms++;
				} else {
				    ioStats[keyToUse].c = obj.c + 1;
				}

				ioStats['$meta'].totalMatches++;
			}

                        if (inHighlightOption !== 'disable') {
                            /* var endBit = */ middleBit.splitText(match[0].length); // similarly split middleBit in two @ http://mzl.la/S7KA7V
                            var middleClone = middleBit.cloneNode(true);
                            spanNode.appendChild(middleClone);

                            // parentNode ie. node, now has 3 nodes by 2 splitText()s, replace the middle with the highlighted spanNode:
                            middleBit.parentNode.replaceChild(spanNode, middleBit);
                        }
                }
		skip = 1; // skip this middleBit, but still need to check endBit
            }
        } else if (node.nodeType === 1 && node.childNodes && !/(script|style|textarea)/i.test(node.tagName)) { // 1 - Element node
            for (var i = 0; i < node.childNodes.length; i++) { // highlight all children

                var theJQNode = $(node.childNodes[i]);

                if ( theJQNode.css('display') === 'none' /* && theJQNode.css('z-index') > 0 */) {
                    continue;	// Skip what we believe to be a panel that only appears when you hover over it.
                }

                //////////////////////////////////////////////////////////////////  Handle stats-submission black/white-listing

                var theStatsObjToUse = ioStats;

                if ( theWhiteList != null && theJQNode.is(theWhiteList)) {
                    // OK
                }
                else if ( theBlackList != null && theJQNode.is(theBlackList)) {
                    theStatsObjToUse = null;
                }

                i += innerHighlight( node.childNodes[i], theStatsObjToUse, ioHistory, theHighlightOption); // skip highlighted ones
            }
        }
        return skip;
    }