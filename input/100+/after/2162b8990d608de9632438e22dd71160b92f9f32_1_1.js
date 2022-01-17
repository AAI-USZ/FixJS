function() {
      var data, old, result;
      data = this.data_func();
      if (this.finder.target && this.finder.target.__ko_mapping__) {
        old = ko.utils.unwrapObservable(this.finder.target);
        if (_.isUndefined(old) || (old && data && !_.isArray(old) && !_.isArray(data) && this.mapping.key(old) !== this.mapping.key(data))) {
          this.finder.target(ko.utils.unwrapObservable(ko.mapping.fromJS(data, this.mapping)));
        } else {
          ko.mapping.fromJS(data, this.finder.target);
        }
      } else {
        result = ko.mapping.fromJS(data, this.mapping);
        if (ko.isObservable(result)) {
          this.finder.target = result;
        } else {
          this.finder.target = ko.observable(result);
          this.finder.target.__ko_mapping__ = result.__ko_mapping__;
        }
      }
      return this.finder.target;
    }