function(thisObject) {
                    if (matchValue instanceof Pit.FSharp.Collections.Generator.Step1.Yield) {
                        var res = matchValue;
                        return res;
                    } else if (matchValue instanceof Pit.FSharp.Collections.Generator.Step1.Goto) {
                        var next = matchValue.get_Item();
                        return new Pit.FSharp.Collections.Generator.Step1.Goto(Pit.FSharp.Collections.Generator.GenerateThen1.Bind({
                            Item1: next,
                            Item2: thisObject.x.cont
                        }));
                    } else {
                        return new Pit.FSharp.Collections.Generator.Step1.Goto(thisObject.x.cont());
                    }
                }