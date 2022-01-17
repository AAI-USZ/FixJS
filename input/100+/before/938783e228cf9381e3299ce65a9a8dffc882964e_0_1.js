f    //gradient start colors for highlighting tweets, change to your taste
    this.color_reply = '#FFFAB4'; // tweets mentioning current user
    this.color_excluded = '#E5F4AC'; // tweets matching excluded filters
    this.color_me = '#FFFAB4'; // tweets written by current user
    
    this._heartbeat = 420/2; //amount of ms between poll ticks which perform various filter actions. don't set below 50
    this.version = '2.1.3'; //current visible script version
    this.beta = false;
    // internal route, page and stream declarations
    var pagemap = { //pagename => route.name
      'Home': ['index', 'home', 'yourActivity', 'activity', 'mentions', 'replies', 'retweets', 'retweetsByOthers', 'retweetsOfMine', 'listInHome', 'savedSearch'],
      'SearchHome': ['searchHome', 'searchAdvanced'],
      'Search': ['searchRealtime', 'formSearchResults', 'searchLinks', 'formSearchLinks', 'placeTweetSearch', 'searchResults'],
      'WhoToFollow': ['userSearch', 'userSearchForm', 'whoToFollow', 'whoToFollowSearch', 'whoToFollowSearchForm', 'whoToFollowInterests', 'whoToFollowInterestsCategory', 'whoToFollowSuggestions', 'whoToFollowImport', 'whoToFollowImportMatches'],
      'Messages': ['messages', 'inbox', 'sent'],
      'Profile': ['createDm', 'userActivity', 'favorites', 'friends', 'lists', 'profile', 'userFavorites', 'userLists', 'memberships', 'subscriptions', 'followerRequests'],
      'Followers': ['followers', 'followersYouFollow', 'userFollowers'],
      'Following': ['following', 'followingTweets', 'userFollowing', 'youBothFollow', 'userFollowingTweets'],
      'SimilarTo': ['similarTo'],
      'List': ['userList', 'listMembers', 'listSubscribers', 'userListFull']
    };
    var streammap = { //streamItemType => stream namespace
     "tweet": ["Home", "Mentions", "RetweetsByOthers", "RetweetsByYou", "YourTweetsRetweeted", "Search", "List", "User", "Favorites", "FollowingTweets"],
     "user": ["ListMembers", "ListFollowers", "Followers", "SocialContextStream", "Friends", "UserRecommendationsStream", "SuggestionCategoryMembersStream"],
     "activity": ["ActivityOfMeStream","ActivityByNetworkStream","ActivityByUserStream"]
     //only the itemtypes of interest
    };
    this._routemap = { //route.name => stream namespace (from stream._cacheKey)
      "index": "Home",
      "home": "Home",
      "mentions": "Mentions",
      "activity": "ActivityByNetworkStream",
      "userActivity": "ActivityByUserStream",
      "yourActivity": "ActivityOfMeStream",
      "retweetsByOthers": "RetweetsByOthers",
      "retweets": "RetweetsByYou",
      "retweetsOfMine": "YourTweetsRetweeted",
      "savedSearch": "Search",
      "listInHome": "List",
      "userList": "List",
      "listMembers": "ListMembers",
      "listSubscribers": "ListFollowers",
      "subscriptions": "Subscriptions",
      "memberships": "Memberships",
      "profile": "User",
      "userLists": "OwnLists",
      "userFavorites": "Favorites",
      "userFollowing": "Friends",
      "youBothFollow": "SocialContextStream",
      "userFollowingTweets": "FollowingTweets",
      "userFollowers": "Followers",
      "similarTo": "UserSimilaritiesStream",
      "messages": "MessageStream",
      "whoToFollow": "UserRecommendationsStream",
      "whoToFollowInterests": "SuggestionCategoriesStream",
      "whoToFollowInterestsCategory": "SuggestionCategoryMembersStream",
      "whoToFollowImport": "ContactImportServices",
      "whoToFollowSuggestions": "UserRecommendationsStream",
      "searchResults": "Search",
      "searchRealtime": "Search",
      "searchLinks": "Search"
    };
    this._streammap = {}; //stream namespace => stream itemtype
    this._pagemap = {}; //route name => page name
    var i, imax;
    for (var pagename in pagemap) {   
      for (i=0,imax=pagemap[pagename].length;i<imax;i++) {
        this._pagemap[pagemap[pagename][i]] = pagename;
      }
    }
    for (var itemtype in streammap) {
      for (i=0,imax=streammap[itemtype].length;i<imax;i++) {
        this._streammap[streammap[itemtype][i]] = itemtype;
      }
    }
    this._initretries = 21; // ~ 10s
    this._route = '';
    this._page = '';
    this._stream = {
      key:'',
      namespace: '',
      params: {}
    };
    this._isprotected = false; //is current stream protected
    this._isloading = false; 
    this._loggedin = false;
    this._pageswitched = false;
    this.cp = false; //current page
    this.sm = false; //stream manager
    this.cs = false; //current stream
    
    this.stream = {
      title: (function() {
        switch(this._stream.namespace) {
          case 'Home':return 'Home timeline';break;
          case 'Mentions':return 'Mentions';break;
          case 'RetweetsByYou':return 'Retweets by you';break;  //filter.retweets = false;
          case 'RetweetsByOthers':return 'Retweets by others';break;  //filter.retweets = false;
          case 'YourTweetsRetweeted':return 'Your Tweets, retweeted';break;
          case 'ActivityByUserStream':return this.stream.whose()+' Activity';break;
          case 'ActivityByNetworkStream':return 'Your friends\' Activity';break;
          case 'ActivityOfMeStream':return 'Your Activity';break;
          case 'Search':
            switch (this._stream.params.mode) {
              case 'relevance':return 'Search <em>top Tweets</em>';break;
              case 'tweets':return 'Search <em>all Tweets</em>';break;
              case 'links':return 'Search <em>Tweets with links</em>';break;
            }
            break;
          case 'List':return this.stream.whose()+'List <b>'+this._stream.params.listSlug+'</b>';break;
          case 'OwnLists':return this.stream.whose()+'Lists';break;
          case 'MessageStream':return 'Messages';break;
          case 'User':return this.stream.whose()+'Tweets';break;
          case 'Favorites':return this.stream.whose()+'Favorites';break;
          case 'Following':return 'Following';break;
          case 'Friends':return this.stream.whose()+'Friends';break;
          case 'FollowingTweets':return this.stream.whose()+'Timeline';break;
          case 'Followers':return this.stream.whose()+'Followers';break;
          case 'SocialContextStream':return 'Your and '+this.stream.whose()+'Friends';break; //you both follow
          case 'ListMembers':return 'Members of list <b>'+this._stream.params.listSlug+'</b>';break;
          case 'ListFollowers':return 'Followers of list <b>'+this._stream.params.listSlug+'</b>';break;
          case 'UserRecommendationsStream':return 'Who to follow: Suggestions';break;
          case 'SuggestionCategoryMembersStream':
          case 'SuggestionCategoriesStream':
            return 'Who to follow: Interests'; 
          break;
          case 'ContactImportServices':return 'Who to follow: Import contacts';break;
        }
        return 'unknown: '+this._stream.namespace;
      }).bind(this),
      isusers: (function() {
        return this._stream.itemtype === 'user'; 
      }).bind(this),
      istweets: (function() {
        return this._stream.itemtype === 'tweet'; 
      }).bind(this),
      isactivity: (function() {
        return this._stream.itemtype === 'activity'; 
      }).bind(this),
      islinks: (function() {
        return this._stream.params.mode && this._stream.params.mode === 'links';
      }).bind(this),
      isretweets: (function() { //is current stream showing only retweets
        return this._stream.namespace.indexOf('RetweetsBy') === 0;
      }).bind(this),
      ismentions: (function() {
        return this._stream.namespace === 'Mentions';
      }).bind(this),
      ismytweets: (function() {
        return this._stream.namespace === 'YourTweetsRetweeted' || (this._stream.namespace === 'User' && this._stream.params.screenName.toLowerCase() === this.user.name);        
      }).bind(this),  
      isfiltered: (function() {
        return this.stream.isready() && this.cs.hasOwnProperty('filter');
      }).bind(this),
      whose: (function() {
        return !this._stream.params.hasOwnProperty('screenName') || 
                this._stream.params.screenName.toLowerCase() === this.user.name ? 
                'Your ' : '@'+this._stream.params.screenName+"'s ";        
      }).bind(this),
      isprotected: (function() {
        return this._stream.params.hasOwnProperty('canViewUser') && this._stream.params.canViewUser === false;
      }).bind(this),
      status:false,
      isready: (function() {
        return (this._stream.key === 'unknown') || (!this._isloading && this.cs && this._stream.key === this.cs._cacheKey);
      }).bind(this),
      setloading: (function() {
        if (this.stream.status !== 'loading') {
          this.stream.status = 'loading';
        }
      }).bind(this),
      isloading: (function() {
        return this.stream.status === 'loading';
      }).bind(this),
      identify: (function(streamid) {
        if (streamid.indexOf('{') === -1) {
          return streamid === this._stream.namespace;
        } else {
          var streamns = streamid.substr(0, streamid.indexOf('{'));
          if (streamns === this._stream.namespace) {
            var streamparams = JSON.parse(streamid.substr(streamid.indexOf('{')));
            for (var p in streamparams) {
              if (!this._stream.params.hasOwnProperty(p) || this._stream.params[p] !== streamparams[p]) {
                return false;
              }
            }
            return true;
          }
          return false;
        }
      }).bind(this),
      itemclass: (function() {
        return this._stream.streamItemClass || 'stream-item';
      }).bind(this),
      streamid: (function() {
        var streamparams = {};
        for (var p in this._stream.params) {
          if (~['listSlug','screenName','query'].indexOf(p)) {
            streamparams[p] = this._stream.params[p];
          }
        }
        for (p in streamparams) {
          return this._stream.namespace+JSON.stringify(streamparams);
        }
        return this._stream.namespace;
      }).bind(this)
    };
    
    this.switches = {
      'filter-minimized': {
        initial: false,
        activate: {
          'setoption': []
        },
        css: {
          common: [],
          active: [],
          inactive: [],
          disabled: []
        }
      }
    };
    
    this.options = { /* default option settings */
      /* widget options */
      'filter-minimized': false,  /* widget minimized state */
      /* global options */
      'hide-topbar': false,  /* auto-hide top bar */
      'hide-tweetbox': false,     /* main tweet box */
      'hide-question': true,     /* hide "What's happening" */
      'alert-message': true,      /* message alert when new direct messages received */
      'alert-sound-message': true,/* play sound when new direct messages received */
      'alert-mention': true,/* message alert when new mentions arrived */
      'alert-sound-mention': true,/* play sound when new direct messages received */
      /* options changing the dashboard */
      'compact-activities': true,  /* compact activities */
      'hide-wtf': false,     /* hide who to follow */
      'hide-following': false,     /* hide following dashboard component */
      'hide-followers': false,     /* hide followers dashboard component */
      'hide-trends': false,  /* hide trends */
      'hide-ad': true,  /* hide advertising */
      'hide-invite': true, /* hide invite friends */
      'minify-menu': false,  /* show only essential dashboard menu options */
      'fixed-dashboard': false,        /* fixed dashboard */
      /* options changing the stream */
      'filter-disabled': false, /* disable filter */
      'filter-inverted': false,   /* invert filter */
      'skip-me': true,       /* filter should skip my posts */
      'skip-mentionsme': true,  /* filter should skip tweets mentioning me */
      'filter-replies': false,  /* filter all replies */
      'filter-links': false,    /* filter all tweets with links */
      'filter-retweets': false, /* filter all retweets */
      'filter-media': false,    /* filter all media */
      'filter-classicrts': false,  /* treat classic rts like new style rts */
      'hide-promoted-tweets': false,  /* always hide promoted tweets */
      'hide-promoted-content': false, /* hide promoted content in the dashboard */
      'show-navigation': true,  /* show draggable top/bottom link menu */
      'show-via': true,         /* show tweet source */
      'show-usertime': true,    /* show user's local time near tweet time */
      'show-timestamp': true,    /* show user's local time near tweet time */
      'show-tab': true,         /* show "filtered"-tab */
      'show-br': true,          /* show line breaks in tweets */
      'add-selection': false,    /* show add to filter menu after simple text selection in tweets */
      'expand-new': true,       /* expand new tweets */
      'hide-last': false,       /* expand last tweet on dashboard */
      'expand-last': true,       /* expand last tweet on dashboard */
      'expand-links': false,    /* show expanded links */
      'expand-activity': false,  /* expand activitiy dashboard component */
      'hide-activity': false,   /* hide the activity dashboard component */
      'expand-link-targets': false, /* change links pointing to expanded url instead of shortened*/
      'enable-tweeplus': true,    /* expand tweeplus shortened tweets in detail view */
      'small-links': false,     /* show small links */
      'highlight-me': false,      /* highlight what I wrote */
      'highlight-mentionsme':true, /* highlight replies to me */
      'highlight-excluded':true, /* highlight tweets matching exclusions */
      'search-realtime': true,    /* default searches to "all" tweets */
      'show-classictabs': true,  /* show @mentions and retweets-tabs, hide mentions and retweets in activities */
      //'show-unfollowers': true,  /* show in dashboard who unfollowed you lately */
      'hide-follow': true,      /* hide all follow action from activity pages */
      'hide-list': true,      /* hide all list action from activity pages */
      'show-friends':true,     /* show who follows you and who you follow */
      'show-retweeted':false,     /* show retweet info in Tweets */
      'copy-expanded': true,    /* copy expanded (visible) links */
      'enable-richtext': false,    /* enable rich text editor */
      'scroll-lock': false,    /* lock scrolling position when loading new tweets */
      'clear-stream-cache': true, /* reset stream cache after page switch - for speed issues */
      'tweets-fill-page': false /* load tweets until page is full */
    };                     
    if (!this.beta) {
      delete this.options['expand-link-targets'];
      delete this.options['enable-richtext'];
    }
    this.disabledoptions = []; //currently disabled options. for check in getoption()
    //identify dashboard components, some changed by options
    this.components = {
      similarto: {
        path: 'div.user-rec-inner.user-rec-inner-similarities'
      },
      wtf: {
        path: 'div.flex-module > div.js-recommended-followers',
        option: 'hide-wtf'
      },
      trends: {
        path: 'div.trends-inner', //what to search for to identify the component
        option: 'hide-trends' //which option depends on the component, will be activated when it's found
      },
      latest: {
        path: 'div.tweet-activity',
        option: ['compact-activities', 'hide-last', 'expand-last']
      },
      invite: {
        path: 'div.invite-friends-component'
      },
      following: {
        path: 'div.following-activity-full'
      }, 
      youbothfollow: {
        path: 'div.social-context > div.you-both-follow'
      },
      activities: {
        path: 'div.your-activity.following-activity'
      },
      ad: {
        path: 'div.definition p.promo',
        option: 'hide-ad'
      },
      menu: {
        path: 'div.footer.inline-list',
        option: ['minify-menu']
      },
      stats: {
        path: 'ul.user-stats',
        option: 'compact-activities'
      },
      listmembers: {
        path: 'div.newest-list-members'
      },
      morelists: {
        path: 'div.more-lists'
      }
    };
    
    this.queries = [];  /* parsed queries (objects) */
    this.exclusive = []; /* exclusive filtered queries (ids) */
    
    this.friends = {
      expires:0, //refresh after expires
      loading: false,
      loadedpacket:0,  //currently loaded packets (a 100.000)
      fetchedpackets:0,  //how many packets were fetched from api
      uids: {},  //fetched user ids
      fids: {}   //currently fetching userids
    };
    
    this.exfriends = {
    };
    
    this.status = {
      messagesinceid: -1, //id of last mention, is 0 if no mentions found
      messageslastchecked: -1, //when were messages last checked (across multiple instances)
      mentionsinceid: -1, //id of last direct message, is 0 if no messages found
      mentionslastchecked: -1, //when were mentions last checked (across multiple instances)
      selectedtweet: '',  //id of tweet containing currently selected text for feature "add selection to filter"
      foundcomponents: [],  //which components were found in findcomponents()
      initialized: false  //is widget created and settings loaded: influences setoption and poll behaviour
    };
    
    this.timeids = { //timeout and/or interval ids for special functions
    };
    
    this.tweeplus = {
      unique: (function(arr) {
        var uarr = [];
        for (var a=0,al=arr.length,av;a<al && (av=arr[a]);a++) {
          if (!~uarr.indexOf(av)) uarr.push(av);
        }
        return uarr;
      }).bind(this),
      remove: (function(arr,rarr) {
        for (var r=0,rl=rarr.length,rv,p;r<rl && (rv=rarr[r]);r++) {
          while ((p = -~arr.indexOf(rv))) {
            arr.splice(p-1,1);
          }
        }
        return arr;
      }).bind(this),
    	encodetext: function(text) {
        return encodeURIComponent(text).replace(/(['\(\)\*\.~]|%20)/g, function($1,$2) { 
          return {"'":'%27','(':'%28',')':'%29','*':'%2A','.':'%2e','~':'%7e','%20':'+'}[$2]; 
        });
      },
      encode: (function(text, replytourl) {
        text = $.trim(text);
        var username = replytourl ? (replytourl.match(/\/(\w+)\/status\//i) || [,''])[1] : '',
          cutoff = 115 - (username? username.length + 2 : 0), // initial cut-off point
          summary,
          mentions = this.tweeplus.mentions(text),
          previousLength = mentions.length + 1;
        while(mentions.length < previousLength) {
          summary = text.slice(0, cutoff - (mentions.length? mentions.join(' ').length + 1 : 0));
          previousLength = mentions.length;
          mentions = this.tweeplus.remove(mentions, this.tweeplus.mentions(summary));
        }
        return summary + '[\u2026] ' + 'http://tweeplus.com/'+(replytourl ? '?in_reply_to=' + encodeURIComponent(replytourl) : '')+
                         '#'+this.tweeplus.encodetext(text) + (mentions? ' ' + mentions.join(' ') : '');
      }).bind(this),
      mentions: (function(text) {
        return this.tweeplus.unique(text.match(/@\w{1,20}/g) || []);
      }).bind(this)
    };
    
    this.polling = {
      tick: 0,         //count of ticks executed, mainly for debug
      timeoutid: -1,   //id returned by settimeout for next poll, to avoid multiple timeout calls, -1=can repoll
      suspend: false,  //immediately and permanently stop polling
      stop: true,      //stop poll after run of _poll()
      busy: false,     //is poll currently busy (already processing)
      working: false,
      events: { //possible events executed during poll. order matters!
        refreshlayoutcss: false,  //refresh inline stylesheets
        parseitems: false, //parse through cached tweets (outside the dom)
        parsestream: false,  //parse through displayed tweets (in the dom)
        findcomponents: false, //try to find dashboard components
        addclass: false,       //add class to <body> - used for layout options, spares css recreation
        removeclass: false,    //remove class from <body>
        refreshoptions: false, //set enabled/disabled options
        refreshfriends: false, //check if friend status is up to date
        loadfriends: false,    //staggered load friends from browser storage
        fetchfriends: false,   //staggered fetch friends from api
        refreshindex: false,   //rebuild the filter index
        refreshfiltercss: false,     //refresh inline stylesheets
        refreshfriendscss: false,     //refresh inline stylesheets
        refreshfilterlist: false,  //refresh the list of filters and exclusions on the widget
        setstreamtitle: false, //refresh stream title on the widget and the stream
        refreshactivities: false,  //refresh compact activities display
        lockscroll: false,      //lock scroll position after loading new tweets
        checknewmessages: false,  //check for new messages 
        checknewmentions: false,  //check for new mentions
        parselinks: false,     //pick up links and expand or collapse them
        removeselection: false  //remove text selection
      },
      running: {}, //events currently running during the tick. populated from "queued" before tick is executed
      queued: {} //queued action events, in no specific order. added through method "poll()"
    };
    this.user = {}; //current user info
    this.nextid = 1;    /* next unique id for query. always incremented */
    this.queries = [];  /* parsed queries */
    
    this.stopchars = " \n(){}[].,;-_#'+*~´`?\\/&%$§\"!^°"; //possible chars delimiting a phrase, for exact search. spares expensive regex match
    this.basex = this._basemap('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890');  //base62 map for large number compression
    this.base10 = this._basemap('0123456789');
    if (!this.checkrequirements()) { //browser must meet minimum requirements
      this.showmessage('Tweetfilter can\'t work correctly on this browser. <br />It would probably work fine on latest <a href="http://www.mozilla.com/firefox">Firefox</a>, '+
                       '<a href="http://www.google.com/chrome">Chrome</a> or <a href="http://www.opera.com">Opera</a>.', {resident:true});
      return;
    } else {
      this.initialize();
    }
  }
