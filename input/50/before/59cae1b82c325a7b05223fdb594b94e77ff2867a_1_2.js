function() {
  screen = new Radiator.Screen();
  ko.applyBindings(screen, $('#screen')[0]);
  screen.display();
}