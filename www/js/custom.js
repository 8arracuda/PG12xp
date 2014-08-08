var sdApp = angular.module('sdApp', ["ngRoute", "mobile-angular-ui"]);

lsTest = '1';

sdApp.config(function ($routeProvider) {

    $routeProvider.
        when('/showPlanemodels/', {
            templateUrl: 'planemodels-list.html',
            controller: 'PlanemodelsListCtrl'
        }).
//        when('/showPlanemodelsTest/', {
//            templateUrl: 'planemodels-listTest.html',
//            controller: 'PlanemodelsListTestCtrl'
//        }).
        when('/showPlanes', {
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
//        when('/editPlane/:planeId', {
//            templateUrl: 'editPlane.html',
//            controller: 'EditPlaneCtrl'
//        }).
        when('/selectPlanemodelForPlane/:planeId', {
            templateUrl: 'selectPlanemodelForPlane.html',
            controller: 'SelectPlanemodelForPlaneCtrl'
        }).
        when('/addPlanemodel/', {
            templateUrl: 'addEditPlanemodel.html',
            controller: 'AddEditPlanemodelCtrl'
        }).
        when('/editPlanemodel/:planemodelId', {
            templateUrl: 'addEditPlanemodel.html',
            controller: 'AddEditPlanemodelCtrl'
        }).
        when('/addPlane/', {
            templateUrl: 'addEditPlane.html',
            controller: 'AddEditPlaneCtrl'
        }).
        when('/editPlane/:planeId', {
            templateUrl: 'addEditPlane.html',
            controller: 'AddEditPlaneCtrl'
        }).
        when('/selectPlanemodel/', {
            templateUrl: 'selectPlanemodel.html',
            controller: 'SelectPlanemodelCtrl'
        }).
        when('/export', {
            templateUrl: 'export.html',
            controller: 'ExportCtrl'
        }).
        when('/about', {
            templateUrl: 'about.html',
            controller: 'AboutCtrl'
        }).
        otherwise({
            redirectTo: '/showPlanes'
        });

});


//init the database - calls onupgradeneeded when necessary
const dbName = "PG12xp";
const dbVersion = 2;

sdApp.factory('dbParams', function () {
    return {
        dbName: function () {
            return dbName;
        },
        dbVersion: function () {
            return dbVersion;
        }
    };
});


function initDatabase() {
    console.log('initDatabase start');

    if (!window.indexedDB) {
        window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
    } else {

        var request = window.indexedDB.open(dbName, dbVersion);

        request.onerror = function (event) {
            console.error('request.onerror');
            alert("Database error: " + event.target.errorCode);
            // Machen Sie etwas mit request.errorCode!

        };
        request.onsuccess = function (event) {
            console.log('request.onsuccess');

            //do nothing here...

            //db = request.result;
            // Machen Sie etwas mit request.result!

        };

        request.onupgradeneeded = function (event) {
            console.log('onupgradeneeded start');
            console.log('onupgradeneeded - oldVersion: ' + event.oldVersion);
            var db = event.target.result;

            // Create an objectStore to hold information about our customers. We're
            // going to use "ssn" as our key path because it's guaranteed to be
            // unique.

            //TODO: Was passiert, wenn noch keine Datenbank angelegt ist -> loeschen fuehrt dann zu einem Fehler
//                if (event.oldVersion > 0 ) {
//                    db.deleteObjectStore("planes");
//                    console.log('deleted objectstore planes');
//
//                    db.deleteObjectStore("planemodels");
//                    console.log('deleted objectstore planemodels');
//                }


            //init ObjectStore Planemodels
            var objectStore = db.createObjectStore("planemodels", { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("id", "id", { unique: true });


            //init ObjectStore Planes
            var objectStore = db.createObjectStore("planes", { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("id", "id", { unique: true });

            // Create an index to search customers by name. We may have duplicates
            // so we can't use a unique index.
            //objectStore.createIndex("name", "name", { unique: false });

            // Create an index to search customers by email. We want to ensure that
            // no two customers have the same email, so use a unique index.
            //objectStore.createIndex("email", "email", { unique: true });


            // Store values in the newly created objectStore.
            //for (var i in planes) {
            //    objectStore.add(planes[i]);
            //}
            console.log('initDatabase end');
        }
    }
}

initDatabase();

