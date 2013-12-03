  'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
//   run(['$rootScope','$templateCache',function($rootScope, $templateCache) {  //This code will clear the template cache on route change
//    $rootScope.$on('$routeChangeStart', function() {
//       $templateCache.removeAll();
//    });
// }]).
controller('calendarHeaderCtrl', ['$scope','$location','$route','$templateCache' ,'$routeParams', 'DateFactory','DayNameService', 'MonthFactory', function DayCtrl($scope, $location, $route, $templateCache, $routeParams, DateFactory, DayNameService, MonthFactory) {
	$scope.calendarYear =  DateFactory.getCalendarYear();
	$scope.monthsInYear = MonthFactory.getMonths($scope.calendarYear);
	$scope.daysInWeek = DayNameService;
	$scope.calendarMonth = DateFactory.getCalendarMonth();
	$scope.calendarMonthName = $scope.monthsInYear[$scope.calendarMonth][1];
	$scope.monthLength = $scope.monthsInYear[$scope.calendarMonth ][0];
	$scope.calendarDay = DateFactory.getCalendarDay();

    $scope.$on('monthChange', function($scope) {
        $scope.calendarMonth =  DateFactory.getCalendarMonth();
        //$scope.reload();
        console.log('month change');
    });
    
	$scope.changeMonth = function(mon) 
	{
		console.log('calendarHeaderCtrl.changeMonth');
		if ( mon > 0)
		{
			DateFactory.SetCalendarDateToNextMonth();
		}
		else
		{
			DateFactory.SetCalendarDateToPrevMonth();
		}
        $scope.calendarMonth = DateFactory.getCalendarMonth();
        $scope.calendarYear =  DateFactory.getCalendarYear();
	    $scope.calendarMonthName = $scope.monthsInYear[$scope.calendarMonth][1];
        $scope.calendarDay = DateFactory.getCalendarDay();
        $route.reload();
	}

	$scope.changeYear = function(yr) 
	{
		console.log('calendarHeaderCtrl.changeYear');
		if ( yr > 0)
		{
			DateFactory.SetCalendarYearToNextYear();
		}
		else
		{
			DateFactory.SetCalendarYearToPrevYear();
		}
        
        $scope.calendarYear =  DateFactory.getCalendarYear();
        $route.reload();
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
controller('MonthCtrl', 
        ['$scope', '$window', 'MonthFactory', 'DaysOfMonthFactory', 'EventFactory', 'DateFactory','$location', '$route', '$log', 
        function MonthCtrl($scope, $window, MonthFactory,  DaysOfMonthFactory, EventFactory, DateFactory, $location, $route, $log) {
	
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
//			$scope.days = new DaysOfMonthFactory.getDaysofMonth($scope.calendarMonth, $scope.calendarYear, 'ChangeMonth');
			console.log($scope.days);
            $scope.$emit('monthChange, mon');
			$route.reload();
		}
		else
		{
			DateFactory.SetCalendarDateToPrevMonth();
			$scope.calendarMonth = DateFactory.getCalendarMonth();
			$scope.calendarYear =  DateFactory.getCalendarYear();
			$scope.calendarMonthName = $scope.monthsInYear[$scope.calendarMonth][1];
//			$scope.days = new DaysOfMonthFactory.getDaysofMonth($scope.calendarMonth, $scope.calendarYear, 'ChangeMonth');
			console.log($scope.days);
			$route.reload();
		}
	}

	$scope.setCalendarDate = function(dt) {
		DateFactory.setCalendarDate(dt);
		DateFactory.setCalendarDay(dt.getDate());
		DateFactory.setCalendarMonth(dt.getMonth());
		DateFactory.setCalendarYear(dt.getFullYear());
		// $scope.events = EventFactory.fetchDay($scope.calendarDay, $scope.calendarMonth, $scope.calendarYear, $scope.src);
		// $scope.events = ['Event 1' + $scope.calendarDay, "Event 2" + $scope.calendarDay, "Event 3" + $scope.calendarDay];
		// $route.reload();
	};

	$scope.go = function ( path ) {
	$location.path( path );
	}; 

	$scope.popover = {
		title: '{{day.month + " "+ day.day + ", " + day.year}}',
		content: '<form role="form" id="mForm" ng-submit="addEvent(ev)"><div class="form-group"><label for="title">Title</label><input type="title" class="form-control" id="title" ng-model="ev.title" placeholder="Enter Title"></div><div class="form-group"><label for="detail">Details</label><textarea class="form-control" ng-model="ev.details" rows="3" cols="30"></textarea></div><select ng-model="ev.startHour"><option class="text-right" ng-repeat="hour in [12,01,02,03,04,05,06,07,08,09,10,11]" value="{{hour}}">{{hour}}</option></select><select ng-model="ev.startMinute"><option value="0">:00</option><option value="15">:15</option><option value="30">:30</option><option value="45">:45</option></select><select ng-model="ev.startMeridian"><option value="0">am</option><option value="12">pm</option></select><label for="start">Start Time</label><br><select ng-model="ev.endHour"><option class="text-right" ng-repeat="hour in [12,1,2,3,4,5,6,7,8,9,10,11]" value="{{hour}}">{{hour}}</option></select><select name="end" ng-model="ev.endMinute"><option value="0">:00</option><option value="15">:15</option><option value="30">:30</option><option value="45">:45</option></select><select ng-model="ev.endMeridian"><option value="0">am</option><option value="12">pm</option></select><label for="start">End Time</label><br></div></div></div><button type="submit" class="btn btn-default" value="Submit">Submit</button></form>',
		container: '#MonthView', 
		placement:'auto', 
		saved:false
	};
	$scope.ev = new Object;
	$scope.ev.startHour=12;
	$scope.ev.endHour=1;
	$scope.ev.startMinute=0;
	$scope.ev.endMinute=0;
	$scope.ev.startMeridian = 0;
	$scope.ev.endMeridian = 0;

	$scope.eventpopover = {
		title: '{{event["title"]}}',
		trigger: 'hover',
		delay: { show: 1500, hide: 100 },
		content: '<div style="width:200px; height:125px; position:relative; opacity:1; z-index:4;"  class=" slim"><div ng-input="day.year"></div>{{event["details"]}}</div>', 
		container: '#MonthView', 
		placement:'auto', 
		saved:false
	};

	$scope.tooltip = {title: "Hello Tooltip<br />This is a multiline message!",checked: false}

	$scope.addEvent = function(ev) {
		if ( ev.title && ev.details) 
	  	{
	  		var startHour = parseInt(ev.startHour) + parseInt(ev.startMeridian);
	  		if (startHour == 24){startHour = 12;}
	  		else if (parseInt(startHour) == 12 && parseInt(ev.startMeridian) == 0)	{startHour = 0}
	  		var endHour = parseInt(ev.endHour) + parseInt(ev.endMeridian);
	  		if (endHour == 24){endHour = 12;}
	  		else if (parseInt(endHour) == 12 && parseInt(ev.endMeridian) == 0) {endHour = 0}
	  		if (parseInt(endHour) < parseInt(startHour)) {endHour = startHour}
	  		if (parseInt(startHour) == parseInt(endHour) && parseInt(ev.endMinute) < parseInt(ev.startMinute)) {ev.endMinute = ev.startMinute};
	  		var newEvent = new Array;
	  		newEvent['key'] = Math.random().toString(36).substring(7);
	  		newEvent['title'] = ev.title;
	  		newEvent['details'] = ev.details;
	  		newEvent['src'] = "userEvents";
	  		var startTime = new Date(DateFactory.getCalendarYear(), DateFactory.getCalendarMonth(), DateFactory.getCalendarDay());
	  		var endTime = startTime;
	  		startTime = new Date(startTime.setHours(startHour, ev.startMinute));
	  		endTime = new Date(endTime.setHours(endHour, ev.endMinute));
	  		newEvent['start'] = startTime;
	  		newEvent['end'] = endTime;
	  		newEvent['hour'] = startTime.getHours();  		
	  		newEvent['day'] = DateFactory.getCalendarDay();
	  		newEvent['month'] = DateFactory.getCalendarMonth();
	  		newEvent['year'] = DateFactory.getCalendarYear();  		
			var result = EventFactory.addEvent(newEvent, true);
			if (result === true) {
				$route.reload();
			}
	  	}
	  }

		$scope.hide = function() {
		$('body').on('click', function (e) {
		$('.popover').each(function () {
		//the 'is' for buttons that trigger popups
		//the 'has' for icons within a button that triggers a popup
		// if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
		$('.popover').not(this).hide()
		$(this).show();
		// }
		});
		});
		}



	$scope.deleteEvent = function(ev, index) {
		console.log(ev, index);
		ev.index = index;
		var result = EventFactory.deleteEvent(ev);
		if (result === true) 
		{
		$route.reload();
		}

	}


}]).
controller('WeekCtrl', ['$scope', '$timeout', function WeekCtrl($scope, $timeout) {
 	$scope.dynamicPopover = "Hello, World!";
	$scope.dynamicPopoverText = "dynamic";
	$scope.dynamicPopoverTitle = {
	title: '{{day.month + " "+ day.date + ", " + day.year}}',
	content: '<form role="form" ng-submit="addEvent(ev)"><div class="form-group"><label for="title">Title</label><input type="title" class="form-control" id="title" ng-model="ev.title" placeholder="Enter Title"></div><div class="form-group"><label for="detail">Details</label><textarea class="form-control" ng-model="ev.details" rows="3" cols="30"></textarea></div></div><button type="submit" class="btn btn-default" value="Submit">Submit</button></form>',
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

	$scope.oneAtATime = true;

	$scope.groups = [
	{
	title: "Dynamic Group Header - 1",
	content: "Dynamic Group Body - 1"
	},
	{
	title: "Dynamic Group Header - 2",
	content: "Dynamic Group Body - 2"
	}
	];

	$scope.items = ['Item 1', 'Item 2', 'Item 3'];

	$scope.addItem = function() {
	var newItemNo = $scope.items.length + 1;
	$scope.items.push('Item ' + newItemNo);
	};


}]).
controller('DayCtrl', ['$scope','$route', 'DateFactory', 'EventFactory', function DayCtrl($scope, $route, DateFactory, EventFactory) {
	$scope.src = 'userEvents';
	$scope.hoursofday = DateFactory.hoursInDay;
	$scope.hourSection = DateFactory.sectionInHour;

	$scope.today = function() 
	{
		$scope.dt = new Date();
	};
	$scope.events = EventFactory.fetchDay($scope.calendarDay, $scope.calendarMonth, $scope.calendarYear, $scope.src);

	// $scope.today();
	var cd = DateFactory.getCalendarDate();

	$scope.dt = new Date(new Date(cd).getFullYear(), new Date(cd).getMonth(), new Date(cd).getDate());

	$scope.showWeeks = false;

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
	$scope.minDate = ( $scope.minDate ) ? null : new Date() - 1000*60*60*24*90;
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
	    d.setHours( 12 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	  };

	  $scope.changed = function () {
	    // console.log('Time changed to: ' + $scope.mytime);
	  };

	  $scope.clear = function() {
	    $scope.mytime = null;
	  };

	$scope.$watch('dt', function() {
	   $scope.updateCalendar($scope.dt)
	});

	$scope.ev = new Object;

	$scope.addEvent = function(ev) {
		if ( ev.title && ev.details) 
	  	{
	  		var newEvent = new Array;
	  		newEvent['key'] = Math.random().toString(36).substring(7);
	  		newEvent['title'] = ev.title;
	  		newEvent['details'] = ev.details;
	  		newEvent['src'] = "userEvents";
	  		newEvent['start'] = ev.start;
	  		newEvent['end'] = ev.end;
	  		newEvent['hour'] = ev.start.getHours();
	  		newEvent['day'] = $scope.calendarDay;
	  		newEvent['month'] = $scope.calendarMonth;
	  		newEvent['year'] = $scope.calendarYear
			var result = EventFactory.addEvent(newEvent, true);
			if (result === true) {
				$route.reload();
			}
			console.log(result);
	  	}
		
	}

	$scope.updateCalendar = function(dt) {
		$scope.calendarYear = DateFactory.setCalendarYear(new Date(dt).getFullYear());
		$scope.calendarMonth = DateFactory.setCalendarMonth(new Date(dt).getMonth());
		$scope.calendarDay = DateFactory.setCalendarDay(new Date(dt).getDate());
		$scope.events = EventFactory.fetchDay($scope.calendarDay, $scope.calendarMonth, $scope.calendarYear, $scope.src);
		// $scope.events = ['Event 1' + $scope.calendarDay, "Event 2" + $scope.calendarDay, "Event 3" + $scope.calendarDay];
		$scope.update();
	};

}]).
controller('StorageCtrl', ['EventStorageService', function() {
	

}]);
