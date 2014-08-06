sdApp.controller('AddEditPlanemodelCtrl', function ($scope, $routeParams, $http) {


    if ($routeParams.planemodelId) {
        var editMode = true;
    } else {
        var editMode = false;
    }

    $scope.planemodelIndex = 0;

    $scope.planemodels = [];

    const dbName = "planemodels";
    const dbVersion = 1;

    $scope.planemodelManufacturer = "";
    $scope.planemodelModel = "";
    $scope.planemodelIcao = "";

    if (editMode == true) {

        //alert('Mode: Edit');
        console.log('Mode: Edit');
    } else {

        //alert('Mode: Add');
        console.log('Mode: Add');
    }

    addPlanemodelToObjectStore = function (manufacturer, model, icao) {
        console.log('addPlanemodelToObjectStore start');


        var request = window.indexedDB.open(dbName, dbVersion);

        request.onerror = function (event) {
            console.error('request.onerror');
            alert("Database error: " + event.target.errorCode);
        };
        request.onsuccess = function (event) {
            console.log('request.onsuccess');
            db = request.result;

            var transaction = db.transaction("planemodels", "readwrite");
            var objectStore = transaction.objectStore("planemodels");

            transaction.oncomplete = function (event) {
                console.log('add - transaction.oncomplete');

            };

            transaction.onerror = function (event) {
                console.error('add - transaction.onerror');
            };

            //add planemodel
            var newPlanemodel = {};

            newPlanemodel.id = 42;
            newPlanemodel.manufacturer = manufacturer;
            newPlanemodel.model = model;
            newPlanemodel.icao = icao;

            objectStore.add(newPlanemodel);


            db.close();
        };
    }


});