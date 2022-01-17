function () {
                    this._super(arguments);
                    this.manyToOne("manager", {key:"managerId", fetchType:this.fetchType.EAGER});
                }