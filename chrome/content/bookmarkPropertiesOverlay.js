var TagAllTabs = {
    /**
     * Called when the bookmarks dialog is opened. Makes the tags selector visible
     * and register it with BookmarkPropertiesPanel to handle dialog resizing.
     * @see http://mxr.mozilla.org/mozilla-release/source/browser/components/places/content/bookmarkProperties.js#448
     * @see http://mxr.mozilla.org/mozilla-release/source/browser/components/places/content/bookmarkProperties.js#382
     */
    onDialogLoad: function () {
        BookmarkPropertiesPanel._element("tagsRow").collapsed = false;
        BookmarkPropertiesPanel._element("tagsSelectorRow")
            .addEventListener("DOMAttrModified", BookmarkPropertiesPanel, false);
        window.sizeToContent();
    },
    /**
     * Called upon clicking the accept button. Obtains array of tags
     * and tags all the URIs.
     * @see http://mxr.mozilla.org/mozilla-release/source/browser/components/places/content/editBookmarkOverlay.js#842
     * @see https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsITaggingService#tagURI.28.29
     */
    onDialogAccept: function () {
        var URIs = BookmarkPropertiesPanel._URIs;

        for (var i = 0; i < URIs.length; ++i) {
            var URI = URIs[i];
            var tags = gEditItemOverlay._getTagsArrayFromTagField();
            PlacesUtils.tagging.tagURI(URI, tags);
        }
    }
}
