function (test) {

  // Test for a bug that made it to production -- after a replacement,
  // we need to also check the newly replaced node for replacements
  var frag = Meteor.ui.render(Template.test_assembly_a0);
  test.equal(canonicalizeHtml(Meteor.ui._fragmentToHtml(frag)),
               "Hi");

  // Another production bug -- we must use LiveRange to replace the
  // placeholder, or risk breaking other LiveRanges
  Session.set("stuff", true); // XXX bad form to use Session in a test?
  Template.test_assembly_b1.stuff = function () {
    return Session.get("stuff");
  };
  var onscreen = DIV({style: "display: none"}, [
    Meteor.ui.render(Template.test_assembly_b0)]);
  document.body.appendChild(onscreen);
  test.equal(canonicalizeHtml(onscreen.innerHTML), "xyhi");
  Session.set("stuff", false);
  Meteor.flush();
  test.equal(canonicalizeHtml(onscreen.innerHTML), "xhi");
  document.body.removeChild(onscreen);
}