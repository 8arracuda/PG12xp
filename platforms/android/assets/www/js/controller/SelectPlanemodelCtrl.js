sdApp.controller('SelectPlanemodelCtrl', function ($scope, $routeParams, $http) {

    $scope.stringForTitle = 'foo2';
    $scope.stringForRightButton = 'bar2';

    console.log("SelectPlanemodelCtrl");

    const dbName = "planemodels";
    const dbVersion = 2;


    $scope.initPlanemodels = function () {
        console.log('openDatabase start');


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
                console.log('openDatabase start');
                var db = event.target.result;

                // Create an objectStore to hold information about our customers. We're
                // going to use "ssn" as our key path because it's guaranteed to be
                // unique.
                if (event.oldVersion > 0) {
                    db.deleteObjectStore("planemodels");
                    alert('deleteObjectStore');
                }

                var objectStore = db.createObjectStore("planemodels", { keyPath: "id", autoIncrement:true });

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

    }

    $scope.showList = function () {

        var objectStoreName = "planemodels";

        var tx = db.transaction(objectStoreName, "readonly");
        var objectStore = tx.objectStore(objectStoreName);


        $scope.planemodels = [];
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
    }

    $scope.initPlanemodels();

});