function() {
            var options = {
                    selectionOnly: true,
                    singleSelect: this.singleSelect,
                    singleSelectAction: this.singleSelectAction || 'complete',
                    allowEmptySelection: !this.requireSelection,
                    resourceKind: this.resourceKind,
                    resourcePredicate: this.resourcePredicate,
                    where: this.where,
                    orderBy: this.orderBy,
                    negateHistory: true,
                    tools: {
                        top: [{
                            name: 'complete',
                            cls: this.singleSelect && (this.singleSelectAction || 'complete'),
                            fn: this.complete,
                            scope: this
                        },{
                            name: 'cancel',
                            side: 'left',
                            publish: '/app/scene/back'
                        }]
                    }
                },
                expand = ['resourceKind', 'resourcePredicate', 'where'],
                dependentValue = this.getDependentValue();

            if (this.dependsOn && !dependentValue)
            {
                alert(string.substitute(this.dependentErrorText, [this.getDependentLabel()]));
                return false;
            }

            array.forEach(expand, function(item) {
                if (this[item])
                    options[item] = this.dependsOn // only pass dependentValue if there is a dependency
                        ? this.expandExpression(this[item], dependentValue)
                        : this.expandExpression(this[item]);
            }, this);

            options.dependentValue = dependentValue;
            options.title = this.title;

            return options;
        }