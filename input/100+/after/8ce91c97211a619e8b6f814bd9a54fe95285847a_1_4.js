function(A) {
		var AObject = A.Object;
		var Lang = A.Lang;
		
		var AppViewDDNavigation = Liferay.AppViewDDNavigation;
		var AppViewFoldersNavigation = Liferay.AppViewFoldersNavigation;
		var History = Liferay.HistoryManager;
		var AppViewPageNavigation = Liferay.AppViewPageNavigation;
		var AppViewSelectNavigation = Liferay.AppViewSelectNavigation;
		
		var formatSelectorNS = A.Node.formatSelectorNS;

		var UA = A.UA;

		var CSS_SYNC_MESSAGE_HIDDEN = 'sync-message-hidden';

		var DEFAULT_FOLDER_ID = 0;

		var DISPLAY_STYLE_TOOLBAR = 'displayStyleToolbar';

		var MESSAGE_TYPE_ERROR = 'error';

		var SEARCH_REPOSITORY_ID = 'searchRepositoryId';

		var SEARCH_TYPE = 'searchType';

		var SEARCH_TYPE_SINGLE = 1;

		var STR_CLICK = 'click';

		var STR_DATA_SEARCH_PROCESSED = 'data-searchProcessed';

		var STR_FOLDER_CONTAINER = 'folderContainer';

		var STR_FOLDER_ID = 'folderId';

		var STR_KEYWORDS = 'keywords';

		var STR_ROW_IDS_FILE_SHORTCUT_CHECKBOX = 'rowIdsDLFileShortcutCheckbox';

		var STR_ROW_IDS_FOLDER_CHECKBOX = 'rowIdsFolderCheckbox';

		var STR_ROW_IDS_FILE_ENTRY_CHECKBOX = 'rowIdsFileEntryCheckbox';

		var STR_SEARCH_FOLDER_ID = 'searchFolderId';

		var STR_SEARCH_RESULTS_CONTAINER = 'searchResultsContainer';

		var STR_SHOW_REPOSITORY_TABS = 'showRepositoryTabs';

		var STR_SHOW_SEARCH_INFO = 'showSearchInfo';

		var STRUTS_ACTION = 'struts_action';

		var SRC_DISPLAY_STYLE_BUTTONS = 0;

		var SRC_ENTRIES_PAGINATOR = 1;

		var SRC_GLOBAL = 0;

		var SRC_HISTORY = 2;

		var SRC_SEARCH = 3;

		var SRC_SEARCH_END = 4;

		var SRC_SEARCH_FRAGMENT = 2;

		var SRC_SEARCH_MULTIPLE = 0;

		var SRC_SEARCH_SINGLE = 1;

		var TPL_MESSAGE_SEARCHING = '<div class="portlet-msg-info">{0}</div><div class="loading-animation" />';

		var WIN = A.config.win;

		Liferay.DL_DISPLAY_STYLE_BUTTONS = SRC_DISPLAY_STYLE_BUTTONS;

		Liferay.DL_ENTRIES_PAGINATOR = SRC_ENTRIES_PAGINATOR;

		Liferay.DL_GLOBAL = SRC_GLOBAL;

		Liferay.DL_HISTORY = SRC_HISTORY;

		Liferay.DL_SEARCH = SRC_SEARCH;

		Liferay.DL_SEARCH_END = SRC_SEARCH_END;

		Liferay.DL_SEARCH_FRAGMENT = SRC_SEARCH_FRAGMENT;

		Liferay.DL_SEARCH_MULTIPLE = SRC_SEARCH_MULTIPLE;

		Liferay.DL_SEARCH_SINGLE = SRC_SEARCH_SINGLE;

		var DocumentLibrary = A.Component.create(
			{
				AUGMENTS: [Liferay.PortletBase],

				EXTENDS: A.Base,

				NAME: 'documentlibrary',

				prototype: {
					initializer: function(config) {
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

						var pageNavigation = new AppViewPageNavigation(
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

						instance._pageNavigation = pageNavigation;

						var selectAjaxNavigation = new AppViewSelectNavigation(
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

						var ddNavigation = new AppViewDDNavigation(
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

						instance._ddNavigation = ddNavigation;

						var foldersNavigation = new AppViewFoldersNavigation(
							{
								'defaultParams' : config.defaultParams,
								'defaultParentFolderId' : config.defaultParentFolderId,
								'displayStyle' : config.displayStyle,
								'displayStyleCssClass' : 'document-display-style',
								'displayStyleToolbarId' : DISPLAY_STYLE_TOOLBAR,
								'displayViews' : config.displayViews,
								'ddNavigation' : instance._ddNavigation,
								'listView' : instance._listView,
								'mainUrl': config.mainUrl,
								'namespace': instance.NS,
								'pageNavigation': pageNavigation,
								'portletContainerId': instance.ns('documentLibraryContainer'),
								'selectAjaxNavigation' : selectAjaxNavigation
							}
						);

						instance._foldersNavigation = foldersNavigation;

						instance._listView.after('transitionComplete', instance._ddNavigation._initDropTargets, instance._ddNavigation);

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
					},

					destructor: function() {
						var instance = this;

						instance._listView.destroy();

						A.Array.invoke(instance._eventHandles, 'detach');

						instance._documentLibraryContainer.purge(true);
					},

					_afterStateChange: function(event) {
						var instance = this;

						var namespace = instance.NS;

						var requestParams = {};

						var state = History.get();

						AObject.each(
							state,
							function(item, index, collection) {
								if (index.indexOf(namespace) === 0) {
									requestParams[index] = item;
								}
							}
						);

						instance._tuneStateChangeParams(requestParams);

						if (AObject.isEmpty(requestParams)) {
							requestParams = instance._foldersNavigation._getDefaultHistoryState();
						}

						Liferay.fire(
							instance._eventDataRequest,
							{
								requestParams: requestParams,
								src: SRC_HISTORY
							}
						);
					},

					_afterListViewItemChange: function(event) {
						var instance = this;

						var data = {
							entryTypeId : 'data-file-entry-type-id',
							requestParam : 'fileEntryTypeId'
						};

						instance._foldersNavigation._afterListViewItemChange(event, data);
					},

					_getRepositoryName: function(repositoryId) {
						var instance = this;

						var repositoryName = null;

						var repositories = instance._config.repositories;

						var length = repositories.length;

						for (var i = 0; i < length; i++) {
							var repository = repositories[i];

							if (repository.id == repositoryId) {
								repositoryName = repository.name;

								break;
							}
						}

						return repositoryName;
					},

					_onChangeSearchFolder: function(event) {
						var instance = this;

						var selectedFolder = instance._selectAjaxNavigation._getSelectedFolder();

						var searchData = {
							folderId: selectedFolder.id,
							keywords: instance._keywordsNode.get('value'),
							repositoryId: selectedFolder.repositoryId,
							showSearchInfo: true
						};

						if (event.searchEverywhere) {
							searchData[SEARCH_REPOSITORY_ID] = instance._config.repositories[0].id;
							searchData[STR_SEARCH_FOLDER_ID] = DEFAULT_FOLDER_ID;
							searchData[STR_SHOW_REPOSITORY_TABS] = true;
						}
						else {
							searchData[SEARCH_REPOSITORY_ID] = selectedFolder.repositoryId;
							searchData[STR_SEARCH_FOLDER_ID] = selectedFolder.id;
							searchData[STR_SHOW_REPOSITORY_TABS] = false;
						}

						instance._searchFileEntry(searchData);
					},

					_onDataRetrieveSuccess: function(event) {
						var instance = this;

						var responseData = event.responseData;

						instance._documentLibraryContainer.loadingmask.hide();

						var content = A.Node.create(responseData);

						if (content) {
							instance._foldersNavigation._setBreadcrumb(content);
							instance._foldersNavigation._setButtons(content);
							instance._foldersNavigation._setEntries(content);
							instance._foldersNavigation._setFolders(content);
							instance._foldersNavigation._setParentFolderTitle(content);
							instance._foldersNavigation._syncDisplayStyleToolbar(content);
							instance._setSearchResults(content);
						}
					},

					_onPageLoaded: function(event) {
						var instance = this;

						var paginatorData = event.paginator;

						if (paginatorData) {
							if (event.src == SRC_SEARCH) {
								var repositoriesData = instance._repositoriesData;

								var repositoryData = repositoriesData[event.repositoryId];

								if (!repositoryData) {
									repositoryData = {};

									instance._repositoriesData[event.repositoryId] = repositoryData;
								}

								repositoryData.paginatorData = paginatorData;

								instance._pageNavigation._setPaginatorData(paginatorData);
							}
							else {
								instance._pageNavigation._setPaginatorData(paginatorData);
							}

							instance._toggleSyncNotification();
						}
					},

					_onSearchFormSubmit: function(event) {
						var instance = this;

						event.preventDefault();

						var selectedFolder = instance._selectAjaxNavigation._getSelectedFolder();

						var showTabs = (selectedFolder.id == DEFAULT_FOLDER_ID);

						var searchData = {
							folderId: selectedFolder.id,
							keywords: instance._keywordsNode.get('value'),
							repositoryId: selectedFolder.repositoryId,
							searchFolderId: selectedFolder.id,
							searchRepositoryId: selectedFolder.repositoryId,
							showRepositoryTabs: showTabs,
							showSearchInfo: true
						};

						instance._searchFileEntry(searchData);
					},

					_onShowTab: function(event) {
						var instance = this;

						var tabSection = event.tabSection;

						var searchResultsWrapper = tabSection.one('[data-repositoryId]');

						var repositoryId = searchResultsWrapper.attr('data-repositoryId');

						var repositoryData = instance._repositoriesData[repositoryId];

						if (repositoryData) {
							var paginatorData = repositoryData.paginatorData;

							if (paginatorData) {
								instance._pageNavigation._setPaginatorData(paginatorData);
							}
						}

						if (!searchResultsWrapper.hasAttribute(STR_DATA_SEARCH_PROCESSED)) {
							searchResultsWrapper.setAttribute(STR_DATA_SEARCH_PROCESSED, true);

							var selectedFolder = instance._selectAjaxNavigation._getSelectedFolder();

							var searchData = {
								folderId: selectedFolder.id,
								keywords: instance._keywordsNode.get('value'),
								repositoryId: selectedFolder.repositoryId,
								searchFolderId: DEFAULT_FOLDER_ID,
								searchRepositoryId: repositoryId
							};

							instance._searchFileEntry(searchData);
						}
						else {
							instance._documentLibraryContainer.all('.document-entries-paginator').show();
						}
					},

					_openDocument: function(event) {
						var instance = this;

						var webDavUrl = event.webDavUrl;

						if (webDavUrl && UA.ie) {
							try {
								var executor = new WIN.ActiveXObject('SharePoint.OpenDocuments');

								executor.EditDocument(webDavUrl);
							}
							catch (exception) {
								var errorMessage = Lang.sub(
									Liferay.Language.get('cannot-open-the-requested-document-due-to-the-following-reason'),
									[exception.message]
								);

								instance._foldersNavigation._sendMessage(MESSAGE_TYPE_ERROR, errorMessage);
							}
						}
					},

					_searchFileEntry: function(searchData) {
						var instance = this;

						if (searchData.showRepositoryTabs || searchData.showSearchInfo) {
							var entriesContainer = instance._entriesContainer;

							entriesContainer.empty();

							var searchingTPL = Lang.sub(TPL_MESSAGE_SEARCHING, [Liferay.Language.get('searching,-please-wait')]);

							entriesContainer.html(searchingTPL);
						}

						instance._documentLibraryContainer.all('.document-entries-paginator').hide();

						var requestParams = {};

						requestParams[instance.ns(STRUTS_ACTION)] = '/document_library/search';
						requestParams[instance.ns('repositoryId')] =  searchData.repositoryId;
						requestParams[instance.ns(SEARCH_REPOSITORY_ID)] = searchData.searchRepositoryId;
						requestParams[instance.ns(STR_FOLDER_ID)] = searchData.folderId;
						requestParams[instance.ns(STR_SEARCH_FOLDER_ID)] = searchData.searchFolderId;
						requestParams[instance.ns(STR_KEYWORDS)] = searchData.keywords;
						requestParams[instance.ns(SEARCH_TYPE)] = SEARCH_TYPE_SINGLE;
						requestParams[instance.ns(STR_SHOW_REPOSITORY_TABS)] = searchData.showRepositoryTabs;
						requestParams[instance.ns(STR_SHOW_SEARCH_INFO)] = searchData.showSearchInfo;

						Liferay.fire(
							instance._eventDataRequest,
							{
								requestParams: requestParams,
								src: Liferay.DL_SEARCH
							}
						);
					},

					_setSearchResults: function(content) {
						var instance = this;

						var repositoryId;

						var repositoryIdNode = instance.one('#' + instance.ns(SEARCH_REPOSITORY_ID), content);

						if (repositoryIdNode) {
							repositoryId = repositoryIdNode.val();
						}

						var searchInfo = instance.one('#' + instance.ns('searchInfo'), content);

						var entriesContainer = instance._entriesContainer;

						if (searchInfo) {
							entriesContainer.empty();

							entriesContainer.plug(A.Plugin.ParseContent);

							entriesContainer.setContent(searchInfo);
						}

						var fragmentSearchResults = instance.one('#fragmentSearchResults', content);

						var searchResults;

						if (fragmentSearchResults) {
							searchResults = instance.one('#' + STR_SEARCH_RESULTS_CONTAINER + repositoryId, entriesContainer);

							if (searchResults) {
								searchResults.empty();

								searchResults.plug(A.Plugin.ParseContent);

								searchResults.setContent(fragmentSearchResults.html());
							}
						}

						searchResults = instance.one('.local-search-results', content);

						if (searchResults) {
							var searchResultsContainer = instance.one('#' + STR_SEARCH_RESULTS_CONTAINER, content);

							if (!searchInfo) {
								entriesContainer.empty();
							}

							entriesContainer.plug(A.Plugin.ParseContent);

							entriesContainer.append(searchResultsContainer);
						}

						var repositorySearchResults = instance.one('.repository-search-results', content);

						if (repositorySearchResults) {
							var resultsContainer = instance.one('#' + STR_SEARCH_RESULTS_CONTAINER + repositoryId, entriesContainer);

							if (!resultsContainer) {
								resultsContainer = entriesContainer;
							}

							if (!searchInfo) {
								resultsContainer.empty();
							}

							resultsContainer.plug(A.Plugin.ParseContent);

							resultsContainer.append(repositorySearchResults);
						}

						var repositoryName = instance._getRepositoryName(repositoryId);

						if (repositoryName) {
							var tabLinkSelector = 'li[id$="' + Liferay.Util.toCharCode(repositoryName) + 'TabsId' + '"] a';

							var tabLink = entriesContainer.one(tabLinkSelector);

							if (tabLink) {
								tabLink.simulate(STR_CLICK);
							}
						}
					},

					_tuneStateChangeParams: function(requestParams) {
						var instance = this;

						var entriesContainer = instance._entriesContainer;

						var namespacedShowRepositoryTabs = instance.ns(STR_SHOW_REPOSITORY_TABS);

						if (AObject.owns(requestParams, namespacedShowRepositoryTabs) &&
							!requestParams[namespacedShowRepositoryTabs] &&
							!entriesContainer.one('ul.aui-tabview-list')) {

							requestParams[namespacedShowRepositoryTabs] = true;

							requestParams[instance.ns(SEARCH_TYPE)] = SEARCH_TYPE_SINGLE;
						}

						var namespacedShowSearchInfo = instance.ns(STR_SHOW_SEARCH_INFO);

						if (AObject.owns(requestParams, namespacedShowSearchInfo) &&
							!requestParams[namespacedShowSearchInfo] &&
							!entriesContainer.one('.search-info')) {

							requestParams[namespacedShowSearchInfo] = true;

							requestParams[instance.ns(SEARCH_TYPE)] = SEARCH_TYPE_SINGLE;
						}
					},

					_toggleSyncNotification: function() {
						var instance = this;

						if (instance._syncMessage) {
							var entryPaginator = instance._pageNavigation.getEntryPaginator()

							var entriesPaginatorState = entryPaginator.get('state');

							var syncMessageBoundingBox = instance._syncMessage.get('boundingBox');

							syncMessageBoundingBox.toggleClass(CSS_SYNC_MESSAGE_HIDDEN, entriesPaginatorState.total <= 0);
						}
					}
				}
			}
		);

		Liferay.Portlet.DocumentLibrary = DocumentLibrary;
	}