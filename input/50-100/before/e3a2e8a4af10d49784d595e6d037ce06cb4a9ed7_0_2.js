function() {
                    $detail.add($parent)
                        .addClass( collapsedClass )
                        .removeClass( expandedClass )
                    // Toggle parent row visibility?
                    ( this.options.obscureParent ) && $parent.toggle();
                    // this._trigger('afterHide');
                }