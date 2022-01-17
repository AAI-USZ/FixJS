function(serializedSnippet)
{
    return new WebInspector.Snippet(this, serializedSnippet.id, serializedSnippet.name, serializedSnippet.content);
}