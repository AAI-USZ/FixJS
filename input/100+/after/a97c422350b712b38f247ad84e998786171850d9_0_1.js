function () {

  personContainer = $("#PersonContainer");
  scrollableContainer = $("#scrollableContainer");

  personContainer.append(Meteor.ui.render(function (){
    return Template.addpersonbutton({buttonType: randomButtonType()});
  }));
  addPersonButton = $(".AddPersonButton");
  
  personContainer.width(addPersonButton.outerWidth(true));
  var firstPerson = createPerson(randomButtonType(), false);
  createPerson(randomButtonType(), false);

  bindEventHandlersToCurrencyField($("#totalInput"));
  bindEventHandlersToCurrencyField($("#taxInput"));
}