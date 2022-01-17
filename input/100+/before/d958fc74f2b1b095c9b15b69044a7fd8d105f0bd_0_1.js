function () {

    var config;

    /**

     * Function to create styles on a HTML dom element

     * @return {Boolean} success

     * @private

     * @method

     */

    function setStyles(el, o) {

      var key;

      for (key in o) {

        if (o.hasOwnProperty(key)) {

          el.style[key] = o[key];

        }

      }

    }

    /**

     * Function will setup panel properties

     * @return {Boolean} success

     * @private

     * @method

     */

    function positionPanel(el) {

      var viewportwidth,

        viewportheight,

        panelWidth = 300;

      if (typeof window.innerWidth !== 'undefined') {

        viewportwidth = window.innerWidth;

        viewportheight = window.innerHeight;

      } else if (typeof document.documentElement !== 'undefined'

          && typeof document.documentElement.clientWidth !== 'undefined'

          && document.documentElement.clientWidth !== 0) {

        viewportwidth = document.documentElement.clientWidth;

        viewportheight = document.documentElement.clientHeight;

      } else {

        viewportwidth = document.getElementsByTagName('body')[0].clientWidth;

        viewportheight = document.getElementsByTagName('body')[0].clientHeight;

      }

      setStyles(el, {

        position  : 'fixed',

        zIndex: 9999,

        backgroundColor: '#f5f5f5',

        width: panelWidth + 'px',

        height: '200px',

        padding: '20px 15px',

        textAlign: 'center',

        //left: (viewportwidth / 2) - (panelWidth / 2) + 'px',

        right: '20px',

        bottom: '20px'

      });

    }



    /**

     * Function will setup panel properties

     * @return {Boolean} success

     * @private

     * @method

     */

    function positionExtendedPanel(el) {

      var viewportwidth,

        viewportheight,

        panelWidth = 600;

      if (typeof window.innerWidth !== 'undefined') {

        viewportwidth = window.innerWidth;

        viewportheight = window.innerHeight;

      } else if (typeof document.documentElement !== 'undefined'

          && typeof document.documentElement.clientWidth !== 'undefined'

          && document.documentElement.clientWidth !== 0) {

        viewportwidth = document.documentElement.clientWidth;

        viewportheight = document.documentElement.clientHeight;

      } else {

        viewportwidth = document.getElementsByTagName('body')[0].clientWidth;

        viewportheight = document.getElementsByTagName('body')[0].clientHeight;

      }

      setStyles(el, {

        position  : 'fixed',

        zIndex: 9999,

        left: (viewportwidth / 2) - (panelWidth / 2) + 'px',

        //right: '20px',

        top: '100px'

      });



      setStyles(document.getElementById('ck-overlay'), {

        position  : 'fixed',

        zIndex: 9998,

        width: viewportwidth + 'px',

        height: viewportheight + 'px'

      });

    }

    /**

     * Function to create the preference panel for optin / optout

     * @return {Boolean} panel

     * @private

     * @method

     */

    function createPanelUI() {

      var body = document.getElementsByTagName("body")[0],

        panel = document.createElement("div"),

        checked = (EU.Cookie.hasSubscribed()) ? 'checked' : '',

        p = document.getElementById('huk_cookie_prefernce_panel'),

        expires = config.expires || 30,

        cookie;

      if (config.cookie_prefix && config.optin_cookie_name) {

        AppConfig.cookie = config.cookie_prefix + config.optin_cookie_name;

      } else {

        AppConfig.cookie = 'TMP_EU_Cookie';

      }

      if (!p) {

        panel.id = 'huk_cookie_prefernce_panel';

        AppConfig.message += '<div class="huk_cookie_prefernce_toolbar">' +          

          '<input type="button" value="' + AppConfig.cancel + '" id="EU_OPIN_CANCEL"/>' +

		  '<input type="button" value="' + AppConfig.changeSettings + '" id="EU_OPIN_SETTINGS"/>' +

          '</div>' +

          '<div class="huk_cookie_prefernce_link">' +

          '<a href="' + AppConfig.link + '" target="_blank">' + AppConfig.linkText + '</a>' +

          '</div>';

        panel.innerHTML = AppConfig.message;



        positionPanel(panel);

        body.appendChild(panel);



        $('#EU_OPIN_SETTINGS').bind('click', function(event) {

          toggleOptions();

          hide();

        });

        

        $('#EU_OPIN_CANCEL').bind('click', function(event) {

          EU.Cookie.set({name: AppConfig.cookie, value: '4', expires: expires});

          hide();

        });



        $('#huk_cookie_prefernce_panel').bind('mouseenter', function(event) {

          clearTimeout(idleTimer);

        });

      }



      if (AppConfig.idle !== 0) {

        idleTimer = setTimeout(function () {

          idleCallback();

          hide();

        }, (AppConfig.idle * 1000));

      }

    }



    function createExtenedPanel() {

      var body = document.getElementsByTagName("body")[0],

        panel = document.createElement('div'),

        overlay = document.createElement('div'),

        expires = AppConfig.expires || 30,

        p = document.getElementById('huk_cookie_prefernce_panel_ex');



      if (config.cookie_prefix && config.optin_cookie_name) {

        AppConfig.cookie = config.cookie_prefix + config.optin_cookie_name;

      } else {

        AppConfig.cookie = 'TMP_EU_Cookie';

      }



      if (!p) {

        overlay.id = 'ck-overlay';

        overlay.innerHTML = "&nbsp;";

        panel.id = 'huk_cookie_prefernce_panel_ex';

        panel.innerHTML = '<div id="cookie-ext-panel">' + 

          '<div id="cookie-info">' +

            '<h1>Cookie Settings</h1>' +

            '<p>A cookie, also known as an HTTP cookie, web cookie, or browser cookie, is a piece of data stored by a website within a browser, and then subsequently sent back to the same website by the browser.[1] Cookies were designed to be a reliable mechanism for websites to remember things that a browser had done there in the past, which can include having clicked particular buttons, logging in, or having read pages on that site months or years ago.</p>' + 

            '<div id="cookie-selection">' +

              '<h2>Select the level of cookie you want to allow.</h2>' +

              '<div id="cokkie-options">' +

                  '<label for="strict"><span>Strictly necessary &amp; Performance</span>' +

                    '<input type="checkbox" id="strict" name="cookie-opt" value="1"/>' +

                  '</label>' +

                  '<label for="functional"><span>Functional</span>' +

                    '<input type="checkbox" id="functional" name="cookie-opt" value="2"/>' +

                  '</label>' +

                  '<label for="targeting"><span>Targeting</span>' +

                    '<input type="checkbox" id="targeting" name="cookie-opt" value="3"/>' +

                  '</label>' +

              '</div>' +

              '<div class="clearfix">&nbsp;</div>' +

            '</div>' +

            '<div class="clearfix">&nbsp;</div>' +

            '<div id="cookie-functionalList">' +

              '<div id="cookieWill">' +

              '</div>' +

              '<div id="cookieWillNot">' +

              '</div>' +

            '</div>' +

            '<div class="clearfix">&nbsp;</div>' +

            '<div id="c-toolbar">' + 

              '<input type="button" id="COOKIE_CANCEL" value="Cancel"/>' + 

              '<input type="button" id="COOKIE_SAVE" value="Save &amp; Close"/>' +

            '</div>' +

            '<div class="clearfix">&nbsp;</div>' +

          '</div>' +

        '</div>';

        body.appendChild(overlay);

        body.appendChild(panel);

        positionExtendedPanel(panel);



        if (EU.Cookie.get(AppConfig.cookie) === null || EU.Cookie.get(AppConfig.cookie) === '1') {

          listFeatures('strict');

          document.getElementById('strict').checked = true;

          document.getElementById('functional').checked = false;

          document.getElementById('targeting').checked = false;

        } else if (EU.Cookie.get(AppConfig.cookie) === '2') {

          listFeatures('functional');

          document.getElementById('functional').checked = true;

          document.getElementById('strict').checked = true;

          document.getElementById('targeting').checked = false;

        } else if (EU.Cookie.get(AppConfig.cookie) === '3') {

          listFeatures('targeting');

          document.getElementById('targeting').checked = true;

          document.getElementById('functional').checked = false;

          document.getElementById('strict').checked = false;

        }

      }



      $('#strict, #functional, #targeting').bind('click', function(event) {

        listFeatures(event.currentTarget.id);

        if(event.currentTarget.id === 'strict') {

          if ($('#strict').attr('checked')  !== 'checked') {

            $('#strict').attr('checked', 'checked');

          }

        } else if(event.currentTarget.id === 'functional') {

          if ($('#functional').attr('checked')  !== 'checked') {

            $('#strict').attr('checked', 'checked');

            $('#functional').attr('checked', false);

            $('#targeting').attr('checked', false);

          }

        } else if(event.currentTarget.id === 'targeting') {

          if ($('#targeting').attr('checked')  === 'checked') {

            $('#strict').attr('checked', 'checked');

            $('#functional').attr('checked', 'checked');

            $('#targeting').attr('checked', 'checked');

          }

        }

        hide();

      });



      EU.Events.addEvent(document.getElementById('COOKIE_SAVE'), 'click', function (event) {

        if (document.getElementById('targeting').checked) {

          EU.Cookie.set({name: AppConfig.cookie, value: '3', expires: expires});

        } else if(document.getElementById('functional').checked) {

          EU.Cookie.set({name: AppConfig.cookie, value: '2', expires: expires});

        } else if(document.getElementById('strict').checked) {

          EU.Cookie.set({name: AppConfig.cookie, value: '1', expires: expires});

        }

        hide();

        toggleOptions();

      });

    }



    removeCookies = function(currentOption) {

      if (currentOption === 'strict') {

        EU.Cookie.trash(AppConfig.assosiatedCookies.functional);

        EU.Cookie.trash(AppConfig.assosiatedCookies.targeting);

      } else if(currentOption === 'functional') {

        EU.Cookie.trash(AppConfig.assosiatedCookies.targeting);

      }

    };

    listFeatures = function(n) {

      var i, j, will, willnot, willWraper = '<h3>This website will:</h3><ul>', willNotWraper = '<h3>This website will not:</h3><ul>';

      will = AppConfig.functionalList[n].will;

      willnot = AppConfig.functionalList[n].willnot;



      for (i = 0; i < will.length; i += 1) {

        willWraper += '<li>' + will[i] + '</li>';

      }

      willWraper += '</ul>';



      for (i = 0; i < willnot.length; i += 1) {

        willNotWraper += '<li>' + willnot[i] + '</li>';

      }

      willNotWraper += '</ul>';



      document.getElementById('cookieWill').innerHTML = willWraper;

      document.getElementById('cookieWillNot').innerHTML = willNotWraper;

    };

   

    idleCallback = function () {

      var expires = AppConfig.expires || 30;

      if (!EU.Cookie.hasSubscribed()) {

        EU.Cookie.set({name: AppConfig.cookie, value: '0', expires: expires});

      }

    };



    /**

     * Function display Cookie preference panel on the screen

     * @public

     * @method

     */

    show = function () {

      var p = document.getElementById('huk_cookie_prefernce_panel');

      if (p) {

        p.style.display = 'block';

      } else {

        createPanelUI();

      }

    };

    /**

     * Function hide Cookie preference panel on the screen

     * @public

     * @method

     */

    hide = function () {

      var p = document.getElementById('huk_cookie_prefernce_panel');

      if (p) {

        p.style.display = 'none';

      }

    };



    /**

     * Function toggle Cookie preference panel on the screen

     * @public

     * @method

     */

    toggle = function () {

      var p = document.getElementById('huk_cookie_prefernce_panel');

      if (p) {

        p.style.display = (p.style.display === '' || p.style.display === 'block') ? 'none' : 'block';

      } else {

        createPanelUI();

      }

    };



    toggleOptions = function () {

      var p = document.getElementById('huk_cookie_prefernce_panel_ex'),

        overlay = document.getElementById('ck-overlay');

      if (p) {

        p.style.display = (p.style.display === '' || p.style.display === 'block') ? 'none' : 'block';

        overlay.style.display = (overlay.style.display === '' || overlay.style.display === 'block') ? 'none' : 'block';

      } else {

        createExtenedPanel();

      }

    };



    return {

      setup : function (options) {

        config = options;

        if (!EU.Cookie.get(options.cookie_prefix + options.optin_cookie_name)) {

          if (options && !options.test) {

            createPanelUI();

          }

        }

      },

      show : function () { show(); },

      hide : function () { hide(); },

      toggle : function () { toggle(); },

      toggleOptions : function () { toggleOptions(); }

    };

  }