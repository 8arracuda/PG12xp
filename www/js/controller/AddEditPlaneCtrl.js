sdApp.controller('AddEditPlaneCtrl', function ($scope, $routeParams, $http, dbParams) {

    $scope.planes = [];

    dbName = dbParams.dbName();
    dbVersion = dbParams.dbVersion();
    $scope.planeId = $routeParams.planeId;

    addPlaneToObjectStore = function (reg) {
        console.log('addPlaneToObjectStore start');


        var request = window.indexedDB.open(dbName, dbVersion);

        request.onerror = function (event) {
            console.error('request.onerror');
            alert("Database error: " + event.target.errorCode);
        };
        request.onsuccess = function (event) {
            console.log('request.onsuccess');
            db = request.result;

            var transaction = db.transaction("planes", "readwrite");
            var objectStore = transaction.objectStore("planes");

            transaction.oncomplete = function (event) {
                console.log('add - transaction.oncomplete');
            };

            transaction.onerror = function (event) {
                console.error('add - transaction.onerror');
                alert(JSON.stringify(event));
            };

            //add plane
            var newPlane = {};

            newPlane.reg = reg;

            objectStore.add(newPlane);

            db.close();
            alert('plane has been saved');
        };
    }

    //TODO: This method is firing twice - why?
    loadPlaneById = function (planeId) {
        console.log('loadPlaneById start');

        var request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function (event) {
            var db = event.target.result;
            var trans = db.transaction("planes", "readonly");
            var store = trans.objectStore("planes");

            var request = store.get(planeId); //getting single object by id from object store

            request.onsuccess = function (event) {
                db.close();
                plane = event.target.result; //data received
                $scope.planeReg = plane.reg;
                $scope.$apply();
            };

            request.onerror = function (event) {
                console.log("Error Getting: ", event);
            };
        }
    }


    $scope.updatePlane = function () {
        console.log('id ' + $scope.planeId);
        console.log('reg ' + $scope.planeReg);

        var willAbort = false;

        if ($scope.planeReg == "") {
            alert('you need to enter a Reg');
            willAbort = true;
        }

        if (willAbort == true) {
            return -1;
        } else {

            var request = indexedDB.open(dbName, dbVersion);

            request.onsuccess = function (event) {
                var db = event.target.result;

                var request = db.transaction(["planes"], "readwrite")
                    .objectStore("planes")
                    .delete(parseInt($routeParams.planeId));
                request.onsuccess = function (event) {
                    alert('plane was deleted');
                    db.close();
                    addPlaneToObjectStore($scope.planeReg);
                }
            };
        }
    };

    $scope.deletePlane = function() {
        var request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function (event) {
            var db = event.target.result;

            var request = db.transaction(["planes"], "readwrite")
                .objectStore("planes")
                .delete(parseInt($routeParams.planeId));
            request.onsuccess = function (event) {
                alert('plane was deleted');
                db.close();
                location.href = "#/showPlanes"
            }
        };
    }

    $scope.savePlane = function () {
        console.log('reg ' + $scope.planeReg);

        var willAbort = false;

        if ($scope.planeReg == "") {
            alert('you need to enter a reg');
            willAbort = true;
        }

        if (willAbort == true) {
            return -1;
        } else {

            addPlaneToObjectStore($scope.planeReg);
            $scope.planeReg = "";
        }
    }

    if ($routeParams.planeId) {
        var editMode = true;
        $scope.titleString = "Edit Plane";
        loadPlaneById(parseInt($routeParams.planeId));
    } else {
        var editMode = false;
        $scope.titleString = "Add Plane";
        $scope.planeReg = "";
    }
    $scope.editMode = editMode;

});