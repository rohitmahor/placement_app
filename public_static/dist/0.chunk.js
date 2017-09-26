webpackJsonp([0,7],{

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__companies_component__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__companies_routing__ = __webpack_require__(627);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompaniesModule", function() { return CompaniesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var CompaniesModule = (function () {
    function CompaniesModule() {
    }
    return CompaniesModule;
}());
CompaniesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__companies_routing__["a" /* routing */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__companies_component__["a" /* CompaniesComponent */]
        ]
    })
], CompaniesModule);

//# sourceMappingURL=companies.module.js.map

/***/ }),

/***/ 625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__(388);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompaniesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CompaniesComponent = (function () {
    function CompaniesComponent(_http) {
        this._http = _http;
        this.companies = [];
        this.applied = [];
    }
    CompaniesComponent.prototype.ngOnInit = function () {
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
    CompaniesComponent.prototype.checkIfApplied = function (name, desig) {
        var flag = true;
        if (this.applied[0])
            for (var i = 0; i < this.applied.length; i++) {
                if (this.applied[i].cmpName == name && this.applied[i].cmpDesig == desig) {
                    flag = false;
                    break;
                }
            }
        return flag;
    };
    CompaniesComponent.prototype.apply = function (name, desig) {
        var _this = this;
        console.log({ 'cmpName': name, 'cmpDesig': desig });
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this._http
            .post(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* baseUrl */] + 'apply', { 'cmpName': name, 'cmpDesig': desig }, headers)
            .subscribe(function (res) {
            _this.applied.push({ 'cmpName': name, 'cmpDesig': desig });
        }, function (error) {
            console.log(error);
        });
    };
    return CompaniesComponent;
}());
CompaniesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Component */])({
        selector: 'companies',
        template: __webpack_require__(629),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], CompaniesComponent);

var _a;
//# sourceMappingURL=companies.component.js.map

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__companies_component__ = __webpack_require__(625);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });


var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__companies_component__["a" /* CompaniesComponent */]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(routes);
//# sourceMappingURL=companies.routing.js.map

/***/ }),

/***/ 629:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"ui four cards\" *ngIf=\"companies.length!=0; else noCompanyAvailable\">\r\n  <ng-container *ngFor=\"let company of companies\">\r\n  <ng-container *ngFor=\"let jnf of company['jnf']\">\r\n  <ng-container  *ngIf=\"checkIfApplied(company?.cmpDetails?.name, jnf?.jobDesig)\">\r\n  <div class=\"ui raised card\">\r\n    <div class=\"content\">\r\n      <div class=\"header\">{{company?.cmpDetails?.name}}</div>\r\n    </div>\r\n    <div class=\"content\">\r\n      <h4 class=\"ui sub header\">{{jnf?.jobDesig}}</h4>\r\n      <div class=\"ui small feed\">\r\n        <div class=\"event\">\r\n          <div class=\"content\">\r\n            <div class=\"summary\">\r\n              {{jnf?.description}}\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"extra content\">\r\n      <button class=\"ui button\" (click)=\"apply(company?.cmpDetails?.name , jnf?.jobDesig)\">Apply</button>\r\n    </div>\r\n  </div>\n  </ng-container>\n  </ng-container>\n  </ng-container>\n</div>\r\n<ng-template #noCompanyAvailable>No company available</ng-template>\r\n"

/***/ })

});
//# sourceMappingURL=0.chunk.js.map