function() {
  var isLoggedIn = !!LocalStorage.get('User');
  if (isLoggedIn) UI.Chrome.show({immediate: true});

  // Browser bug in both Chrome and iOS. This delay is necessary
  // at the startup of the app.
  setTimeout(function() {
    History.push(isLoggedIn ? '/' : '/login');
  }, 350);

  var activeState = (new ActiveState({
    active: 'active',
    hit: 'hit',
    hitProperty: 'data-hit-target'
  }));
  activeState.attach();

  if (Browser.Platform.ios) {
    (new PreventClickOnScroll({
      selector: 'div.scrollable',
      contentSelector: 'div.scroll-content',
      activeState: activeState
    })).attach();

    // Prevent all clicks from working normally
    window.addEventListener('click', preventDefault, false);
  }

  UI.register({

    '#main a:external': function(elements) {
      elements.addEvent('click', clickExternal);
    },

    '#main a:internal': function(elements) {
      elements.addEvent('click', click);
    },

    'footer a:internal': function(elements) {
      elements.addEvents({
        touchstart: click,
        click: preventDefault
      });
    },

    'label.info, .showPopover': Class.Instantiate(Popover, {
      selector: 'div.popover',
      scrollSelector: 'div.scrollable',
      positionProperty: 'data-position',
      animationClass: 'fade',
      arrowHeight: 14
    }),
    'textarea.autogrow': Class.Instantiate(Form.AutoGrow, {
      margin: 12
    }),
    'div.checkbox': Class.Instantiate(Form.Checkbox),
    'select.empty': Class.Instantiate(Form.EmptySelect, {
      placeholderPosition: '!',
      placeholder: '.placeholder',
    }),
    '.swipeable': Class.Instantiate(SwipeAble, {

      selector: '.removable > span',
      scrollableSelector: 'div.scrollable',

      onClick: function() {
        var container = this.container;
        container.addClass('fade');
        (function() {
          container.addEvent('transitionComplete:once', function() {
            this.destroy();
          }).addClass('out');
        }).delay(10);

        var url = container.get('data-api-url');
        var method = container.get('data-method');
        if (url && method) API.call(url, method);
      },

      onSwipe: function() {
        this.container.addClass('wide');
        this.container.getElement('> a').addClass('left');
      },

      onComplete: function() {
        this.container.removeClass('wide');
        this.container.getElement('> a').removeClass('left');
      }

    }),

    'label': function(elements) {
      elements.each(function(element) {
        element.onclick = onLabelClick;
      });
    }

  }).update();

  var header = document.getElement('header');
  var back = new UI.BackButton(header, new Element('a'));
  var action = new UI.ActionButton(header, new Element('a'), {
    onClick: click
  });
  var title = new UI.Title(header, new Element('h1'));

  View.setMain(new View.Controller('main', {
    template: 'container-template',
    contentSelector: 'div.scroll-content',
    scrollableSelector: 'div.scrollable',

    back: back,
    title: title,
    action: action,
    indicator: new Spinner({
      lines: 12,
      length: 10,
      width: 7,
      radius: 13,
      trail: 30,
      color: '#000'
    }),
    indicatorDelay: 500,

    onChange: function() {
      var stackName = this.getStack().getName();
      UI.highlight(document.getElement('footer .' + stackName));
    },

    onTransitionEnd: function() {
      var stack = this.getStack();
      var previous = stack && stack.getPrevious();
      if (previous)
        previous.toElement().getElements('ul li a.selected').removeClass('selected');
    }
  }));

  Controller.define('/', function() {

    // These are cached during the lifetime of the app so the data
    // can be accessed synchronously.
    API.cacheInfo('algorithms');
    API.cacheInfo('output_files');

    UI.Chrome.show();

    View.getMain().push('default', new View.Object({
      title: 'Home',
      content: UI.render('default')
    }));

  });
}