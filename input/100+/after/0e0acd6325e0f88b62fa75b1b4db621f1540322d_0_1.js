function(customSettings) {

    this.init = EzWebExt.bind(this.init, this);

    if (arguments.length == 0)
        return;

    this.browser = EzWebExt.Browser;
    this._alerts = [];
    var gadget = this;

    /* Parse settings */
    this.settings = {
        useHeightVar: true,
        heightVarName: "height",
        useWidthVar: false,
        widthVarName: "width",
        userVarName: "user",
        languagePrefVarName: "languagePref",
        platformLanguageVarName: "language",
        translatable: false,
        defaultLanguage: "en"
    };
    for (var key in customSettings)
        this.settings[key] = customSettings[key];

    /* Common funcionality */
    this.heightVar = EzWebAPI.createRGadgetVariable(this.settings["heightVarName"],
                                                    function(value) {gadget.heightCallback(value)});

    if (this.settings.useWidthVar) {
        this.widthVar = EzWebAPI.createRGadgetVariable(this.settings["widthVarName"],
                                                       function(value) {gadget.widthCallback(value)});
    }
    this.userVar   = EzWebAPI.createRGadgetVariable(this.settings["userVarName"],
                                                    function() {/* Not used */});

    /* Enable translation support only if this gadget is translatable */
    this._babel = []
    this.currentLocale = 'en';
    this._currentLanguage = {
        'strings': {},
        'labels': {},
        'titles': {}
    };
    this._babelLoaded = false;

    if ((this.resourcesURL == undefined) && (baseElement = document.getElementsByTagName("base"))){
        this.resourcesURL = baseElement[0].href;
    }
    if (this.resourcesURL[this.resourcesURL.length - 1] != '/') {
        this.resourcesURL = this.resourcesURL.substr(0, this.resourcesURL.lastIndexOf('/') + 1);
    }

    if (this.settings.translatable) {
        var processLanguageChange = function(prefLang, platformLang) {
            if (this._babelLoaded === false)
                return; // Do nothing if the catalogue is not loaded yet

            /*
             * If you have not selected a language in the preferences of the gadget it
             * will be shown with the language of the platform.
             */
            var lang = prefLang;
            if (lang == "default")
                lang = platformLang;

            if (!gadget._babel[lang]) {
                lang = gadget.settings["defaultLanguage"];
            }

            if (gadget._currentLanguage != gadget._babel[lang])
                gadget.languageCallback(lang);
        }

        var loadCatalogue = function(catalogue) {
            gadget._babel = catalogue;
            gadget._babelLoaded = true;

            gadget.loadCatalogueCallback();
            if (gadget._loaded == true) {
                processLanguageChange(gadget.langPrefVar.get(), gadget.langContextVar.get());
            } else {
                gadget._translateOnInit = true;
            }
        }

        var loadCatalogueCallback = function(transport) {
            var response = JSON.parse(transport.responseText);
            loadCatalogue(response);

        }


        this.langContextVar = EzWebAPI.createRGadgetVariable(this.settings["platformLanguageVarName"],
                                                             function (newvalue) {
                                                                 processLanguageChange(gadget.langPrefVar.get(), newvalue);
                                                             });
        if (this.settings.languagePrefVarName != null) {
            this.langPrefVar = EzWebAPI.createRGadgetVariable(this.settings["languagePrefVarName"],
                                                              function (newvalue) {
                                                                  processLanguageChange(newvalue, gadget.langContextVar.get());
                                                              });
        } else {
            this.langPrefVar = function() {};
            this.langPrefVar.get = function() { return "default"; };
        }

        if (this.settings.translationCatalogue) {
            loadCatalogue(this.settings.translationCatalogue);
        } else {
            var url = this.getResourceURL("languages.json");
            this.sendGet(url, loadCatalogueCallback, "Error al recuperar el fichero de idiomas (URL: %(url)s).");
        }
    }

    var initFunc = function() {
        gadget._loaded = true;
        if (gadget._translateOnInit) {
            processLanguageChange(gadget.langPrefVar.get(), gadget.langContextVar.get());
        }
        gadget.init();
    }
    this._waitingForDOMContentLoaded(initFunc);

}