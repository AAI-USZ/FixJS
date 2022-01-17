function(_super) {

    __extends(HomeZipCodeFormField, _super);

    function HomeZipCodeFormField() {
      this.valid = __bind(this.valid, this);

      this.zipLookup = __bind(this.zipLookup, this);
      return HomeZipCodeFormField.__super__.constructor.apply(this, arguments);
    }

    HomeZipCodeFormField.prototype.errorMessage = "Enter a valid 5 digit zip code.";

    HomeZipCodeFormField.prototype.initialize = function() {
      var _this = this;
      HomeZipCodeFormField.__super__.initialize.call(this);
      return this.$el.on("change blur", function() {
        return _this.zipLookup(_this.value());
      });
    };

    HomeZipCodeFormField.prototype.zipLookup = function(zip) {
      var _this = this;
      return $.ajax({
        type: 'get',
        url: '/usps/zip_lookup/',
        data: {
          zip: zip
        },
        success: function(d) {
          var city, state;
          if (d.state !== void 0) {
            city = d.city;
            state = d.state;
            _this.$el.children('input[id$="_city"]').val(city);
            _this.$el.children('input[id$="_state_id"]').val(state);
            return _this.$el.children('.zip-code-location-hint').text("" + city + ", " + state);
          }
        }
      });
    };

    HomeZipCodeFormField.prototype.valid = function() {
      if (this.required()) {
        return /^((\d{5}(-\d{4}))|(\d{5}))$/.test(this.value());
      } else {
        return true;
      }
    };

    return HomeZipCodeFormField;

  }