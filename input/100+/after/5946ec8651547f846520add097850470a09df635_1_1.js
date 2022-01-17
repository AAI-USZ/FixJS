function(file, context, callback, view, template) {
            //Storing callback data for loaded dispatch
            this.loaded.callback = callback;
            this.loaded.context = context;
            //Creating instance of HTML Document Model
            this.model = Montage.create(HtmlDocumentModel,{
                file: {value: file},
                fileTemplate: {value: template},
                parentContainer: {value: document.getElementById("iframeContainer")}, //Saving reference to parent container of all views (should be changed to buckets approach
                views: {value: {'design': DesignDocumentView.create(), 'code': CodeDocumentView.create()}} //TODO: Add code view logic
            });
            //Calling the any init routines in the model
            this.model.init();
            //Initiliazing views and hiding
            if (this.model.views.design.initialize(this.model.parentContainer)) {
                //Hiding iFrame, just initiliazing
                this.model.views.design.hide();
                //Setting the iFrame property for reference in helper class
                this.model.webGlHelper.iframe = this.model.views.design.iframe;
            } else {
                //ERROR: Design View not initialized
            }

            
            //TODO: Make sure you have a boolean to indicate if view was initilize and handle errors (just like design view above)
            //initialize the code view for the html document and hide it since design is the default view
            this.model.views.code.initialize(this.model.parentContainer);
            this.model.views.code.hide();


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
            } else  if (view === 'code'){
                //TODO: Add logic to open document in code view since it's now available
            } else {
	            //TODO: Add error handling
            }
        }