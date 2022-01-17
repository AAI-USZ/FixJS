function(_super) {

    __extends(Leisure_nil, _super);

    function Leisure_nil() {
      Leisure_nil.__super__.constructor.apply(this, arguments);
    }

    Leisure_nil.prototype.find = function find() {
      return false;
    };

    Leisure_nil.prototype.removeAll = function removeAll() {
      return this;
    };

    Leisure_nil.prototype.map = function map(func) {
      return Nil;
    };

    Leisure_nil.prototype.foldl = function foldl(func, arg) {
      return arg;
    };

    Leisure_nil.prototype.foldr = function foldr(func, arg) {
      return arg;
    };

    Leisure_nil.prototype.rev = function rev(result) {
      return result;
    };

    Leisure_nil.prototype.equals = function equals(other) {
      return other instanceof Leisure_nil;
    };

    Leisure_nil.prototype.each = function each() {};

    Leisure_nil.prototype.append = function append(l) {
      return l;
    };

    return Leisure_nil;

  }