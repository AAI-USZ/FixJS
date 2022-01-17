function () {
                    this._super(arguments);
                    this.manyToOne("manager", {key:"managerid", fetchType:this.fetchType.EAGER});
                }