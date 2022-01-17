function createPerson() {
  var person = Meteor.ui.render(function () { return Template.person(); });
  var personContainer = $("#PersonContainer");
  personContainer[0].insertBefore(person, personContainer.children(".AddPersonCard")[0]);
  person = personContainer.children().last().prev();

  var list = person.find(".ScrollableItemList");
  list.scroll(function(e) {
    var list = $(e.delegateTarget);

    var isTopClipped = list.scrollTop() > 0;
    person.find(".TopShadow").css("display", isTopClipped ? "block" : "none");

    var lastChild = $(list[0].lastElementChild);
    var isBottomClipped = list.innerHeight() < lastChild.position().top + lastChild.outerHeight();
    person.find(".BottomShadow").css("display", isBottomClipped ? "block": "none");
  });

  itemCountDidChangeForPerson(person);
  var numChildren = personContainer.children().length;
  personContainer.width(numChildren * (personWidth + 2 * personMargin) - 2 * personMargin);

  createItemForPerson(person);
  createItemForPerson(person);
}