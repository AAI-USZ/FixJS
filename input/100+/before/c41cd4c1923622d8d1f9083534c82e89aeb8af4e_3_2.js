function createAltItem(step, pIndex, pName, altName, altValue) {
  return newNode(
    'li',
    newNode(
      'a',
      altName + ": " + altValue,
      {
        href: '#',
        click: function(e) {
          jQuery('#' + step.id + '-p' + pIndex + '-locator-type-chooser').val(altName);
          jQuery('#' + step.id + '-p' + pIndex + '-edit-input').val(altValue);
        }
      }
    )
  );
}