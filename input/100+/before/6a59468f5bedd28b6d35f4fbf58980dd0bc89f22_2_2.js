function() {
    var constructorSpy, exampleViewControllerInstance, exampleViewInstance;
    exampleViewInstance = null;
    exampleViewControllerInstance = null;
    Ext.define('ExampleViewController', {
      extend: 'Deft.mvc.ViewController',
      config: {
        value: null
      }
    });
    Ext.define('ExampleView', {
      extend: 'Ext.Container',
      alias: 'widget.ExampleView',
      mixins: ['Deft.mixin.Controllable'],
      controller: 'ExampleViewController',
      controllerConfig: {
        value: 'expected value'
      }
    });
    constructorSpy = spyOn(ExampleViewController.prototype, 'constructor').andCallFake(function() {
      exampleViewControllerInstance = this;
      return constructorSpy.originalValue.apply(this, arguments);
    });
    exampleViewInstance = Ext.create('ExampleView');
    expect(ExampleViewController.prototype.constructor).toHaveBeenCalledWith({
      view: exampleViewInstance,
      value: 'expected value'
    });
    expect(ExampleViewController.prototype.constructor.callCount).toBe(1);
    expect(exampleViewControllerInstance.getView()).toBe(exampleViewInstance);
    expect(exampleViewControllerInstance.getValue()).toBe('expected value');
  }