angular.module('casterMaster.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //getting data from local storage, with a delay, delay helps with asynchronous part
    var getData = function(){
       return $timeout(function(){
           return window.localStorage.getItem('mainData');
       },1000);
    };
    //get and parse the data
    getData().then(function(data){
      $scope.mainData = JSON.parse(data);
    });

    //add new tome object to scope
    $scope.newTome = {};
    $scope.newTome.title = "";

    //removes the data and all contents from the list
    $scope.removeList = function(listName){
      console.log(listName);
      delete $scope.mainData[listName];

      //save changes to local storage
      var newData = $scope.mainData;
      newData = JSON.stringify(newData);
      window.localStorage.setItem("mainData", newData);

    };

    $scope.saveTome = function(){
      console.log($scope.newTomeTitle);
      //add the new Tome title to the main data object
      $scope.mainData[$scope.newTome.title] = {};

      //parse (stringifying) the updated data to be saved
      var newData = $scope.mainData;
      newData = JSON.stringify(newData);

      //save the data to the local storage
      window.localStorage.setItem("mainData", newData);

      //clear fields so user can return to add list without having to clear the field
      $scope.newTome = {};
      $scope.newTome.title = "";
      $scope.closeModal();

    };

    /// this code is pulled from ionic docs, just put your correct template url
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

.controller('ListCtrl', function($scope, $timeout, $stateParams, $ionicModal, $state) {

    //getting data from local storage, with a delay
    var getData = function(){
       return $timeout(function(){
           return window.localStorage.getItem('mainData');
       },100);
    };
    //get data and parse (stringify) so data can be stored in local storage
    getData().then(function(data){
      $scope.mainData = JSON.parse(data);

      //getting the data through the app.js state per the list.html-looking for the ":list" variable
      $scope.selectedList = $stateParams.list;

      //getting the data through the app.js state-looking for ":item" which is nested under the ":list"
      $scope.selectedItem = $stateParams.item;

      //look at main data grab the "key" then saving to listData so it can be used to display all items in the list
      $scope.listData = $scope.mainData[$scope.selectedList];

      //length used to determine if alternate message is needed- uses "ng-show"
      $scope.listDataLength = Object.keys($scope.listData).length;
      $scope.selectedItemEntry = $scope.listData[$scope.selectedItem];
    });

      //add Item Modal
    $ionicModal.fromTemplateUrl('templates/addItem.html', {
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

        //add new tome object to scope
    $scope.newItem = {};
    $scope.newItem.title = "";
    $scope.newItem.description = "";

    $scope.removeItem = function(itemName){
      delete $scope.mainData[$scope.selectedList][itemName];
      delete $scope.listData[itemName];
      //save changes to local storage
      var newData = $scope.mainData;
      newData = JSON.stringify(newData);
      window.localStorage.setItem("mainData", newData);
      $state.go('app/' + $scope.selectedList);

    };

    $scope.saveItem = function(){

      //add the new Tome title to the main data object
      $scope.listData[$scope.newItem.title] = $scope.newItem.description;
      $scope.mainData[$stateParams.list][$scope.newItem.title] = $scope.newItem.description;
      $scope.listDataLength = Object.keys($scope.listData).length;

      //clear data fields
      $scope.newItem.title = "";
      $scope.newItem.description = "";
      //parse the updated data to be saved
      var newData = $scope.mainData;
      newData = JSON.stringify(newData);

      //save the data
      window.localStorage.setItem("mainData", newData);

      getData();
      $scope.closeModal();

    };


})//end of list controller
