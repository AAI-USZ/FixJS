function (view, template) {
            var content;
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
            
            
                //TODO: Parse in memory document through template to get current document
                content = '<html><head>'+this.model.file.content.head+'</head><body>'+this.model.file.content.body+'</body></html>';//dummy
                
                
                //
                this.model.views.code.load(content);
                //Setting current view object to code
                this.currentView = 'code';
                this.model.currentView = this.model.views.code;
            } else {
	            //TODO: Identify default view (probably code) - Error handling
            }
        }