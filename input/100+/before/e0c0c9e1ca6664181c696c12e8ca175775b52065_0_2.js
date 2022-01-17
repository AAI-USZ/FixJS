function(){

				var dialogSpecificClass = "davinci/ui/widgets/NewHTMLFileOptions";

				var newDialog = createNewDialog(uiNLS.fileName, uiNLS.create, "html", dialogSpecificClass);

				var executor = function(){

					var teardown = true;

					if(!newDialog.cancel){

						var optionsWidget = newDialog.dialogSpecificWidget;

						var options = optionsWidget.getOptions();

						var resourcePath = newDialog.get('value');

						var check = checkFileName(resourcePath);

						if(check){

							var resource = Resource.createResource(resourcePath);

							resource.isNew = true;

							var text = Resource.createText("HTML", {resource:resource});

							if(text){

								resource.setText(text);

							}

							var device = options.device;

							if(device === 'desktop'){

								device = 'none';

							}

							var newHtmlParams = {

								device:device,

								flowlayout:(options.layout=='flow')+'',	// value need to be strings 'true' or 'false'

								theme: options.theme,

								themeSet:newDialog.dialogSpecificWidget._selectedThemeSet

							};

							uiResource.openResource(resource, newHtmlParams);

							Workbench.workbenchStateCustomPropSet('nhfo',options);

						} else {

							teardown = false;

						}

					}

					return teardown;

				};

				Workbench.showModal(newDialog, uiNLS.createNewHTMLFile, '', executor);

		}