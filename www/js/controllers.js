angular.module('casterMaster.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //dummy data until loaded from local storage


}) //end appCtrl



.controller('ListCtrl', function($scope, $timeout) {


    var getData = function(){
       return $timeout(function(){
           return window.localStorage.getItem('mainData');
       },3000);
    };

    getData().then(function(data){
      console.log(data);
      $scope.mainData = JSON.parse(data);
      console.log(data);
      $scope.selectedList = "Spells";
      $scope.listData = $scope.mainData[$scope.selectedList];
      console.log($scope.listData);
    })

  // console.log($scope.mainData);

  // $scope.selectedItem = angular.fromJson(window.localStorage.getItem("selectedItem"));

  // window.LocalStorage.setItem("mainData", JSON.strigify($scope.mainData));
  //default Value

// dummy data
    // window.localStorage.setItem("mainData", JSON.stringify(
    //   {"Spells": {"Spell1": "Something1",
    //   "Spell2": "Something Else"},
    //    "Potions": {"Potions1": "Something1",
    //   "Potions2": "Something Else"}
    //   }
    //   ));


  $scope.selectItem = function(itemTitle){
    window.localStorage.setItem("selectedItem", itemTitle);
    $scope.selectedItem = itemTitle;
    console.log(itemTitle);
    console.log($scope.selectedItem);

  }
})

.controller('ItemCtrl', function($scope, $stateParams) {
});
