function() {
      it("returns a tree representing the concatenation of the elements of its parameter", function() {
        expect(noamRe.tree.makeSeq([literal_a, literal_b]).tag).toEqual(noamRe.tree.tags.SEQ);
      });
    }