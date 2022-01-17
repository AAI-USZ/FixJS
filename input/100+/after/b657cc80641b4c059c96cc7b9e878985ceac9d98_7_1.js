function (folder, callback) {
		if (!folder) {
			return;
		}
		// when searching, we do this recursive
		var recursive = (typeof this._searchQuery === 'string');

		this.list.setCaption(
			(typeof this._searchQuery === 'string')
				? i18n.t('Searching for') + ' "' + this._searchQuery + '" ' + i18n.t('in') + ' ' + folder.name
				: i18n.t('Browsing') + ': ' + folder.name
		);
		
		this.list.hide();
		this.grid.find('.loading').show();
		
		var that = this;
		
		this.queryRepository(
			{
				repositoryId     : folder.repositoryId,
				inFolderId       : folder.id,
				queryString      : this._searchQuery,
				orderBy          : this._orderBy,
				skipCount        : this._pagingOffset,
				maxItems         : this.pageSize,
				objectTypeFilter : this.objectTypeFilter,
				renditionFilter  : this.renditionFilter,
				filter           : this.filter,
				recursive		 : recursive
			},
			function (data, metainfo) {
				if (typeof callback === 'function') {
					callback.call(that, data, metainfo);
				}
			}
		);
	}