function () {
                    this._super(arguments);
                    this.oneToMany("staff", {key:"managerid", fetchType:this.fetchType.EAGER});
                }