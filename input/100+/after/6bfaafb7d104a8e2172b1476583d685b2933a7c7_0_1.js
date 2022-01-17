function (pat) {
      var p = pat || '.*'
        , re
        , testFiles;

      // Don't nest; make a top-level namespace. Don't want
      // re-calling from inside to nest infinitely
     jake.currentNamespace = jake.defaultNamespace;

      re = new RegExp(pat);
      testFiles = self.testFiles.toArray().filter(function (f) {
        return (re).test(f);
      });

      // Create a namespace for all the testing tasks to live in
      namespace(self.testName + 'Exec', function () {
        // Each test will be a prereq for the dummy top-level task
        var prereqs = []
        // Continuation to pass to the async tests, wrapping `continune`
          , next = function () {
              complete();
            }
        // Create the task for this test-function
          , createTask = function (name, action) {
              // If the test-function is defined with a continuation
              // param, flag the task as async
              isAsync = !!action.length;

              // Define the actual namespaced task with the name, the
              // wrapped action, and the correc async-flag
              task(name, createAction(name, action), {
                async: isAsync
              });
            }
        // Used as the action for the defined task for each test.
          , createAction = function (n, a) {
              // A wrapped function that passes in the `next` function
              // for any tasks that run asynchronously
              return function () {
                var cb;
                if (a.length) {
                  cb = next;
                }
                if (!(n == 'before' || n == 'after')) {
                  jake.logger.log('Running ' + n);
                }
                // 'this' will be the task when action is run
                return a.call(this, cb);
              };
            }
          // Dummy top-level task for everything to be prereqs for
          , topLevel;

        // Pull in each test-file, and iterate over any exported
        // test-functions. Register each test-function as a prereq task
        testFiles.forEach(function (file) {
          var exp = require(path.join(currDir, file))
            , name
            , action
            , isAsync;

          // Create a namespace for each filename, so test-name collisions
          // won't be a problem
          namespace(file, function () {

            if (typeof exp.before == 'function') {
              prereqs.push(self.testName + 'Exec:' + file + ':before');
              // Create the task
              createTask('before', exp.before);
            }

            // Walk each exported function, and create a task for each
            for (var p in exp) {
              if (p == 'before' || p == 'after') {
                continue;
              }
              // Add the namespace:name of this test to the list of prereqs
              // for the dummy top-level task
              prereqs.push(self.testName + 'Exec:' + file + ':' + p);
              // Create the task
              createTask(p, exp[p]);
            }

            if (typeof exp.after == 'function') {
              prereqs.push(self.testName + 'Exec:' + file + ':after');
              // Create the task
              createTask('after', exp.after);
            }

          });
        });

        // Create the dummy top-level task. When calling a task internally
        // with `invoke` that is async (or has async prereqs), have to listen
        // for the 'complete' event to know when it's done
        topLevel = task('__top__', prereqs);
        topLevel.addListener('complete', function () {
          jake.logger.log('All tests ran successfully');
          complete();
        });

        topLevel.invoke(); // Do the thing!
      });


    }, {async: true}