function(args){
                /**
             * @property {azfcms.view.ExtendedEditorPane}
             */
                this.editorPane = args.editorPane;
                /**
             * @property {azfcms.model.cms}
             */
                this.model = args.model;
            
                /**
             * @property {Object}
             */
                this.pluginItem;
    
                /**
             * @property {Number}
             */
                this.navigationId = args.navigationId;
                
                this._attachEventListeners();
                
                if(!this.util) {
                    this.util = util;
                }
            }