function WorkingPointsArea() {
    var self = this;
    var WorkingPoint = Backbone.Model.extend({
       defaults: {
          TelNumber: "defaultNumber",
          Name: "defaultNumber",
          Description: "defaultDescription",
          CheckedStatus: true
        },              
        idAttribute: "TelNumber"     
     });

    var WorkingPointPool = Backbone.Collection.extend({
       model: WorkingPoint,    
       url: function () {
          return "Messages/WorkingPointsPerUser";
       }
    });

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
     };

    self.checkedPhoneNumbersArray = [];

    var WorkingPointView = Backbone.View.extend({
        model: WorkingPoint,
        tagName: "span",
        phoneNumberTemplate: _.template($('#phoneNumber-template').html()),
        events: {
            "click ": "triggerFiltering"
        },
        initialize: function () {
           _.bindAll(this, 'render', 'triggerFiltering');
            this.model.bind('destroy', this.unrender, this);
            return this.render;
        },
        render: function () {
           this.$el.html(this.phoneNumberTemplate(this.model.toJSON()));
           this.$el.addClass("phoneNumber");
           this.$el.addClass("phoneNumberSelected");
           return this;
        },
        unrender: function () {
            this.$el.remove();
        },
        deletePhoneNumber: function () {
            this.model.destroy();
        },
        triggerFiltering: function () {           
           //only perform the changes if we have more than 1 number selected
           var counterForAlreadySelectedNumbers = 0;
           _.each(self.checkedPhoneNumbers.models, function (wp) {
              if (wp.get('CheckedStatus') === true) {
                 counterForAlreadySelectedNumbers++;
              }
           });
           if ((this.model.attributes.CheckedStatus && counterForAlreadySelectedNumbers >= 2) || !this.model.attributes.CheckedStatus) {
              //change the checkedStatus
              this.model.attributes.CheckedStatus = !this.model.get('CheckedStatus');
              var checkboxImg = $("img", this.$el);

              if (this.model.get('CheckedStatus') === true) {
                 this.$el.removeClass('phoneNumberUnselected');
                 this.$el.addClass('phoneNumberSelected');
                 setCheckboxState(checkboxImg, true);
              }
              else {
                 this.$el.removeClass('phoneNumberSelected');
                 this.$el.addClass('phoneNumberUnselected');

                 setCheckboxState(checkboxImg, false);
              }
              //make sure we start from the initial view where all the phone numbers are selected
              self.checkedPhoneNumbersArray = [];
              _.each(self.checkedPhoneNumbers.models, function (wp) {
                 if (wp.get('CheckedStatus') === true) {
                    self.checkedPhoneNumbersArray.push(wp.get('TelNumber'));
                 }
              });
              $(document).trigger('selectedWPsChanged');
           }
        }
     });

    var opts = {
       lines: 13, // The number of lines to draw
       length: 7, // The length of each line
       width: 4, // The line thickness
       radius: 10, // The radius of the inner circle
       rotate: 0, // The rotation offset
       color: '#fff', // #rgb or #rrggbb
       speed: 1, // Rounds per second
       trail: 60, // Afterglow percentage
       shadow: true, // Whether to render a shadow
       hwaccel: false, // Whether to use hardware acceleration
       className: 'spinner', // The CSS class to assign to the spinner
       zIndex: 2e9, // The z-index (defaults to 2000000000)
       top: 'auto', // Top position relative to parent in px
       left: 'auto' // Left position relative to parent in px
    };
    var spinner = new Spinner(opts);

    self.checkedPhoneNumbers = null;
    var WpPoolView = Backbone.View.extend({
        el: $("#phoneNumbersPool"),
        //allConversations: null,
        initialize: function () {
           _.bindAll(this, 'render', 'appendWorkingPoint', 'getWorkingPoints');
           this.phoneNumbersPool = new WorkingPointPool();
           self.checkedPhoneNumbers = this.phoneNumbersPool;
           this.phoneNumbersPool.bind("add", this.appendWorkingPoint, this);
           this.phoneNumbersPool.bind("reset", this.render);          
        },
        getWorkingPoints: function () {
           var target = document.getElementById('phoneNumbersPool');
           spinner.spin(target);           
           this.phoneNumbersPool.fetch({
              success: function () {
                 spinner.stop();
              }
           });
        },
        render: function () {
           var selfWpPoolView = this;
           this.phoneNumbersPool.each(function (wp) {
              selfWpPoolView.appendWorkingPoint(wp);
           });            
        },
        appendWorkingPoint: function (wp) {
           var wpView = new WorkingPointView({ model: wp });
           $(this.el).append(wpView.render().el);
        }
    });
    self.wpPoolView = new WpPoolView();   
}