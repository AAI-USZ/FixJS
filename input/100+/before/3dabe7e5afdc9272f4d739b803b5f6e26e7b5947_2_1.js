function(){
        this.adds = [
          node({id: 1, url: "a", type: "adds"}),
          node({id: 2, url: "a", type: "adds"}),
          node({id: 3, url: "a", type: "adds"}),
        ];
        this.views = [
          [],
          [node({id: 4, type: "views"})],
          [node({id: 5, type: "views"})],
        ];
        this.pinches = [
          [node({id: 6, type: "pinches"})],
          [],
          [node({id: 7, type: "pinches"})],
        ];
      }