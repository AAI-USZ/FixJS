function(config) {
						var instance = this;

						var documentLibraryContainer = instance.byId('documentLibraryContainer');

						instance._documentLibraryContainer = documentLibraryContainer;

						instance._eventDataRequest = instance.ns('dataRequest');
						instance._eventDataRetrieveSuccess = instance.ns('dataRetrieveSuccess');
						instance._eventOpenDocument = instance.ns('openDocument');
						instance._eventChangeSearchFolder = instance.ns('changeSearchFolder');

						instance._entriesContainer = instance.byId('entriesContainer');

						instance._eventPageLoaded = instance.ns('pageLoaded');

						instance._keywordsNode = instance.byId(STR_KEYWORDS);

						if (!config.syncMessageDisabled) {
							instance._syncMessage = new Liferay.Message(
								{
									boundingBox: instance.byId('syncNotification'),
									contentBox: instance.byId('syncNotificationContent'),
									id: instance.NS + 'show-sync-message',
									trigger: instance.one('#showSyncMessageIconContainer'),
									visible: !config.syncMessageSuppressed
								}
							).render();
						}

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

						var paginatorAjaxNavigation = new PaginatorAjaxNavigation(
							{
								'entriesTotal' : config.entriesTotal,
								'entryEnd' : config.entryEnd,
								'entryRowsPerPage' : config.entryRowsPerPage,
								'entryRowsPerPageOptions' : config.entryRowsPerPageOptions,
								'entryPaginatorContainer' : '.document-entries-paginator',
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
										instance.ns(STR_ROW_IDS_FILE_SHORTCUT_CHECKBOX),
										instance.ns(STR_ROW_IDS_FOLDER_CHECKBOX),
										instance.ns(STR_ROW_IDS_FILE_ENTRY_CHECKBOX)
									],
								'displayStyle' : config.displayStyle,
								'displayStyleCssClass' : 'document-display-style',
								'folderContainer' : folderContainer,
								'namespace' : config.namespace,
								'portletContainerId': instance.ns('documentLibraryContainer'),
								'repositories' : config.repositories,
								'selector': 'document-selector'
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
												instance.ns(STR_ROW_IDS_FILE_SHORTCUT_CHECKBOX),
												instance.ns(STR_ROW_IDS_FOLDER_CHECKBOX),
												instance.ns(STR_ROW_IDS_FILE_ENTRY_CHECKBOX)
											],
										entryIds :
											[
												instance.ns('fileShortcutIds'),
												instance.ns('folderIds'),
												instance.ns('fileEntryIds')
											]
									},
								'displayStyleCssClass' : 'document-display-style',
								'draggableCssClass' : 'document-link',
								'editEntryUrl' : config._editEntryUrl,
								'folderIdHashRegEx' : config.folderIdHashRegEx,
								'form' : config.form,
								'moveConstant': config.moveConstant,
								'moveEntryRenderUrl': config.moveEntryRenderUrl,
								'namespace' : config.namespace,
								'portletContainerId': instance.ns('documentLibraryContainer'),
								'portletGroup' : 'document-library',
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
								'displayStyleCssClass' : 'document-display-style',
								'displayStyleToolbarId' : DISPLAY_STYLE_TOOLBAR,
								'displayViews' : config.displayViews,
								'dragAndDropNavigation' : instance._dragAndDropNavigation,
								'listView' : instance._listView,
								'mainUrl': config.mainUrl,
								'namespace': instance.NS,
								'paginatorAjaxNavigation': paginatorAjaxNavigation,
								'portletContainerId': instance.ns('documentLibraryContainer'),
								'selectAjaxNavigation' : selectAjaxNavigation
							}
						);

						instance._foldersNavigation = foldersNavigation;

						instance._listView.after('transitionComplete', instance._dragAndDropNavigation._initDropTargets, instance._dragAndDropNavigation);

						instance._listView.after('itemChange', instance._afterListViewItemChange, instance);

						var eventHandles = [
							Liferay.on(instance._eventDataRetrieveSuccess, instance._onDataRetrieveSuccess, instance),
							Liferay.on(instance._eventOpenDocument, instance._openDocument, instance),
							Liferay.on(instance._eventPageLoaded, instance._onPageLoaded, instance)
						];

						eventHandles.push(
							History.after('stateChange', instance._afterStateChange, instance),
							Liferay.on('showTab', instance._onShowTab, instance)
						);


						instance._config = config;

						instance._eventHandles = eventHandles;

						instance._repositoriesData = {};

						eventHandles.push(Liferay.on(config.portletId + ':portletRefreshed', A.bind(instance.destructor, instance)));

						var searchFormNode = instance.one('#fm1');

						if (searchFormNode) {
							searchFormNode.on('submit', instance._onSearchFormSubmit, instance);
						}

						instance._toggleSyncNotification();
					}