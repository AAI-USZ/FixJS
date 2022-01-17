function() {
        var model = openmdao.model;

        var data = new openmdao.DataflowFrame("dataflow_pane",model,''),
            work = new openmdao.WorkflowFrame("workflow_pane",model,''),
            prop = new openmdao.PropertiesFrame("properties_pane",model);

        // create functions to load content into the different panes
        // intercept tab clicks to set the adjacent label
        var central_label = jQuery('#central_label'),
            dataflow_tab  = jQuery('#dataflow_tab a'),
            workflow_tab  = jQuery('#workflow_tab a');

        dataflow_tab.click(function(e) { central_label.text(data.getPathname()); });
        workflow_tab.click(function(e) { central_label.text(work.getPathname()); });

        function data_fn(path) { data.showDataflow(path); dataflow_tab.click(); }
        function work_fn(path) { work.showWorkflow(path); workflow_tab.click(); }
        function prop_fn(path) { prop.editObject(path); }
        function comp_fn(path) { new openmdao.ComponentFrame(model,path); }

        new openmdao.ComponentTreeFrame("otree_pane", model, prop_fn, comp_fn, work_fn, data_fn);
        new openmdao.LibraryFrame("library_pane",  model);
        new openmdao.ConsoleFrame("console",  model);
    }