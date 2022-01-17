function fixAll ()
{
	if (fixAll.__pmc__called)
		return
	fixAll.__pmc__called = true
	
	fixNodes(doc.all)
}