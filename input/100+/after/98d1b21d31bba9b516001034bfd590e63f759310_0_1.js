function () {

  personContainer = $("#PersonContainer");
  personContainer.append(Meteor.ui.render(function (){
    return Template.addpersonbutton({buttonType: randomButtonType()});
  }));
  addPersonButton = $(".AddPersonButton");
  personContainer.width(addPersonButton.outerWidth(true));
  createPerson(randomButtonType());
  createPerson(randomButtonType());
}