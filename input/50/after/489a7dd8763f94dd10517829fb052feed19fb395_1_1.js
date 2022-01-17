function(storage, serializedSnippet)
{
    return new WebInspector.Snippet(storage, serializedSnippet.id, serializedSnippet.name, serializedSnippet.content);
}