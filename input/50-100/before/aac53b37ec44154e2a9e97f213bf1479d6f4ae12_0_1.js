function() {
		// add breadcrumbs
		wn.views.breadcrumbs($('<span>').appendTo(this.page.appframe.$titlebar), 
			locals.DocType[this.doctype].module);
			
		this.reportview = new wn.views.ReportView(this.doctype, this.docname, this.page)
	}