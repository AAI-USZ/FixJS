function(){
    deepEqual($('#DataFormat_0').to_json(), {
      a: 'a',
      b: 'b'
    }, '{a:"a", b:"b"}');
    
    deepEqual($('#DataFormat_1').to_json(), {
      a: {
        b: 'a.b'
      }
    }, 'a:{b:"a.b"}');
    
    deepEqual($('#DataFormat_2').to_json(), {
      a: ['1', '2']
    }, 'a:["1", "2"]');
    
    deepEqual($('#DataFormat_3').to_json(), {
      a: {
        b: ['1', '2']
      },
      c: 'c'
    }, 'a:{b:["1", "2"]}, c: "c"');
    
    deepEqual($('#DataFormat_4').to_json(), {
      a: [{b: 'b'}, {c: ['1']}, {c: ['2']}]
    }, "a: [{b: 'b'}, {c: ['1']}, {c: ['2']}]");
  }