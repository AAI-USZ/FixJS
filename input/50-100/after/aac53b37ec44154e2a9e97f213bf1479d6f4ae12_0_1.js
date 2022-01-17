function() {
		// add breadcrumbs
		this.page.appframe.add_breadcrumb(locals.DocType[this.doctype].module);
			
		this.reportview = new wn.views.ReportView(this.doctype, this.docname, this.page)
	}