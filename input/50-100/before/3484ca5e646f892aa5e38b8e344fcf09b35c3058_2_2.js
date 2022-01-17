function() {

  __extends(Horse, Animal);

  function Horse() {
    Horse.__super__.constructor.apply(this, arguments);
  }

  Horse.prototype.move = function() {
    alert("Galloping...");
    return Horse.__super__.move.call(this, 45);
  };

  return Horse;

}