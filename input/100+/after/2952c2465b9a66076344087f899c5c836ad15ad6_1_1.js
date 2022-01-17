function (view, template, doc) {
            //
            this.model.parentContainer.removeChild(this.model.views.design.iframe);
            //Initiliazing views and hiding
            if (this.model.views.design.initialize(this.model.parentContainer)) {
                //Hiding iFrame, just initiliazing
                this.model.views.design.hide();
                //Setting the iFrame property for reference in helper class
                this.model.webGlHelper.iframe = this.model.views.design.iframe;
            } else {
                //ERROR: Design View not initialized
            }
            //
            if (view === 'design') {
                //TODO: Remove reference and use as part of model
                this.currentView = 'design';
                //Setting current view object to design
                this.model.currentView = this.model.views.design;
                //Showing design iFrame
                this.model.views.design.show();
                this.model.views.design.iframe.style.opacity = 0;
                this.model.views.design.content = this.model.file.content;
                //TODO: Improve reference (probably through binding values)
                this.model.views.design._webGlHelper = this.model.webGlHelper;
                //Rendering design view, using observers to know when template is ready
                this.model.views.design.render(function () {
                    //Adding observer to know when template is ready
                    this._observer = new WebKitMutationObserver(this.handleTemplateReady.bind(this));
                    this._observer.observe(this.model.views.design.document.head, {childList: true});
                }.bind(this), template, {viewCallback: this.handleViewReady, context: this});
            } else if(view === 'code'){
            	//TODO: Add logic to handle external changed files
            	//Checking for template type and not saving external data
            	if (doc.template && (doc.template.type === 'banner' || doc.template.type === 'animation')) {
                	this.model.views.code.load(this.application.ninja.ioMediator.tmplt.parseNinjaTemplateToHtml(false, doc, true, null).content);
                } else {
                 	this.model.views.code.load(this.application.ninja.ioMediator.tmplt.parseNinjaTemplateToHtml(false, doc, false, null).content);
                }
                //Setting current view object to code
                this.currentView = 'code';
                this.model.currentView = this.model.views.code;
            } else {
	            //TODO: Identify default view (probably code) - Error handling
            }
        }