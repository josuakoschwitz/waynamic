"use strict";var App;App=angular.module("app",["ngCookies","ngResource","ngRoute","app.controllers","app.directives","app.filters","app.services","partials"]),App.config(["$routeProvider","$locationProvider",function(e,r){return e.when("/",{templateUrl:"/partials/landingpage.html"}).when("/pictures",{templateUrl:"/partials/pictures.html"}).when("/profile",{templateUrl:"/partials/profile.html"}).when("/import",{templateUrl:"/partials/import.html"}).when("/register",{templateUrl:"/partials/register.html"}).when("/login",{templateUrl:"/partials/login.html"}).when("/logout",{templateUrl:"/partials/logout.html"}).otherwise({redirectTo:"/"}),r.html5Mode(!1)}]),angular.module("app.controllers",[]).controller("AppCtrl",["$scope","$location","$resource","$rootScope",function(e,r){return e.$location=r,e.$watch("$location.path()",function(r){return e.activeNavId=r||"/"}),e.getClass=function(r){return e.activeNavId.substring(0,r.length)===r?"active":""}}]).controller("PicturesCtrl",["$scope","Pictures",function(e,r){return e.currentPictures=[{tags:["Sonne","Strand","Meer"],title:"tramonto in Grecia (Loutraki - golfo di Corinto)",url:"http://farm8.staticflickr.com/7295/13972537026_913a8a116b.jpg"},{title:"Lac de Capitello, een paternostermeer, Corsica Frankrijk 2002",url:"http://farm6.staticflickr.com/5218/13981158706_c497a0feff.jpg",tags:["lacdecapitello","paternostermeer","meer","lake","lac","corsica","corse","frankrijk","france","2002"]}],e.requestPictures=function(t){return r.getForKeywords(t,function(r,t){return r?alert(r):(console.log(t.data),e.currentPictures=t.data)})},e.nextPicturesByUrl=function(r){var t;return t=_.filter(e.currentPictures,function(e){return e.url===r})[0],e.requestPictures((null!=t?t.tags:void 0)||[])},e.nextPicturesByTag=function(r){return e.requestPictures([r])}}]),angular.module("app.directives",["app.services"]).directive("appVersion",["version",function(e){return function(r,t){return t.text(e)}}]),angular.module("app.filters",[]).filter("interpolate",["version",function(e){return function(r){return String(r).replace(/\%VERSION\%/gm,e)}}]),angular.module("app.services",[]).service("User",["$http",function(e){var r;return r={name:null,loggedIn:!1},{currentUser:function(){return r},login:function(r,t,n){return e.post("/login",{username:r,password:t}).then(function(e){return"function"==typeof n?n(null,e):void 0},function(e){return"function"==typeof n?n({error:e.error||"Name or password invalid!"},null):void 0})},logout:function(){return e.post("/logout").then(function(){return r={name:null,loggedIn:!1}},function(){return r={name:null,loggedIn:!1}})},register:function(r,t,n){return e.post("/register",{username:r,password:t}).then(function(e){return"function"==typeof n?n(null,e):void 0},function(e){return"function"==typeof n?n({server:e.error},null):void 0})},checkSession:function(){return e.get("/loggedin").then(function(e){return r.name=e.data.name,r.loggedIn=!0},function(){})}}}]).service("Pictures",["$http",function(e){return{getForKeywords:function(r,t){return e.get("/pictures?keywords="+r.join(",")).then(function(e){return"function"==typeof t?t(null,e):void 0},function(){return"function"==typeof t?t({error:"Something went wrong. Flickr unavailable?"},null):void 0})}}}]);