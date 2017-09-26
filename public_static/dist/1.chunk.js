webpackJsonp([1,7],{

/***/ 622:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_nga_module__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__applied_component__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__applied_routing__ = __webpack_require__(626);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppliedModule", function() { return AppliedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppliedModule = (function () {
    function AppliedModule() {
    }
    return AppliedModule;
}());
AppliedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__theme_nga_module__["a" /* NgaModule */],
            __WEBPACK_IMPORTED_MODULE_5__applied_routing__["a" /* routing */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__applied_component__["a" /* AppliedComponent */],
        ],
        providers: []
    })
], AppliedModule);

//# sourceMappingURL=applied.module.js.map

/***/ }),

/***/ 624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__(388);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppliedComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppliedComponent = (function () {
    function AppliedComponent(_http) {
        this._http = _http;
        this.sidebarOpened = false;
        this.companies = [];
        this.applied = [];
    }
    AppliedComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* baseUrl */] + 'jnf');
        this._http
            .post(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* baseUrl */] + 'jnf', { "type": "get" }, headers)
            .subscribe(function (res) {
            var temp = JSON.parse(res['_body']);
            _this.companies = temp.companies;
            _this.applied = temp.applied;
            console.log(_this.companies);
            console.log(_this.applied);
            console.log(temp);
        }, function (error) {
            console.log(error);
        });
    };
    AppliedComponent.prototype.openSidebar = function (item) {
        this.sidebarOpened = true;
        this.selectedCompany = item;
    };
    AppliedComponent.prototype.closeSidebar = function () {
        this.sidebarOpened = false;
    };
    AppliedComponent.prototype.checkIfApplied = function (name, desig) {
        var flag = false;
        if (this.applied[0])
            for (var i = 0; i < this.applied.length; i++) {
                if (this.applied[i].cmpName == name && this.applied[i].cmpDesig == desig) {
                    flag = true;
                    break;
                }
            }
        return flag;
    };
    return AppliedComponent;
}());
AppliedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Component */])({
        selector: 'applied',
        template: __webpack_require__(628),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AppliedComponent);

var _a;
//# sourceMappingURL=applied.component.js.map

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__applied_component__ = __webpack_require__(624);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });


var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__applied_component__["a" /* AppliedComponent */]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(routes);
//# sourceMappingURL=applied.routing.js.map

/***/ }),

/***/ 628:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"widgets row\">\r\n  <div [ngClass]=\"sidebarOpened ? 'col-8' : 'col-12'\">\r\n    <ba-card baCardClass=\"with-scroll table-panel\">\r\n      <div class=\"horizontal-scroll\">\r\n        <table class=\"table table-hover\">\r\n          <thead>\r\n          <tr class=\"black-muted-bg\">\r\n            <!-- <th class=\"browser-icons\"></th> -->\r\n            <th>Company Name</th>\r\n            <th class=\"align-right\">Designation</th>\r\n            <!-- <th class=\"align-right\">Purchases</th>\r\n            <th class=\"align-right\">%</th> -->\r\n          </tr>\r\n          </thead>\r\n          <tbody>\r\n          <ng-container *ngFor=\"let company of companies\">\n            <ng-container *ngFor=\"let jnf of company['jnf']\">\n              <tr *ngIf=\"checkIfApplied(company?.cmpDetails?.name, jnf?.jobDesig)\"  class=\"no-top-border\"  (click)=\"openSidebar(company)\">\r\n                <!-- <td><img src=\"{{ ( item.image | baAppPicture ) }}\" width=\"20\" height=\"20\"></td> -->\r\n                <td ngClass=\"nowrap\">{{company?.cmpDetails?.name}}</td>\r\n                <td class=\"align-right\">{{jnf?.jobDesig}}</td>\r\n                <!-- <td class=\"align-right\">{{item.purchases}}</td>\r\n                <td class=\"align-right\">{{item.percent}}</td> -->\r\n              </tr>\r\n            </ng-container>\r\n          </ng-container>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </ba-card>\r\n  </div>\r\n  <div *ngIf=\"sidebarOpened\" class=\"col-4 sidebar\">\n    <ba-card baCardClass=\"table-panel\">\r\n      <div class=row>\n        {{selectedCompany.name}}\n        <span style=\"margin-left: auto\" (click)=\"closeSidebar()\"><i class=\"fa fa-times\" aria-hidden=\"true\" style=\"cursor:pointer\"></i></span>\n      </div>\n      <hr />\n      <div class=\"row\">\n        Details\n      </div>\n    </ba-card>\r\n  </div>\r\n</div>\r\n"

/***/ })

});
//# sourceMappingURL=1.chunk.js.map