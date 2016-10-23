// Ionic Starter App

var app = angular.module('main', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.config(function($stateProvider, $urlRouterProvider){

   $stateProvider.state('header',{
   url: '/header',
   templateUrl: 'view/includes/header.html'
  });

   $urlRouterProvider.otherwise('/projects');
});



app.controller('MainCtrl', function($scope,$ionicPopup,$ionicListDelegate){
  var tasks = new getTasks();



  $scope.onMarkTask = function(item){
    item.finalizado = !item.finalizado
    tasks.save();
  }

  $scope.array = tasks.itens;
  $scope.showMarked = false;
  $scope.removeItem = false;


  $scope.showItem = function(item){
    return !$scope.showMarked && item.finalizado;
    // if($scope.showMarked){
    //   return false;
    // }else{
    //   return item.finalizado;
    // }
  }
  //Remove click
  $scope.onRemoveItem = function(item){
    tasks.remove(item);
    tasks.save();
  }
  //Mostra ou não os btn de remove
  $scope.onButtonRemoveShow = function(){
    $scope.removeItem = !$scope.removeItem;
  }

  //Add
  $scope.onAddTask = function(){
    var newItem = {nome:'',finalizado:false};
    insertItem(newItem,true);

  }
  function insertItem(item,novo){
    $scope.data = {};
    $scope.data.newTask = item.nome;

    var temp = "<input required='true' ng-model='data.newTask' type='text' placeholder='Digite aqui' autofocus='true'>"
    $ionicPopup.show({
      title: 'Tarefa',
      scope: $scope,
      template: temp,
      buttons:[
      {text:"Salvar",
      onTap:function(e){
        item.nome = $scope.data.newTask;
        if(validateItem(item) && novo){
          tasks.add(item);
        }
        tasks.save();
      }},
      {text:"Cancelar"}
      ]
    });
    $ionicListDelegate.closeOptionButtons();

  }

  function validateItem(item){
    if (item.nome != '' && item.nome != null){
    return true;
  }else{
    return false;
  }
  }

  //Edit

  $scope.onEditItem = function(item){
    insertItem(item,false);
  }




})
