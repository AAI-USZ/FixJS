function Ok()
{
	var sUri, sInnerHtml, internalInnerHTML ;  // internalInnerHTML is for urls that are in fact internal media
    var wikiQS;  // internal link query string (DW Anteater or later)
    var current_ns = false;  // if internal link has no leading colon current_ns = true
    
	oEditor.FCKUndo.SaveUndoStep() ;

	switch ( GetE('cmbLinkType').value )
	{
		case 'url' :

			sUri = encodeURI(GetE('txtUrl').value) ;
            sUri = encodeURI(sUri) ;
			if ( sUri.length == 0 )
			{
				alert( FCKLang.DlnLnkMsgNoUrl ) ;
                remove_hold_a();
				return false ;
			}

			sUri = GetE('cmbLinkProtocol').value + sUri ;

			break ;

		case 'email' :
			sUri = GetE('txtEMailAddress').value ;

			if ( sUri.length == 0 )
			{
				alert( FCKLang.DlnLnkMsgNoEMail ) ;
                remove_hold_a();
				return false ;
			}

			sUri = oParser.CreateEMailUri(
				sUri,
				GetE('txtEMailSubject').value,
				GetE('txtEMailBody').value ) ;
			break ;

		case 'anchor' :
			var sAnchor = GetE('cmbAnchorName').value ;
			if ( sAnchor.length == 0 ) sAnchor = GetE('cmbAnchorId').value ;

			if ( sAnchor.length == 0 )
			{
				alert( FCKLang.DlnLnkMsgNoAnchor ) ;
                remove_hold_a();                
				return false ;
			}

			sUri = '#' + sAnchor ;
			break ;

	case 'internal' :
            var wiki_id  = GetE('txtDokuWikiId').value ;
			if ( wiki_id.length == 0 )
			{
				alert( FCKLang.DlgLnkIntText ) ;
                remove_hold_a();                
				return false ;
			}

            wikiQS = GetE('txtDokuWikiQS').value;          
            if((wikiQS=checkDokuQS(wikiQS)) === false) { 
                remove_hold_a();
                return;
            }

            var dwiki_dir = window.location.pathname;
      
            dwiki_dir = dwiki_dir.replace(/lib\/plugins.*$/, "");


        if(wiki_id.match(/^[^:]/)  && currentNameSpace)  {
             wiki_id = ':' + currentNameSpace + ':' + wiki_id; 
        }

            if(!wiki_id.match(/^:/)) {
			    wiki_id = ':' + wiki_id;  
			}
		
          sUri = dwiki_dir + 'doku.php?id=' + wiki_id;   
         
			break ;

	case 'other_mime' :
          //  var wiki_id = "wiki:syntax"; 
            var wiki_id  = GetE('txtExternalMime').value ;
            if(!wiki_id.match(/^:/)) wiki_id = ':' + wiki_id;  
			if ( wiki_id.length == 0 )
			{
				alert( FCKLang.DlgLnkMimeText ) ;
                remove_hold_a();                
				return false ;
			}

            var dwiki_dir = window.location.pathname;
      
            dwiki_dir = dwiki_dir.replace(/lib\/plugins.*$/, "");

            sUri = dwiki_dir + 'doku.php?id=' + wiki_id;  

			break ;

	case 'samba' :
            var share  = GetE('txtSMBShareId').value ;

			if ( share.length == 0 )
			{
				alert( FCKLang.DlgLnkSambaText ) ;
                remove_hold_a();                
				return false ;
			}          

            sUri =   share;       
			break ;


	}

	// If no link is selected, create a new one (it may result in more than one link creation - #220).
    var document_body = null;
	var aLinks = oLink ? [ oLink ] : oEditor.FCK.CreateLink( sUri, true ) ;

	// If no selection, no links are created, so use the uri as the link text (by dom, 2006-05-26)
	var aHasSelection = ( aLinks.length > 0 ) ;
     
	if ( !aHasSelection )
	{
    
     if(window.document.documentMode && window.document.documentMode == 9) {
        document_body = FCK.EditingArea.Document.body
      }
	  
       if(sUri.match(/%[a-fA-F0-9]{2}/)  && (matches = sUri.match(/userfiles\/file\/(.*)/))) {
          matches[1] = matches[1].replace(/\//g,':');
          if(!matches[1].match(/^:/)) {      
             matches[1] = ':' + matches[1];
          }
          internalInnerHTML = decodeURIComponent ? decodeURIComponent(matches[1]) : unescape(matches[1]);                               
          internalInnerHTML = decodeURIComponent ? decodeURIComponent(internalInnerHTML) : unescape(internalInnerHTML); 
      
      }
 	  else	sInnerHtml = sUri;

		// Built a better text for empty links.
		switch ( GetE('cmbLinkType').value )
		{
			// anchor: use old behavior --> return true
			case 'anchor':
				sInnerHtml = sInnerHtml.replace( /^#/, '' ) ;
				break ;

			// url: try to get path
			case 'url':
				var oLinkPathRegEx = new RegExp("//?([^?\"']+)([?].*)?$") ;
				var asLinkPath = oLinkPathRegEx.exec( sUri ) ;
				if (asLinkPath != null)
					sInnerHtml = asLinkPath[1];  // use matched path
				break ;

			// mailto: try to get email address
			case 'email':
				sInnerHtml = GetE('txtEMailAddress').value ;
				break ;
  
             // create link text for internal links and other mime types
            case 'internal':
            case 'other_mime': 
               var matches = sInnerHtml.match(/id=(.*)/);
               if(matches[1].match(/^:/)) {
                  sInnerHtml = matches[1];
               }
               
               break;
		}

		// Create a new (empty) anchor.
		aLinks = [ oEditor.FCK.InsertElement( 'a' ) ] ;
	}
  
    if(wikiQS) {
        wikiQS = wikiQS.replace(/^[\?\s]+/, "");         
        sUri +='?' + wikiQS;          
    }
    if(anchorOption.selection) {     
       sUri += '#' + anchorOption.selection;       
    }
	for ( var i = 0 ; i < aLinks.length ; i++ )
	{
		oLink = aLinks[i] ;

		if ( aHasSelection )
			sInnerHtml = oLink.innerHTML ;		// Save the innerHTML (IE changes it if it is like an URL).

		oLink.href =  sUri;
        if(internalInnerHTML) {
           sInnerHtml = internalInnerHTML;
        }

		SetAttribute( oLink, '_fcksavedurl', sUri ) ;

		var onclick;
		// Accessible popups
		if( GetE('cmbTarget').value == 'popup' )
		{
			onclick = BuildOnClickPopup() ;
			// Encode the attribute
			onclick = encodeURIComponent( " onclick=\"" + onclick + "\"" )  ;
			SetAttribute( oLink, 'onclick_fckprotectedatt', onclick ) ;
		}
		else
		{
			// Check if the previous onclick was for a popup:
			// In that case remove the onclick handler.
			onclick = oLink.getAttribute( 'onclick_fckprotectedatt' ) ;
			if ( onclick )
			{

				// Decode the protected string
				onclick = decodeURIComponent( onclick ) ;

				if( oRegex.OnClickPopup.test( onclick ) )
					SetAttribute( oLink, 'onclick_fckprotectedatt', '' ) ;
			}
		}

		oLink.innerHTML = sInnerHtml ;		// Set (or restore) the innerHTML

		// Target
		if( GetE('cmbTarget').value != 'popup' )
			SetAttribute( oLink, 'target', GetE('txtTargetFrame').value ) ;
		else
			SetAttribute( oLink, 'target', null ) ;

		// Let's set the "id" only for the first link to avoid duplication.
		if ( i == 0 )
			SetAttribute( oLink, 'id', GetE('txtAttId').value ) ;

		// Advances Attributes
		SetAttribute( oLink, 'name'		, GetE('txtAttName').value ) ;
		SetAttribute( oLink, 'dir'		, GetE('cmbAttLangDir').value ) ;
		SetAttribute( oLink, 'lang'		, GetE('txtAttLangCode').value ) ;
		SetAttribute( oLink, 'accesskey', GetE('txtAttAccessKey').value ) ;
		SetAttribute( oLink, 'tabindex'	, ( GetE('txtAttTabIndex').value > 0 ? GetE('txtAttTabIndex').value : null ) ) ;
		SetAttribute( oLink, 'title'	, GetE('txtAttTitle').value ) ;
		SetAttribute( oLink, 'type'		, GetE('txtAttContentType').value ) ;
		SetAttribute( oLink, 'charset'	, GetE('txtAttCharSet').value ) ;

        var sLinkType = GetE('cmbLinkType').value;
         var classes = GetE('txtAttClasses').value;
        if(sLinkType == 'other_mime') {
              SetAttribute( oLink, 'type', 'other_mime');                
              if(!classes.match(/mediafile/)) {
                 var matches = sUri.match(/\.(\w+)$/);
                 if(matches && matches[1]) {
                   GetE('txtAttClasses').value += ' mediafile mf_'+ matches[1] + ' ';   
                 }
                 else GetE('txtAttClasses').value += ' mediafile ';
             }
             if(matches[1].match(/(gif|jpg|png|jpeg)/)) {               
                    GetE('txtAttClasses').value = ' media ' + GetE('txtAttClasses').value;
                    SetAttribute( oLink, 'type', 'linkonly');                
           }
        }
        else if(sLinkType == 'internal') {
             if(!classes.match(/wikilink/)) {
                 GetE('txtAttClasses').value += ' wikilink1 ';
             }
             SetAttribute( oLink, 'type', 'internal');
             SetAttribute( oLink, 'title', GetE('txtDokuWikiId').value);
        }

        else if(sLinkType == 'url'){
            GetE('txtAttClasses').value = GetE('txtAttClasses').value.replace(/wikilink\d\s*/,"");
            GetE('txtAttClasses').value += ' urlextern ';
        }
        else if(sLinkType == 'samba'){
            GetE('txtAttClasses').value += ' windows ';
        }
        else if(sLinkType == 'email'){
            GetE('txtAttClasses').value += ' mail ';
        }


		if ( oEditor.FCKBrowserInfo.IsIE )
		{
			var sClass = GetE('txtAttClasses').value ;
			// If it's also an anchor add an internal class
			if ( GetE('txtAttName').value.length != 0 )
				sClass += ' FCK__AnchorC' ;
			SetAttribute( oLink, 'className', sClass ) ;

			oLink.style.cssText = GetE('txtAttStyle').value ;
		}
		else
		{
			SetAttribute( oLink, 'class', GetE('txtAttClasses').value ) ;
			SetAttribute( oLink, 'style', GetE('txtAttStyle').value ) ;
		}
	}


    if(document_body) {  
       var hold = FCK.EditingArea.Document.getElementById("hold_a");                  
       if(hold) {
          var hold_aParent = hold.parentNode;      
          hold_aParent.replaceChild(aLinks[0],hold);           
       }
       else {
            FCK.target.appendChild(aLinks[0]);
       }

       if(FCK.screen_x && FCK.screen_y) {
           oEditor.FCK.EditorDocument.parentWindow.scrollTo(FCK.screen_x,FCK.screen_y);
           FCK.screen_x=null; FCK.screen_y=null;
           FCK.mouse_x=null; FCK.mouse_y=null;
           
       }
       else {
            FCK.target.scrollIntoView();
       }    
       
       return true;
    }
   else {
       oEditor.FCKSelection.SelectNode(aLinks[0] );
       remove_hold_a();
   }     
    
	return true ;
}