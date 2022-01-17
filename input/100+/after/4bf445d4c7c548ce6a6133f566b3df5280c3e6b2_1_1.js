function (element, fileName) {



        this._bc = new BorderContainer({}, element);



        this.domNode = this._bc.domNode;



        this._commandStack = new CommandStack(this);

        this.savePoint=0;



        this._designCP = new ContentPane({region:'center'});

        this._bc.addChild(this._designCP);





        this.visualEditor = new VisualEditor(this._designCP.domNode, this);

        this.currentEditor = this.visualEditor;

        this.currentEditor._commandStack = this._commandStack;



        this._srcCP = new dijit.layout.ContentPane({region: 'bottom', splitter: true, style: "height:50%"});



        // hack to get the source content page to resize itself

        var oldResize = this._srcCP.resize;

        this._srcCP.resize = function(changeSize, resultSize)

        {

            dojo.marginBox(this.domNode, resultSize);

            oldResize.apply(this, arguments);

        };



        this.htmlEditor = new HTMLEditor(this._srcCP.domNode, fileName, true);

        this.htmlEditor.setVisible(false);

        this.model = this.htmlEditor.model;



        this._displayMode = "design";



        this.model = this.htmlEditor.model;



        this._bc.startup();

        this._bc.resize(); // kludge: forces primary tab to display	





        this._connect(this.visualEditor,"onContentChange", "_visualChanged");

        this._connect(this.htmlEditor,"handleChange", "_srcChanged");

        this.subscribe("/davinci/ui/styleValuesChange",   this._stylePropertiesChange);

        this.subscribe("/davinci/ui/widgetSelected",   this._widgetSelectionChange);

        this.subscribe("/davinci/ui/selectionChanged",  this._modelSelectionChange);

//      this._connect(this.visualEditor.context, "onSelectionChange","_widgetSelectionChange");

		this.subscribe("/davinci/ui/editorSelected", this._editorSelected.bind(this));

    }