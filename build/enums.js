"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdParams = exports.Constants = exports.URLS = exports.Routes = void 0;
const constants_1 = require("./constants");
var Routes;
(function (Routes) {
    Routes["MAIN"] = "/";
    Routes["AUTH"] = "/auth";
    Routes["CONTACT"] = "/contact";
    Routes["GROUP"] = "/group";
    Routes["PROFILE"] = "/profile";
})(Routes || (exports.Routes = Routes = {}));
exports.URLS = {
    MAIN: constants_1.BASE_URL,
    ACTIVATE_USER: `${constants_1.BASE_URL}/auth/activateUser`,
};
var Constants;
(function (Constants) {
    Constants["ERROR"] = "error";
    Constants["IMAGE_DEFAULT"] = "https://e7.pngegg.com/pngimages/889/832/png-clipart-google-contacts-mobile-app-contact-manager-app-store-android-application-package-email-miscellaneous-blue.png";
})(Constants || (exports.Constants = Constants = {}));
var IdParams;
(function (IdParams) {
    IdParams["Id"] = "id";
    IdParams["IdUser"] = "idUser";
    IdParams["IdContact"] = "idContact";
    IdParams["IdGroup"] = "idGroup";
})(IdParams || (exports.IdParams = IdParams = {}));
