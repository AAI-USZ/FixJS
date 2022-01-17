function createPerson(additionalClasses, centerAndFocus) {
  var person = Meteor.ui.render(function () { return Template.person({additionalClasses: additionalClasses}); });
  // var personContainer = $("#PersonContainer");
  personContainer[0].insertBefore(person, addPersonButton[0]);
  var children = personContainer.children(".Person");
  person = children.last();

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
  var numChildren = children.length;
  personContainer.width(personContainer.width() + person.outerWidth(true));

  var item = createItemForPerson(person);

  // Randomize add button type again.
  var classList = addPersonButton[0].classList;
  addPersonButton.removeClass(classList[classList.length - 1]);
  var type = randomButtonType();
  addPersonButton.addClass(type);
  addPersonButton.attr("onclick", "createPerson('" + type + "', true)");

   if (centerAndFocus) {
    item.find(".ItemPrice").focus();
    setTimeout(function () {
      scrollableContainer.animate({
        scrollLeft: personContainer.outerWidth(true),
      }, 1000);
    }, 250);
  };

  return person;
}