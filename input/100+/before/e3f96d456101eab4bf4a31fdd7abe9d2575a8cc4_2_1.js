function() {
    var constructorSpy, exampleViewControllerInstance, exampleViewInstance;
    exampleViewInstance = null;
    exampleViewControllerInstance = null;
    Ext.define('ExampleView', {
      extend: 'Ext.Container',
      mixins: ['Deft.mixin.Controllable'],
      controller: 'ExampleViewController'
    });
    Ext.define('ExampleViewController', {
      extend: 'Deft.mvc.ViewController'
    });
    constructorSpy = spyOn(ExampleViewController.prototype, 'constructor').andCallFake(function() {
      exampleViewControllerInstance = this;
      return constructorSpy.originalValue.apply(this, arguments);
    });
    exampleViewInstance = Ext.create('ExampleView');
    expect(ExampleViewController.prototype.constructor).toHaveBeenCalled();
    expect(ExampleViewController.prototype.constructor.callCount).toBe(1);
    return expect(exampleViewControllerInstance.getView()).toBe(exampleViewInstance);
  }