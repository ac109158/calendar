'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
//   run(['$rootScope','$templateCache',function($rootScope, $templateCache) {  //This code will clear the template cache on route change
//    $rootScope.$on('$routeChangeStart', function() {
//       $templateCache.removeAll();
//    });
// }]).
controller('calendarHeaderCtrl', ['$scope','$location','$route','$templateCache' ,'$routeParams', 'DateFactory','DayNameService', 'MonthFactory', function DayCtrl($scope,$location, $templateCache, $routeParams,$route, DateFactory, DayNameService, MonthFactory) {
	$scope.calendarYear =  DateFactory.getCalendarYear();
	$scope.monthsInYear = MonthFactory.getMonths($scope.calendarYear);
	$scope.daysInWeek = DayNameService;
	$scope.calendarMonth = DateFactory.getCalendarMonth();
	$scope.calendarMonthName = $scope.monthsInYear[$scope.calendarMonth][1];
	$scope.monthLength = $scope.monthsInYear[$scope.calendarMonth ][0];

	$scope.changeMonth = function(mon) 
	{
		console.log('calendarHeaderCtrl.changeMonth');
		if ( mon > 0)
		{
			DateFactory.SetCalendarDateToNextMonth();
			$scope.calendarMonth = DateFactory.getCalendarMonth();
			$scope.calendarYear =  DateFactory.getCalendarYear();
			$location.refresh();
		}
		else
		{
			DateFactory.SetCalendarDateToPrevMonth();
			$scope.calendarMonth = DateFactory.getCalendarMonth();
			$scope.calendarYear =  DateFactory.getCalendarYear();
			$location.refresh();
		}
	}

	$scope.go = function ( path ) 
	{
		$location.path( path );
	};
	  
}]).
controller('DateCtrl', ['$scope','grid', 'DayNameService', 'DateFactory',  function DateCtrl($scope, grid, DayNameService, DateFactory) {

}]).
controller('YearCtrl', ['$scope','grid', function YearCtrl($scope, grid) {
	console.log('This is the YearCtrl');
	$scope.days = grid;
}]).
controller('MonthCtrl', ['$scope', 'MonthFactory', 'DaysOfMonthFactory', 'DateFactory','$location', '$route', '$log', function MonthCtrl($scope, MonthFactory,  DaysOfMonthFactory, DateFactory, $location, $route, $log) {
	$log.log(MonthCtrl);
	$scope.calendarMonth = DateFactory.getCalendarMonth();
	$scope.monthsInYear = MonthFactory.getMonths($scope.calendarYear);
	$scope.calendarMonthName = $scope.monthsInYear[$scope.calendarMonth][1];
	$scope.calendarYear =  DateFactory.getCalendarYear();
	$scope.days = DaysOfMonthFactory.getDaysofMonth($scope.calendarMonth, $scope.calendarYear, 'MonthCtrl');

	$scope.safeApply = function(fn) 
	{
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') 
		{
			if ( fn && (typeof(fn) === 'function')) {fn(); }
		} else {
			this.$apply(fn);
		}
	};


	$scope.changeMonth = function(mon) 
	{
		console.log('MonthCtrl.changeMonth');
		if ( mon > 0)
		{
			DateFactory.SetCalendarDateToNextMonth();
			$scope.calendarMonth = DateFactory.getCalendarMonth();
			$scope.calendarYear =  DateFactory.getCalendarYear();
			$scope.calendarMonthName = $scope.monthsInYear[$scope.calendarMonth][1];
			$scope.days = new DaysOfMonthFactory.getDaysofMonth($scope.calendarMonth, $scope.calendarYear, 'ChangeMonth');
			console.log($scope.days);
			$route.reload();
		}
		else
		{
			DateFactory.SetCalendarDateToPrevMonth();
			$scope.calendarMonth = DateFactory.getCalendarMonth();
			$scope.calendarYear =  DateFactory.getCalendarYear();
			$scope.calendarMonthName = $scope.monthsInYear[$scope.calendarMonth][1];
			$scope.days = new DaysOfMonthFactory.getDaysofMonth($scope.calendarMonth, $scope.calendarYear, 'ChangeMonth');
			console.log($scope.days);
			$route.reload();
		}
	}

	$scope.go = function ( path ) {
	$location.path( path );
	};  
}]).
controller('DayCtrl', ['$scope','grid', function DayCtrl($scope, grid) {
	$scope.days = grid;
}]).
controller('MyCtrl2', [function() {

}]);
