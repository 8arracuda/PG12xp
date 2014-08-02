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


        $scope.initDatabase = function () {
            console.log('openDatabase start');


            if (!window.indexedDB) {
                window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
            } else {


                $.getJSON("http://c.raceplanner.de/PG10xp/planemodels.json", function (PlaneModels) {


                    const dbName = "the_name";

                    // Öffnen unserer Datenbank
                    var request = window.indexedDB.open(dbName, 3);

                    request.onerror = function (event) {
                        console.error('request.onerror');
                        alert("Database error: " + event.target.errorCode);
                        // Machen Sie etwas mit request.errorCode!
                    };
                    request.onsuccess = function (event) {
                        console.log('request.onsuccess');
                        db = request.result;
                        // Machen Sie etwas mit request.result!
                    };

                    request.onupgradeneeded = function (event) {
                        console.log('openDatabase start');
                        var db = event.target.result;

                        // Create an objectStore to hold information about our customers. We're
                        // going to use "ssn" as our key path because it's guaranteed to be
                        // unique.
                        var objectStore = db.createObjectStore("customers", { keyPath: "id" });

                        // Create an index to search customers by name. We may have duplicates
                        // so we can't use a unique index.
                        //objectStore.createIndex("name", "name", { unique: false });

                        objectStore.createIndex("id", "id", { unique: true });

                        // Create an index to search customers by email. We want to ensure that
                        // no two customers have the same email, so use a unique index.
                        //objectStore.createIndex("email", "email", { unique: true });

                        // Store values in the newly created objectStore.
                        for (var i in planeModels) {
                            objectStore.add(planeModels[i]);
                        }
                        console.log('openDatabase end');

                    }
                });


            }
        }

    }
)
;