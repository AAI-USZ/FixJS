function Presenter(options) {
    var that = this;

    var rootElement = getElementFromTemplate(options.template);
    var elementDeferred = Q.defer();
    var winControlDeferred = Q.defer();

    Object.defineProperties(that, {
        element: { value: elementDeferred.promise, enumerable: true },
        winControl: { value: winControlDeferred.promise, enumerable: true }
    });

    function processElementUI() {
        return Q.when(ui.processAll(rootElement)).then(function () {
            if (options.hasOwnProperty("ui")) {
                ui.setOptions(rootElement.winControl, options.ui);
            }
        });
    }

    function processElement() {
        return processElementUI().then(function () {
            if (options.hasOwnProperty("viewModel")) {
                ko.applyBindings(options.viewModel, rootElement);
            }

            elementDeferred.resolve(rootElement);
            winControlDeferred.resolve(rootElement.winControl);

            return rootElement;
        });
    }

    function processRenderables() {
        return processRegions(rootElement, options.renderables).then(function () { return rootElement; });
    }

    that.process = function () {
        return processElement().then(function () {
            if (options.renderables) {
                return processRenderables();
            }

            return rootElement;
        });
    };
}