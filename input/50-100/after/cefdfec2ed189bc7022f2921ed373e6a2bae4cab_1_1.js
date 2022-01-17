function () {
            var div = DOM.create("<div><span></span>1<span></span></div>");
            DOM.append(div, "body");
            var cs = div.childNodes;

            expect(DOM.siblings(cs[2]).length).toBe(1);
            expect(DOM.siblings(cs[2], undefined, 1).length).toBe(2);

            DOM.remove(div);
        }