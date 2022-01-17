function createItemForPerson(person) {
  var item = Meteor.ui.render(function () { return Template.item(); });
  var list = person.find(".ScrollableItemList");
  list.append(item);
  item = $(list[0].lastElementChild);

  var field = item.children(".ItemPrice");
  bindEventHandlersToCurrencyField(field, true);

  field.focus(function (e) {
    if (item.parent()[0].lastElementChild === item[0])
      createItemForPerson(person);
  }).blur(function (e) {
    // Remove empty fields unless they are the last field
    if (item[0] !== item.parent()[0].lastElementChild && !item.children(".ItemPrice").val())
      item.remove();
  });

  itemCountDidChangeForPerson(person);
  return item;
}