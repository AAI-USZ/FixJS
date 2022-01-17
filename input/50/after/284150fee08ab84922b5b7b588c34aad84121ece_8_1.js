function(){
            var pvFormat = pv.Format.number().fractionDigits(0, 2);
            
            return function(d) {
                return pvFormat.format(d);
                // pv.Format.number().fractionDigits(0, 10).parse(d));
            };
        }