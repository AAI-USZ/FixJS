function(source, resource){

		if ( !( resource && resource.extension && resource.extension == "html")) {

			return source;

		}

		

		this.model = this._srcDocument = Factory.getNewFromResource(resource); //getModel({url: resource.getPath()}); // 2453 getNewFromResource(resource);

		

		this._resourcePath = new Path(resource ? resource.getPath() : "");

		

		this.model.fileName = this._resourcePath.toString();

		/* big cheat here.  removing 1 layer of .. for prefix of project, could figure this out with logic and have infinite project depth */

		

		this._srcDocument.setText(source, true);



		 

		var themeMetaobject = davinci.ve.metadata.loadThemeMeta(this._srcDocument);



        var elements = this._srcDocument.find({elementType: "HTMLElement"});

        

        this.loadRequires("html.body", true, true,true);

        

        for ( var i = 0; i < elements.length; i++ ) {

            var n = elements[i];

            var type = n.getAttribute("data-dojo-type") || n.getAttribute("dojoType") || n.getAttribute("dvwidget");

            if (type != null){

            	this.loadRequires(type, true, true, true);

            }

        }

      

        

        if (themeMetaobject) {

            this.changeThemeBase(themeMetaobject.theme, this._resourcePath);

        }

		

        var cssChanges = this.getPageCss();

        var jsChanges = this.getPageJs();



        var basePath = this.getCurrentBasePath();

        var resourceParentPath = this._resourcePath.getParentPath();

        for ( var i = 0; i < cssChanges.length; i++ ) {

            var cssFilePath = basePath.append(cssChanges[i]);

            var cssFileString = cssFilePath.relativeTo(resourceParentPath).toString();

            this.addModeledStyleSheet(cssFileString, cssChanges[i]);

        }



        for ( var i = 0; i < jsChanges.length; i++ ) {

            var jsFilePath = basePath.append(jsChanges[i]);

            var jsFileString = jsFilePath.relativeTo(resourceParentPath).toString();

            this.addJavaScript(jsFileString, null, null, null, jsChanges[i]);

        }

        

       /* this._pageRebuilt = new Deferred();

        var deferred = this.model.save();

        deferred.then(function(){

        	this._pageRebuilt.newText = this._srcDocument.getText();

        	this._pageRebuilt.resolve();

        }.bind(this));



		return this._pageRebuilt; //retText; // #2453 

		

*/		return this._srcDocument.getText();

	}