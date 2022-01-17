function () {
            function check(value, expected) {
                Q.equal(Types.squimify(value).toString(), expected);
            }

            check(1, "1");
            check(1.2, "1.2");
            check(false, "#f");
            check(true, "#t");
            check(/#ignore/, "#ignore");
            check(/#inert/, "#inert");
            check(null, "()");
            check([], "()");
            check(/foo/, "foo");
            check(/$foo!/, "$foo!");
            check('', '""');
            check('foo', '"foo"');
            check([1], "(1)");
            check([1, 1.2], "(1 1.2)");
            check([1, 1.2, false], "(1 1.2 #f)");
            check([1, 1.2, false, true], "(1 1.2 #f #t)");
            check([1, 1.2, false, true, "asd"], '(1 1.2 #f #t "asd")');
            check([1, 1.2, [false, true, "asd"], []], '(1 1.2 (#f #t "asd") ())');
            check({name: "mariano"}, '{"name":"mariano"}');
            // this assumes attrs will be serialized in the same order
            check({name: "mariano", age: 27}, '{"name":"mariano","age":27}');

            check(new Types.Int(1), "1");
            check(new Types.Float(1.2), "1.2");
            check(new Types.Bool(false), "#f");
            check(new Types.Bool(true), "#t");
            check(new Types.Str(''), '""');
            check(new Types.Str('foo'), '"foo"');
            check(new Types.Symbol('foo'), 'foo');
            check(Types.nil, "()");
            check(Types.ignore, "#ignore");
            check(Types.inert, "#inert");
            check(Types.t, "#t");
            check(Types.f, "#f");
        }