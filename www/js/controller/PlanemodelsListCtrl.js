sdApp.controller('PlanemodelsListCtrl', function ($scope, $routeParams, $http) {

    $scope.tab = 1;

    $scope.planemodelIndex = 0;

    $scope.customers = [];
    $scope.planemodels = [];

    const dbName = "planemodels";
    const dbVersion = 2;

    $scope.planemodelManufacturer = "";
    $scope.planemodelModel = "";
    $scope.planemodelIcao = "";


    const planemodels = [
        {"id": 1, "manufacturer": "Airbus", "model": "A320Neo", "icao": "A320", "wake": "M", "length_m": "37,6", "span_m": "34,1", "height_m": "11,8", "wingarea_m2": "122,4", "max_fuel_kg": "29840", "mtow_kg": "77000", "empty_weight_pfd": "\\N", "max_weight_pfd": "\\N", "max_passengers": "180", "range_km": "5500", "cruise_speed_kmh": "840", "field_length_landing_m": "1530", "field_length_takeoff_m": "2090", "$$hashKey": "01M"},
        {"id": 2, "manufacturer": "Boeing", "model": "777-200", "icao": "B772", "wake": "H", "length_m": "63,7", "span_m": "64,8", "height_m": "18,6", "wingarea_m2": "436,8", "max_fuel_kg": "0", "mtow_kg": "0", "empty_weight_pfd": "32000", "max_weight_pfd": "768800", "max_passengers": "440", "range_km": "17450", "cruise_speed_kmh": "905", "field_length_landing_m": "1700", "field_length_takeoff_m": "2900", "$$hashKey": "01N"},
        {"id": 3, "manufacturer": "Bombardier", "model": "CRJ200", "icao": "CRJ2", "wake": "M", "length_m": "26,8", "span_m": "21,2", "height_m": "6,2", "wingarea_m2": "48,3", "max_fuel_kg": "-1", "mtow_kg": "-1", "empty_weight_pfd": "30500", "max_weight_pfd": "53250", "max_passengers": "50", "range_km": "3150", "cruise_speed_kmh": "790", "field_length_landing_m": "1500", "field_length_takeoff_m": "1900", "$$hashKey": "01O"},
        {"id": 4, "manufacturer": "Boeing", "model": "737-800", "icao": "B738", "wake": "M", "length_m": "39,5", "span_m": "34,3", "height_m": "12,5", "wingarea_m2": "125", "max_fuel_kg": "-1", "mtow_kg": "-1", "empty_weight_pfd": "96058", "max_weight_pfd": "174700", "max_passengers": "189", "range_km": "5400", "cruise_speed_kmh": "850", "field_length_landing_m": "1630", "field_length_takeoff_m": "1630", "$$hashKey": "01P"},
        {"id": 5, "manufacturer": "Boeing", "model": "737-300", "icao": "B733", "wake": "M", "length_m": "\\N", "span_m": "\\N", "height_m": "\\N", "wingarea_m2": "\\N", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "\\N", "max_weight_pfd": "\\N", "max_passengers": "\\N", "range_km": "\\N", "cruise_speed_kmh": "\\N", "field_length_landing_m": "\\N", "field_length_takeoff_m": "\\N", "$$hashKey": "01Q"},
        {"id": 6, "manufacturer": "Douglas", "model": "DC3", "icao": "DC3", "wake": "M", "length_m": "\\N", "span_m": "\\N", "height_m": "\\N", "wingarea_m2": "\\N", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "18380", "max_weight_pfd": "26390", "max_passengers": "\\N", "range_km": "\\N", "cruise_speed_kmh": "\\N", "field_length_landing_m": "\\N", "field_length_takeoff_m": "\\N", "$$hashKey": "01R"},
        {"id": 9, "manufacturer": "Boeing", "model": "727-100", "icao": "B721", "wake": "M", "length_m": "40,6", "span_m": "32,9", "height_m": "10,4", "wingarea_m2": "157,9", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "87838", "max_weight_pfd": "132238", "max_passengers": "189", "range_km": "5000", "cruise_speed_kmh": "930", "field_length_landing_m": "1460", "field_length_takeoff_m": "1770", "$$hashKey": "01S"},
        {"id": 10, "manufacturer": "BAe", "model": "JetStream 32", "icao": "JS32", "wake": "M", "length_m": "14,3", "span_m": "15,8", "height_m": "5,4", "wingarea_m2": "25,2", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "10236", "max_weight_pfd": "16204", "max_passengers": "19", "range_km": "1260", "cruise_speed_kmh": "482", "field_length_landing_m": "1240", "field_length_takeoff_m": "1380", "$$hashKey": "01T"},
        {"id": 11, "manufacturer": "Airbus", "model": "A380-841", "icao": "A388", "wake": "H", "length_m": "72,7", "span_m": "79,8", "height_m": "24,1", "wingarea_m2": "845", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "546746", "max_weight_pfd": "1253499", "max_passengers": "525", "range_km": "15000", "cruise_speed_kmh": "945", "field_length_landing_m": "2900", "field_length_takeoff_m": "2050", "$$hashKey": "01U"},
        {"id": 12, "manufacturer": "Airbus", "model": "A380-861", "icao": "A388", "wake": "H", "length_m": "72,7", "span_m": "79,8", "height_m": "24,1", "wingarea_m2": "845", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "546746", "max_weight_pfd": "1253499", "max_passengers": "525", "range_km": "15000", "cruise_speed_kmh": "945", "field_length_landing_m": "2900", "field_length_takeoff_m": "2050", "$$hashKey": "01V"},
        {"id": 13, "manufacturer": "Airbus", "model": "A380-842", "icao": "A388", "wake": "H", "length_m": "72,7", "span_m": "79,8", "height_m": "24,1", "wingarea_m2": "845", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "546746", "max_weight_pfd": "1253499", "max_passengers": "525", "range_km": "15000", "cruise_speed_kmh": "945", "field_length_landing_m": "2900", "field_length_takeoff_m": "2050", "$$hashKey": "01W"},
        {"id": 14, "manufacturer": "Bombardier", "model": "Dash Q400", "icao": "DH8D", "wake": "M", "length_m": "32,8", "span_m": "28,4", "height_m": "8,4", "wingarea_m2": "63,1", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "\\N", "max_weight_pfd": "\\N", "max_passengers": "84", "range_km": "2500", "cruise_speed_kmh": "667", "field_length_landing_m": "1290", "field_length_takeoff_m": "1300", "$$hashKey": "01X"},
        {"id": 15, "manufacturer": "Boeing", "model": "757-200", "icao": "B752", "wake": "M", "length_m": "47,3", "span_m": "38", "height_m": "13,6", "wingarea_m2": "185,2", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "\\N", "max_weight_pfd": "\\N", "max_passengers": "224", "range_km": "5500", "cruise_speed_kmh": "850", "field_length_landing_m": "1550", "field_length_takeoff_m": "2350", "$$hashKey": "01Y"},
        {"id": 16, "manufacturer": "Boeing", "model": "747-400", "icao": "B744", "wake": "H", "length_m": "70,7", "span_m": "64,4", "height_m": "19,4", "wingarea_m2": "541,2", "max_fuel_kg": "\\N", "mtow_kg": "\\N", "empty_weight_pfd": "394088", "max_weight_pfd": "634544", "max_passengers": "660", "range_km": "13430", "cruise_speed_kmh": "920", "field_length_landing_m": "2180", "field_length_takeoff_m": "3020", "$$hashKey": "01Z"},
        {"id": 20, "manufacturer": "Saab", "model": "340A Passenger Variant", "icao": "SF34", "wake": "M", "length_m": "19,7", "span_m": "21,4", "height_m": "7", "wingarea_m2": "41,8", "max_fuel_kg": "3220", "mtow_kg": "13150", "empty_weight_pfd": "12655", "max_weight_pfd": "27300", "max_passengers": "36", "range_km": "1500", "cruise_speed_kmh": "460", "field_length_landing_m": "1030", "field_length_takeoff_m": "1300", "$$hashKey": "020"},
        {"id": 21, "manufacturer": "Saab", "model": "340A Cargo Variant", "icao": "SF34", "wake": "M", "length_m": "19,7", "span_m": "21,4", "height_m": "7", "wingarea_m2": "41,8", "max_fuel_kg": "3220", "mtow_kg": "13150", "empty_weight_pfd": "12655", "max_weight_pfd": "27300", "max_passengers": "0", "range_km": "1500", "cruise_speed_kmh": "460", "field_length_landing_m": "1030", "field_length_takeoff_m": "1300", "$$hashKey": "021"},
        {"id": 22, "manufacturer": "Saab", "model": "340A Airborne Variant", "icao": "SF34", "wake": "M", "length_m": "19,7", "span_m": "21,4", "height_m": "7", "wingarea_m2": "41,8", "max_fuel_kg": "3220", "mtow_kg": "13150", "empty_weight_pfd": "12655", "max_weight_pfd": "27300", "max_passengers": "\\N", "range_km": "1500", "cruise_speed_kmh": "460", "field_length_landing_m": "1030", "field_length_takeoff_m": "1300", "$$hashKey": "022"},
        {"id": 23, "manufacturer": "Cessna", "model": "208B Grand Caravan", "icao": "C208", "wake": "L", "length_m": "11,5", "span_m": "15,9", "height_m": "4,3", "wingarea_m2": "26", "max_fuel_kg": "-1", "mtow_kg": "3970", "empty_weight_pfd": "-1", "max_weight_pfd": "-1", "max_passengers": "14", "range_km": "1667", "cruise_speed_kmh": "337", "field_length_landing_m": "290", "field_length_takeoff_m": "417", "$$hashKey": "023"},
        {"id": 24, "manufacturer": "Cessna", "model": "208B Super Cargomaster", "icao": "C208", "wake": "L", "length_m": "11,5", "span_m": "15,9", "height_m": "4,3", "wingarea_m2": "26", "max_fuel_kg": "-1", "mtow_kg": "3970", "empty_weight_pfd": "-1", "max_weight_pfd": "-1", "max_passengers": "0", "range_km": "2000", "cruise_speed_kmh": "317", "field_length_landing_m": "290", "field_length_takeoff_m": "417", "$$hashKey": "024"}
    ];


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

    $scope.planemodel_next = function () {
        console.log("planemodel_next");
        $scope.planemodelIndex++;
        // alert(JSON.stringify($scope.planemodels));
    };

    $scope.planemodel_prev = function () {
        console.log("planemodel_prev");
        $scope.planemodelIndex--;
        // alert(JSON.stringify($scope.planemodels));
    };


    initPlanemodels = function () {
        console.log('initPlanemodels start');

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
                console.log('onupgradeneeded start');
                console.log('onupgradeneeded - oldVersion:' + event.oldVersion);
                var db = event.target.result;

                // Create an objectStore to hold information about our customers. We're
                // going to use "ssn" as our key path because it's guaranteed to be
                // unique.

                if (event.oldVersion > 0) {
                    db.deleteObjectStore("planemodels");
                    alert('deleteObjectStore');
                }

                var objectStore = db.createObjectStore("planemodels", { keyPath: "id", autoIncrement: true });

                // Create an index to search customers by name. We may have duplicates
                // so we can't use a unique index.
                //objectStore.createIndex("name", "name", { unique: false });

                // Create an index to search customers by email. We want to ensure that
                // no two customers have the same email, so use a unique index.
                //objectStore.createIndex("email", "email", { unique: true });

                objectStore.createIndex("id", "id", { unique: true });

                // Store values in the newly created objectStore.
                for (var i in planemodels) {
                    objectStore.add(planemodels[i]);
                }
                console.log('openDatabase end');
            }
        }
    };


    $scope.showList = function () {

        $scope.planemodels = [];
        var objectStoreName = "planemodels";

        var tx = db.transaction(objectStoreName, "readonly");
        var objectStore = tx.objectStore(objectStoreName);


        var counter = 0;
        objectStore.openCursor().onsuccess = function (event) {

            //alert('objectStore.openCursor().onsuccess');
            var cursor = event.target.result;
            if (cursor) {
                $scope.planemodels.push(cursor.value);
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


    $scope.deleteAllPlanemodelsFromDatabase = function () {

        var answer = confirm('do you want to delete all entries in planemodel?');

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

                var transaction = db.transaction("planemodels", "readwrite");
                var objectStore = transaction.objectStore("planemodels");

                transaction.oncomplete = function (event) {
                    console.log('delete2 - transaction.oncomplete');
                    alert("all planemodels were deleted");
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

    $scope.loadPlanemodels_web = function () {
        console.log("loadPlanemodels_web start");
        var url = '/planemodels.json';
        loadPlanemodels(url);
    };

    $scope.loadPlanemodels_pg = function () {
        console.log("loadPlanemodels_pg start");
        var url = 'http://c.raceplanner.de/PG10xp/planemodels.json';
        loadPlanemodels(url);
    };

    loadPlanemodels = function (url) {
        console.log("loadPlanemodels start");
        $http.get(url).
            success(function (planemodels_import) {
                console.log("loadPlanemodels success");

                var transaction = db.transaction("planemodels", "readwrite");
                var objectStore = transaction.objectStore("planemodels");


                //geht nicht, da die Events nicht an transaction gesendet werden können.
                //var objectStore = getObjectStore("planemodels", "readwrite");


                // alert(JSON.stringify(objectStore));
                // alert(JSON.stringify(planemodels_import.length));


                for (var i in planemodels_import) {
                    //for (i = 0; i < planemodels_import.length; i++) {
                    //if (i=4) {
                    objectStore.add(planemodels_import[i]);
                    //    alert(JSON.stringify(planemodels_import[i]));
                    console.log('added (' + i + ') - key:' + planemodels_import[i].id);
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


    initPlanemodels();


});