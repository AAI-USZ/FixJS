function() {
    var constructorSpy, exampleViewControllerInstance, exampleViewInstance;
    exampleViewInstance = null;
    exampleViewControllerInstance = null;
    Ext.define('ExampleViewController', {
      extend: 'Deft.mvc.ViewController'
    });
    Ext.define('ExampleView', {
      extend: 'Ext.Container',
      mixins: ['Deft.mixin.Controllable'],
      controller: 'ExampleViewController'
    });
    constructorSpy = spyOn(ExampleViewController.prototype, 'constructor').andCallFake(function() {
      exampleViewControllerInstance = this;
      return constructorSpy.originalValue.apply(this, arguments);
    });
    exampleViewInstance = Ext.create('ExampleView');
    expect(ExampleViewController.prototype.constructor).toHaveBeenCalled();
    expect(ExampleViewController.prototype.constructor.callCount).toBe(1);
    expect(exampleViewControllerInstance.getView()).toBe(exampleViewInstance);
  }