function (){

		this.setControllers([

		                     new iampoet.TodayNavigator(),

		                     new iampoet.TodayMissionNavigator(),

		                     new iampoet.NewsFeedNavigator(),

		                     new iampoet.SettingNavigator()

		                     ]);

		

		this.appCtx = tau.getCurrentContext();

    var tabs = this.appCtx.getConfig().tabs;

		var tabBar = this.getTabBar();

    var tabcomps = tabBar.getComponents();

    for (i in tabs) {

      var tabcomp = tabcomps[i];

      var backImage = {

        normal: tabs[i].icon,

        selected: tabs[i].selectedIcon,

        disabled: tabs[i].icon,

        highlighted: tabs[i].icon,

      };

      tabcomp.setBackgroundImage(backImage);

      tabcomp.setStyles({

        backgroundRepeat: 'no-repeat',

        backgroundPosition: 'top center'

      });

    }

		

		

		

	}