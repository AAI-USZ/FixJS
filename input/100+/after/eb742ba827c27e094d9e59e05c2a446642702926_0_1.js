function() {
      if( this._pause === null ) {
        org.eclipse.rwt.test.fixture.TestUtil.clearRequestLog();
        org.eclipse.rwt.test.fixture.TestUtil.clearTimerOnceLog();
        org.eclipse.rwt.test.fixture.TestUtil.restoreAppearance();
        org.eclipse.rwt.test.fixture.TestUtil.emptyDragCache();
        org.eclipse.rwt.test.fixture.TestUtil.resetEventHandler();
        org.eclipse.rwt.test.fixture.TestUtil.cleanUpKeyUtil();
        org.eclipse.rwt.test.fixture.TestUtil.clearErrorPage();
        org.eclipse.rwt.test.fixture.TestUtil.resetObjectManager();
        org.eclipse.rwt.EventHandler.setFocusRoot(
          qx.ui.core.ClientDocument.getInstance()
        );
      }
      qx.ui.core.Widget.flushGlobalQueues();
    }