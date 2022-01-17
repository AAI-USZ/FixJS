function(){

			

			this._okButton.set( 'disabled', true);

			var langObj = uiNLS;

			var oldTheme = this._themeSelection.attr('value');

			var selector = dojo.attr(this._selector, 'value');

			var themeName = selector;

			var version = null;

			var base = selector;

		

			var newBase = this._getThemeLocation();

			var r1=  Resource.findResource(newBase+'/'+base+'.theme');

			if(r1){

				alert(langObj.themeAlreadyExists);

			}else{

				// put up theme create message

				this._loading = dojo.create("div",null, dojo.body(), "first");

				this._loading.innerHTML=dojo.string.substitute('<table><tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;${0}...</td></tr></table>', [langObj.creatingTheme]);

				dojo.addClass(this._loading, 'loading');

				dojo.style(this._loading, 'opacity', '0.5');

			    var basePath = this.getBase();

			    // first we clone the theme which creates temp css files

				var deferedList = Theme.CloneTheme(themeName,  version, selector, newBase, oldTheme, true);

				deferedList.then(function(results){

					

				    var error = false;

			        for (var x=0; x < results.length; x++){

			            if(!results[x][0] ){

			                error = true;

			            }  

			        }

			        if (!error){

			        	// #23

			        	var found = Theme.getTheme(base, true);

			            if (found){

			        		found.file.isNew = false; // the file has been saved so don't delete it when closing editor without first save.

			                Workbench.openEditor({

			                       fileName: found.file,

			                       content: found.file.getContentSync()});

			            } else {

			            	if (this._loading){ // remove the loading div

				    			this._loading.parentNode.removeChild(this._loading);

				    			delete this._loading;

				    		}

			                // error message

			                alert(langObj.errorCreatingTheme + base);

			                

			            }

			        } else {

			    		if (this._loading){ // remove the loading div

			    			this._loading.parentNode.removeChild(this._loading);

			    			delete this._loading;

			    		}

			        } 

			    }.bind(this));

			

			}

			

			

	  	}