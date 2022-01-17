function LoadSelection()
{
    remove_hold_a();
    if ( !oLink ) {     
        if(window.document.documentMode && window.document.documentMode == 9) {
            FCK.InsertHtml('&nbsp;<span id="hold_a" style="font-weight:bold">&nbsp;&nbsp;broken link insertion&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;'); 
            var dom = oEditor.FCK.EditorDocument.getElementById("hold_a");      
            var offset = _getOffset(dom);
            if(offset.top < 1) {
                remove_hold_a();
            }
     
            if(FCK.screen_x && FCK.screen_y) {
                oEditor.FCK.EditorDocument.parentWindow.scrollTo(FCK.screen_x,FCK.screen_y);
            }
       }
       
        return ;
    }

	var sType = 'url' ;
    

	// Get the actual Link href.
	var sHRef = oLink.getAttribute( '_fcksavedurl' ) ;  
	if ( sHRef == null ) {
		sHRef = oLink.getAttribute( 'href' , 2 ) || '' ;
	}
    

	// Look for a popup javascript link.
	var oPopupMatch = oRegex.PopupUri.exec( sHRef ) ;
	if( oPopupMatch )
	{
		GetE('cmbTarget').value = 'popup' ;
		sHRef = oPopupMatch[1] ;
		FillPopupFields( oPopupMatch[2], oPopupMatch[3] ) ;
		SetTarget( 'popup' ) ;
	}

	// Accessible popups, the popup data is in the onclick attribute
	if ( !oPopupMatch )
	{
		var onclick = oLink.getAttribute( 'onclick_fckprotectedatt' ) ;
		if ( onclick )
		{
			// Decode the protected string
			onclick = decodeURIComponent( onclick ) ;

			oPopupMatch = oRegex.OnClickPopup.exec( onclick ) ;
			if( oPopupMatch )
			{
				GetE( 'cmbTarget' ).value = 'popup' ;
				FillPopupFields( oPopupMatch[1], oPopupMatch[2] ) ;
				SetTarget( 'popup' ) ;
			}
		}
	}

	// Search for the protocol.
	var sProtocol = oRegex.UriProtocol.exec( sHRef ) ;
	var sClass ;
	if ( oEditor.FCKBrowserInfo.IsIE )
	{
		sClass	= oLink.getAttribute('className',2) || '' ;
		// Clean up temporary classes for internal use:
		sClass = sClass.replace( FCKRegexLib.FCK_Class, '' ) ;

		GetE('txtAttStyle').value	= oLink.style.cssText ;
	}
	else
	{
		sClass	= oLink.getAttribute('class',2) || '' ;
		GetE('txtAttStyle').value	= oLink.getAttribute('style',2) || '' ;
	}

	GetE('txtAttClasses').value	= sClass ;

	// Search for a protected email link.
	var oEMailInfo = oParser.ParseEMailUri( sHRef );

	if ( oEMailInfo )
	{
		sType = 'email' ;

		GetE('txtEMailAddress').value = oEMailInfo.Address ;
		GetE('txtEMailSubject').value = oEMailInfo.Subject ;
		GetE('txtEMailBody').value    = oEMailInfo.Body ;
	}
	else if ( sProtocol )
	{
		sProtocol = sProtocol[0].toLowerCase() ;
		GetE('cmbLinkProtocol').value = sProtocol ;

		// Remove the protocol and get the remaining URL.
		var sUrl = sHRef.replace( oRegex.UriProtocol, '' ) ;
		sType = 'url' ;
		GetE('txtUrl').value = sUrl ;
	}
	else if ( sHRef.substr(0,1) == '#' && sHRef.length > 1 )	// It is an anchor link.
	{
		sType = 'anchor' ;
		GetE('cmbAnchorName').value = GetE('cmbAnchorId').value = sHRef.substr(1) ;
	}
	else					// It is another type of link.
	{
		sType = 'url' ;
                
        var m;

        if(m = sHRef.match(oRegex.doku_base)) {
          sHRef = sHRef.replace(oRegex.doku_base,"");        
          sHRef = decodeURI(sHRef) ;      
      
          if( (m = sHRef.match(oRegex.media_internal))  || 
              (m = sHRef.match(oRegex.media_rewrite_1)) || 
              (m = sHRef.match(oRegex.media_rewrite_2)) 
            ){
              sType = 'other_mime';
              var ns = setDokuNamespace(m[1]);
       	      GetE("txtExternalMime").value =  ns; 
          }
          else {
                sType = 'internal';

                if(!(m = sHRef.match(oRegex.internal_link))) {
                  m =  sHRef.match(oRegex.internal_link_rewrite_2);
                }
                if(m) {
                  var ns = setDokuNamespace(m[1]);
                  if(ns.match(/\.\w+$/) && !sClass.match(/wikilink/)) { 
                      // before save internal media look like internal link but have an extension
                      GetE("txtExternalMime").value =  ns;   
                      sType = 'other_mime';  
                  }
              	  else {
                    GetE("txtDokuWikiId").value = checkForQueryString(ns);  
              	  }
                }
                else {
                   GetE("txtDokuWikiId").value = checkForQueryString(setDokuNamespace(sHRef));  
                }
          }                
        }
      else if(m=sHRef.match(oRegex.samba)) {
         var share = m[1].replace(/\//g,'\\');
         share = '\\\\' + share;
         GetE('txtSMBShareId').value = share;
         sType = 'samba';
      }
     else if(m=sHRef.match(oRegex.samba_unsaved)) {         
          sType = 'samba';
          GetE('txtSMBShareId').value = sHRef;
      }

	 GetE('cmbLinkProtocol').value = '' ;
	 GetE('txtUrl').value = sHRef ;
	}

	if ( !oPopupMatch )
	{
		// Get the target.
		var sTarget = oLink.target ;

		if ( sTarget && sTarget.length > 0 )
		{
			if ( oRegex.ReserveTarget.test( sTarget ) )
			{
				sTarget = sTarget.toLowerCase() ;
				GetE('cmbTarget').value = sTarget ;
			}
			else
				GetE('cmbTarget').value = 'frame' ;
			GetE('txtTargetFrame').value = sTarget ;
		}
	}

	// Get Advances Attributes
	GetE('txtAttId').value			= oLink.id ;
	GetE('txtAttName').value		= oLink.name ;
	GetE('cmbAttLangDir').value		= oLink.dir ;
	GetE('txtAttLangCode').value	= oLink.lang ;
	GetE('txtAttAccessKey').value	= oLink.accessKey ;
	GetE('txtAttTabIndex').value	= oLink.tabIndex <= 0 ? '' : oLink.tabIndex ;
	GetE('txtAttTitle').value		= oLink.title ;
	GetE('txtAttContentType').value	= oLink.type ;
	GetE('txtAttCharSet').value		= oLink.charset ;

	// Update the Link type combo.
	GetE('cmbLinkType').value = sType ;
}