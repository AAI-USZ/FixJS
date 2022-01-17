function() {
      Ext.define('SimpleClass', {
        constructor: function() {
          return this;
        }
      });
      Ext.define('ComplexBaseClass', {
        config: {
          classNameAsString: null,
          className: null,
          classNameEagerly: null,
          classNameLazily: null,
          classNameAsSingleton: null,
          classNameAsSingletonEagerly: null,
          classNameAsSingletonLazily: null,
          classNameAsPrototype: null,
          classNameAsPrototypeLazily: null,
          classNameWithParameters: null,
          classNameWithParametersEagerly: null,
          classNameWithParametersLazily: null,
          classNameWithParametersAsSingleton: null,
          classNameWithParametersAsSingletonEagerly: null,
          classNameWithParametersAsSingletonLazily: null,
          classNameWithParametersAsPrototype: null,
          classNameWithParametersAsPrototypeLazily: null,
          classNameForSingletonClass: null,
          classNameForSingletonClassEagerly: null,
          classNameForSingletonClassLazily: null,
          classNameForSingletonClassAsSingleton: null,
          classNameForSingletonClassAsSingletonEagerly: null,
          classNameForSingletonClassAsSingletonLazily: null,
          fn: null,
          fnEagerly: null,
          fnLazily: null,
          fnAsSingleton: null,
          fnAsSingletonEagerly: null,
          fnAsSingletonLazily: null,
          fnAsPrototype: null,
          fnAsPrototypeLazily: null,
          booleanValue: null,
          booleanValueLazily: null,
          booleanValueAsSingleton: null,
          booleanValueAsSingletonLazily: null,
          stringValue: null,
          stringValueLazily: null,
          stringValueAsSingleton: null,
          stringValueAsSingletonLazily: null,
          numberValue: null,
          numberValueLazily: null,
          numberValueAsSingleton: null,
          numberValueAsSingletonLazily: null,
          dateValue: null,
          dateValueLazily: null,
          dateValueAsSingleton: null,
          dateValueAsSingletonLazily: null,
          arrayValue: null,
          arrayValueLazily: null,
          arrayValueAsSingleton: null,
          arrayValueAsSingletonLazily: null,
          objectValue: null,
          objectValueLazily: null,
          objectValueAsSingleton: null,
          objectValueAsSingletonLazily: null,
          classValue: null,
          classValueLazily: null,
          classValueAsSingleton: null,
          classValueAsSingletonLazily: null,
          functionValue: null,
          functionValueLazily: null,
          functionValueAsSingleton: null,
          functionValueAsSingletonLazily: null
        },
        constructor: function(config) {
          this.initConfig(config);
          return this;
        }
      });
      Ext.define('ComplexClass', {
        extend: 'ComplexBaseClass',
        constructor: function(config) {
          return this.callParent(arguments);
        }
      });
      Ext.define('InjectableSimpleClass', {
        extend: 'SimpleClass',
        mixins: ['Deft.mixin.Injectable'],
        inject: configuredIdentifiers,
        constructor: function(config) {
          return this.callParent(arguments);
        }
      });
      Ext.define('InjectableComplexClass', {
        extend: 'ComplexBaseClass',
        mixins: ['Deft.mixin.Injectable'],
        inject: configuredIdentifiers,
        constructor: function(config) {
          return this.callParent(arguments);
        }
      });
      it('should inject configured dependencies into properties for a given class instance', function() {
        var configuredIdentifier, resolvedValue, simpleClassInstance, _j, _len1;
        simpleClassInstance = Ext.create('SimpleClass');
        Deft.Injector.inject(configuredIdentifiers, simpleClassInstance);
        for (_j = 0, _len1 = configuredIdentifiers.length; _j < _len1; _j++) {
          configuredIdentifier = configuredIdentifiers[_j];
          expect(simpleClassInstance[configuredIdentifier]).toBeDefined();
          expect(simpleClassInstance[configuredIdentifier]).not.toBeNull();
          resolvedValue = Deft.Injector.resolve(configuredIdentifier);
          if (configuredIdentifier.indexOf('Prototype') === -1) {
            expect(simpleClassInstance[configuredIdentifier]).toBe(resolvedValue);
          } else {
            expect(simpleClassInstance[configuredIdentifier]).toBeInstanceOf(Ext.ClassManager.getClass(resolvedValue).getName());
          }
        }
      });
      it('should inject configured dependencies into configs for a given class instance', function() {
        var complexClassInstance, configuredIdentifier, getterFunctionName, resolvedValue, _j, _len1;
        complexClassInstance = Ext.create('ComplexClass');
        Deft.Injector.inject(configuredIdentifiers, complexClassInstance);
        for (_j = 0, _len1 = configuredIdentifiers.length; _j < _len1; _j++) {
          configuredIdentifier = configuredIdentifiers[_j];
          getterFunctionName = 'get' + Ext.String.capitalize(configuredIdentifier);
          expect(complexClassInstance[getterFunctionName]()).not.toBeNull();
          resolvedValue = Deft.Injector.resolve(configuredIdentifier);
          if (configuredIdentifier.indexOf('Prototype') === -1) {
            expect(complexClassInstance[getterFunctionName]()).toBe(resolvedValue);
          } else {
            expect(complexClassInstance[getterFunctionName]()).toBeInstanceOf(Ext.ClassManager.getClass(resolvedValue).getName());
          }
        }
      });
      it('should automatically inject configured dependencies into properties for a given Injectable class instance', function() {
        var configuredIdentifier, resolvedValue, simpleInjectableClassInstance, _j, _len1;
        simpleInjectableClassInstance = Ext.create('InjectableSimpleClass');
        for (_j = 0, _len1 = configuredIdentifiers.length; _j < _len1; _j++) {
          configuredIdentifier = configuredIdentifiers[_j];
          expect(simpleInjectableClassInstance[configuredIdentifier]).toBeDefined();
          expect(simpleInjectableClassInstance[configuredIdentifier]).not.toBeNull();
          resolvedValue = Deft.Injector.resolve(configuredIdentifier);
          if (configuredIdentifier.indexOf('Prototype') === -1) {
            expect(simpleInjectableClassInstance[configuredIdentifier]).toBe(resolvedValue);
          } else {
            expect(simpleInjectableClassInstance[configuredIdentifier]).toBeInstanceOf(Ext.ClassManager.getClass(resolvedValue).getName());
          }
        }
      });
      it('should automatically inject configured dependencies into configs for a given Injectable class instance', function() {
        var configuredIdentifier, getterFunctionName, injectableComplexClassInstance, resolvedValue, _j, _len1;
        injectableComplexClassInstance = Ext.create('InjectableComplexClass');
        for (_j = 0, _len1 = configuredIdentifiers.length; _j < _len1; _j++) {
          configuredIdentifier = configuredIdentifiers[_j];
          getterFunctionName = 'get' + Ext.String.capitalize(configuredIdentifier);
          expect(injectableComplexClassInstance[getterFunctionName]()).not.toBeNull();
          resolvedValue = Deft.Injector.resolve(configuredIdentifier);
          if (configuredIdentifier.indexOf('Prototype') === -1) {
            if (configuredIdentifier.indexOf('objectValue') === -1) {
              expect(injectableComplexClassInstance[getterFunctionName]()).toBe(resolvedValue);
            } else {
              expect(injectableComplexClassInstance[getterFunctionName]()).not.toBeNull();
            }
          } else {
            expect(injectableComplexClassInstance[getterFunctionName]()).toBeInstanceOf(Ext.ClassManager.getClass(resolvedValue).getName());
          }
        }
      });
      it('should throw an error if asked to inject an unconfigured identifier', function() {
        var simpleClassInstance;
        simpleClassInstance = Ext.create('SimpleClass');
        expect(function() {
          Deft.Injector.inject('unconfiguredIdentifier', simpleClassInstance);
        }).toThrow(new Error("Error while resolving value to inject: no dependency provider found for 'unconfiguredIdentifier'."));
      });
      it('should pass the instance being injected when lazily resolving a dependency with a factory function', function() {
        var exampleClassInstance, factoryFunction, factoryFunctionIdentifiers, fnInjectPassedInstanceAsPrototypeFactoryFunction, fnInjectPassedInstanceAsPrototypeLazilyFactoryFunction, fnInjectPassedInstanceAsSingletonFactoryFunction, fnInjectPassedInstanceAsSingletonLazilyFactoryFunction, fnInjectPassedInstanceFactoryFunction, fnInjectPassedInstanceLazilyFactoryFunction;
        factoryFunction = function() {
          return 'expected value';
        };
        exampleClassInstance = Ext.create('ExampleClass');
        fnInjectPassedInstanceFactoryFunction = jasmine.createSpy().andCallFake(factoryFunction);
        fnInjectPassedInstanceLazilyFactoryFunction = jasmine.createSpy().andCallFake(factoryFunction);
        fnInjectPassedInstanceAsSingletonFactoryFunction = jasmine.createSpy().andCallFake(factoryFunction);
        fnInjectPassedInstanceAsSingletonLazilyFactoryFunction = jasmine.createSpy().andCallFake(factoryFunction);
        fnInjectPassedInstanceAsPrototypeFactoryFunction = jasmine.createSpy().andCallFake(factoryFunction);
        fnInjectPassedInstanceAsPrototypeLazilyFactoryFunction = jasmine.createSpy().andCallFake(factoryFunction);
        Deft.Injector.configure({
          fnInjectPassedInstance: {
            fn: fnInjectPassedInstanceFactoryFunction
          },
          fnInjectPassedInstanceLazily: {
            fn: fnInjectPassedInstanceLazilyFactoryFunction,
            eager: false
          },
          fnInjectPassedInstanceAsSingleton: {
            fn: fnInjectPassedInstanceAsSingletonFactoryFunction,
            singleton: true
          },
          fnInjectPassedInstanceAsSingletonLazily: {
            fn: fnInjectPassedInstanceAsSingletonLazilyFactoryFunction,
            singleton: true,
            eager: false
          },
          fnInjectPassedInstanceAsPrototype: {
            fn: fnInjectPassedInstanceAsPrototypeFactoryFunction,
            singleton: false
          },
          fnInjectPassedInstanceAsPrototypeLazily: {
            fn: fnInjectPassedInstanceAsPrototypeLazilyFactoryFunction,
            singleton: false,
            eager: false
          }
        });
        factoryFunctionIdentifiers = ['fnInjectPassedInstance', 'fnInjectPassedInstanceLazily', 'fnInjectPassedInstanceAsSingleton', 'fnInjectPassedInstanceAsSingletonLazily', 'fnInjectPassedInstanceAsPrototype', 'fnInjectPassedInstanceAsPrototypeLazily'];
        Deft.Injector.inject(factoryFunctionIdentifiers, exampleClassInstance);
        expect(fnInjectPassedInstanceFactoryFunction).toHaveBeenCalledWith(exampleClassInstance);
        expect(fnInjectPassedInstanceLazilyFactoryFunction).toHaveBeenCalledWith(exampleClassInstance);
        expect(fnInjectPassedInstanceAsSingletonFactoryFunction).toHaveBeenCalledWith(exampleClassInstance);
        expect(fnInjectPassedInstanceAsSingletonLazilyFactoryFunction).toHaveBeenCalledWith(exampleClassInstance);
        expect(fnInjectPassedInstanceAsPrototypeFactoryFunction).toHaveBeenCalledWith(exampleClassInstance);
        expect(fnInjectPassedInstanceAsPrototypeLazilyFactoryFunction).toHaveBeenCalledWith(exampleClassInstance);
      });
    }