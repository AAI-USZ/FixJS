function() {
      it("returns a tree representing the concatenation of the elements of its parameter", function() {
        expect(noamRe.tree.makeSeq([literal_a, literal_b]).tag).toEqual(noamRe.tree.tags.SEQ);
      });

      it("represents the empty language if passed an empty array", function() {
        var regex = noamRe.tree.makeSeq([]);
        var automaton = noamRe.tree.toAutomaton(regex);
        expect(noamFsm.isLanguageNonEmpty(automaton)).toBeFalsy();
      });
    }