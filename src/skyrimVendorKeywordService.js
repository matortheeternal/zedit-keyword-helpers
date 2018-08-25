ngapp.service('skyrimVendorKeywordService', function(keywordService) {
    // INHERITED FUNCTIONS
    // getVendor, inferVendor,
    // getVendorKeyword, setVendorKeyword
    keywordService.buildFunctions(this, 'Vendor', {
        expr: /^Vendor(?:Item)?(\w+)/,
        getExpr: str => new RegExp('Vendor(?:Item)?' + str + '$'),
        getRuleKey: xelib.Signature,
        rules: `${patcherPath}\\resources\\skyrimVendorRules.json`
    });
});