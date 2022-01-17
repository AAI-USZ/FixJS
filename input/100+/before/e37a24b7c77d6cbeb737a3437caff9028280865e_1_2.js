function(thisObject) {
                if (matchValue.Item1 instanceof Pit.FSharp.Collections.SetTree1.SetEmpty) {
                    return (function(thisObject) {
                        if (matchValue.Item2 instanceof Pit.FSharp.Collections.SetTree1.SetEmpty) {
                            return 0;
                        } else {
                            return -1;
                        }
                    })(thisObject);
                } else if (matchValue.Item2 instanceof Pit.FSharp.Collections.SetTree1.SetEmpty) {
                    return 1;
                } else {
                    return Pit.FSharp.Collections.SetTreeModule.compareStacks(comparer)(new Pit.FSharp.Collections.FSharpList1.Cons(s1, new Pit.FSharp.Collections.FSharpList1.Empty()))(new Pit.FSharp.Collections.FSharpList1.Cons(s2, new Pit.FSharp.Collections.FSharpList1.Empty()));
                }
            }