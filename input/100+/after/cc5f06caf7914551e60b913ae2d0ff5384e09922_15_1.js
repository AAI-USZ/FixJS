function () {
            var editMapView = new EditMapView({ el: '#location-fieldset', model: this.model });
            this.map.attachView(editMapView);
            editMapView.render();

            var editMediaView = new EditMediaView({ el: '#media-resources-fieldset', model: this.model });
            this.media.attachView(editMediaView);
            editMediaView.render();

            this.observedOnDatePicker = this.$el.find('#ObservedOn').datepicker();

            this.categoryListSelectView = this.$el.find("#Category").multiSelect({
                selectAll: false,
                singleSelect: true,
                noOptionsText: 'No Categories',
                noneSelected: '<span>Select Category</span>',
                oneOrMoreSelected: function (selectedOptions) {
                    var $selectedHtml = $('<span />');
                    _.each(selectedOptions, function (option) {
                        $selectedHtml.append('<span>' + option.text + '</span> ');
                    });
                    return $selectedHtml.children();
                }
            });

            if (!ich.templates.ProjectSelectItem) {
                ich.addTemplate('ProjectSelectItem', '{{#Projects}}<option value="{{Id}}">{{Name}}</option>{{/Projects}}');
            }

            // Add project options
            this.$el.find('#Projects').append(ich.ProjectSelectItem({ Projects: app.authenticatedUser.projects.toJSON() }));

            this.projectListSelectView = this.$el.find('#Projects').multiSelect({
                selectAll: false,
                messageText: 'You can select more than one project',
                noOptionsText: 'No Projects',
                noneSelected: '<span>Select Projects</span>',
                renderOption: function (id, option) {
                    var html = '<label><input style="display:none;" type="checkbox" name="' + id + '[]" value="' + option.value + '"';
                    if (option.selected) {
                        html += ' checked="checked"';
                    }
                    var project = app.authenticatedUser.projects.get(option.value);

                    html += ' /><img src="' + project.get('Avatar').Files.thumbnail.RelativeUri + '" alt="" />' + project.get('Name') + '</label>';
                    return html;
                },
                oneOrMoreSelected: function (selectedOptions) {
                    var $selectedHtml = $('<div />');
                    _.each(selectedOptions, function (option) {
                        var project = app.authenticatedUser.projects.get(option.value);
                        $selectedHtml.append('<span class="selected-project"><img src="' + project.get('Avatar').Files.thumbnail.RelativeUri + '" alt="" />' + option.text + '</span> ');
                    });
                    return $selectedHtml.children();
                }
            });
        }