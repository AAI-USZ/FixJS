function() { // startRecord optional
		// cancel any cleanups pending from a scrollstop
		this.cleanupTask.cancel();

		// if we're still executing a cleanup task, or add/remove/replace, wait
		// for the next call
		if ( this.isUpdating )
		{
			return 0;
		}

		var startIdx,
			ds = this.getStore(),
			scrollPos = this.scroller.position.y,
			newTop = null,
			newBottom = null,
			previousTop = this.topItemRendered,
			previousBottom = this.bottomItemRendered,
			scrollDown = scrollPos >= this.lastScrollPos,
			incrementalRender = false,
			maxIndex = this.getRecordCount() - 1,
			thisHeight = this.getHeight(),
			listHeight = this.listContainer.getHeight(),
			topProxyHeight = this.topProxy.getHeight();

		this.lastScrollPos = scrollPos;

		// position of top of list relative to top of visible area (+above, -below)
		var listTopMargin = scrollPos - topProxyHeight;

		// position of bottom of list relative to bottom of visible area (+above, -below)
		var listBottomMargin = (scrollPos + thisHeight) - (topProxyHeight + listHeight);

		// scrolled into "white space"
		if ( listTopMargin <= -thisHeight || listBottomMargin >= thisHeight )
		{
			incrementalRender = false;
			scrollDown 				= true;
			newTop 						= Math.max(
				Math.floor(scrollPos / this.getMaxItemHeight()) - 1,
				0
			);
			newBottom 				= Math.min(
				newTop + this.getMinimumItems() - 1,
				maxIndex
			);
		}
		// about to scroll off bottom of list
		else
		if ( scrollDown && listBottomMargin > -50 )
		{
			incrementalRender = true;
			scrollDown 				= true;
			newTop 						= previousTop;
			newBottom 				= Math.min(
				previousBottom + this.getBatchSize(),
				maxIndex
			);
		}
		// about to scroll off top of list
		else
		if ( ! scrollDown && listTopMargin < 50 && this.topItemRendered > 0 )
		{
			incrementalRender = true;
			scrollDown 				= false;
			newTop 						= Math.max(
				this.topItemRendered - this.getBatchSize(),
				0
			);
			newBottom 				= previousBottom;
		}

		// no need to render anything?
		if (
				newTop === null ||
				newBottom === null ||
				(
					incrementalRender &&
					newTop >= previousTop &&
					newBottom <= previousBottom
				)
			)
			{
			// still need to update list header appropriately
			if ( this.getGrouped() && this.getPinHeaders() )
			{
				this.updateListHeader(scrollPos);
			}
			return 0;
		}

		// Jumped past boundaries of currently rendered items? Replace entire item list.
		if (this.bottomItemRendered === 0 || !incrementalRender)
		{
			// new item list starting with newTop
			this.replaceItemList(newTop, this.getMinimumItems());
		}
		// incremental - scrolling down
		else
		if (scrollDown)
		{
			startIdx = previousBottom + 1;
			this.appendItems(startIdx, this.getBatchSize());
		}
		// incremental - scrolling up
		else
		{
			startIdx = Math.max(previousTop - 1,0);
			this.insertItems(startIdx, this.getBatchSize());
			// collapse top proxy to zero if we're actually at the top.
			// This causes a minor behavioral glitch when the top proxy has
			// non-zero height - the list stops momentum at the top instead of
			// bouncing. But this only occurs when navigating into the middle
			// of the list, then scrolling all the way back to the top, and
			// doesn't prevent any other functionality from working. It could
			// probably be worked around with enough creativity ...
			if ( newTop === 0 )
			{
				this.topProxy.setHeight(0);
				this.scrollToFirstItem();
			}
		}

		// zero out bottom proxy if we're at the bottom ...
		if ( newBottom === maxIndex )
		{
			var bottomPadding = this.getHeight() - this.listContainer.getHeight();
			this.bottomProxy.setHeight(bottomPadding > 0 ? bottomPadding : 0);
		}

		// update list header appropriately
		if ( this.getGrouped() && this.getPinHeaders() )
		{
			this.updateListHeader(this.scroller.position.y);
		}
	}