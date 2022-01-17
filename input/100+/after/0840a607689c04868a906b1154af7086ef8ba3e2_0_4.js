function(disabled){
	    var count = this.options.count;
	    var icon = disabled ? 'ui-icon-identica-dummy' : 'ui-icon-identica';
	    return $('<button">identi.ca</button>')
		.button({
		    icons:{
			primary: icon,
		    },
		    text: true,
		    label: 'identi.ca',
		    disabled: false,
		});
	}