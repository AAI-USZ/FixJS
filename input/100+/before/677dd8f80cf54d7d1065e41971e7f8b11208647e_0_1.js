function(){
  
  var k;
  var i=0;
  
  beforeEach(function(){
    i++
    k = re.c('stat'+i)
  })
  
  it('should create statics', function(){
    
    k
    .statics({
      type:10
    })
    .statics('yep', 'yep');
    
    eq(re[k.name].type, 10)
    eq(re[k.name].yep, 'yep')
  })

  it('should create a factory', function(){
    var val = 10;

    k.factory(function(ref){
      this.ref = ref;
    });

    eq(re[k.name](val).ref, val);

  });
  
  it('should add events', function(){
    k.events('mouseup', function(){})
    k.events({
      mousedown:function(){}
    });
    
    is(k._re_events.mouseup)
    is(k._re_events.mousedown)
    
  })
  
  it('should requires', function(){
    k
    .requires('test test2');
    
    contains(k._re_requires, 'test')
    contains(k._re_requires, 'test2')
    
    k.requires(['test3'])
    contains(k._re_requires, 'test3')
  })
  
  it('should asserts', function(){
    k
    .asserts('bob');
    
    contains(k._re_asserts, 'bob')
  })
  
  it('should interfaces', function(){
    k
    .interfaces('bob');
    
    contains(k._re_interfaces, 'bob')
  })
  
  it('should alias', function(){
    
    k
    .statics('bob', 'bob')
    .alias('bob');
    
    ok(re.c('bob') == k)
  })
  
  it('should on', function(){
    k
    .off('test')
  })
  
  it('should trigger', function(){
    k
    .trigger('test')
  })
  
  it('should bind', function(){
    
    k
    .on('init', function(){})
  })

  it('should defaults', function(){
   k
    .defaults({
      ok:1,
      ok2:2
    })
    .defaults('ok3', 3);
    
    ok(k._re_defaults['ok3'] == 3)
    ok(k._re_defaults['ok2'] == 2)
    ok(k._re_defaults['ok'] == 1)
  })
  
  it('should namespaces', function(){
    var k = re.c('stat')
    .namespaces({
      ok:1,
      ok2:2
    })
    .namespaces('ok3', 3);
    
    ok(k._re_defines['stat_ok3'] == 3)
    ok(k._re_defines['stat_ok2'] == 2)
    ok(k._re_defines['stat_ok'] == 1)
    
  })
  
  it('should defines', function(){
    k
    .defines({
      b:1,
      b2:2
    })
    .defines('b3', 3);
    
    ok(k._re_defines['b3'] == 3)
    ok(k._re_defines['b2'] == 2)
    ok(k._re_defines['b'] == 1)
  })
  
  it('should init', function(){
    var fun = function(){
      
    }
    k.init(fun)
    
    ok(k._re_init == fun)
  })
  
  it('should dispose', function(){
    var fun = function(){
      
    }
    k.dispose(fun)
    
    ok(k._re_dispose == fun)
    
  })
  
  it('should lock', function(){
    k.lock()
    
    ok(k._re_final)
  })
  
  it('should run', function(){
    k.run(function(){
      ok(this == k)
    })
  })
  
}