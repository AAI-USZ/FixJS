function() {
      return expect(function() {
        return Ext.create('Deft.mvc.ViewController');
      }).toThrow(new Error('Error constructing ViewController: the configured \'view\' is not an Ext.Component.'));
    }