function(thisObject) {
        if (option instanceof Pit.FSharp.Core.FSharpOption1.Some) {
            var x = option.get_Value();
            return new Pit.FSharp.Collections.FSharpList1.Cons(x, new Pit.FSharp.Collections.FSharpList1.Empty());
        } else {
            return new Pit.FSharp.Collections.FSharpList1.Empty();
        }
    }