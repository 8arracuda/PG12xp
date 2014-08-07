sdApp.controller('AddEditPlanemodelCtrl', function ($scope, $routeParams, $http, dbParams) {

    $scope.planemodels = [];

    $scope.planemodelId = $routeParams.planemodelId;

    addPlanemodelToObjectStore = function (manufacturer, model, icao) {
        console.log('addPlanemodelToObjectStore start');


        var request = window.indexedDB.open(dbParams.dbName(), dbParams.dbVersion());

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
                alert(JSON.stringify(event));
            };

            //add planemodel
            var newPlanemodel = {};

            newPlanemodel.manufacturer = manufacturer;
            newPlanemodel.model = model;
            newPlanemodel.icao = icao;

            objectStore.add(newPlanemodel);

            db.close();
            alert('planemodel has been saved');
        };
    }

    //TODO: This method is firing twice - why?
    loadPlanemodelById = function (planemodelId) {
        console.log('loadPlanemodelById start');

        var request = indexedDB.open(dbParams.dbName(), dbParams.dbVersion());

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


    $scope.updatePlanemodel = function () {
        console.log('id ' + $scope.planemodelId);
        console.log('manu ' + $scope.planemodelManufacturer);
        console.log('model ' + $scope.planemodelModel);
        console.log('icao ' + $scope.planemodelIcao);

        var willAbort = false;

        if ($scope.planemodelManufacturer == "") {
            alert('you need to enter a manufacturer');
            willAbort = true;
        }

        if ($scope.planemodelModel == "") {
            alert('you need to enter a model');
            willAbort = true;
        }

        if ($scope.planemodelIcao == "") {
            alert('you need to enter a ICAO Code');
            willAbort = true;
        }

        if (willAbort == true) {
            return -1;
        } else {

            var request = indexedDB.open(dbParams.dbName(), dbParams.dbVersion());

            request.onsuccess = function (event) {
                var db = event.target.result;

                var request = db.transaction(["planemodels"], "readwrite")
                    .objectStore("planemodels")
                    .delete(parseInt($routeParams.planemodelId));
                request.onsuccess = function (event) {
                    alert('planemodel was deleted');
                    db.close();
                    addPlanemodelToObjectStore($scope.planemodelManufacturer, $scope.planemodelModel, $scope.planemodelIcao);
                }
            };
        }
    };

    $scope.deletePlanemodel = function() {
        var request = indexedDB.open(dbParams.dbName(), dbParams.dbVersion());

        request.onsuccess = function (event) {
            var db = event.target.result;

            var request = db.transaction(["planemodels"], "readwrite")
                .objectStore("planemodels")
                .delete(parseInt($routeParams.planemodelId));
            request.onsuccess = function (event) {
                alert('planemodel was deleted');
                db.close();
                location.href = "#/showPlanemodels"
            }
        };
    }

    $scope.savePlanemodel = function () {
        console.log('manu ' + $scope.planemodelManufacturer);
        console.log('model ' + $scope.planemodelModel);
        console.log('icao ' + $scope.planemodelIcao);

        var willAbort = false;

        if ($scope.planemodelManufacturer == "") {
            alert('you need to enter a manufacturer');
            willAbort = true;
        }

        if ($scope.planemodelModel == "") {
            alert('you need to enter a model');
            willAbort = true;
        }

        if ($scope.planemodelIcao == "") {
            alert('you need to enter a ICAO Code');
            willAbort = true;
        }

        if (willAbort == true) {
            return -1;
        } else {

            addPlanemodelToObjectStore($scope.planemodelManufacturer, $scope.planemodelModel, $scope.planemodelIcao);
            $scope.planemodelManufacturer = "";
            $scope.planemodelModel = "";
            $scope.planemodelIcao = "";
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