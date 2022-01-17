function LeaseOffering(id, type, az, duration, fPrice, uPrice, rPrices, desc, offering, tenancy)
{
    this.id = id;
    this.instanceType = type;
    this.azone = az;
    this.duration = duration;
    this.fixedPrice = fPrice;
    this.usagePrice = uPrice;
    this.recurringCharges = rPrices;
    this.productDescription = desc;
    this.offeringType = offering;
    this.tenancy = tenancy;

    this.toString = function() {
        return this.id
    }
}