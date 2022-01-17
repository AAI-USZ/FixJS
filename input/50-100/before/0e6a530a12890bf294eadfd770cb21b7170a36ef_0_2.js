function(event)
    {
        Firebug.CommandLine.update(Firebug.currentContext);

        switch (event.keyCode)
        {
            case KeyEvent.DOM_VK_RETURN:
                if (Events.isControl(event))
                    this.onExecute();
            break;

            case KeyEvent.DOM_VK_ESCAPE:
                this.onEscape();
                event.preventDefault();
            break;
        }
    }