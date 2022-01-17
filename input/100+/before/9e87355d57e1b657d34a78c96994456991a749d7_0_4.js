function(rowStartDate, rowEndDate) {
			var instance = this;

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
			var displayRows = instance.get(DISPLAY_ROWS);
			var filterFn = instance.get(FILTER_FN);
			var strings = instance.get(STRINGS);

			var intervalEndDate = DateMath.clearTime(instance._findCurrentIntervalEnd());
			var intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart());

			var cacheKey = String(intervalStartDate.getTime())
								.concat(rowStartDate.getTime())
								.concat(rowEndDate.getTime());

			var evtDataTable = instance.evtDataTableStack[cacheKey];

			if (!evtDataTable) {
				evtDataTable = A.Node.create(TPL_SVT_TABLE_DATA);
				var tBody = evtDataTable.one(TBODY);

				// creating title rows
				var firstRowNode = A.Node.create(TPL_SVT_TABLE_DATA_ROW);

				instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
					var colTitleNode = A.Node.create(TPL_SVT_TABLE_DATA_COL);

					colTitleNode
						.addClass(CSS_SVT_TABLE_DATA_COL_TITLE)
						.toggleClass(
							CSS_SVT_TABLE_DATA_COL_TITLE_FIRST,
							(index === 0)
						)
						.toggleClass(
							CSS_SVT_TABLE_DATA_COL_TITLE_TODAY,
							DateMath.isToday(celDate)
						)
						.toggleClass(
							CSS_SVT_TABLE_DATA_COL_TITLE_NEXT,
							DateMath.isToday(DateMath.subtract(celDate, DateMath.DAY, 1))
						)
						.toggleClass(
							CSS_SVT_TABLE_DATA_COL_TITLE_DOWN,
							DateMath.isToday(DateMath.subtract(celDate, DateMath.WEEK, 1))
						);

					firstRowNode.append(
						colTitleNode.setContent(celDate.getDate())
					);
				});

				tBody.append(firstRowNode);

				var row;

				for (row = 0; row < displayRows; row++) {
					var renderIndex = 0;
					var rowNode = A.Node.create(TPL_SVT_TABLE_DATA_ROW);

					instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
						if (renderIndex > index) {
							return;
						}

						var events = instance.getIntersectEvents(celDate);
						var evt = events[row];
						var evtColNode = A.Node.create(TPL_SVT_TABLE_DATA_COL);
						var evtNodeContainer = evtColNode.one(DIV);

						if ((displayRows < events.length) && (row === (displayRows - 1))) {
							var moreLink = A.Node.create(
								Lang.sub(
									TPL_SVT_MORE,
									{
										count: (events.length - (displayRows - 1)),
										label: strings[SHOW_MORE]
									}
								)
							);

							moreLink.setData(EVENTS, events);

							evtNodeContainer.append(moreLink);
						}
						else if (evt && filterFn.apply(instance, [evt])) {
							var startDate = evt.get(START_DATE);

							var isEventStartDateDay = !DateMath.isDayOverlap(startDate, celDate);
							var isEventDateContinuation = DateMath.after(celDate, startDate) && !DateMath.isDayOverlap(celDate, rowStartDate);

							if (isEventStartDateDay || isEventDateContinuation) {
								var evtNodeList = evt.get(NODE);

								var startDateFirstDayOfWeek = DateMath.getFirstDayOfWeek(new Date(Math.max(startDate, intervalStartDate)));
								var paddingIndex = Math.floor(DateMath.getDayOffset(celDate, startDateFirstDayOfWeek) / WEEK_LENGTH);

								if (evtNodeList.size() <= paddingIndex) {
									evt.addPaddingNode();
								}

								var evtNode = evtNodeList.item(paddingIndex);

								evtNode.setStyles({
									height: 'auto',
									left: 0,
									top: 0,
									width: 'auto'
								});

								evt.syncNodeUI();

								evtNode.appendTo(evtNodeContainer);

								var splitInfo = instance._getEvtSplitInfo(evt, celDate, rowStartDate, rowEndDate);

								evtColNode.attr(COLSPAN, splitInfo.colspan);
								evtNodeContainer.addClass(CSS_SVT_TABLE_DATA_EVENT);

								if (splitInfo.left) {
									evtNodeContainer.addClass(CSS_SVT_TABLE_DATA_EVENT_LEFT).prepend(TPL_SVT_EV_ICON_LEFT);
								}

								if (splitInfo.right) {
									evtNodeContainer.addClass(CSS_SVT_TABLE_DATA_EVENT_RIGHT).append(TPL_SVT_EV_ICON_RIGHT);
								}

								if (evt.get(PARENT_EVENT)) {
									evtNodeContainer.addClass(CSS_SVT_TABLE_DATA_EVENT_REPEATED);
								}

								renderIndex += splitInfo.colspan;
							}
							else {
								renderIndex++;
							}
						}
						else {
							renderIndex++;
						}

						rowNode.append(evtColNode);
					});

					tBody.append(rowNode);
				}

				instance.evtDataTableStack[cacheKey] = evtDataTable;
			}

			return evtDataTable;
		}