/* global ngapp, xelib, modulePath */

// == BEGIN ANGULAR SERVICES ==
//= require src/*.js
// == END ANGULAR SERVICES ==

ngapp.run(function(interApiService, skyrimArmorKeywordService, skyrimClothingKeywordService, skyrimMaterialService, skyrimVendorKeywordService, skyrimWeaponKeywordService, keywordCacheService) {
    interApiService.register({
        api: {
            skyrimArmorKeywordService,
            skyrimClothingKeywordService,
            skyrimMaterialService,
            skyrimVendorKeywordService,
            skyrimWeaponKeywordService,
            keywordCacheService
        }
    });
});