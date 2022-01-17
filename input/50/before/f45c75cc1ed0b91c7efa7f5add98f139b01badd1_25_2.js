function () {
                    this._super(arguments);
                    this.oneToMany("staff", {key:"managerId", fetchType:this.fetchType.EAGER});
                }