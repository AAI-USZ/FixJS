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

        showPanel: function(browser, panel)

        {

            try

            {

                var isHwPanel = panel && panel.name == panelName;

                var hwButtons = browser.chrome.$("fbCodeDependencyVisualizerButtons");

                collapse(hwButtons, !isHwPanel);



                context = Firebug.currentContext;



                //var panel = context.getPanel(panelName);

                //var parentNode = panel.panelNode;

//            var root = InitializePlate.InitializeTag.replace(

//                {}, parentNode, InitializePlate);



                // initialize html on start

                htmlRepresentation.initialize(function()

                {

                    XulHelper.createMenus();

                    htmlRepresentation.determineDependencies();

                }, this);

            }

            catch(e) { alert("Error when showing panel: " + e); }

        },



        initContext: function()

        {

            //alert("hit");

            // initialize javascript and css buttons

        },



        onHtmlButton: function()

        {

            var panel = context.getPanel(panelName);

            var parentNode = panel.panelNode;



            //parentNode.innerHTML = htmlRepresentation.site;



            this.changePanelContent(htmlRepresentation.site);

            InputManager.initialize(parentNode);

        },



        changePanelContent: function(newContent)

        {

            var panel = context.getPanel(panelName);

            var parentNode = panel.panelNode;

            parentNode.innerHTML = newContent;

            InputManager.initialize(parentNode);

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