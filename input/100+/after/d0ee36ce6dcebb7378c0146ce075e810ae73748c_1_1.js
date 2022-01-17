function(lang, Deferred, declare, Grid, Selection, editor, Keyboard, DnD, ColumnResizer) {


	/**
	 * Create HTML string to display file type icon in grid
	 * @param {Object} object
	 */
	function formatImg(object, data, td) {
		var strClass = object.dir ? 'dijitFolderClosed' : 'dijitLeaf';
		var str = '<span>';
		str += '<img class="dijitTreeIcon ' + strClass;
		str += '" alt="" src="' + require.toUrl("dojo/resources/blank.gif") + '"/>' + object.name;
		str += '</span>';
		td.innerHTML = str;
	}

	/**
	 * Format integer to display file size in kilobyte.
	 * @param {string} value
	 */
	function formatFileSize(value) {
		return Math.round(value / 1000 * 10) / 10 + 'kb';
	}

	/**
	 * Return file type.
	 * @param {string} value
	 */
	function formatType(value) {
		return value ? 'directory' : 'file';
	}

	return declare([Grid, Selection, editor, Keyboard, DnD, ColumnResizer], {

		//getBeforePut: false,	// if true save will re-fetch from the store via get, before applying changes represented by dirty data.
		selectionMode: 'extended',
		columns: {
			name: editor({
				editor: 'text',
				editOn: 'dummyEvent',
				autoSave: false,
				label: "name",
				sortable: false,
				renderCell: function(object, data, td) {
					formatImg(object, data, td)
				}
			}),
			size: {
				label: 'size',
				sortable: false,
				formatter: function(value) {
					return formatFileSize(value)
				}
			},
			dir: {
				label: 'type',
				sortable: false,
				formatter: function(value) {
					return formatType(value);
				}
			},
			mod: {
				label: 'last modified',
				sortable: false
			}
		}

	});
}