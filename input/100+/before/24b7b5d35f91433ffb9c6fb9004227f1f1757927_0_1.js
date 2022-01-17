function () {
            assert.equal(dataset.literal(sql.literal("(hello, world)")), "(hello, world)");
            assert.equal(dataset.literal("('hello', 'world')"), "'(''hello'', ''world'')'");
            assert.equal(dataset.literal("(hello, world)"), "'(hello, world)'");
            assert.equal(dataset.literal("hello, world"), "'hello, world'");
            assert.equal(dataset.literal('("hello", "world")'), "'(\"hello\", \"world\")'");
            assert.equal(dataset.literal("(\hello\, \world\)'"), "'(hello, world)'''");
            assert.equal(dataset.literal("\\'\\'"), "'\\\\''\\\\'''");
            assert.strictEqual(dataset.literal(1), "1");
            assert.strictEqual(dataset.literal(1.0), "1");
            assert.strictEqual(dataset.literal(1.01), "1.01");
            assert.equal(dataset.literal(sql.hello.lt(1)), '(hello < 1)');
            assert.equal(dataset.literal(sql.hello.gt(1)), '(hello > 1)');
            assert.equal(dataset.literal(sql.hello.lte(1)), '(hello <= 1)');
            assert.equal(dataset.literal(sql.hello.gte(1)), '(hello >= 1)');
            assert.equal(dataset.literal(sql.hello.like("test")), "(hello LIKE 'test')");
            assert.equal(dataset.literal(dataset.from("test").order("name")), "(SELECT * FROM test ORDER BY name)");
            assert.equal(dataset.literal([1, 2, 3]), "(1, 2, 3)");
            assert.equal(dataset.literal([1, "2", 3]), "(1, '2', 3)");
            assert.equal(dataset.literal([1, "\\'\\'", 3]), "(1, '\\\\''\\\\''', 3)");
            assert.equal(dataset.literal(new sql.Year(2009)), '2009')
            assert.equal(dataset.literal(new sql.TimeStamp(2009, 10, 10, 10, 10)), "'2009-11-10 10:10:00'");
            assert.equal(dataset.literal(new sql.DateTime(2009, 10, 10, 10, 10)), "'2009-11-10 10:10:00'");
            assert.equal(dataset.literal(new Date(2009, 10, 10)), "'2009-11-10'");
            assert.equal(dataset.literal(new sql.Time(11, 10, 10)), "'11:10:10'");
            assert.equal(dataset.literal(null), "NULL");
            assert.equal(dataset.literal(true), "'t'");
            assert.equal(dataset.literal(false), "'f'");
            assert.equal(dataset.literal({a:"b"}), "(a = 'b')");
            assert.throws(comb.hitch(dataset, "literal", /a/));
        }