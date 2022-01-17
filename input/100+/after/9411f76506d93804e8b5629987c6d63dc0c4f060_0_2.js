function() { with (FBL) {



    var panelName = "CodeDependencyVisualizer";

    var panelTitle = "Code Dependencies";

    //var root = FBL.Firebug.context.getPanel(panelName).panelNode;

    //FBL.Firebug.CodeDependencyModule.panel



//	var InitializePlate = domplate(

//	{

//		InitializeTag:

//			DIV({class: "default"},

//					"The " + panelTitle + " panel has just been opened."

//			)



//	});



    /************************************************************

     * 															*

     * 					Module Implementation					*

     *															*

     ************************************************************/



    Firebug.CodeDependencyModule = extend(Firebug.Module,

    {

        test: 1,

        showPanel: function(browser, panel)

        {

            try

            {

                var isCdvPanel = panel && panel.name == panelName;



                // Chrome changes in Firebug version 1.4

                var chrome = browser.chrome ? browser.chrome : Firebug.chrome;



                var cdvButtons = chrome.$("fbCodeDependencyVisualizerButtons");



                collapse(cdvButtons, !isCdvPanel);



                var cdvDynamicButtons = chrome.$("fbCodeDependencyVisualizerDynamicButtons");



                collapse(cdvDynamicButtons, !isCdvPanel);



                if (panel && (panel.name == panelName))

                {

                    var parentNode = panel.panelNode;

                    parentNode.innerHTML = "<div>Code dependency visualizer</div><div>Click \"Get page code\" to start</p>";

                }

//                //context = Firebug.currentContext;

//

//                //var panel = context.getPanel(panelName);

//

//

//                var parentNode = panel.panelNode;

//                parentNode.innerHTML = "<p>Click start to show page code!</p>";



//            var root = InitializePlate.InitializeTag.replace(

//                {}, parentNode, InitializePlate);



                // initialize html on start

//                htmlRepresentation.initialize(function()

//                {

//                    htmlRepresentation.determineDependencies();

//                    XulHelper.createMenus();

//                }, this);

            }

            catch(e) { alert("Error when showing panel: " + e); }

        },



        initContext: function()

        {

            // initialize javascript and css buttons

            //var context = Firebug.currentContext;

        },



        reattachContext: function()

        {

        },



        initialize: function()

        {

        },



        onGetPageCodeButton: function()

        {

            htmlRepresentation.destroyContent();



            htmlRepresentation.initialize(function()

            {

                htmlRepresentation.determineDependencies();

            }, this);



            // asynchronous function calls ? HTML doesn't get generated before calling this function or something

            //this.changePanelContent(htmlRepresentation.site);

        },



        onHtmlButton: function()

        {

            this.changePanelContent(htmlRepresentation.site);



            //var parentNode = panel.panelNode;

            //parentNode.innerHTML = htmlRepresentation.site;



//            htmlRepresentation.initialize(function()

//            {

//                htmlRepresentation.determineDependencies();

//                XulHelper.createMenus();

//            }, this);





            //this.changePanelContent(htmlRepresentation.site);

            //XulHelper.createMenus();



            InputManager.initialize(parentNode);

        },



        changePanelContent: function(newContent)

        {

            var context = Firebug.currentContext;

            var panel = context.getPanel(panelName);

            var parentNode = panel.panelNode;



            parentNode.innerHTML = newContent;



            this.onPanelContentChange();

            //InputManager.initialize(parentNode);

        },



        onPanelContentChange: function()

        {

            var codeContainer = this.getPanelContent();

            var model = htmlRepresentation.pageModel;



            htmlRepresentation.createLinksBetweenHtmlAndModel(codeContainer, model);



            InputManager.initialize(this.getPanelContent());

        },



        getPanelContent: function()

        {

            var context = Firebug.currentContext;

            var panel = context.getPanel(panelName);

            var parentNode = panel.panelNode;



            return parentNode;

        },



        establishDependencies: function()

        {



        }

//        onJavascriptButton: function()

//        {

//            var panel = context.getPanel(panelName);

//            var parentNode = panel.panelNode;

//            parentNode.innerHTML = htmlRepresentation.javascript[2].representation;

//            InputManager.initialize(parentNode);

//        },

//

//        onCssButton: function()

//        {

//            var panel = context.getPanel(panelName);

//            var parentNode = panel.panelNode;

//            parentNode.innerHTML = htmlRepresentation.cssStyle[0].representation;

//            InputManager.initialize(parentNode);

//        },

//

//        onClearButton: function()

//        {

//            var panel = context.getPanel(panelName);

//            var parentNode = panel.panelNode;

//            parentNode.innerHTML = "";

//        }

    });





    /************************************************************

     * 															*

     * 					Panel Implementation					*

     *															*

     ************************************************************/



    function CodeDependencyPanel() {}

    CodeDependencyPanel.prototype = extend(Firebug.Panel,

    {

        name: panelName,

        title: panelTitle,



        initialize: function()

        {

            Firebug.Panel.initialize.apply(this, arguments);

        }

    });





    /************************************************************

     * 															*

     * 		Registering Panel, Module and CSS Styles			*

     *															*

     ************************************************************/



    Firebug.registerPanel(CodeDependencyPanel);

    Firebug.registerModule(Firebug.CodeDependencyModule);

    Firebug.registerStylesheet("chrome://codedependencyvisualizer/skin/style.css");

}}