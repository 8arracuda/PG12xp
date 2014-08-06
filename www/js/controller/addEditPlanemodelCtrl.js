sdApp.controller('AddEditPlanemodelCtrl', function ($scope, $routeParams, $http) {

    $scope.planemodelIndex = 0;

    $scope.planemodels = [];

    const dbName = "planemodels";
    const dbVersion = 1;

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

    //TODO: This method is firing twice - why?
    loadPlanemodelById = function (planemodelId) {
        console.log('loadPlanemodelById start');

        var request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function (event) {
            var db = event.target.result;
            var trans = db.transaction("planemodels", "readonly");
            var store = trans.objectStore("planemodels");

            var request = store.get(planemodelId); //getting single object by id from object store

            request.onsuccess = function (event) {
                db.close();
                planemodel = event.target.result; //data received
                $scope.planemodelManufacturer = planemodel.manufacturer;
                $scope.planemodelModel = planemodel.model;
                $scope.planemodelIcao = planemodel.icao;
                $scope.$apply();

            };

            request.onerror = function (event) {
                console.log("Error Getting: ", event);
            };
        }

    }

    if ($routeParams.planemodelId) {
        var editMode = true;
        $scope.titleString = "Edit Planemodel";
        loadPlanemodelById(parseInt($routeParams.planemodelId));
    } else {
        var editMode = false;
        $scope.titleString = "Add Planemodel";
        $scope.planemodelManufacturer = "";
        $scope.planemodelModel = "";
        $scope.planemodelIcao = "";
    }
    $scope.editMode = editMode;

});