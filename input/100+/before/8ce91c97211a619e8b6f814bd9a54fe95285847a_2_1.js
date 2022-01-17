function(config) {
						var instance = this;

						var journalContainer = instance.byId('journalContainer');

						instance._journalContainer = journalContainer;

						instance._dataRetrieveFailure = instance.ns('dataRetrieveFailure');
						instance._eventDataRequest = instance.ns('dataRequest');
						instance._eventDataRetrieveSuccess = instance.ns('dataRetrieveSuccess');
						instance._eventOpenAdvancedSearch = instance.ns('openAdvancedSearch');
						instance._eventPageLoaded = instance.ns('pageLoaded');
						instance._eventChangeSearchFolder = instance.ns('changeSearchFolder');

						instance._displayStyleToolbarNode = instance.byId(DISPLAY_STYLE_TOOLBAR);
						instance._entriesContainer = instance.byId('entriesContainer');

						instance._advanceSearchContainer = instance.byId('advanceSearchContainer');

						instance._selectAllCheckbox = instance.byId('allRowIdsCheckbox');

						instance._displayStyle = instance.ns('displayStyle');
						instance._folderId = instance.ns(STR_FOLDER_ID);

						instance._andOperatorNode = instance.byId(STR_AND_OPERATOR);
						instance._contentNode = instance.byId(STR_CONTENT);
						instance._descriptionNode = instance.byId(STR_DESCRIPTION);
						instance._keywordsNode = instance.byId(STR_KEYWORDS);
						instance._searchArticleIdNode = instance.byId(STR_SEARCH_ARTICLE_ID);
						instance._statusNode = instance.byId(STR_STATUS);
						instance._titleNode = instance.byId(STR_TITLE);
						instance._typeNode = instance.byId(STR_TYPE);

						var folderContainer = instance.byId(STR_FOLDER_CONTAINER);

						instance._listView = new Liferay.ListView(
							{
								boundingBox: formatSelectorNS(instance.NS, '#listViewContainer'),
								cssClass: 'folder-display-style lfr-list-view-content',
								itemSelector: '.folder a.browse-folder, .folder a.expand-folder',
								contentBox: folderContainer,
								srcNode: folderContainer
							}
						).render();

						instance._displayViews = config.displayViews;

						var paginatorAjaxNavigation = new PaginatorAjaxNavigation(
							{
								'entriesTotal' : config.entriesTotal,
								'entryEnd' : config.entryEnd,
								'entryRowsPerPage' : config.entryRowsPerPage,
								'entryRowsPerPageOptions' : config.entryRowsPerPageOptions,
								'entryPaginatorContainer' : '.article-entries-paginator',
								'folderEnd' : config.folderEnd,
								'folderPaginatorContainer' : '.folder-paginator',
								'folderRowsPerPage' : config.folderRowsPerPage,
								'folderRowsPerPageOptions' : config.folderRowsPerPageOptions,
								'foldersTotal' : config.foldersTotal,
								'namespace' : config.namespace
							}
						);

						instance._paginatorAjaxNavigation = paginatorAjaxNavigation;

						var selectAjaxNavigation = new SelectAjaxNavigation(
							{
								'checkBoxesId' :
									[
										instance.ns(STR_ROW_IDS_JOURNAL_ARTICLE_CHECKBOX),
										instance.ns(STR_ROW_IDS_JOURNAL_FOLDER_CHECKBOX)
									],
								'displayStyle' : config.displayStyle,
								'displayStyleCssClass' : 'article-display-style',
								'folderContainer' : folderContainer,
								'namespace' : config.namespace,
								'portletContainerId': instance.ns('journalContainer'),
								'selector': 'article-selector'
							}
						);

						instance._selectAjaxNavigation = selectAjaxNavigation;

						var dragAndDropNavigation = new DragAndDropNavigation(
							{
								'actions' : config.actions,
								'allRowIds' : config.allRowIds,
								'processEntryIds' :
								{
									checkBoxesIds :
										[
											instance.ns(STR_ROW_IDS_JOURNAL_ARTICLE_CHECKBOX),
											instance.ns(STR_ROW_IDS_JOURNAL_FOLDER_CHECKBOX)
										],
									entryIds :
										[
											instance.ns('articleIds'),
											instance.ns('folderIds')
										]
								},
								'displayStyleCssClass' : 'article-display-style',
								'draggableCssClass' : 'article-link',
								'editEntryUrl' : config.editEntryUrl,
								'folderIdHashRegEx' : config.folderIdHashRegEx,
								'form' : config.form,
								'moveConstant': config.moveConstant,
								'moveEntryRenderUrl': config.moveEntryRenderUrl,
								'namespace' : config.namespace,
								'portletContainerId': instance.ns('journalContainer'),
								'portletGroup' : 'journal',
								'selectAjaxNavigation' : selectAjaxNavigation,
								'updateable' : config.updateable
							}
						);

						instance._dragAndDropNavigation = dragAndDropNavigation;

						var foldersNavigation = new FoldersNavigation(
							{
								'defaultParams' : config.defaultParams,
								'defaultParentFolderId' : config.defaultParentFolderId,
								'displayStyle' : config.displayStyle,
								'displayStyleCssClass' : 'article-display-style',
								'displayStyleToolbarId' : DISPLAY_STYLE_TOOLBAR,
								'displayViews' : instance._displayViews,
								'dragAndDropNavigation' : instance._dragAndDropNavigation,
								'listView' : instance._listView,
								'mainUrl': config.mainUrl,
								'namespace': instance.NS,
								'paginatorAjaxNavigation': paginatorAjaxNavigation,
								'portletContainerId': instance.ns('journalContainer'),
								'selectAjaxNavigation' : selectAjaxNavigation
							}
						);

						instance._foldersNavigation = foldersNavigation;

						instance._listView.after('transitionComplete', A.bind(instance._dragAndDropNavigation._initDropTargets, instance._dragAndDropNavigation), instance);

						instance._listView.after('itemChange', instance._afterListViewItemChange, instance);

						var eventHandles = [
							Liferay.on(instance._eventDataRetrieveSuccess, instance._onDataRetrieveSuccess, instance),
							Liferay.on(instance._eventChangeSearchFolder, instance._onChangeSearchFolder, instance),
							Liferay.on(instance._eventPageLoaded, instance._onPageLoaded, instance)
						];

						eventHandles.push(
							History.after('stateChange', instance._afterStateChange, instance)
						);

						journalContainer.delegate(
							STR_CLICK,
							A.bind(instance._onOpenAdvancedSearch, instance),
							'.article-advanced-search-icon'
						);

						instance._config = config;

						instance._eventHandles = eventHandles;

						eventHandles.push(Liferay.on(config.portletId + ':portletRefreshed', A.bind(instance.destructor, instance)));

						var searchFormNode = instance.one('#fm1');

						if (searchFormNode) {
							searchFormNode.on('submit', instance._onSearchFormSubmit, instance);
						}

						var advancedSearchFormNode = instance.one('#fmAdvancedSearch');

						if (advancedSearchFormNode) {
							advancedSearchFormNode.on('submit', instance._onAdvancedSearchFormSubmit, instance);
						}
					}