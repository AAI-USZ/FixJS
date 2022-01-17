function (err, m1) {
          should.strictEqual(err, null);

          M.findById(m1)
          .populate('kids.user', ["name"])
          .populate('kids.post', ["title"], { title: "woot" })
          .run(function (err, o) {
            db.close();
            should.strictEqual(err, null);
            should.strictEqual(o.kids.length, 2);
            var k1 = o.kids[0];
            var k2 = o.kids[1];
            should.strictEqual(true, !k2.post);
            should.strictEqual(k1.user.name, "Fan 1");
            should.strictEqual(k1.user.email, undefined);
            should.strictEqual(k1.post.title, "woot");
            should.strictEqual(k2.user.name, "Fan 2");
          });
        }