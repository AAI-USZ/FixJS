function () {
           _.bindAll(this, 'render', 'appendWorkingPoint', 'getWorkingPoints');
           this.phoneNumbersPool = new WorkingPointPool();
           self.checkedPhoneNumbers = this.phoneNumbersPool;
           this.phoneNumbersPool.bind("add", this.appendWorkingPoint, this);
           this.phoneNumbersPool.bind("reset", this.render);          
        }