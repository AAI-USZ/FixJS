function () {
      var cn = "example";

      internal.db._drop(cn);
      var c1 = internal.db._create(cn);

      c1.load();

      var f = c1.figures();

      assertEqual(0, f.datafiles.count);
      assertEqual(0, f.alive.count);
      assertEqual(0, f.alive.size);
      assertEqual(0, f.dead.count);
      assertEqual(0, f.dead.size);
      assertEqual(0, f.dead.deletion);

      var d1 = c1.save({ hallo : 1 });

      f = c1.figures();

      assertEqual(1, f.datafiles.count);
      assertEqual(1, f.alive.count);
      assertNotEqual(0, f.alive.size);
      assertEqual(0, f.dead.count);
      assertEqual(0, f.dead.size);
      assertEqual(0, f.dead.deletion);

      var d2 = c1.save({ hallo : 2 });

      f = c1.figures();

      assertEqual(1, f.datafiles.count);
      assertEqual(2, f.alive.count);
      assertNotEqual(0, f.alive.size);
      assertEqual(0, f.dead.count);
      assertEqual(0, f.dead.size);
      assertEqual(0, f.dead.deletion);

      c1.remove(d1);

      f = c1.figures();

      assertEqual(1, f.datafiles.count);
      assertEqual(1, f.alive.count);
      assertNotEqual(0, f.alive.size);
      assertEqual(1, f.dead.count);
      assertNotEqual(0, f.dead.size);
      assertEqual(1, f.dead.deletion);

      c1.remove(d2);

      f = c1.figures();

      assertEqual(1, f.datafiles.count);
      assertEqual(0, f.alive.count);
      assertEqual(0, f.alive.size);
      assertEqual(2, f.dead.count);
      assertNotEqual(0, f.dead.size);
      assertEqual(2, f.dead.deletion);

      internal.db._drop(cn);
    }