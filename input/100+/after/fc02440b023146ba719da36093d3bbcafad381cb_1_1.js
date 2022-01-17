function () {
            var env = Types.Env.fromJsObject({"obj": "asd"}, [42]);

            Q.equal(env.bindings.obj instanceof Types.Str, true);
            Q.equal(env.bindings.obj.value, "asd");
            Q.equal(env.parents[0], 42);
        }