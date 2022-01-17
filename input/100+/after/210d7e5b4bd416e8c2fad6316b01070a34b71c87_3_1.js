function(test) {

  var inc = function(v) {
    v.set(v.get() + 1); };

  var R1 = ReactiveVar(0);
  var R2 = ReactiveVar(0);
  var R3 = ReactiveVar(0);
  var count1 = 0, count2 = 0, count3 = 0;

  var frag = WrappedFrag(Meteor.ui.render(function() {
    return R1.get() + "," + (count1++) + " " +
      Meteor.ui.chunk(function() {
        return R2.get() + "," + (count2++) + " " +
          Meteor.ui.chunk(function() {
            return R3.get() + "," + (count3++);
          });
      });
  })).hold();

  test.equal(frag.html(), "0,0 0,0 0,0");

  inc(R1); Meteor.flush();
  test.equal(frag.html(), "1,1 0,1 0,1");

  inc(R2); Meteor.flush();
  test.equal(frag.html(), "1,1 1,2 0,2");

  inc(R3); Meteor.flush();
  test.equal(frag.html(), "1,1 1,2 1,3");

  inc(R2); Meteor.flush();
  test.equal(frag.html(), "1,1 2,3 1,4");

  inc(R1); Meteor.flush();
  test.equal(frag.html(), "2,2 2,4 1,5");

  frag.release();
  Meteor.flush();
  test.equal(R1.numListeners(), 0);
  test.equal(R2.numListeners(), 0);
  test.equal(R3.numListeners(), 0);

  R1.set(0);
  R2.set(0);
  R3.set(0);

  frag = WrappedFrag(Meteor.ui.render(function() {
    var buf = [];
    buf.push('<div class="foo', R1.get(), '">');
    buf.push(Meteor.ui.chunk(function() {
      var buf = [];
      for(var i=0; i<R2.get(); i++) {
        buf.push(Meteor.ui.chunk(function() {
          return '<div>'+R3.get()+'</div>';
        }));
      }
      return buf.join('');
    }));
    buf.push('</div>');
    return buf.join('');
  })).hold();

  test.equal(frag.html(), '<div class="foo0"><!----></div>');
  R2.set(3); Meteor.flush();
  test.equal(frag.html(), '<div class="foo0">'+
               '<div>0</div><div>0</div><div>0</div>'+
               '</div>');

  R3.set(5); Meteor.flush();
  test.equal(frag.html(), '<div class="foo0">'+
               '<div>5</div><div>5</div><div>5</div>'+
               '</div>');

  R1.set(7); Meteor.flush();
  test.equal(frag.html(), '<div class="foo7">'+
               '<div>5</div><div>5</div><div>5</div>'+
               '</div>');

  R2.set(1); Meteor.flush();
  test.equal(frag.html(), '<div class="foo7">'+
               '<div>5</div>'+
               '</div>');

  R1.set(11); Meteor.flush();
  test.equal(frag.html(), '<div class="foo11">'+
               '<div>5</div>'+
               '</div>');

  R2.set(2); Meteor.flush();
  test.equal(frag.html(), '<div class="foo11">'+
               '<div>5</div><div>5</div>'+
               '</div>');

  R3.set(4); Meteor.flush();
  test.equal(frag.html(), '<div class="foo11">'+
               '<div>4</div><div>4</div>'+
               '</div>');

  frag.release();

  // calling chunk() outside of render mode
  test.equal(Meteor.ui.chunk(function() { return "foo"; }), "foo");

  // caller violating preconditions

  test.throws(function() {
    Meteor.ui.render(function() {
      return Meteor.ui.chunk("foo");
    });
  });

  test.throws(function() {
    Meteor.ui.render(function() {
      return Meteor.ui.chunk(function() {
        return {};
      });
    });
  });


  // unused chunk

  var Q = ReactiveVar("foo");
  Meteor.ui.render(function() {
    // create a chunk, in render mode,
    // but don't use it.
    Meteor.ui.chunk(function() {
      return Q.get();
    });
    return "";
  });
  test.equal(Q.numListeners(), 1);
  Q.set("bar");
  // flush() should invalidate the unused
  // chunk but not assume it has been wired
  // up with a LiveRange.
  Meteor.flush();
  test.equal(Q.numListeners(), 0);

  // nesting

  var stuff = ReactiveVar(true);
  var div = OnscreenDiv(Meteor.ui.render(function() {
    return Meteor.ui.chunk(function() {
      return "x"+(stuff.get() ? 'y' : '') + Meteor.ui.chunk(function() {
        return "hi";
      });
    });
  }));
  test.equal(div.html(), "xyhi");
  stuff.set(false);
  Meteor.flush();
  test.equal(div.html(), "xhi");
  div.kill();
  Meteor.flush();
}