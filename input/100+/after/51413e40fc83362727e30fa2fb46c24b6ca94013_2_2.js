function ReservedInstance(id, type, az, start, duration, fPrice, uPrice, rPrices, count, desc, state, tenancy)
{
    this.id = id;
    this.instanceType = type;
    this.azone = az;
    this.startTime = start;
    this.start = start.strftime('%Y-%m-%d %H:%M:%S');
    this.duration = duration;
    this.fixedPrice = fPrice;
    this.usagePrice = uPrice;
    this.recurringCharges = rPrices;
    this.count = count;
    this.productDescription = desc;
    this.state = state;
    this.tenancy = tenancy

    this.toString = function() {
        return this.instanceType  + fieldSeparator + this.fixedPrice + fieldSeparator +  this.recurringCharges + fieldSeparator + this.id;
    }
}