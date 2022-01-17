function onCourseAssignment(el, response) {
 if (response.evalJSON(true) && response.evalJSON(true).status) {
  new Effect.Fade(el.up().up());
 } else {
  alert(translations['_SOMEPROBLEMOCCURED']);
 }
}