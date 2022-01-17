function createItemForPerson(person) {
  var item = Meteor.ui.render(function () { return Template.item(); });
  var list = person.find(".ScrollableItemList");
  list.append(item);
  item = $(list[0].lastElementChild);

  item.children(".ItemPrice").focus(function (e) {
    if (item.parent()[0].lastElementChild === item[0])
      createItemForPerson(person);
  }).blur(function (e) {
    if (item.parent()[0].childElementCount < 3)
      return;
    if (item.next()[0] === item.parent()[0].lastElementChild && !item.children(".ItemPrice").val())
      item.next().remove();
  });

  itemCountDidChangeForPerson(person);
  return item;
}