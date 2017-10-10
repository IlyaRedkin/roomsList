var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "template/list.html"
        })
        .when("/form", {
            templateUrl : "template/form.html"
        });
});

app.controller('Controller', function($scope, $http) {

    var datasource = 'http://localhost:3000/api/rooms/';

    var rooms = {
        'list':[]
    };

    $scope.dataRequest = function () {
        $http.get(datasource).then(function success(response){
            rooms.list = response.data.map(function(room) {
                room.name=="" ? room.name="–" : room.name;
                return room;
            });
            $scope.roomsList = rooms;
        });
    };

    $scope.dataRequest();

	$scope.setSelectedId = function(id){
		$scope.selectedId = id;
	};

    $scope.save = function (answer, answerForm){

        answer = (answer===undefined) ? {name: ""} : answer;

        var address="http://localhost:3000/api/rooms/" + $scope.selectedId;

        $http.patch(address, answer).then(function success (response) {
            $scope.dataRequest();
        });

    };
});


