function(update) {
            viewModel.ai(update.aList);
            
            //Initialize the UI for the AI agents
            $('#ai-list .ai').listview();
        }