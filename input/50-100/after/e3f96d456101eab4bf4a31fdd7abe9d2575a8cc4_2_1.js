function() {
    Ext.define('ExampleErrorThrowingViewController', {
      extend: 'Deft.mvc.ViewController',
      constructor: function() {
        throw new Error('Error thrown by \`ExampleErrorThrowingViewController\`.');
      }
    });
    Ext.define('ExampleView', {
      extend: 'Ext.Container',
      mixins: ['Deft.mixin.Controllable'],
      controller: 'ExampleErrorThrowingViewController'
    });
    expect(function() {
      Ext.create('ExampleView');
    }).toThrow('Error thrown by \`ExampleErrorThrowingViewController\`.');
  }