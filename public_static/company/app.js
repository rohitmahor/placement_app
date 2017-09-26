var app = angular.module('myApp', ['ngComponentRouter']);

app.controller('signoutCtrl', function($scope, $http, $window) {
  $scope.signoutClicked = function(){
    $http.post('/signout',{})
    .then(function(response){
      $window.location.href="http://localhost:5000";
    },function (error){
      console.log(error);
    })
  }
});

app.value('$routerRootComponent', 'app');

app.component('app' , {
  template: `
      <main class="main">
        <div class="sidebar">
          <a ng-link="['Details']"><li>Company Details</li></a>
          <a ng-link="['Jnf']"><li>JNF Form</li></a>
          <a ng-link="['Shortlisted']"><li>Applicants</li></a>
          <a ng-link="['Selected']"><li>Selected</li></a>
        </div>
        <div class="main-content">
          <ng-outlet></ng-outlet>
        </div>
      </main>
    `,
    $routeConfig: [
      { path: '/datails', component: 'compDet', as: 'Details', useAsDefault: true },
      { path: '/jnf', component: 'jnf', as: 'Jnf'},
      { path: '/shortlisted', component: 'shortlisted', as: 'Shortlisted' },
      { path: '/selected', component: 'selected', as: 'Selected' },
    ]
});


app.component('compDet', {
  templateUrl: './partials/companyDetails.html',
  controller: function($scope, $http) {
    $scope.companyDetails;
    var init=function (){
      $http.post('/cmpDetails',{'type':'get'}).then(function(response){
        console.log(response);
        $scope.companyDetails = response['data'];
      },function (error){
        console.log(error);
      })
    }
    init();

    $scope.postData=function (){
      console.log($scope.companyDetails);
      $http.post('/cmpDetails',{'type':'submit','cmpDetails':$scope.companyDetails}).then(function(response){
        console.log(response);
      },function (error){
        console.log(error);
      })
    }
  }
});

app.component('jnf', {
  templateUrl: './partials/jnf.html',
  controller: function($scope, $http) {
    $scope.jnf;

    $scope.postData=function (){
      $http.post('/jnf',{'type':'submit','jnf':$scope.jnf}).then(function(response){
        console.log(response);
        console.log($scope.jnf);
      },function (error){
        console.log(error);
      })
    }
  }
});

app.component('shortlisted', {
  templateUrl: './partials/shortlisted.html',
  controller: function($scope, $http){
    $scope.shortlist=[];
    $scope.selectAll=false;
    var init=function (){
      $http.post('/applied',{'type':'get'}).then(function(response){
        console.log(response);
        $scope.shortlist = response['data']['shortlist'];
        $scope.selectList = response['data']['selectList'];
        console.log($scope.selectList)
        //jquery
        $('.count').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: ($scope.shortlist.length - $scope.selectList.length)
            }, {
                duration: 500,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
      },function (error){
        console.log(error);
      })
    }
    init();

    $scope.selectAllClicked = function(){
      console.log($scope.selectAll)
      $scope.shortlist.forEach(function (student) {
        student.selected=$scope.selectAll;
      })
    }

    $scope.checkIfSelected = function(roll){
      for(var i =0; i<$scope.selectList.length; i++) {
        if(roll==$scope.selectList[i].roll){
          return false;
        }
      };
      return true;
    }

    $scope.submitSelected = function(){
      var selected = [];
      var indices = [];
      for(var i =0; i<$scope.shortlist.length; i++) {
        if($scope.shortlist[i].selected){
          delete $scope.shortlist[i].selected
          indices.push(i)
          selected.push($scope.shortlist[i])
        }
      }
      $scope.selectAll=false;
      console.log(selected)
      if(selected.length>0){
        $http.post('/select',selected).then(function(response){
          for(var i=0; i<$scope.shortlist.length; i++){
            if(indices.includes(i)){
              $scope.shortlist.splice(i, 1);
            }
          }
        },function (error){
          console.log(error);
        })
      }
    }
  }
});

app.component('selected', {
  templateUrl: './partials/selected.html',
  controller: function($scope, $http) {
    $scope.selectList;
    var init=function (){
      console.log('init');
      $http.get('/select').then(function(response){
        $scope.selectList = response["data"];
      },function (error){
        console.log(error);
      })
    }
    init();
  }
});


//jquery
function openBar() {
    var sidebar = $('.sidebar');
    var icon = $('.icon');
    icon.toggleClass('active');

    if(sidebar.css('width') === '0px') {
        sidebar.animate({'width':'300px'});

    }

    else {
        sidebar.animate({'width':'0'});
    }

    $('html, body').animate({
        scrollTop: sidebar.offset().top - 120
    });
}
