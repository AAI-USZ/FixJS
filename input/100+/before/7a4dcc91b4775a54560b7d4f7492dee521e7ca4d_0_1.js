function _showTopLevel( event, menuID, substituteValues, menuHeader, disableIDList, disableMenuID )
{
    if ( !document.getElementById( menuID ) ) return;
    var mousePos = _mouseHandler( event ); // register new mouse position

    if ( substituteValues != -1 ) // new topmenu
    {
        _hideAll();
        CurrentSubstituteValues = substituteValues;
    }

    if ( disableIDList && disableIDList != -1 )
    {
        CurrentDisableIDList = disableIDList.push !== undefined ? disableIDList : [disableIDList];
    }

    CurrentDisableMenuID = disableMenuID;

    _doItemSubstitution( menuID, menuHeader );

    // make menu visible
    _moveTopLevelOnScreen( menuID, mousePos );
    _makeVisible( menuID );
}