'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  // '$strap.directives',
  'ui.bootstrap',
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

	date.getCalendarMonthName = function()
	{
		// console.log('getCalendarMonth is being called'); 
		return localStorage.getItem('calendarMonthName');
	}
	
	date.setCalendarMonthName = function(monthName)
	{
		// console.log('getCalendarMonth is being called'); 
		localStorage.setItem('calendarMonth', monthName);
	}
    date.getCalendarDay = function()
	{
		// console.log('getCalendarDay is being called'); 
		var calendarDay;
		calendarDay = localStorage.getItem('calendarDay');
		if (calendarDay == null)
		{
			calendarDay = new Date().getDate(); 
			localStorage.setItem('calendarDay', calendarDay);
			console.log('No calendarDay set, Date Factory has set calendarDay into localstorage as' + calendarDay );
		}
		// console.log('getCalendarDay has been returned\n'); 
		return calendarDay;
	}

	date.getCalendarDate = function()
	{
		// console.log('getCalendarDay is being called'); 
		var calendarDate;
		calendarDate = localStorage.getItem('calendarDate');
		if (calendarDate == null)
		{
			calendarDate = new Date();
			localStorage.setItem('calendarDate', calendarDate);
			console.log('No calendarDate set, Date Factory has set calendarDate into localstorage as' + calendarDate );
		}
		// console.log('getCalendarDay has been returned\n'); 
		return calendarDate;
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
	}

	date.setCalendarMonth = function(month)
	{
		localStorage.setItem('calendarMonth', month);
		return month;
	}
	
	date.SetCalendarYearToNextYear = function()
	{
		var currentYear = localStorage.getItem('calendarYear');
	    localStorage.setItem('calendarYear', ++currentYear);	
	}

	date.SetCalendarYearToPrevYear = function()
	{
		var currentYear = localStorage.getItem('calendarYear');
	    localStorage.setItem('calendarYear', --currentYear);	
	}
	date.setCalendarYear = function(year)
	{
		localStorage.setItem('calendarYear', year);
		return year;
	}

	date.setCalendarDay = function(day)
	{
	    localStorage.setItem('calendarDay', day);	
	    return day;
	}

	date.setCalendarDate = function(date)
	{
		var newDate = new Date(date);
	    localStorage.setItem('calendarDate', newDate);	
	    return newDate;
	}


date.hoursInDay = [[0, '12 am'], [1,'1 am'], [2, '2 am'], [3,'3 am'], [4,'4 am'],[5, '5 am'], [6, '6 am'], [7, '7 am'], [8, '8 am'],[9, '9 am'], [10, '10 am'], [11, '11 am'], [12, 'Noon'],[13,'1 pm'], [14,'2 pm'], [15,'3 pm'], [16,'4 pm'], [17,'5 pm'], [18,'6 pm'], [19,'7 pm'], [20,'8 pm'], [21,'9 pm'], [22,'10 pm'], [23,'11 pm']]

	date.sectionInHour = [':00', ':15', ':30', ':45'];
        
	
return date;
}]).
factory('MonthFactory', function ()
{  // This should  create an array of each month, and numbers of days in that month for a given year
	var MonthFactory = {};
	MonthFactory.getMonths = function(year)
	{var monthsInYear = new Array;
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
	 return MonthFactory;
}).
factory('DaysOfMonthFactory',['MonthFactory', 'DateFactory', 'DayNameService', 'EventFactory', function (MonthFactory, DateFactory, DayNameService, EventFactory) {
	//console.log('DaysOfMonthFactory has been requested');
	var DaysOfMonthFactory = {};
	DaysOfMonthFactory.getDaysofMonth = function(month, year, src)
	{

		// console.log('getDaysofMonth is being called with month: ' + month + 'and year: ' + year + 'by src: ' + src); // This function should return a month object that fiills out a 35/42 day block; Gathers days from next and prev month as needed
		var month = month;
		var year = year;
		var monthsOfThisYear = MonthFactory.getMonths(year);
		//console.log('monthsOfThisYear: ' + monthsOfThisYear );
		var thisMonth = monthsOfThisYear[month];
		//console.log('thisMonth : ' + thisMonth  );
		var daysinThisMonth = thisMonth[0];
		//console.log('daysinThisMonth: ' + daysinThisMonth);
		var monthArray = new Array; // stores an array of days in month
		var firstDayOfThisMonth = new Date(year, month, 1).getDay();//  find the weekday of the first date of the month
		if (firstDayOfThisMonth != 0)  // need to start the block on a sunday(0) 
		{ 	// not = Sunday
			var beforeFirstDay = new Date(year, month, 0).getDate();  //gets last day index of the last month
			//console.log('beforeFirstDay is ' + beforeFirstDay);
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
				newDay.date = new Date(prevYear, prevMonth, beforeFirstDay);
				newDay.day =  beforeFirstDay;
				newDay.month =  monthsOfThisYear[prevMonth][1];
				newDay.monthBlock = prevMonth;
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
			newDay.date = new Date(year, month, mday);
			newDay.day = new Date(year, month, mday).getDate();
			newDay.month = monthsOfThisYear[month][1];
			newDay.monthBlock = month;
			newDay.year = year;
			newDay.yearBlock = year;
			newDay.events = EventFactory.fetchDay(newDay.day, month, year, 'userEvents');
			// newDay.events = [{title:'Event1', details:"Event 1 details" }, {title:'Event2', details:"Event 2 details" }, {title:'Event3', details:"Event 3 details" }];
			newDay.weekday = DayNameService[new Date(year, month, mday).getDay()] ;
			monthArray.push(newDay);
		}

		var totalrow = Math.ceil(monthArray.length / 7);
		var totaldays = totalrow * 7;
		var daysneeded = totaldays - monthArray.length;
		//console.log('Days needed to fill month block is: '  + daysneeded);
		var nextMonth = parseInt(month) + 1;
		//console.log('The next month is: ' + nextMonth);
		var nextYear = year;
		if (nextMonth > 11)
		{
			nextMonth = 0;
			nextYear++;
		} 
		//console.log('The finalized next month is  ' +monthsOfThisYear[nextMonth] + '& nextYear is: ' +nextYear);
		for (var nday = 1; nday < daysneeded +1; nday++) 
		{
			var newDay = {};
			newDay.date = new Date(nextYear, nextMonth, nday);
			newDay.day = new Date(nextYear, nextMonth, nday).getDate();
			newDay.month = monthsOfThisYear[nextMonth][1];
			newDay.monthBlock = nextMonth;
			newDay.year = nextYear;
			newDay.yearBlock = year;
			newDay.weekday = DayNameService[new Date(nextYear, nextMonth, nday).getDay()] ;
			monthArray.push(newDay);
		}
		//console.log('getDaysofMonth has been returned\n');
		return monthArray;
    	}
    	//console.log('getDaysofMonth has been returned\n');
    	return DaysOfMonthFactory;
}]).
factory("DayNameService", function () {
    var dayNames = ["Sunday","Monday", "Tuesday", " Wednesday", "Thursday", "Friday", "Saturday"];
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
			newDay.day =  beforeFirstDay;
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
			newDay.day =  beforeFirstDay;
			newDay.month =  mon-1;
			month.unshift(newDay);
			beforeFirstDay--;
		}
		}
		for (var mday = 1; mday < countOfDays +1; mday++) 
		{
			var newDay = new Date(year, mon, mday);
			newDay.day = new Date(year, mon, mday).getDate();
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
service('EventStorageService', [ function () {
	var EventStorage = {};
	EventStorage.root = [];
	EventStorage.eventCache=[];

	EventStorage.addSrc = function(src)
	{
		if ( angular.isUndefined(src) || src in this.root )
		{
			return false;
		}
		this.root[src] = new Array;
		return true;
	}

	EventStorage.addYear = function(fullYearValue, src)
	{
		var yearValue = String(fullYearValue).slice(2);
		if ( src in this.root)
		{
			var currentYear = new Date().getFullYear();
			if ( parseInt(fullYearValue) < parseInt(currentYear) - 5 || parseInt(fullYearValue) > parseInt(currentYear) + 5  )
			{
				return false;
			}
			else if ( yearValue in this.root[src])
			{
				if ( this.root[src][yearValue] != null )
				{
					// console.log('year already in root');
					return false;	
				}
				
			}
			var year = new Array;
			this.root[src][yearValue] = new Array;
			return true;
		}
		return false;
	}

	EventStorage.addMonth = function(monthValue, fullYearValue, src)
	{
		var yearValue = String(fullYearValue).slice(2);
		if ( src in this.root)
		{
			if ( yearValue in this.root[src])
			{
				if ( parseInt(monthValue) < 0 || parseInt(monthValue) > 11  )
				{
					return false;
				}
				else if ( parseInt(monthValue) in this.root[src][yearValue] ) 
				{
					if ( this.root[src][yearValue][parseInt(monthValue)] != null)
					{
						// console.log("month already in root");
						return false;
					}
				}
				this.root[src][yearValue][monthValue] = new Array;
				return true;
			}
		}
		return false;
	}

	EventStorage.addDay = function(dayValue, monthValue, fullYearValue, src)
	{
		var yearValue =  String(fullYearValue).slice(2);
		if ( src in this.root)
		{
			if ( yearValue in this.root[src] )
			{
				if ( parseInt(monthValue) in this.root[src][ yearValue ] ) 
				{
					if ( parseInt(dayValue) < 1 || parseInt(dayValue) > 31  )
					{
						return false;
					}
					else if ( parseInt(dayValue) in this.root[src][ yearValue ][ parseInt(monthValue)] )
					{
						if ( this.root[src][ yearValue ][ parseInt(monthValue)][parseInt(dayValue)] != null)
						{
							// console.log('day already in root');
							return false;
						}
					}
					// var hour = Array.apply(null, new Array(4)).map(Array.prototype.valueOf,[]);
					// var hour =new Array;
					// var day= Array.apply(null, new Array(24)).map(Array.prototype.valueOf,hour);
					this.root[src][ yearValue ][ parseInt(monthValue) ] [ parseInt(dayValue) ] = new Array;
					return true;
				}
			}
		}
		return false;

	}

	EventStorage.addHour = function(hourValue, dayValue, monthValue, fullYearValue, src)
	{
		var yearValue =  String(fullYearValue).slice(2);
		if ( src in this.root)
		{
			if ( yearValue in this.root[src] )
			{
				if ( parseInt(monthValue) in this.root[src][ yearValue ] ) 
				{
					if ( parseInt(dayValue) in this.root[src][ yearValue ][parseInt(monthValue)] ) 
					{
						if ( parseInt(hourValue) < 0 || parseInt(hourValue) > 24  )
						{
							return false;
						}
						else if ( parseInt(hourValue) in this.root[src][ yearValue ][parseInt(monthValue)][parseInt(dayValue)] )
						{
							if ( this.root[src][ yearValue ][parseInt(monthValue)][parseInt(dayValue)][parseInt(hourValue)] != null)
							{
								// console.log('hour already in root');
								return false;
							}
						}
						// var hour = Array.apply(null, new Array(4)).map(Array.prototype.valueOf,[]);
						// var hour =new Array;
						// var day= Array.apply(null, new Array(24)).map(Array.prototype.valueOf,hour);
						this.root[src][yearValue][parseInt(monthValue)][parseInt(dayValue)][parseInt(hourValue)]  = new Array;
						return true;
					}
				}
			}
		}
		return false;
	}

	EventStorage.addEvent = function (ev, cache) 
	{
		// this.root = JSON.parse(localStorage["root"]);
		// console.log(ev);
		if (angular.isObject(ev) )
		{
			var eventYear = new Date(ev['year'], ev['month']).getFullYear();
			var eventMonth = new Date(ev['year'], ev['month']).getMonth();
			var eventDay = new Date(ev['year'], ev['month'], ev['day']).getDate();
			// console.log("eventYear: " + eventYear + "eventMonth: " + eventMonth + "eventDay: " + eventDay)
			this.addSrc(ev['src']);
			this.addYear(eventYear, ev['src']);
			this.addMonth(eventMonth, eventYear, ev['src']);
			this.addDay(eventDay,eventMonth, eventYear, ev['src']);
			this.addHour(ev['hour'],eventDay,eventMonth, eventYear, ev['src']);
			if (ev['src'] in this.root)
			{
				if ( String(eventYear).slice(2)  in this.root[ev['src']]) 
				{
					if (eventMonth in this.root[ev['src']][ String(eventYear).slice(2)  ]) 
					{
						if (eventDay in this.root[ev['src']][ String(eventYear).slice(2) ][eventMonth])
						{
							if (ev['hour'] in this.root[ev['src']][ String(eventYear).slice(2) ][eventMonth][eventDay])
							{
								this.root[ev['src']][ String(eventYear).slice(2) ][eventMonth][eventDay][ev['hour']].push(ev);
								if (cache === true) 
								{								
									this.eventCache.push(ev['key']);
									localStorage["eventCache"] = JSON.stringify(this.eventCache);
									var final = {}; // this loops is in place because there is a challenge with json an the ev object
									var index = 1;
									for(var key in ev)
									{
										final[key] = ev[key];
										index = index + 1;
									}
									var evData = JSON.stringify(final);
									localStorage.setItem(ev['key'], evData);	
								}
								return true;
							}
						}
					}
				}
				else {
					return "year not in src";
				}
			}
			else {
				return "src not in root";
			}
		}
		return false;
	}

	EventStorage.deleteEvent = function (ev) 
	{
		if (angular.isObject(ev) )
		{
			console.log(ev.src, this.root);
			var eventYear = new Date(ev.start).getFullYear();
			var eventMonth = new Date(ev.start).getMonth();
			var eventDay = new Date(ev.start).getDate();
			console.log(eventYear, eventMonth, eventYear);
			if ( ev.src in this.root)
			{				
				if ( String(eventYear).slice(2)  in this.root[ev.src]) 
				{
					if (parseInt(eventMonth) in this.root[ev.src][ String(eventYear).slice(2)  ]) 
					{
						if (eventDay in this.root[ev.src][ String(eventYear).slice(2) ][eventMonth])
						{
							if (ev.hour in this.root[ev.src][ String(eventYear).slice(2) ][eventMonth][eventDay])
							{
								var hour = this.root[ev.src][ String(eventYear).slice(2) ][eventMonth][eventDay][ev.hour];
								for (var evt=0; evt <= hour.length; evt++) 
								{
									if (ev.key == hour[evt]['key'])
									{
										console.log(hour);
										this.root[ev.src][String(eventYear).slice(2) ][eventMonth][eventDay][ev.hour].splice(evt, 1);
										localStorage.removeItem(ev.key);
										var eventCache= localStorage.getItem('eventCache');
										var eventCache =JSON.parse(eventCache);
										var keyPosition = eventCache.indexOf(ev.key);
										console.log(keyPosition);
										eventCache.splice(keyPosition, 1);
										localStorage["eventCache"] = JSON.stringify(eventCache);
										console.log(this.root);  

									}
									
								}
								return true;
							}
							else{console.log('hour not in this.root[src][year][month][day]')}
						}
						else{console.log('day not in this.root[src][year][month]')}
					}
					else{console.log('month not in this.root[src][year]')}
				}
				else{console.log('year not in source')}
			}
			else{console.log('src not in this.root')}
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
		// console.log('fetchDay calle with Day: ' + fetchDay + ' Month: ' + fetchMonth + " Year: " + fetchYear);
		if ( angular.isDefined(this.root[src]) && angular.isDefined(this.root[src][ String(fetchYear).slice(2) ] )&& angular.isDefined(this.root[src][ String(fetchYear).slice(2) ][fetchMonth] ) )
		{
			if  (parseInt(fetchDay) in this.root[src][ String(fetchYear).slice(2) ][ parseInt(fetchMonth) ] )
			{
				var day = this.root[src][ String(fetchYear).slice(2) ][ parseInt(fetchMonth) ][ parseInt(fetchDay)];
				var hours = 23;
				var hourWithEvents = [];
				var allEvents = [];
				for (var i=0; i < hours; i++)
				{
					if (angular.isDefined(day[i]))
					{
						hourWithEvents.push(day[i]);
					}
				}
				for (var hr=0; hr < hourWithEvents.length; hr++)
				{
					for (var evt=0; evt < hourWithEvents[hr].length; evt++)
					{
						allEvents.push(hourWithEvents[hr][evt]);
					}
				}
				return allEvents;	
			}
		}
		return null;
	}

	if (localStorage.getItem("eventCache") != null && typeof localStorage.getItem("eventCache") != 'undefined') 
	{
		var data = localStorage.getItem('eventCache');
		EventStorage.eventCache = JSON.parse(data);
		for (var i = 0; i < EventStorage.eventCache.length; i++) 
		{
			// alert( i + ' : ' + EventStorage.eventCache.length);
			var index = EventStorage.eventCache[i];
			index = localStorage.getItem(index);
			index = JSON.parse(index);
			// var newEvent = new Array;
			// newEvent['key'] = index['key'];
	  // 		newEvent['title'] = index['title'];
	  // 		newEvent['details'] = index['title'];
	  // 		newEvent['src'] = index['src'];
	  // 		newEvent['start'] = index['start'];
	  // 		newEvent['end'] = index['end'];
	  // 		newEvent['hour'] = index['hour'];
	  // 		newEvent['day'] = index['day'];
	  // 		newEvent['month'] = index['month'];
	  // 		newEvent['year'] = index['year'];
	  		EventStorage.addEvent(index, false);
		}		
	}
	else {
		
		localStorage["root"] = JSON.stringify(EventStorage.root);
		console.log('root init as empty array');
		console.log(EventStorage.root);
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
  $routeProvider.when('/week', {templateUrl: 'partials/week.html', controller: 'WeekCtrl'});
  $routeProvider.when('/day', {templateUrl: 'partials/dayView.html', controller: 'DayCtrl'});
  // $routeProvider.otherwise({redirectTo: '/view1'});
}]);
  
