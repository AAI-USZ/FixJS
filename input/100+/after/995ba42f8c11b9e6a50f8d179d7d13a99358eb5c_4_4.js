function onload() {
    window.removeEventListener("load", onload, true);
  
    let win = window.document.getElementById("content").contentWindow;
    let worker =  Worker({
        window: win,
        contentScript: 'new ' + function WorkerScope() {
          // Validate self.on and self.emit
          self.port.on('addon-to-content', function (fun, w, obj, array) {
            self.port.emit('content-to-addon', [
                            fun === null,
                            typeof w,
                            "port" in w,
                            w.url,
                            "fun" in obj,
                            Object.keys(obj.dom).length,
                            Array.isArray(array),
                            JSON.stringify(array)
                          ]);
          });
        }
      });
    
    // Validate worker.port
    let array = [1, 2, 3];
    worker.port.on('content-to-addon', function (result) {
      test.assert(result[0], "functions become null");
      test.assertEqual(result[1], "object", "objects stay objects");
      test.assert(result[2], "object's attributes are enumerable");
      test.assertEqual(result[3], "about:blank", "json attribute is accessible");
      test.assert(!result[4], "function as object attribute is removed");
      test.assertEqual(result[5], 0, "DOM nodes are converted into empty object");
      // See bug 714891, Arrays may be broken over compartments:
      test.assert(result[6], "Array keeps being an array");
      test.assertEqual(result[7], JSON.stringify(array),
                       "Array is correctly serialized");
      test.done();
    });

    let obj = {
      fun: function () {},
      dom: window.document.createElement("div")
    };
    worker.port.emit("addon-to-content", function () {}, worker, obj, array);

  }