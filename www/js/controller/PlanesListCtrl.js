sdApp.controller('PlanesListCtrl', function ($scope, $routeParams, $http, dbParams) {




    $scope.enableTab1 = function () {
        $scope.tab = 1;
        $scope.stringForTitle = 'List';
        $scope.stringForRightButton = 'LST';
    }

    $scope.enableTab2 = function () {
        $scope.tab = 2;
        $scope.stringForTitle = 'Actions';
        $scope.stringForRightButton = 'ACT';
    }

    $scope.enableTab3 = function () {
        $scope.tab = 3;
        $scope.stringForTitle = 'Export';
        $scope.stringForRightButton = 'EXP';
    }


    initPlanes = function () {
        console.log('initPlanes start');

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
                db = request.result;
                // Machen Sie etwas mit request.result!

                $scope.showList();

            };

            request.onupgradeneeded = function (event) {
                console.log('onupgradeneeded started in a wrong place');
            }
        }
    };


    $scope.showList = function () {

        $scope.planes = [];
        var objectStoreName = "planes";

        var tx = db.transaction(objectStoreName, "readonly");
        var objectStore = tx.objectStore(objectStoreName);

        var counter = 0;
        objectStore.openCursor().onsuccess = function (event) {

            //alert('objectStore.openCursor().onsuccess');
            var cursor = event.target.result;
            if (cursor) {
                $scope.planes.push(cursor.value);
                counter++;
                cursor.continue();
            }
            else {
                //cusor has no more items
                console.log("showList - loaded " + counter + " items");
                $scope.$apply();
            }
        };
    };


    $scope.deleteAllPlanesFromDatabase = function () {

        var answer = confirm('do you want to delete all entries in plane?');

        if (answer) {
            console.log('user confirmed to delete');


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
                    console.log('delete2 - transaction.oncomplete');
                    alert("all planes were deleted");
                };

                transaction.onerror = function (event) {
                    console.error('delete2 - transaction.onerror');
                };

                objectStore.clear();
                db.close();
            };

        } else {
            console.log('user declined to delete');
        }

    };

    $scope.loadPlanes_web = function () {
        console.log("loadPlanes_web start");
        var url = '/planes.json';
        loadPlanes(url);
    };

    $scope.loadPlanes_pg = function () {
        console.log("loadPlanes_pg start");
        var url = 'http://c.raceplanner.de/PG10xp/planes.json';
        loadplanes(url);
    };

    loadPlanes = function (url) {
        console.log("loadPlanes start");
        $http.get(url).
            success(function (planes_import) {
                console.log("loadPlanes success");

                var transaction = db.transaction("planes", "readwrite");
                var objectStore = transaction.objectStore("planes");

                //geht nicht, da die Events nicht an transaction gesendet werden können.
                //var objectStore = getObjectStore("planes", "readwrite");

                // alert(JSON.stringify(objectStore));
                // alert(JSON.stringify(planes_import.length));

                for (var i in planes_import) {
                    objectStore.add(planes_import[i]);
                    alert(JSON.stringify(planes_import[i]));
                    console.log('added (' + i + ') - key:' + planes_import[i].id);
                    //}
                }

                transaction.oncomplete = function (event) {
                    alert("All done!");
                };

                transaction.onerror = function (event) {
                    // Don't forget to handle errors!
                    alert("transaction error");
                    alert(JSON.stringify(event));

                };


            }).
            error(function (data, status, headers, config) {
                console.log('error while importing from ' + url);
            });


    };


//    $scope.savePlanemodel = function () {
//        console.log('manu ' + $scope.planemodelManufacturer);
//        console.log('model ' + $scope.planemodelModel);
//        console.log('icao ' + $scope.planemodelIcao);
//
//        var willAbort = false;
//
//        if ($scope.planemodelManufacturer == "") {
//            alert('you need to enter a manufacturer');
//            willAbort = true;
//        }
//
//        if ($scope.planemodelModel == "") {
//            alert('you need to enter a model');
//            willAbort = true;
//        }
//
//        if ($scope.planemodelIcao == "") {
//            alert('you need to enter a ICAO Code');
//            willAbort = true;
//        }
//
//
//
//        if (willAbort == true) {
//            return -1;
//        } else {
//
//        addPlanemodelToObjectStore($scope.planemodelManufacturer, $scope.planemodelModel, $scope.planemodelIcao);
//
//        }
//
//    };

    addPlaneToObjectStore = function (manufacturer, model, icao) {
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
            };

            //add plane
            var newPlane = {};

            newPlane.reg = 42;
//            newPlanemodel.manufacturer = manufacturer;
//            newPlanemodel.model = model;
//            newPlanemodel.icao = icao;

            objectStore.add(newPlane);

            db.close();
        };
    }

    $scope.enableTab1();

    $scope.planes = [];

    dbName = dbParams.dbName();
    dbVersion = dbParams.dbVersion();
    console.log('dbName:' + dbName);
    console.log('dbVersion:' + dbVersion);

    $scope.planeReg = "";


    initPlanes();

});