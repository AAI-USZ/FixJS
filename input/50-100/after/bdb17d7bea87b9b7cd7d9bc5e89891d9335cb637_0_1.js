function()
    {
        HordeCore.initHandler('click');

        // Observe actual form element since IE does not bubble change events.
        $('action_choose0', 'action_choose1').compact().invoke('observe', 'change', this.changeHandler.bindAsEventListener(this));

        if (this.mbox_expand) {
            $('fmanager').observe('Horde_Tree:collapse', this.toggleSubfolder.bindAsEventListener(this, 'collapse'));
            $('fmanager').observe('Horde_Tree:expand', this.toggleSubfolder.bindAsEventListener(this, 'expand'));
        }
    }