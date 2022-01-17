function(thisObject) {
        if (option instanceof Pit.FSharp.Core.FSharpOption1.Some) {
            var x = option.get_Value();
            return Pit.FSharp.Collections.ListModule.OfArray([x]);
        } else {
            return new Pit.FSharp.Collections.FSharpList1.Empty();
        }
    }