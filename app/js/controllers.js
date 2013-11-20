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
controller('MonthCtrl', ['$scope', '$window', 'MonthFactory', 'DaysOfMonthFactory', 'DateFactory','$location', '$route', '$log', function MonthCtrl($scope, $window, MonthFactory,  DaysOfMonthFactory, DateFactory, $location, $route, $log) {
	$scope.calendarMonth = DateFactory.getCalendarMonth();
	$scope.today = {month: new Date().getMonth(), date : new Date().getDate(), year: new Date().getFullYear() };
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

	$scope.popover = {
		title: '{{day.month + " "+ day.date + ", " + day.year}}',
		content: '<div style="width:200px; height:250px; position:relative; opacity:1; z-index:4;"  class=" slim"><div ng-input="day.year"></div>{{day.month + " "+ day.date}}</div>', 
		container: '#MonthView', 
		placement:'auto', 
		saved:false
	};

	$scope.eventpopover = {
		title: '{{event.title}}',
		trigger: 'hover',
		delay: { show: 1000, hide: 100 },
		content: '<div style="width:200px; height:125px; position:relative; opacity:1; z-index:4;"  class=" slim"><div ng-input="day.year"></div>{{day.month + " "+ day.date}}</div>', 
		container: '#MonthView', 
		placement:'auto', 
		saved:false
	};

	$scope.tooltip = {title: "Hello Tooltip<br />This is a multiline message!",checked: false}

	$scope.addEvent = function(event) 
	{
		console.log(event.day.date)
	};


}]).
controller('WeekCtrl', ['$scope', '$timeout', function DayCtrl($scope, $timeout) {
 	$scope.dynamicPopover = "Hello, World!";
	$scope.dynamicPopoverText = "dynamic";
	$scope.dynamicPopoverTitle = {
	title: '{{day.month + " "+ day.date + ", " + day.year}}',
	content: '<div style="width:200px; height:250px; position:relative; opacity:1; z-index:4;"  class=" slim"><div ng-input="day.year"></div>{{day.month + " "+ day.date}}</div>', 
	container: '#MonthView', 
	placement:'auto', 
	saved:false};

	$scope.today = function() 
	{
		$scope.dt = new Date();
	};

	$scope.today();

	$scope.showWeeks = true;

	$scope.toggleWeeks = function () 
	{
		$scope.showWeeks = ! $scope.showWeeks;
	};

	$scope.clear = function () {
	$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
	$scope.minDate = ( $scope.minDate ) ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function() {
	$timeout(function() {
	  $scope.opened = true;
	});
	};

	$scope.dateOptions = {
	'year-format': "'yy'",
	'starting-day': 1
	};

	$scope.mytime = new Date();

	$scope.hstep = 1;
	$scope.mstep = 15;

	$scope.options = {
		hstep: [1, 2, 3],
		mstep: [1, 5, 10, 15, 25, 30]
	};

	$scope.ismeridian = true;
	$scope.toggleMode = function() {
		$scope.ismeridian = ! $scope.ismeridian;
	};

	$scope.update = function() {
		var d = new Date();
		d.setHours( 14 );
		d.setMinutes( 0 );
		$scope.mytime = d;
	};

	$scope.changed = function () {
		console.log('Time changed to: ' + $scope.mytime);
	};

	$scope.clear = function() {
		$scope.mytime = null;
	};
}]).
controller('DayCtrl', ['$scope','grid', function DayCtrl($scope, grid) {
	$scope.days = grid;
}]).
controller('StorageCtrl', ['EventStorageService', function() {
	

}]);
