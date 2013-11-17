'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
factory('DateFactory',['$log', function ($log) { //this should return a object that has methods to get the current calenday month and year
    	var date={};
    	date.getCalendarYear = function()
    	{
    		var calendarYear;								// and store and useful time units of times to 
		calendarYear = localStorage.getItem('calendarYear');
		if (calendarYear == null)
		{
			calendarYear = new Date().getFullYear(); // Establish the year
			localStorage.setItem('calendarYear', calendarYear);
			console.log('No calendarYear set, Date Factory has set calendarYear into localstorage as' +calendarYear );
		}
		// console.log('getCalendarYear has been returned\n'); 
		return calendarYear;
	}
	date.getCalendarMonth = function()
	{
		// console.log('getCalendarMonth is being called'); 
		var calendarMonth;
		calendarMonth  = localStorage.getItem('calendarMonth');
		if (calendarMonth == null)
		{
			calendarMonth = new Date().getMonth(); 
			localStorage.setItem('calendarMonth', calendarMonth);
			console.log('No calendarMonth set, Date Factory has set calendarMonth into localstorage as' + calendarMonth );
		}
		// console.log('getCalendarMonth has been returned\n'); 
		return calendarMonth;
	}

	date.SetCalendarDateToNextMonth = function()
	{
		console.log('SetCalendarDateToNextMonth is being called'); 
		var currentMonth = localStorage.getItem('calendarMonth');
		var currentYear = localStorage.getItem('calendarYear');
		console.log('Initial calendarMonth is set to ' + currentMonth + ' & calendarYear set to ' +  currentYear);
		if ( currentMonth >= 11)
		{
			localStorage.setItem('calendarMonth', 0);
			localStorage.setItem('calendarYear', ++currentYear);
		}
		else {
			localStorage.setItem('calendarMonth', ++currentMonth);	
		}
		console.log('SetCalendarDateToNextMonth set month to ' + localStorage.getItem('calendarMonth') + '& calendarYear is ' + localStorage.getItem('calendarYear') ) ;
	}
	date.SetCalendarDateToPrevMonth = function()
	{
		var currentMonth = localStorage.getItem('calendarMonth');
		var currentYear = localStorage.getItem('calendarYear');
		console.log('Initial calendarMonth is set to ' + currentMonth + ' & calendarYear set to ' +  currentYear);
		if ( currentMonth <= 0)
		{
			localStorage.setItem('calendarMonth', 11);
			localStorage.setItem('calendarYear', --currentYear);	
		}
		else {
			localStorage.setItem('calendarMonth', --currentMonth);
		}
		console.log('SetCalendarDateToPrevMonth set month to ' + localStorage.getItem('calendarMonth') + '& calendarYear is ' + localStorage.getItem('calendarYear') ) ;
	}
	return date;
}]).
factory('MonthFactory', function ()
{  // This should  create an array of each month, and numbers of days in that month for a given year
	console.log('MonthFactory has been requested');
	var MonthFactory = {};
	MonthFactory.getMonths = function(year)
	{
		var monthsInYear = new Array;
	    	monthsInYear[0] = [31, "January", year];
		monthsInYear[1] = [28, "February", year];
		monthsInYear[2] = [31, "March", year];
		monthsInYear[3]= [30, "April", year];
		monthsInYear[4] = [31, "May", year];
		monthsInYear[5] = [30, "June", year];
		monthsInYear[6] = [31, "July", year];
		monthsInYear[7] = [31, "August", year];
		monthsInYear[8] = [30, "September", year];
		monthsInYear[9] = [31, "October", year];
		monthsInYear[10] = [30, "November", year];
		monthsInYear[11] = [31, "December", year];
		if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) //leap year detection
		{ 	// set a leap year
			monthsInYear[1][0] = 29;
		}
	    	return monthsInYear;
	 }
	 console.log('MonthFactory has been returned\n');
	 return MonthFactory;
}).
// factory('daysInMonthBlock',['MonthFactory', 'DateFactory', 'dayNames', function (MonthFactory, DateFactory, dayNames) {
// 	console.log('daysInMonthBlock has been requested'); // Right now this function builds out 35/42 days month blocks and pastes those together and returns that into on big flat linear array.
// 	var days = new Array;  // days will contain all of the day objects for the entire day
// 	var year = DateFactory.getCalendarYear();
// 	var monthsInYear = MonthFactory.getMonths(DateFactory.getCalendarYear());
// 	//alert(month);
// 	for (var month = 0; month < 12; i++) 
// 	{
// 		var countOfDays = monthsInYear[month][0]; // get the total of days in the current month position
// 		var monthArray = new Array; // stores an array of days in month
// 		var firstDayOfMonth = new Date(year, month, 1).getDay();//  find the weekday of the first date of the month
// 		if (firstDayOfMonth != 0)  // need to start the block on a sunday(0) 
// 		{ 	// not = Sunday
// 		var beforeFirstDay = new Date(year, month, 0).getDate();  //gets last day index of the last month
// 		// console.log('beforeFirstDay is ' + beforeFirstDay);
// 		for (var i = 0; i < firstDayOfMonth; i++)  // fill previous days back to Sunday
// 		{
// 			var prevMonth = parseInt(month) -1;
// 			var prevYear = year; // Might stay the same as current year unless we are in January
// 			if ( prevMonth  < 0) 
// 			{ 
// 				prevMonth = 11
// 				prevYear = year--;
// 			}
// 			var newDay = {};
// 			newDay.date =  beforeFirstDay;
// 			newDay.month =  monthsInYear[prevMonth][1];
// 			newDay.monthBlock = month + monthsInYear[month][1];
// 			newDay.year = prevYear;
// 			newDay.yearBlock = year;
// 			newDay.weekday = dayNames[beforeFirstDay];
// 			monthArray.unshift(newDay);
// 			beforeFirstDay--;
// 		}
// 		}
// 		for (var mday = 1; mday < countOfDays +1; mday++) 
// 		{
// 			var newDay = {};
// 			newDay.date = new Date(year, month, mday).getDate();
// 			newDay.month = monthsInYear[month][1];
// 			newDay.monthBlock = month + monthsInYear[month][1];
// 			newDay.year = year;
// 			newDay.yearBlock = year;
// 			newDay.weekday = dayNames[new Date(year, month, mday).getDay()] ;
// 			monthArray.push(newDay);
// 		}

// 		var totalrow = Math.ceil(monthArray.length / 7);
// 		var totaldays = totalrow * 7;
// 		var daysneeded = totaldays - monthArray.length;
// 		// alert(daysneeded);
// 		var nextMonth = parseInt(month) + 1;
// 		// alert('next month starts at' + nextMonth);
// 		var nextYear = year;
// 		if (nextMonth > 11)
// 		{
// 			nextMonth = 0;
// 			nextYear++;
// 		} 
// 		// alert('The next month is ' +monthsInYear[nextMonth]);
// 		for (var nday = 1; nday < daysneeded +1; nday++) 
// 		{
// 			var newDay = {};
// 			newDay.date = new Date(nextYear, nextMonth, nday).getDate();
// 			newDay.month = monthsInYear[nextMonth][1];
// 			newDay.monthBlock = month + monthsInYear[month][1];
// 			newDay.year = nextYear;
// 			newDay.yearBlock = year;
// 			newDay.weekday = dayNames[new Date(nextYear, nextMonth, nday).getDay()] ;
// 			monthArray.push(newDay);
// 		}
// 		var length = monthArray.length;
// 		for (var i = 0; i < length; i++) {
// 		days.push(monthArray[i]);
// 		}
// 		month++;
// 	}
// 	console.log('daysInMonthBlock has been returned\n'); 
//     	return days;
// }]).
factory('DaysOfMonthFactory',['MonthFactory', 'DateFactory', 'DayNameService', 'EventFactory', function (MonthFactory, DateFactory, DayNameService, EventFactory) {
	console.log('DaysOfMonthFactory has been requested');
	var DaysOfMonthFactory = {};
	DaysOfMonthFactory.getDaysofMonth = function(month, year, src)
	{

		console.log('getDaysofMonth is being called with month: ' + month + 'and year: ' + year + 'by src: ' + src); // This function should return a month object that fiills out a 35/42 day block; Gathers days from next and prev month as needed
		var month = month;
		var year = year;
		var monthsOfThisYear = MonthFactory.getMonths(year);
		console.log('monthsOfThisYear: ' + monthsOfThisYear );
		var thisMonth = monthsOfThisYear[month];
		console.log('thisMonth : ' + thisMonth  );
		var daysinThisMonth = thisMonth[0];
		console.log('daysinThisMonth: ' + daysinThisMonth);
		var monthArray = new Array; // stores an array of days in month
		var firstDayOfThisMonth = new Date(year, month, 1).getDay();//  find the weekday of the first date of the month
		if (firstDayOfThisMonth != 0)  // need to start the block on a sunday(0) 
		{ 	// not = Sunday
			var beforeFirstDay = new Date(year, month, 0).getDate();  //gets last day index of the last month
			console.log('beforeFirstDay is ' + beforeFirstDay);
			for (var i = 0; i < firstDayOfThisMonth; i++)  // fill previous days back to Sunday
			{
				var prevMonth = parseInt(month) -1;
				var prevYear = year; // Might stay the same as current year unless we are in January
				if ( prevMonth  < 0) 
				{ 
					prevMonth = 11
					prevYear = year--;
				}
				var newDay = {};
				newDay.date =  beforeFirstDay;
				newDay.month =  monthsOfThisYear[prevMonth][1];
				newDay.monthBlock = month + monthsOfThisYear[month][1];
				newDay.year = prevYear;
				newDay.yearBlock = year;
				newDay.weekday = DayNameService[beforeFirstDay];
				monthArray.unshift(newDay);
				beforeFirstDay--;
			}
		}
		for (var mday = 1; mday < daysinThisMonth +1; mday++) 
		{
			var newDay = {};
			newDay.date = new Date(year, month, mday).getDate();
			newDay.month = monthsOfThisYear[month][1];
			newDay.monthBlock = month + monthsOfThisYear[month][1];
			newDay.year = year;
			newDay.yearBlock = year;
			newDay.events = EventFactory.fetchDay(newDay.date, month, year, 'userEvents');
			newDay.weekday = DayNameService[new Date(year, month, mday).getDay()] ;
			monthArray.push(newDay);
		}

		var totalrow = Math.ceil(monthArray.length / 7);
		var totaldays = totalrow * 7;
		var daysneeded = totaldays - monthArray.length;
		console.log('Days needed to fill month block is: '  + daysneeded);
		var nextMonth = parseInt(month) + 1;
		console.log('The next month is: ' + nextMonth);
		var nextYear = year;
		if (nextMonth > 11)
		{
			nextMonth = 0;
			nextYear++;
		} 
		console.log('The finalized next month is  ' +monthsOfThisYear[nextMonth] + '& nextYear is: ' +nextYear);
		for (var nday = 1; nday < daysneeded +1; nday++) 
		{
			var newDay = {};
			newDay.date = new Date(nextYear, nextMonth, nday).getDate();
			newDay.month = monthsOfThisYear[nextMonth][1];
			newDay.monthBlock = month + monthsOfThisYear[month][1];
			newDay.year = nextYear;
			newDay.yearBlock = year;
			newDay.weekday = DayNameService[new Date(nextYear, nextMonth, nday).getDay()] ;
			monthArray.push(newDay);
		}
		console.log('getDaysofMonth has been returned\n');
		return monthArray;
    	}
    	console.log('getDaysofMonth has been returned\n');
    	return DaysOfMonthFactory;
}]).
factory("DayNameService", function () {
    var dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames;
}).
service("grid", ['MonthFactory', 'DateFactory', function (MonthFactory, DateFactory) 
{
	var year = DateFactory.getCalendarYear();
	var month = DateFactory.getCalendarMonth();
	var monthsInYear = MonthFactory.getMonths(year);
	var prefill = [];
	var days = [];
	days.mdays = [];
	var year = new Date(new Date().getFullYear(), 0, 1).getYear();
	var firstDayOfMonth = new Date(new Date().getFullYear(), 0, 1).getDay();
	if (firstDayOfMonth != 0) 
	{ 	// not = Sunday
		var beforeFirstDay = new Date(year, 0, 0).getDate();  // fill previous days back to Sunday
		for (var i = 0; i < firstDayOfMonth; i++) 
		{
			var newDay = new Date(year--, 12, beforeFirstDay);
			newDay.date =  beforeFirstDay;
			newDay.month =  "December";
			days.unshift(newDay);
			beforeFirstDay--;
		}
	}
	//days['prefill'] = prefill;
	var length = monthsInYear.length;
	var mon = 0;
	while ( mon < length) 
	{
		var countOfDays = monthsInYear[mon][0];
		var month = new Array;
		var firstDayOfMonth = new Date(new Date().getFullYear(), mon, 1).getDay();
		if (firstDayOfMonth != 0) 
		{ 	// not = Sunday
		var beforeFirstDay = new Date(new Date().getFullYear(), mon, 0).getDate();  // fill previous days back to Sunday
		// console.log('beforeFirstDay is ' + beforeFirstDay);
		for (var i = 0; i < firstDayOfMonth; i++) 
		{
			var newDay = new Date(new Date().getFullYear(), mon-1, beforeFirstDay);
			newDay.date =  beforeFirstDay;
			newDay.month =  mon-1;
			month.unshift(newDay);
			beforeFirstDay--;
		}
		}
		for (var mday = 1; mday < countOfDays +1; mday++) 
		{
			var newDay = new Date(year, mon, mday);
			newDay.date = new Date(year, mon, mday).getDate();
			newDay.month = monthsInYear[mon][1];
			days.push(newDay);
			month.push(newDay);
		}
		days.mdays.push(month);
		mon++;
		if (mon >=  12){break};
	};
	return days;
}]).
service('EventStorageService', [function () {
	console.log('EventStorageService being called');
	var EventStorage = {};
	EventStorage.root = [];

	EventStorage.addSrc = function(src)
	{
		if ( angular.isUndefined(src) || source in this.root )
		{
			return false;
		}
		this.root[src] = new Array;
		return true;
	}

	EventStorage.addYear = function(fullYearValue, src)
	{

		if ( src in this.root)
		{
			var currentYear = new Date().getFullYear();
			if ( parseInt(fullYearValue) < parseInt(currentYear) - 5 || parseInt(fullYearValue) > parseInt(currentYear) + 5  )
			{
				return false;
			}
			else if ( String(fullYearValue.slice(2) ) in this.root[src])
			{
				return false;
			}
			var year = new Array;
			this.root[src][String(fullYearValue).slice(2)] = new Array;
			return true;
		}
		return false;
	}

	EventStorage.addMonth = function(monthValue, fullYearValue, src)
	{
		if ( src in this.root)
		{
			if ( String(fullYearValue).slice(2) in this.root[src])
			{
				if ( parseInt(monthValue) in this.root[src][ String(fullYearValue).slice(2) ] ) {
					return false;
				}
				else if ( parseInt(monthValue) < 0 || parseInt(monthValue) > 11  )
				{
					return false;
				}
				var month = new Array;
				this.root[src][String(fullYearValue).slice(2) ][monthValue] = month;
				return true;
			}
		}
		return false;
	}

	EventStorage.addDay = function(dayValue, monthValue, fullYearValue, src)
	{
		if ( src in this.root)
		{
			if ( String(fullYearValue).slice(2) in this.root[src] )
			{
				if ( parseInt(monthValue) in this.root[src][ String(fullYearValue).slice(2) ] ) {
					if ( parseInt(dayValue) in this.root[src][ String(fullYearValue).slice(2) ][ parseInt(monthValue)] )
					{
						return false;
					}
					else if ( parseInt(dayValue) < 1 || parseInt(dayValue) > 31  )
					{
						return false;
					}
					var day = new Array;
					this.root[src][ String(fullYearValue).slice(2) ][ parseInt(monthValue) ] [ parseInt(dayValue) ] = day;
					return true;
				}
			}
		}
		return false;

	}

	EventStorage.addEvent = function (event) 
	{
		if (angular.isObject(event) )
		{
			var eventYear = new Date(event.date).getFullYear();
			var eventMonth = new Date(event.date).getMonth();
			var eventDay = new Date(event.date).getMonth();
			this.addSource(event.src);
			this.addYear(eventYear, event.src);
			this.addMonth(eventMonth, eventYear, event.src);
			this.addDay(eventDay,eventMonth, eventYear, event.src);
			if (event.src in this.root)
			{
				if ( String(eventYear).slice(2)  in this.root[src]) 
				{
					if (eventMonth in this.root[src][ String(eventYear).slice(2)  ]) 
					{
						if (eventDay in this.root[src][ String(eventYear).slice(2) ][eventMonth])
						{
							this.root[src][ String(eventYear).slice(2) ][eventMonth][eventDay][event.key].push(event);
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	EventStorage.deleteEvent = function (event) 
	{
		if (angular.isObject(event) )
		{
			var eventYear = new Date(event.date).getFullYear();
			var eventMonth = new Date(event.date).getMonth();
			var eventDay = new Date(event.date).getMonth();
			if ( event.src in this.root)
			{				
				if ( String(eventYear).slice(2)  in this.root[event.source]) 
				{
					if (parseInt(eventMonth) in this.root[event.src][ String(eventYear).slice(2)  ]) 
					{
						if (eventDay in this.root[event.src][ String(eventYear).slice(2) ][eventMonth])
						{
							var eventPosition = array.indexOf(event.key);
							if( eventPosition != -1) {
								this.root[String(eventYear).slice(2) ][eventMonth][eventDay].splice(eventPosition, 1);
							}
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	EventStorage.fetchYear = function(fetchYear)
	{
		if  (parseInt(fetchYear) in this.root )
		{
			return this.root[parseInt(fetchYear)];	
		}
		return null;
	}

	EventStorage.fetchMonth = function(fetchMonth, fetchYear, src)
	{
		if  (parseInt(fetchMonth) in this.root[src][ String(fetchYear).slice(2)] )
		{
			return this.root[src][ String(fetchYear).slice(2) ][ parseInt(fetchMonth) ];	
		}
		return null;
	}

	EventStorage.fetchDay = function(fetchDay, fetchMonth, fetchYear, src)
	{
		console.log(String(fetchYear).slice(2) );
		console.log('fetchDay calle with Day: ' + fetchDay + ' Month: ' + fetchMonth + " Year: " + fetchYear);
		if  (parseInt(fetchDay) in this.root[src][ String(fetchYear).slice(2) ][ parseInt(fetchMonth) ] )
		{
			return this.root[src][ String(fetchYear).slice(2) ][ parseInt(fetchMonth) ][ parseInt(fetchDay) ] ;	
		}
		return null;
	}
	return EventStorage;	
}]).
factory('EventFactory', ['EventStorageService' , function (EventStorageService) {
	//Detect the event preference for the user
	//import the various event sources
	//This should pull in databse data for user events
	// Build a userEvent model that stores all of the requested events into data object
	//set data object in local storage

	return 	EventStorageService;
}]).
config(['$routeProvider','$locationProvider',  function($routeProvider, $locationProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl2'});
  $routeProvider.when('/year', {templateUrl: 'partials/year.html', controller: 'YearCtrl'});
  $routeProvider.when('/month', {templateUrl: 'partials/month.html', controller: 'MonthCtrl'});
  $routeProvider.when('/month/:month/:year', {templateUrl: 'partials/month.html', controller: 'YearCtrl'});
  $routeProvider.when('/week', {templateUrl: 'partials/week.html', controller: 'YearCtrl'});
  $routeProvider.when('/day', {templateUrl: 'partials/day.html', controller: 'YearCtrl'});
  // $routeProvider.otherwise({redirectTo: '/view1'});
}]);
  