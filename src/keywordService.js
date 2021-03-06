ngapp.service('keywordService', function(keywordCacheService, keywordRuleService) {
    let {cache, buildCache, resolveKeyword} = keywordCacheService;
    let {buildInfer} = keywordRuleService;

    this.buildFunctions = function(service, key, options) {
        let {expr, getExpr} = options;

        let infer = buildInfer(service, key, options);

        let get = function(rec) {
            if (!xelib.HasElement(rec, 'KWDA')) return;
            let elements = xelib.GetElements(rec, 'KWDA');
            return xelib.WithHandles(elements, keywords => {
                for (let i = 0; i < keywords.length; i++) {
                    let keyword = xelib.GetRefEditorID(keywords[i], ''),
                        match = keyword.match(expr);
                    if (match) return match[1];
                }
            });
        };

        let getKeyword = function(rec) {
            if (!xelib.HasElement(rec, 'KWDA')) return;
            let elements = xelib.GetElements(rec, 'KWDA');
            return xelib.WithHandles(elements, keywords => {
                for (let i = 0; i < keywords.length; i++) {
                    let keyword = keywords[i],
                        edid = xelib.GetRefEditorID(keyword, '');
                    if (expr.test(edid)) return xelib.GetElement(keyword);
                }
            });
        };

        let addKeyword = function(rec, value) {
            if (!value) return;
            let keyword = getKeyword(rec);
            if (!keyword) return xelib.AddKeyword(rec, value);
            xelib.SetValue(keyword, value);
            return keyword;
        };

        let setKeyword = function(rec, str) {
            if (!str) str = infer && infer(rec);
            if (!str) return;
            if (!keywordCacheService.cacheBuilt) buildCache();
            let keyword = resolveKeyword(rec, str, getExpr);
            return addKeyword(rec, cache[keyword]);
        };

        service[`get${key}`] = get;
        service[`get${key}Keyword`] = getKeyword;
        service[`set${key}Keyword`] = setKeyword;
    };
});