function () {
            var jsobj = {name: "mariano", age: 27, tags: ["foo", "bar"], foo: {bar: 1, baz: "asd", argh: {lala: "hi"}}},
                obj = Types.Obj.fromJsObject(jsobj),
                env = new Types.Env({"obj": obj}, [Types.Env.makeGround()]);

            Q.equal(Squim.run("(obj)", env), obj, "calling obj without args evaluates to itself");
            Q.equal(Squim.run("(eq? (obj) obj)", env), Types.t, "eq? works on obj");
            Q.equal(Squim.run("(obj name)", env), obj.attrs.name, "calling obj with one symbol returns that attribute");
            Q.equal(Squim.run('(equal? (obj name) "mariano")', env), Types.t, "calling obj with one symbol returns that attribute");
            Q.equal(Squim.run("(obj foo bar)", env), obj.attrs.foo.attrs.bar, "calling obj with symbols returns that attribute");
            Q.equal(Squim.run('(equal? (obj foo bar) 1)', env), Types.t, "calling obj with one symbol returns that attribute");
            Q.equal(Squim.run('(equal? (obj foo argh lala) "hi")', env), Types.t, "calling obj with symbols returns that attribute");
            Q.equal(Squim.run("(obj foo argh lala)", env), obj.attrs.foo.attrs.argh.attrs.lala, "calling with symbols returns that attribute");

            // XXX: this may change to throw an error later
            Q.equal(Squim.run('(obj inexistent)', env), Types.inert, "calling obj with unknown symbol returns inert");
            Q.equal(Squim.run('(equal? (obj inexistent) #inert)', env), Types.t, "calling obj with unknown symbol returns inert");
        }