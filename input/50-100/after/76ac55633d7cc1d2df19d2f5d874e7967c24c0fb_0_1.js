function(Constructor) {
          assert.isFunction(Constructor, moduleName + ' did not return a constructor function');
          var widget = new Constructor(elem, params, sinon.spy());
          assert.instanceOf(widget, Constructor, 
            moduleName + ' constructor did not return expected instance type');
          done();
        }