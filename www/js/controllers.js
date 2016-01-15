angular.module('casterMaster.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //dummy data until loaded from local storage
    var getData = function(){
       return $timeout(function(){
           return window.localStorage.getItem('mainData');
       },1000);
    };

    getData().then(function(data){
      $scope.mainData = JSON.parse(data);
    });

    //add new tome object to scope
    $scope.newTome = {};
    $scope.newTome.title = "";

    $scope.saveTome = function(){
      console.log($scope.newTomeTitle);
      //add the new Tome title to the main data object
      $scope.mainData[$scope.newTome.title] = {};

      //parse the updated data to be saved
      var newData = $scope.mainData;
      newData = JSON.stringify(newData);

      //save the data
      window.localStorage.setItem("mainData", newData);

    };


    //add List Modal
    $ionicModal.fromTemplateUrl('templates/addList.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });


}) //end appCtrl



.controller('ListCtrl', function($scope, $timeout, $stateParams, $ionicModal) {


    var getData = function(){
       return $timeout(function(){
           return window.localStorage.getItem('mainData');
       },100);
    };

    getData().then(function(data){
      console.log(data);
      $scope.mainData = JSON.parse(data);
      console.log(data);
      $scope.selectedList = $stateParams.list;
      $scope.selectedItem = $stateParams.item;
      $scope.listData = $scope.mainData[$scope.selectedList];
      $scope.listDataLength = Object.keys($scope.listData).length;
      $scope.selectedItemEntry = $scope.listData[$scope.selectedItem];
      console.log($scope.listData);
    });

    console.log("$stateParams", $stateParams);
    // var getSelectedItem = function(){
    //    return $timeout(function(){
    //        return window.localStorage.getItem('selectedItem');
    //    },3000);
    // };

    // getSelectedItem().then(function(data){
    //   console.log(data);
    //   $scope.selectedList = JSON.parse(data);
    //   console.log(data);
    //   $scope.selectedList = "Spells";
    //   $scope.listData = $scope.mainData[$scope.selectedList];
    //   console.log($scope.listData);
    // });

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

  };
})

.controller('ItemCtrl', function($scope, $stateParams) {
});
