function getInjectionSrc() {

    return 'var rewire = require("rewire"); ' +

        // Registers the setters and getters of every module according to their filename. The setters and getters must be

        // injected as string here to gain access to the private scope of the module.

        'rewire.register(__filename, module, ' + setterSrc + ', ' + getterSrc + ');' +

        // Overrides the module internal require with a require proxy. This proxy is necessary to call rewire with the

        // module's filename at the first parameter to resolve the path. This way rewire() works exactly like require().

        'require = rewire.getProxy(require, __dirname);' +

        // Cleaning up

        'rewire = undefined;';

}