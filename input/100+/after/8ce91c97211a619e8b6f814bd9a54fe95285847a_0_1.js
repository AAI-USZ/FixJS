function() {
		var modules = {};

		var moduleList = {
			'app-view-dd-navigation': ['aui-base', 'dd-constrain', 'dd-delegate', 'dd-drag', 'dd-drop', 'dd-proxy', 'liferay-history-manager', 'liferay-portlet-base', 'liferay-util-list-fields'],
			'app-view-folders-navigation': ['aui-base'],
			'app-view-page-navigation': ['aui-paginator', 'aui-parse-content', 'liferay-history-manager', 'liferay-portlet-base'],
			'app-view-select-navigation': ['aui-base', 'liferay-app-view-dd-navigation', 'liferay-history-manager', 'liferay-portlet-base', 'liferay-util-list-fields'],
			'asset-categories-selector': ['aui-tree', 'liferay-asset-tags-selector'],
			'asset-tags-selector': ['array-extras', 'async-queue', 'aui-autocomplete', 'aui-dialog', 'aui-form-textfield', 'aui-io-request', 'aui-live-search', 'aui-template', 'aui-textboxlist', 'datasource-cache', 'liferay-service-datasource'],
			'auto-fields': ['aui-base', 'aui-data-set', 'aui-io-request', 'aui-parse-content', 'sortable', 'base', 'liferay-undo-manager'],
			'dockbar': ['aui-node', 'event-touch'],
			'dockbar-underlay': ['aui-button-item', 'aui-io-plugin', 'aui-overlay-manager'],
			'dynamic-select': ['aui-base'],
			'form': ['aui-base', 'aui-form-validator'],
			'form-navigator': ['aui-base'],
			'form-placeholders': ['liferay-form', 'plugin'],
			'history': getHistoryRequirements(),
			'history-html5': ['liferay-history', 'history-html5', 'querystring-stringify-simple'],
			'history-manager': ['liferay-history'],
			'hudcrumbs': ['aui-base', 'plugin'],
			'icon': ['aui-base'],
			'input-move-boxes': ['aui-base', 'aui-toolbar'],
			'layout': [],
			'layout-column': ['aui-portal-layout', 'dd'],
			'layout-configuration': ['aui-live-search', 'dd', 'liferay-layout'],
			'layout-freeform': ['aui-resize', 'liferay-layout-column'],
			'list-view': ['aui-base', 'transition'],
			'logo-selector': ['aui-base'],
			'look-and-feel': ['aui-color-picker', 'aui-dialog', 'aui-io-request', 'aui-tabs-base'],
			'menu': ['aui-debounce', 'aui-node'],
			'message': ['aui-base', 'liferay-store'],
			'navigation': [],
			'navigation-interaction': ['node-focusmanager', 'plugin'],
			'navigation-touch': ['event-touch', 'liferay-navigation'],
			'notice': ['aui-base'],
			'panel': ['aui-base', 'liferay-store'],
			'panel-floating': ['aui-paginator', 'liferay-panel'],
			'poller': ['aui-base', 'io', 'json'],
			'portlet-base': ['aui-base'],
			'portlet-url': ['aui-base', 'aui-io-request', 'querystring-stringify-simple'],
			'progress': ['aui-progressbar'],
			'ratings': ['aui-io-request', 'aui-rating'],
			'search-container': ['aui-base', 'event-mouseenter'],
			'service-datasource': ['aui-base', 'datasource-local'],
			'session': ['aui-io-request', 'aui-task-manager', 'cookie', 'liferay-notice'],
			'staging': ['aui-dialog', 'aui-io-plugin'],
			'staging-branch': ['liferay-staging'],
			'staging-version': ['aui-button-item', 'liferay-staging'],
			'store': ['aui-io-request'],
			'token-list': ['aui-base', 'aui-template'],
			'translation-manager': ['aui-base'],
			'undo-manager': ['aui-data-set', 'base'],
			'upload': ['aui-io-request', 'aui-swf', 'collection', 'swfupload'],
			'util-list-fields': ['aui-base'],
			'util-window': ['aui-dialog', 'aui-dialog-iframe']
		};

		for (var i in moduleList) {
			modules['liferay-' + i] = {
				path: i.replace(REGEX_DASH, STR_UNDERSCORE) + '.js',
				requires: moduleList[i]
			};
		}

		return modules;
	}