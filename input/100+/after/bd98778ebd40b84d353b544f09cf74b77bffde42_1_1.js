function() {
    it ('should set columns', function() {
      var bento = new Bento([1, 2, 3]);
      expect(bento.columns).toEqual([Bento.Column(1), Bento.Column(2), Bento.Column(3)])
    })
    describe('and given an array of items', function() {
      it ('should position them in columns', function() {
        var items = [{width: 100, height: 150}, {width: 100, height: 125}, {width: 100, height: 200}, {width: 100, height: 100}, {width: 100, height: 100}];
        var bento = new Bento([ 100, 100, 100 ], items);
        expect(bento.items[0].column).toBe(bento.columns[0]);
        expect(bento.items[1].column).toBe(bento.columns[1]);
        expect(bento.items[2].column).toBe(bento.columns[2]);
        expect(bento.items[3].column).toBe(bento.columns[1]);
        expect(bento.items[4].column).toBe(bento.columns[0]);
        expect(bento.columns[0].height).toEqual(250)
        expect(bento.columns[1].height).toEqual(225)
        expect(bento.columns[2].height).toEqual(200)
        bento.setColumns([ 100, 100, 100, 100 ])
        expect(bento.columns[0].height).toEqual(150)
        expect(bento.columns[1].height).toEqual(125)
        expect(bento.columns[2].height).toEqual(200)
        expect(bento.columns[2].height).toEqual(200)
        expect(bento.items[0].column).toBe(bento.columns[0]);
        expect(bento.items[1].column).toBe(bento.columns[1]);
        expect(bento.items[2].column).toBe(bento.columns[2]);
        expect(bento.items[3].column).toBe(bento.columns[3]);
        expect(bento.items[4].column).toBe(bento.columns[3]);
        bento.setColumns([ 100, 100, 100])
        expect(bento.items[0].column).toBe(bento.columns[0]);
        expect(bento.items[1].column).toBe(bento.columns[1]);
        expect(bento.items[2].column).toBe(bento.columns[2]);
        expect(bento.items[3].column).toBe(bento.columns[1]);
        expect(bento.items[4].column).toBe(bento.columns[0]);
        bento.push({width: 100, height: 100})
        expect(bento.items[5].column).toBe(bento.columns[2]);
        bento.push({width: 100, height: 100})
        expect(bento.items[6].column).toBe(bento.columns[1]);
      })
      
      describe('and some items only fit wide columns', function() {
        it ('should position them in right columns', function() {
          var items = [{width: 100, height: 150}, {width: 100, height: 125}, {width: 150, height: 200}, 
                       {width: 140, height: 100}, {width: 100, height: 100}, {width: 100, height: 100}];
          var bento = new Bento(0.25, [ 100, 150, 100 ]             , {
            'move_wide_images_to_biggest_column': {
              ratio: [1, 3],
              size: 2
            },
            'move_narrow_images_to_smallest_column': {
              ratio: [0, 1],
              size: -.1
            },
          }, items);
          expect(bento.maxWidth).toBe(150);
          expect(bento.minWidth).toBe(100);
          expect(bento.items[0].column).toBe(bento.columns[0]);
          expect(bento.items[1].column).toBe(bento.columns[2]);
          expect(bento.items[2].column).toBe(bento.columns[1]);
        })
      })
      
      describe('and items are overly large sized', function() {
        it ('should downscale items: portait items take smallest columns, landspace take widest', function() {
          var items = [{width: 768, height: 1024}, {width: 1024, height: 768}, {width: 512, height: 384},
                       {width: 768, height: 1024}, {width: 1024, height: 768}, {width: 512, height: 384}];
          var bento = new Bento([300, 200, 100], {
            'move_wide_images_to_biggest_column': {
              ratio: [1, 3],
              size: 2
            },
            'move_narrow_images_to_smallest_column': {
              ratio: [0, 1],
              size: -.1
            },
          }, items);
          expect(bento.items[0].column).toBe(bento.columns[2]);
          expect(bento.items[1].column).toBe(bento.columns[0]);
          expect(bento.items[2].column).toBe(bento.columns[1]);
          expect(bento.items[3].column).toBe(bento.columns[2]);
          expect(bento.items[4].column).toBe(bento.columns[1]);
          expect(bento.items[5].column).toBe(bento.columns[0]);
        })
      })
    });
    describe('when a composition creates long holes that a single image cant fill', function() {
      it ('should fill hole with multiple images', function() {
        var items = [{width: 200, height: 800}, {rating: 0.9, width: 400, height: 200}, {width: 200, height: 200}, {width: 200, height: 200}, {width: 200, height: 200}, {width: 200, height: 200}]
        var bento = new Bento([200, 200], {
          'span_popular_images': {
            rating: [0.5, 1],
            span: 2
          }
        }, items);
        expect(bento.columns[0].height).toBe(1000);
        expect(bento.columns[1].height).toBe(1000);
        expect(bento.items[0].column).toBe(bento.columns[0]);
        expect(bento.items[1].column).toBe(bento.columns[0]);
        expect(bento.items[2].column).toBe(bento.columns[1]);
        expect(bento.items[3].column).toBe(bento.columns[1]);
        expect(bento.items[4].column).toBe(bento.columns[1]);
        expect(bento.items[5].column).toBe(bento.columns[1]);
        expect(bento.items.map(function(item) { 
          return item.offsetTop;
        })).toEqual([0, 0, 0, 0, 0, 0])
      })
      describe('and a hole is after another image that spans', function() {
        it ('should fill hole with multiple images', function() {
          var items = [{rating: 0.9, width: 400, height: 200}, {width: 200, height: 800}, {rating: 0.9, width: 400, height: 200}, {width: 200, height: 200}, {width: 200, height: 200}, {width: 200, height: 200}, {width: 200, height: 200}]
          var bento = new Bento([200, 200], {
            'span_popular_images': {
              rating: [0.5, 1],
              span: 2
            }
          }, items);
          expect(bento.columns[0].height).toBe(1200);
          expect(bento.columns[1].height).toBe(1200);
          expect(bento.items[0].column).toBe(bento.columns[0]);
          expect(bento.items[1].column).toBe(bento.columns[0]);
          expect(bento.items[2].column).toBe(bento.columns[0]);
          expect(bento.items[3].column).toBe(bento.columns[1]);
          expect(bento.items[4].column).toBe(bento.columns[1]);
          expect(bento.items[5].column).toBe(bento.columns[1]);
          expect(bento.items[6].column).toBe(bento.columns[1]);
          expect(bento.items.map(function(item) { 
            return item.offsetTop;
          })).toEqual([0, 0, 0, 200, 0, 0, 0])
          //expect(bento.items[0].getDependent()).toEqual([bento.items[1], bento.items[3]])
        });
      })
    })
    describe('when item is set to span between multiple columns', function() {
      it ('should take space in both columns and fill holes', function() {
        var items = [{width: 200, height: 750},  {width: 1024, height: 768}, {width: 200, height: 300}, 
                     {width: 800, height: 600}, {width: 1024, height: 768}, {width: 100, height: 200}, 
                     {width: 100, height: 200}, {width: 50, height: 100}];
        var bento = new Bento([200, 300, 200], {
          'span_wide_images': {
            ratio: [1, 3],
            span: 2
          }
        }, items);
        expect(bento.items[0].column).toBe(bento.columns[0]);
        expect(bento.items[1].column).toBe(bento.columns[1]);
        expect(bento.items[1].width * bento.items[1].scale).toBe(500);
        expect(bento.items[1].height * bento.items[1].scale).toBe(375)
        expect(bento.items[2].column).toBe(bento.columns[1]);
        expect(bento.items[2].width * bento.items[2].scale).toBe(300);
        expect(bento.items[2].height * bento.items[2].scale).toBe(450)
        expect(bento.items[3].column).toBe(bento.columns[1]);
        expect(bento.items[4].column).toBe(bento.columns[1]);
        expect(bento.items[5].column).toBe(bento.columns[2]);
        expect(bento.items[5].width * bento.items[5].scale).toBe(200)
        expect(bento.items[5].height * bento.items[5].scale).toBe(400)
        expect(bento.items[6].column).toBe(bento.columns[0])
        expect(bento.items[6].height * bento.items[6].scale).toBe(400)
        expect(bento.items[6].width * bento.items[6].scale).toBe(200)
        expect(bento.items[7].column).toBe(bento.columns[0])
        expect(bento.columns.map(function(c) {
          return !c.holes || !c.holes.length
        })).toEqual([true, true, true])
        expect(bento.columns.map(function(c) {
          return c.height
        })).toEqual([1550, 1575, 1575])
      })
    })
    
    describe('and there is no space on the right to span', function() {
      it ('should span to the left and then fill holes', function() {
        var items = [{width: 50, height: 100}, {width: 50, height: 150}, {width: 50, height: 200}, 
                     {width: 200, height: 50}, {width: 50, height: 60}, {width: 200, height: 50}];
        var bento = new Bento([100, 100, 100], {
          'span_wide_images': {
            ratio: [1, 5],
            span: 2
          }
        }, items);
        expect(bento.items[0].column).toBe(bento.columns[0])
        expect(bento.items[1].column).toBe(bento.columns[1])
        expect(bento.items[2].column).toBe(bento.columns[2])
        expect(bento.items[3].column).toBe(bento.columns[1])
        expect(bento.items[4].column).toBe(bento.columns[0])
        expect(bento.items[5].column).toBe(bento.columns[0])
        expect(Math.floor(bento.items[4].height * bento.items[4].scale)).toBe(100)
        expect(Math.floor(bento.items[4].width * bento.items[4].scale)).toBe(83)
        expect(bento.columns.map(function(c) {
          return c.height
        })).toEqual([400, 400, 400])
        expect(bento.columns.map(function(c) {
          return !c.holes || !c.holes.length
        })).toEqual([true, true, true])
      })
    })
    
    describe('and column height is limited', function() {
      it ('should not let column overflow', function() {
        var items = [{width: 100, height: 100}, {width: 100, height: 100}, {width: 100, height: 100}
                     ,{width: 100, height: 200}, {width: 100, height: 100}, {width: 100, height: 100}
                     , {width: 100, height: 100}, {width: 100, height: 100}
                     ];
        var bento = new Bento([[100, 250], [100, 300], [100, 200]], {
          
        }, items)
        expect(bento.items[0].column).toBe(bento.columns[0])
        expect(bento.items[1].column).toBe(bento.columns[1])
        expect(bento.items[2].column).toBe(bento.columns[2])
        expect(bento.items[3].column).toBe(bento.columns[1])
        expect(bento.items[4].column).toBe(bento.columns[2])
        expect(bento.items[5].column).toBe(bento.columns[0])
        expect(bento.items[6].column).toBe(bento.columns[0])
        expect(bento.items[7].column).toBeUndefined()
      })
    });
  }