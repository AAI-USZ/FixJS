function(_super) {

    __extends(QueryViewsSearchForm, _super);

    function QueryViewsSearchForm() {
      return QueryViewsSearchForm.__super__.constructor.apply(this, arguments);
    }

    QueryViewsSearchForm.prototype.template = _.template('\
            <form id=data-filters-search class=form-search action=>\
                <input type=text class=search-query placeholder=Search>\
            </form>\
        ');

    QueryViewsSearchForm.prototype.events = {
      'keyup input': 'autocomplete',
      'submit': 'search'
    };

    QueryViewsSearchForm.prototype.initialize = function() {
      return this.setElement(this.template());
    };

    QueryViewsSearchForm.prototype.autocomplete = function() {};

    QueryViewsSearchForm.prototype.search = function() {};

    return QueryViewsSearchForm;

  }