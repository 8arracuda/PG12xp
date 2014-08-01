app.initialize();

var sdApp = angular.module('sdApp', ["ngRoute", "mobile-angular-ui"]);

lsTest = '1';

sdApp.config(function ($routeProvider) {

    $routeProvider.

        when('/showPlanemodels/', {
            templateUrl: 'planemodels-list.html',
            controller: 'PlanemodelsListCtrl'
        }).
        when('/showPlanes/', {
            templateUrl: 'planes-list.html',
            controller: 'PlanesListCtrl'
        }).
        when('/showPlane/:planeId', {
            templateUrl: 'showPlane.html',
            controller: 'ShowPlaneCtrl'
        }).
        when('/editLandings/:planeId/:landingIndex', {
            templateUrl: 'editLandings.html',
            controller: 'EditLandingsCtrl'
        }).
        when('/editPlane/:planeId', {
            templateUrl: 'editPlane.html',
            controller: 'EditPlaneCtrl'
        }).
        when('/selectPlanemodelForPlane/:planeId', {
            templateUrl: 'selectPlanemodel.html',
            controller: 'SelectPlanemodelCtrl'
        }).
        when('/export', {
            templateUrl: 'export.html',
            controller: 'ExportCtrl'
        }).
        otherwise({
            redirectTo: '/showPlanes'
        });





});
