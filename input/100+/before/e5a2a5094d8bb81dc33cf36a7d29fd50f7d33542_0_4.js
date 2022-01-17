function () {
  'use strict';
  var Bloom = {
    version: '1.2.0'
  };
  
  MetaHub.import_all(); 
  MetaHub.current_module = Bloom;
  
  var Ground = {
    dirt: {},
    add: function(type, names, fertilizer) {
      Ground.dirt[type] = {
        fertilizer: fertilizer,
        names: names
      };
    },
    fertilize: function(onfinished) {
      Ground.load_finished = onfinished;
      for (var type in Ground.dirt) {
        for (var x = 0; x < Ground.dirt[type].names.length; x++) {
          Ground.dirt[type].fertilizer(Ground.dirt[type].names[x]);
        }
      }
    },
    till: function(type, name) {
      if (Ground.dirt[type] && Ground.dirt[type].names.indexOf(name) > -1) {
        //        console.log('updating ' + name);
        Ground.dirt[type].names.splice(Ground.dirt[type].names.indexOf(name), 1);
        if (Ground.is_empty()) {
          //          console.log('finished');
          if (typeof Ground.load_finished == 'function') {
            Ground.load_finished();
            delete Ground.load_finished;
          }

          Ground.dirt = {};
        }
      }
    },
    is_empty: function() {
      for (var x in Ground.dirt) {
        if (Ground.dirt[x].names.length > 0)
          return false;
      }
    
      return true;
    }
  };
  Bloom.Ground = Ground;
  
  function Block(name, html) {
    this.name = name;
    Block.library[name] = this;
    if (html != null)
      this.html = html;
    else
      this.html = '';
  }
  Bloom.Block = Block;
  
  Block.library = {}
  Block.default_extension = '.html';
  Block.source_path = "";
  Block.use_alert = false;
      
  Block.load = function (name, onload) {
    var block = Block.library[name];
    
    if (!block) {
      block = new Block(name);
      block.queue = [];
      
      jQuery.ajax({
        url: Block.source_path + "/" + name + Block.default_extension,
        success: function(seed) {
          block.html = seed;
          for (var x = 0; x < block.queue.length; x++) {
            block.queue[x](block);
          }   
          delete block.queue;
          Ground.till('block', name);
        },
        error: function(jqXHR, text, error) {
          var message = 'Could not load ' + name + Block.default_extension + '.';
          delete Block.library[name];
          if (Block.use_alert) {
            alert(message);
          }
          console.log(message);
          Ground.till('block', name);
        }
      });
      
      if (typeof onload == 'function') {
        block.queue.push(onload);
      }
    }
    else if (typeof onload == 'function') {
      if (block.html == '') {
        block.queue.push(onload);
      }
      else {
        onload(block);
        return;
      }
    }      
  }
  
  Block.generate = function(name, seed) {
    return Block.library[name].generate(seed);
  }
   
  Block.prototype = {
    constructor: Block,
    name: '',
    html: '', 

    generate: function(control) {
      var output = this.html;
      
      output = output.replace(/@{([\W\w]*?)}(?=\s*(?:<|"))/gm, function(all, code) {
        var result = eval(code);
        if (typeof result === "undefined" || result == null)
          return '';
      
        return result;
      });
      
      var result = $(output);
      return result;
    }
  }
  
  var Flower = Meta_Object.sub_class('Flower', {
    data_process: null,
    initialize: function() {
      
      for (var x = 0; x < arguments.length; ++x) {
        var argument = arguments[x];
        if (argument != null) {
          if (typeof argument == 'string'){
            this.element = jQuery(argument);
          }
          else if (typeof argument == 'function'){
            this.__create_finished = argument;
          }
          else if (argument.jquery) {
            this.element = argument;
          }
          else if (typeof argument == 'object') {
            if (typeof this.data_process == 'function')
              this.seed = this.data_process(argument);
            else
              this.seed = argument;
            
            if (this.seed.is_meta_object) {
              this.connect(this.seed, 'seed', 'flower');
            }
          }
        }
      }
      
      if (!this.element && this.block) {
        // Don't pass onload to render() because if one was provided to create(), it will
        // be handled later.
        this.render();
      }
      else {
        this.source_to_element();
      }
      
      this.listen(this, 'disconnect-all', function() {
        if (this.element) {
          this.element.remove();
          this.element = null;
        }
      });
    },
    render2: function() {
      if (this.block) {
        if (!Block.library[this.block])
          throw new Error(this.block + 'was not yet loaded!');
        this.element = Block.generate(this.block, this);
      }
    },
    render: function(onload) {
      var self = this;
   
      Block.load(this.block, function(block) {
        self.element = block.generate(self);
        if (self.element.length == 0) {
          throw new Error('self.element is empty!');
        }
        self.source_to_element();
        //        Meta_Object.resume_initialization(self);
        if (typeof onload == 'function')
          onload(self);        
      });
    },
    listen_to_element: function(event, method) {
      var self = this;
      
      this.element.bind(event, function() {
        method.apply(self, arguments);
      })
    },
    bind: function(event, method) {
      var self = this;
      
      this.element.bind(event, function() {
        method.apply(self, arguments);
      })
    },
    get_data: function() {
      var args = Array.prototype.slice.call(arguments);
      var method = args.pop();
      jQuery.get(args, function() {
        var args = Array.prototype.slice.call(arguments);
        args.push('json');
        method.apply(this, args);
      });
    },
    plant: function(url) {      
      jQuery.post(url, this.seed, function(response) {
        if (!response.result) {
          Bloom.output('There was a problem communicating with the server.');
          return;
        }
        if (response.result.toLowerCase() == 'success') {
          this.invoke('plant.success', response);
        }
        else
          this.invoke('plant.error', response);        
      });    
    },
    click: function(action, meta_object) {
      if (!meta_object) {
        meta_object = this;
      }
      this.element.click(function(event) {
        event.preventDefault();        
        action.call(meta_object, event);
      });
    },
    drag: function(data) {
      var scope, element = this.element;
      
      if (data.within_bounds)
        scope = element;
      else
        scope = $(document);
      
      var mousemove = function(event) {
        data.moving.call(data.owner, event);
        event.preventDefault();
      };
      var mouseup = function(event) {
        event.bubbles = false;
        $(document).unbind('mouseup', mouseup);
        scope.unbind('mousemove', mousemove);        
        if (typeof finished == 'function') {
          data.finished.call(data.owner, event);
        }
      };
      element.mousedown(function(event) {
        if (typeof data.can_move == 'function' && !data.can_move(event)) {
          return;
        }
        
        scope.mousemove(mousemove);
        $(document).mouseup(mouseup);
        event.bubbles = false;
        event.preventDefault();
      });
    },
    source_to_element: function(){    
      if (!this.element)
        return;
      
      var value;
      var self = this;
      
      this.element.find('*[bind]').each(function() {
        var element = $(this);
        var bind = element.attr('bind');
        if (self.hasOwnProperty(bind)) {
          if (typeof self[bind] == 'function') {
            value = self[bind].apply(self);
          }
          else {
            value = self[bind]; 
          }
          Flower.set_value(element, value);
        }
      });    
      
      if (!this.seed)
        return;
      
      for (var name in this.seed) {
        var element = this.element.find('#' + name + ', .' + name + ', [bind=' + name + ']').first();
        if (element.length == 1) {
          var property = this.seed[name];
          if (typeof property == 'function') {
            value = property.apply(this.seed);
          }               
          else {
            value = property; 
          }
          
          if (typeof value != 'object') {
            Flower.set_value(element, value);
          }
        }
      }      
    },
    element_to_source: function(){            
      for (var name in this.seed) {
        var element = this.element.find('#' + name + ', .' + name + ', [bind=' + name + ']').first();
        if (element.length == 1) {          
          if (typeof this.seed[name] != 'function' && Flower.is_input(element)) {
            this.seed[name] = element.val();
          }          
        }
      }      
    },
    graft: function(selector, other) {
      var element = this.element.find(selector);
      this.listen(other, 'change', function(value) {
        Flower.set_value(element, value);
      });
      
      Flower.set_value(element, other.value);
    },
    update: function(test) {    
      var self = this;
      if (this.query == undefined) {
        return;
      }
      
      var query = this.query();      
      if (!query) {
        return;
      }
      
      Bloom.get(query, function(response) {
        var seed;
        if (self.seed_name == null || self.seed_name == '')
          seed = response;
        else
          seed = response[self.seed_name];
        
        self.invoke('update', seed, response);
        if (test) {
          start();  
        }
      });
    },
    // Returns a url string to the service from which this object receives its data.
    //    query: function() {},
    // Name of the property of the query response that contains the actual object data.
    seed_name: 'seed'
  });
    
  Flower.set_value = function(element, value) {
    if (Flower.is_input(element))
      element.val(value);
    else
      element.html(value);
  };
    
  //  Flower.initialize_methods = function(object, types, args) {      
  //    if (this.properties.hasOwnProperty('initialize')) {
  //      types.push(this);
  //    }
  //      
  //    if (this.parent) {
  //      types = this.parent.initialize_methods(object, types, args);        
  //    }
  //        
  //    var result = this.initialize_queue(object, types, args);   
  //    if (object.type == this) {
  //      for (var x = 0; x < args.length; x++) {
  //        if (typeof args[x] == 'function') {
  //          args[x](object);
  //          break;
  //        }
  //      }
  //    }
  //    
  //    return result;
  //  };
    
  Flower.is_input = function(element) {
    if (element.length == 0)
      return false;
    var name = element[0].nodeName.toLowerCase();
    return name == 'input' || name == 'select' || name == 'textarea';
  };  
  
  new Block('list', '<ul></ul>');
  
  var List = Flower.sub_class('List', {
    item_type: null,
    pager: null,
    initialize: function(){
      this.listen(this, 'update', this.on_update);
      this.listen(this, 'connect.child', function(item) {       
        var line;
        if (item.element[0].nodeName.toLowerCase() == 'li') {
          line = item.element;
        }
        else {
          line = jQuery('<li></li>');
          line.append(item.element);
        }
        this.element.append(line);                
      });
      
      this.listen(this, 'disconnect.child', this.remove_element);      
    },
    process_connect: function(other, type, other_type) {
      if (type == 'child' && this.contains_flower(other))
        return false;
    },
    on_update: function(seed){
      var self = this;
      this.seed = seed;
      
      // Catch it early
      if(!this.element) {
        throw Error('element is null!');  
      }
      
      this.empty();
      
      if (this.item_type) {
        var block = this.item_type.get_instance_property('block');
        if (block) {
          Block.load(this.item_type.get_instance_property('block'), function() {
            self.load();
          });
        }
        else {
          this.load();
        }
      }
    },
    load: function() {
      this.populate(this.seed);
      this.invoke('updated');
    },
    load_item: function(seed) {
      return this.item_type.create(seed);
    },
    contains_flower: function(flower) {
      return this.element.has(flower.element[0]).length > 0;
    },
    add_button: function(html, click) {
      var row = $('<li>' + html + '</li>');
      this.element.append(row); 
      if (click)
        row.find('a').click(click);
    },
    empty: function() {
      this.disconnect_all('child');
      this.element.empty();
    },
    add: function(item) {
      this.connect(item, 'child', 'parent');      
      return item;
    },
    remove: function(item) {
      if (item.element && item.element.parent() == this || 
        (item.element.parent() && item.element.parent().parent() == this)) {
        item.element.detach();
      }
      this.disconnect(item);    
    },
    remove_element: function(item) {
      if (item.element) {
        if (item.element.parent()[0] == this.element[0]) {
          item.element.detach();

        } else if (item.element.parent() && item.element.parent().parent()[0] == this.element[0]) {
          var temp = item.element.parent();
          item.element.detach();
          temp.remove();
        }
      }
    },
    add_seed_child: function(item) {
      this.add(this.load_item(item));
    },
    populate: function(seed) {
      for (var x = 0; x < seed.length; ++x) {
        this.add_seed_child(seed[x]);
      }
    },
    watch_seed: function(child_name, seed) {
      if (seed !== undefined) {
        this.seed = seed;
      }
      
      if (typeof child_name != 'string') {
        child_name = 'child';
      }
      
      this.listen(this.seed, 'connect.' + child_name, function(item) {
        this.add_seed_child(item);
      });
      
      this.listen(this.seed, 'disconnect.' + child_name, function(item) {
        var children = this.get_connections('child');
        
        for (var x = 0; x < children.length; x++) {
          if (children[x].seed === item) {
            this.disconnect(children[x]);
            return;
          }
        }
      });
      
      var children = this.seed.get_connections(child_name);      
      this.populate(children);
    //      for (var x in children) {
    //        this.add_seed_child(children[x]);
    //      }
    },
    children: function() {
      return this.get_connections('child');
    }
  });
  
  var Dialog = Flower.sub_class('Dialog', {
    active: false,
    width: 340,
    height: 500,
    options: {},
    title: 'Dialog',
    modal: true,
    resizable: true,
    initialize: function() {
      var self = this;
            
      this.element.find('input[type=button]').click(function(e){
        e.preventDefault();        
        var button = $(this);
        var action;
        if (button.attr('action'))
          action = button.attr('action');
        else
          action = button.val().toLowerCase();
        
        if (action == 'submit') {
          if (typeof self.validate == 'function') {
            if (!self.validate())  {
              return;
            }
          }
        }
        
        self.invoke(action);
        self.invoke('button');
      });
      
      this.listen(this, 'submit', function(){   
        self.element_to_source();        
        self.close();
      });
            
      this.listen(this, 'update', function(seed) {                     
        if (!self.active) {
          self.show();         
          self.active = true;
        }    
      });
      
      this.options = {
        title: this.title,
        width: this.width,
        height: this.height,
        modal: true,
        resizable: this.resizable,
        close: function() {
          self.element.remove();
          // This is going to cause problems down the line and should eventually be done differently.
          $(window).unbind();
          self.invoke('close');
        }     
      };
    },
    bind_output: function(element, action) {
      var old_output = Bloom.output;
      Bloom.output = action;
      this.listen(this, 'close', function() {
        Bloom.output = old_output;
      });
    },
    show: function() {
      if (!this.modal)
        return;
            
      var self = this;
            
      if (this.element.parent().length == 0)
        jQuery('body').append(this.element);
      
      //      if (this.seed && this.seed.title)
      //        this.title = this.seed.title;
      
      this.dialog = this.element.dialog(this.options);
      
      $(window).keydown(function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
      
      this.invoke('show');
    },
    close: function(){
      if (this.modal)
        this.dialog.dialog('close');        
    },
    query: function() {}
  
  });
    
  var Pager = Flower.sub_class('Pager', {
    block: 'pager',
    page: 0,
    rows:10,
    page_size: 5,
    text_filter: '',
    list: null,
    initialize: function(list) {
      var self = this;
      this.list = list;
      this.connect(list, 'list', 'pager');
      this.listen(this, 'update', this.on_update);
      
      this.prev = this.element.find('.prev');
      this.prev.click(function() {
        if (!self.at_beginning()) {
          --self.page;
          list.update();
        }        
      });
      
      this.next = this.element.find('.next');
      this.next.click(function() {
        if (!self.at_end()) {
          ++self.page;
          list.update();
        }        
      });    
      
      this.filter = this.element.find('.filter');
      this.filter.change(function() {
        self.text_filter = $(this).val();
        list.update();
      });
      
      this.filter.keyup(function(e) {
        //   if (e.keyCode == 13) {
        e.preventDefault();
        self.text_filter = $(this).val();
        list.update();     
      //  }
      });    
      
      this.listen(list, 'update', function(seed, response) {
        this.rows = response.total;
        if (this.at_beginning())
          this.prev.fadeTo(100, 0.3);
        else
          this.prev.fadeTo(100, 1);
        
        if (this.at_end())
          this.next.fadeTo(100, 0.3);
        else
          this.next.fadeTo(100, 1);
        
        this.invoke('has-total', this.rows);
      });

      this.prev.fadeTo(0, 0);
      this.next.fadeTo(0, 0);      
    },
    query: function() {
      return "&offset=" + (this.page * this.page_size) + "&limit=" + this.page_size;
    },
    at_beginning: function(){
      return this.page <= 0;
    },
    at_end: function(){
      return this.page >= Math.round(this.rows / this.page_size)
    }
  });
  
  var Confirmation_Dialog = Dialog.sub_class('Confirmation_Dialog', {
    block: 'confirmation',
    height: 200,
    initialize: function(){
      this.listen(this, 'button', function() {
        this.close();
      });
    }
  });
  
  var Alert_Dialog = Dialog.sub_class('Alert_Dialog', {
    block: 'alert',
    height: 200,
    initialize: function(){
      this.listen(this, 'button', function() {
        this.close();
      });
    }
  });
  
  var Popup = Flower.sub_class('Popup', {
    initialize: function() {
      var self = this;
      this.close = function() {        
        $(window).unbind('click', self.close);
        self.element.parent().animate({
          'height': self.original_parent_height
        }, 300, function() {
          self.element.parent().css('height', 'auto');
          self.disconnect_all();
          Popup.current = null;
        });
        
      }
    },
    show: function(parent) {
      var self = this;
      if (Popup.current) {
        Popup.current.close();
        if (Popup.current.seed === this.seed) {
          return;
        }
      }
      
      // Set a delay so that this hook isn't active until after it has finished propagating.
      setTimeout(function() {
        $(window).click(self.close);
      }, 1);
      
      Popup.current = this;
      if (parent == undefined) {
        $('body').append(this.element);
      }
      else {
        this.original_parent_height = parent.height();
        parent.css('height', 'auto');
        parent.append(this.element);
        this.target_height = parent.height();
        parent.height(this.original_parent_height);
        parent.animate({
          'height': this.target_height
        }, 300);
        this.parent = parent;
      }      
    }
  });

  var Tab_Panel = Flower.sub_class('Tab_Panel', {
    block: 'tab-panel',
    children: [],
    initialize: function() {
      this.tab_panel = List.create(this.element.find('.tabs'));
      this.container = this.element.find('.container');
      
      this.listen(this, 'connect.child', function(item) {        
        var self = this;
        this.children.push(item);
        this.container.append(item.element);
        var tab = Flower.create('<li>' + item.title + '</li>');
        tab.click(function() {
          self.set_tab(item);
        });
        
        this.tab_panel.element.append(tab.element);
        item.connect(tab, 'tab', 'panel');
        
        if (!this.active_tab) {
          this.set_tab(item);
        }
        else {
          item.element.hide(); 
        }
      });
          
      this.listen(this, 'disconnect.child', function(item) {          
        this.children.splice(this.children.indexOf(item), 1);
        item.get_connection('tab').disconnect_all();
        
        if (this.active_tab === item) {
          if (this.children.length == 0) {
            this.active_tab = null;
          }
          else {
            this.active_tab = this.children[0];
          }
        }
        
      });
    },
    set_tab: function(item) {
      if (typeof item == 'number') {
        item = this.children[item];
      }
      
      if (this.active_tab) {
        this.active_tab.element.hide();
        this.active_tab.get_connection('tab').element.removeClass('active');
      }
      
      item.element.show();
      item.get_connection('tab').element.addClass('active');
      this.active_tab = item;
    }
  });
  
  function Form(block_id) {
    return Block.library[block_id].html;
  //  return Block.generate(block_id);
  }
  Bloom.Form = Form;
  
  Form.radio = function(name, options, value) {
    var text = '<select name="' + name + '">';
    for(var key in options) {
      text += '<option ';
      if (key == value)
        text += 'selected="selected" ';
      text += 'value="' + key + '">' + options[key] + '</option>';
    }
    text += '</select>';
    return text;
  }
  var Field = Flower.sub_class('Field', {
    initialize: function() {
      var seed = this.seed;
      var self = this;
      this.listen(seed.owner, 'change.' + seed.name, function(value) {
       self.update_element(value);
        });
    }
  });
  
  MetaHub.extend(Field, {
    pretty_name: function(name) {
      var words = name.split(/[_\s]/);
      
      words = words.map(function(x) {
        return x[0].toUpperCase() + x.slice(1);
      });
      
      return words.join(' ');
    },
    update_seed: function(seed, value) {      
      seed.owner.value(seed.name, value, this);      
    }
  });
    
  var Text_Field = Field.sub_class('Field_Text', {
    initialize: function() {
      var seed = this.seed;
      var name = seed.name;
      var html = '<li><label for="' + name + '">' + Field.pretty_name(name) + '</label><input type="text" name="' + name + '"/></li>';
      this.element = $(html);
      var input = this.element.find('input');      
      input.val(seed.owner[name]);      
      input.focus(function() {
        input.select();
      });
      Bloom.watch_input(input, function(value) {
        Field.update_seed(seed, value);
      });
      
      this.input = input;
    },
    update_element: function(value) {
      this.input.val(value);
    }
  });
  
  var Editor = List.sub_class('Editor', {
    initialize: function() {
      if (this.seed)
        this.set_seed();       
    },
    create_control: function(seed, name) {
      var control = Text_Field.create({
        name: name,
        owner: seed
      });
      
      return control;
    },
    set_seed: function(seed, names) {      
      this.empty();
      
      for (var name in names) {
        if (seed.hasOwnProperty(name)) {
          var control = this.create_control(seed, name);
          this.connect(control, 'child', 'parent');
        }
      }
    }
  });
  
  Bloom.import_members = Object.getOwnPropertyNames(Bloom);
  delete Bloom.import_members.extend;
  // I want to keep Bloom open for working in systems outside of the browser, just in case.
  // As a rule of thumb, use Global() to refer to global variables, and
  // use window to refer to window specific members.
  
  Bloom.import_all = function() {
    MetaHub.extend(MetaHub.Global, Bloom, Bloom.import_members);
  }
  
  return Bloom;
}