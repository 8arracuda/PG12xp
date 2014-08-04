sdApp.controller('PlanemodelsListCtrl', function ($scope, $routeParams, $http) {

        $scope.tab = 1;

        $scope.planemodelIndex = 0;

        $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));


        $scope.planemodelsString = JSON.stringify($scope.planemodels);
//    tracks.find($routeParams.trackId, function (selectedTrack) {
//        $scope.selectedTrack = selectedTrack;
//    });


        $scope.clearPlanemodelsFromLocalStorage = function () {
            localStorage.removeItem("planemodels");
        };


        $scope.savePlanemodels = function () {
            localStorage.setItem('planemodels', JSON.stringify($scope.planemodels));
        };

        $scope.initPlanemodels = function () {
            $scope.planemodels = [
                {"id": 0, "name": "Airbus A320neo"},
                {"id": 1, "name": "Boeing 737 Advanced 200"}
            ];

        };

        $scope.importPlanemodels = function () {
            $http.get('planemodels.json').
                success(function (data) {
                    $scope.planemodels = data;
                }).
                error(function (data, status, headers, config) {
                    console.log('error loading planemodels.json');
                });
        };


        $scope.importPlanemodelsFromWeb = function () {
//        $http.get('http://c.raceplanner.de/PG10xp/planemodels.json').
            $.getJSON("http://c.raceplanner.de/PG10xp/planemodels.json", function (data) {
                $scope.planemodels = data;

                alert(data.length + ' planemodels loaded.');
            });

        };


        $scope.addPlanemodel = function () {
            var newPlanemodel = {
                "id": $scope.planemodels.length,
                "name": ""
            };
            $scope.planemodels.push(newPlanemodel);
        };


        $scope.updateExportString = function () {
            $scope.planemodelsString = JSON.stringify($scope.planemodels);
        };

        $scope.planemodel_next = function () {
            $scope.planemodelIndex++;
        };

        $scope.planemodel_prev = function () {
            $scope.planemodelIndex--;
        };


        $scope.openDatabase = function () {
            console.log('openDatabase start');


            if (!window.indexedDB) {
                window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
            } else {

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
                    {"id": 24, "manufacturer": "Cessna", "model": "208B Super Cargomaster", "icao": "C208", "wake": "L", "length_m": "11,5", "span_m": "15,9", "height_m": "4,3", "wingarea_m2": "26", "max_fuel_kg": "-1", "mtow_kg": "3970", "empty_weight_pfd": "-1", "max_weight_pfd": "-1", "max_passengers": "0", "range_km": "2000", "cruise_speed_kmh": "317", "field_length_landing_m": "290", "field_length_takeoff_m": "417", "$$hashKey": "024"},
                    {"id": 19, "name": "", "$$hashKey": "01G", "manufacturer": "Beechcraft", "model": "Bonanza A36", "icao": "BE36"},
                    {"id": 20, "name": "", "$$hashKey": "01L", "manufacturer": "Bombardier", "icao": "CL30", "model": "Challenger 300"}
                ];

                const dbName = "PG12xp";

                // Öffnen unserer Datenbank
                var request = window.indexedDB.open(dbName, 3);

                request.onerror = function (event) {
                    console.error('request.onerror');
                    console.error("Database error: " + event.target.errorCode);
                    // Machen Sie etwas mit request.errorCode!
                };
                request.onsuccess = function (event) {
                    console.log('request.onsuccess');
                    db = request.result;
                    // Machen Sie etwas mit request.result!
                };

                request.onupgradeneeded = function (event) {
                    console.log('onupgradeneeded start');
                    var db = event.target.result;

                    // Create an objectStore to hold information about our customers. We're
                    // going to use "ssn" as our key path because it's guaranteed to be
                    // unique.
                    var objectStore = db.createObjectStore("planemodels", { keyPath: "id" });

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

    }
)
;