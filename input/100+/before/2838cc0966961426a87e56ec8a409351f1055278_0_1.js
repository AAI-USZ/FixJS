function(){
			//1. Process args
			window.foo			= this;
            if(!this.collabID || this.collabID==undefined)
                console.error("RichTextEditor: unique collabID required.");
            this.id 			= this.collabID;
	        this.go 			= true;

	        //2. Build stuff
	        dojo.create('textarea', {style:'width:100%;height:100%;' }, this.divContainerBody);
			nicEditors.nicEditors.allTextAreas();    
            this._textarea 		= dojo.query('.nicEdit-main')[0];
            this._toolbar 		= dojo.query('.nicEdit-panel')[0];
			this._buildToolbar();                
			this._footer		= this._buildFooter();
	        this._attendeeList 	= new AttendeeList({domNode:this.innerList, id:'_attendeeList'});
            this.util 			= new ld({});
            this._shareButton 	= new ShareButton({
                'domNode':this.infoDiv,
                'listenTo':this._textarea,
                'id':'shareButton',
				'displayButton':false
            });
            this.divChecker = domConstruct.create("div");
            this.oldDiv = domConstruct.create("div");
            this.newDiv = domConstruct.create("div");
            this.differ = new diff_match_patch();
            
            //3. parameters
            this.syncs          = [];
            this.oldSnapshot 	= this.snapshot();
            this.newSnapshot 	= null;
            this.t 				= null;
            this.value 			= '';
            this.valueNoRangy   = '';
            this.interval		= 100;
			this.title          = 'Untitled Document';
            this.firstSpan      = null;
            this.secondSpan     = null;
            this._skipRestore   = false;

            //3b new tree parameters.
            this.syncQueue      = [];
            this.domTree        = null;

            //4. Style / connect
			this._style();
            this.connect();
   
			//5. kick things off
            if(this.go == true)
               this.listenInit();
		}