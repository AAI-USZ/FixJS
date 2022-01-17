function(textarea) {
	// TODO: add Django-like behavior:
	// - fieldsets should be split into tabs
	// - collapsible areas should work, etc.

	CKEDITOR.replace(textarea, {
		extraPlugins: 'fpagelink,ffilelink,fimagelink,fcustomlink,funlink,fimage,ftable,tabletools',
		removePlugins: 'scayt,menubutton,forms,image,link',
		toolbar:
		[
			['Format'],
			['Bold','Italic'],
			['NumberedList','BulletedList','Outdent','Indent'],
			['fPageLink','fFileLink','fImageLink','fCustomLink','fUnlink'],
			['fImage','fTable'],
			['PasteText','PasteFromWord','RemoveFormat'],
			['Maximize'],
			['Source']
		],
		format_tags: 'p;h2;h3;h4',
		toolbarCanCollapse: false,
		resize_maxWidth: 610,
		baseFloatZIndex: 1100
	});
}