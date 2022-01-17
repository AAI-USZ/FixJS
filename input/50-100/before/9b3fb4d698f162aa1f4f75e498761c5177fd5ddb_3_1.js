function () {
           _.bindAll(this, 'render', 'appendWorkingPoint', 'phoneNumbersPoolChanged','getWorkingPoints');
           this.phoneNumbersPool = new PhoneNumbersPool();
           checkedPhoneNumbers = this.phoneNumbersPool;
           this.phoneNumbersPool.bind("add", this.appendWorkingPoint, this);
           this.phoneNumbersPool.bind("reset", this.render);
           //this.phoneNumbersPool.bind("remove", this.phoneNumbersPoolChanged, this);           
        }