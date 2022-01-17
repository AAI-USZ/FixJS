function() {
    Ext.define('ExampleView', {
      extend: 'Ext.Container',
      mixins: ['Deft.mixin.Controllable']
    });
    Ext.define('ExampleViewController', {
      extend: 'Deft.mvc.ViewController'
    });
    return expect(function() {
      return Ext.create('ExampleView');
    }).toThrow('Error initializing Controllable instance: `controller` was not specified.');
  }