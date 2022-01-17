function(test) {
  var event_buf = [];
  var getid = function(id) {
    return document.getElementById(id);
  };

  var div;

  // clicking on a div at top level
  event_buf.length = 0;
  div = OnscreenDiv(Meteor.ui.render(function() {
    return '<div id="foozy">Foo</div>';
  }, {events: eventmap("click"), event_data:event_buf}));
  clickElement(getid("foozy"));
  test.equal(event_buf, ['click']);
  div.kill();
  Meteor.flush();

  // selector that specifies a top-level div
  event_buf.length = 0;
  div = OnscreenDiv(Meteor.ui.render(function() {
    return '<div id="foozy">Foo</div>';
  }, {events: eventmap("click div"), event_data:event_buf}));
  clickElement(getid("foozy"));
  test.equal(event_buf, ['click div']);
  div.kill();
  Meteor.flush();

  // selector that specifies a second-level span
  event_buf.length = 0;
  div = OnscreenDiv(Meteor.ui.render(function() {
    return '<div id="foozy"><span>Foo</span></div>';
  }, {events: eventmap("click span"), event_data:event_buf}));
  clickElement(getid("foozy").firstChild);
  test.equal(event_buf, ['click span']);
  div.kill();
  Meteor.flush();

  // replaced top-level elements still have event handlers
  // even if not replaced by the chunk wih the handlers
  var R = ReactiveVar("p");
  event_buf.length = 0;
  div = OnscreenDiv(Meteor.ui.render(function() {
    return Meteor.ui.chunk(function() {
      return '<'+R.get()+' id="foozy">Hello</'+R.get()+'>';
    });
  }, {events: eventmap("click"), event_data:event_buf}));
  clickElement(getid("foozy"));
  test.equal(event_buf, ['click']);
  event_buf.length = 0;
  R.set("div"); // change tag, which is sure to replace element
  Meteor.flush();
  clickElement(getid("foozy")); // still clickable?
  test.equal(event_buf, ['click']);
  event_buf.length = 0;
  R.set("p");
  Meteor.flush();
  clickElement(getid("foozy"));
  test.equal(event_buf, ['click']);
  event_buf.length = 0;
  div.kill();
  Meteor.flush();

  // bubbling from event on descendent of element matched
  // by selector
  event_buf.length = 0;
  div = OnscreenDiv(Meteor.ui.render(function() {
    return '<div id="foozy"><span><u><b>Foo</b></u></span>'+
      '<span>Bar</span></div>';
  }, {events: eventmap("click span"), event_data:event_buf}));
  clickElement(
    getid("foozy").firstChild.firstChild.firstChild);
  test.equal(event_buf, ['click span']);
  div.kill();
  Meteor.flush();

  // bubbling order (for same event, same render node, different selector nodes)
  event_buf.length = 0;
  div = OnscreenDiv(Meteor.ui.render(function() {
    return '<div id="foozy"><span><u><b>Foo</b></u></span>'+
      '<span>Bar</span></div>';
  }, {events: eventmap("click span", "click b"), event_data:event_buf}));
  clickElement(
    getid("foozy").firstChild.firstChild.firstChild);
  test.equal(event_buf, ['click b', 'click span']);
  div.kill();
  Meteor.flush();

  // "bubbling" order for handlers at same level
  event_buf.length = 0;
  div = OnscreenDiv(Meteor.ui.render(function() {
    return Meteor.ui.chunk(function() {
      return Meteor.ui.chunk(function() {
        return '<span id="foozy" class="a b c">Hello</span>';
      }, {events: eventmap("click .c"), event_data:event_buf});
    }, {events: eventmap("click .b"), event_data:event_buf});
  }, {events: eventmap("click .a"), event_data:event_buf}));
  clickElement(getid("foozy"));
  test.equal(event_buf, ['click .c', 'click .b', 'click .a']);
  event_buf.length = 0;
  div.kill();
  Meteor.flush();

  // stopPropagationd doesn't prevent other event maps from
  // handling same node
  event_buf.length = 0;
  div = OnscreenDiv(Meteor.ui.render(function() {
    return Meteor.ui.chunk(function() {
      return Meteor.ui.chunk(function() {
        return '<span id="foozy" class="a b c">Hello</span>';
      }, {events: eventmap("click .c"), event_data:event_buf});
    }, {events: {"click .b": function(evt) {
      event_buf.push("click .b"); evt.stopPropagation(); return false;}}});
  }, {events: eventmap("click .a"), event_data:event_buf}));
  clickElement(getid("foozy"));
  test.equal(event_buf, ['click .c', 'click .b', 'click .a']);
  event_buf.length = 0;
  div.kill();
  Meteor.flush();

  // bubbling continues even with DOM change
  event_buf.length = 0;
  R = ReactiveVar(true);
  div = OnscreenDiv(Meteor.ui.render(function() {
    return Meteor.ui.chunk(function() {
      return '<div id="blarn">'+(R.get()?'<span id="foozy">abcd</span>':'')+'</div>';
    }, {events: { 'click span': function() {
      event_buf.push('click span');
      R.set(false);
      Meteor.flush(); // kill the span
    }, 'click div': function(evt) {
      event_buf.push('click div');
    }}});
  }));
  // click on span
  clickElement(getid("foozy"));
  test.expect_fail(); // doesn't seem to work in old IE
  test.equal(event_buf, ['click span', 'click div']);
  event_buf.length = 0;
  div.kill();
  Meteor.flush();

  // "deep reach" from high node down to replaced low node.
  // Tests that attach_secondary_events actually does the
  // right thing in IE.  Also tests change event bubbling
  // and proper interpretation of event maps.
  event_buf.length = 0;
  R = ReactiveVar('foo');
  div = OnscreenDiv(Meteor.ui.render(function() {
    return '<div><p><span><b>'+
      Meteor.ui.chunk(function() {
        return '<input type="checkbox">'+R.get();
      }, {events: eventmap('click input'), event_data:event_buf}) +
      '</b></span></p></div>';
  }, { events: eventmap('change b', 'change input'), event_data:event_buf }));
  R.set('bar');
  Meteor.flush();
  // click on input
  clickElement(div.node().getElementsByTagName('input')[0]);
  event_buf.sort(); // don't care about order
  test.equal(event_buf, ['change b', 'change input', 'click input']);
  event_buf.length = 0;
  div.kill();
  Meteor.flush();

  // same thing, but with events wired by listChunk "added" and "removed"
  event_buf.length = 0;
  var lst = [];
  lst.observe = function(callbacks) {
    lst.callbacks = callbacks;
    return {
      stop: function() {
        lst.callbacks = null;
      }
    };
  };
  div = OnscreenDiv(Meteor.ui.render(function() {
    var chkbx = function(doc) {
      return '<input type="checkbox">'+(doc ? doc._id : 'else');
    };
    return '<div><p><span><b>'+
      Meteor.ui.listChunk(lst, chkbx, chkbx,
                          {events: eventmap('click input', event_buf),
                           event_data:event_buf}) +
      '</b></span></p></div>';
  }, { events: eventmap('change b', 'change input', event_buf),
       event_data:event_buf }));
  Meteor.flush();
  test.equal(div.text().match(/\S+/)[0], 'else');
  // click on input
  var doClick = function() {
    clickElement(div.node().getElementsByTagName('input')[0]);
    event_buf.sort(); // don't care about order
    test.equal(event_buf, ['change b', 'change input', 'click input']);
    event_buf.length = 0;
  };
  doClick();
  // add item
  lst.push({_id:'foo'});
  lst.callbacks.added(lst[0], 0);
  Meteor.flush();
  test.equal(div.text().match(/\S+/)[0], 'foo');
  doClick();
  // remove item, back to "else" case
  lst.callbacks.removed(lst[0], 0);
  lst.pop();
  Meteor.flush();
  test.equal(div.text().match(/\S+/)[0], 'else');
  doClick();
  // cleanup
  div.kill();
  Meteor.flush();

  // test that 'click *' fires on bubble
  event_buf.length = 0;
  R = ReactiveVar('foo');
  div = OnscreenDiv(Meteor.ui.render(function() {
    return '<div><p><span><b>'+
      Meteor.ui.chunk(function() {
        return '<input type="checkbox">'+R.get();
      }, {events: eventmap('click input'), event_data:event_buf}) +
      '</b></span></p></div>';
  }, { events: eventmap('click *'), event_data:event_buf }));
  R.set('bar');
  Meteor.flush();
  // click on input
  clickElement(div.node().getElementsByTagName('input')[0]);
  test.equal(
    event_buf,
    ['click input', 'click *', 'click *', 'click *', 'click *', 'click *']);
  event_buf.length = 0;
  div.kill();
  Meteor.flush();

  // clicking on a div in a nested chunk (without patching)
  event_buf.length = 0;
  R = ReactiveVar('foo');
  div = OnscreenDiv(Meteor.ui.render(function() {
    return R.get() + Meteor.ui.chunk(function() {
      return '<span>ism</span>';
    }, {events: eventmap("click"), event_data:event_buf});
  }));
  test.equal(div.text(), 'fooism');
  clickElement(div.node().getElementsByTagName('SPAN')[0]);
  test.equal(event_buf, ['click']);
  event_buf.length = 0;
  R.set('bar');
  Meteor.flush();
  test.equal(div.text(), 'barism');
  clickElement(div.node().getElementsByTagName('SPAN')[0]);
  test.equal(event_buf, ['click']);
  event_buf.length = 0;
  div.kill();
  Meteor.flush();

  // Event data comes from event.currentTarget, not event.target
  var data_buf = [];
  div = OnscreenDiv(Meteor.ui.render(function() {
    return "<ul>"+Meteor.ui.chunk(function() {
      return '<li id="funyard">Hello</li>';
    }, { event_data: {x:'listuff'} })+"</ul>";
  }, { event_data: {x:'ulstuff'},
       events: { 'click ul': function() { data_buf.push(this); }}}));
  clickElement(getid("funyard"));
  test.equal(data_buf, [{x:'ulstuff'}]);
  div.kill();
  Meteor.flush();
}