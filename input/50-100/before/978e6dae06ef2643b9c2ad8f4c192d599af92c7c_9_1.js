function (value) {

                        var threshold = 14,

                            formattedValue = this.formatValue(value),

                            result = (formattedValue > threshold) || (this.fieldValue && this.fieldValue <= threshold);



                        this.fieldValue = value;



                        return result;

                    }