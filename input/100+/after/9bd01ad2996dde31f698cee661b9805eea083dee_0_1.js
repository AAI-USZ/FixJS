function(eltId, args) {
  var self = this;
  this.elt = $(eltId);
  this.list = $(this.elt.children(args.listSelector)[0]);
  this.items = $.map(this.list.children(), function(e) { return $(e); });
  
  if(typeof(args.itemWidth) !== "function") {
    this.itemWidth = function() { return args.itemWidth; };
  }
  else
    this.itemWidth = args.itemWidth;

  if(typeof(args.afterMoveTo) !== "function")
    this.afterMoveTo = function() {};
  else
    this.afterMoveTo = args.afterMoveTo;

  this.parallax = new $.msw.Parallax(this.list, args);

  this.position = 0;

  // Set timeline styles and size
  this.list.addClass("parallax_moving");
  this.setWidth();

  if(args["autoResize"]) {
    $(window).resize(function() {
      self.setWidth();
    });
  }
}