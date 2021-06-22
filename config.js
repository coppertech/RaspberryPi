 /* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: [],
//	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::fff:192.168.1.70"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "MMM-CalendarExt2",
			config: {
			calendars : [
    			  {
			    name: "Tims",
    			    url: "https://calendar.google.com/calendar/ical/rvfd42%40gmail.com/xxxxxxxxxxxx/basic.ics",
			    className: "me"
    			  },
			  {
			    name: "XJob",
			    url: "https://calendar.google.com/calendar/ical/rkdltkshav356gjb7i406df5lg%40group.calendar.google.com/private-ded143e44b0de40d13207ca0da6357bb/basic.ics",
			    className: "xjob"
			  },
			  {
			    name: "PD",
			    url: "https://outlook.office365.com/owa/calendar/b94a0b76b0754d5ea6d220b112c0d876@apd.cityofalvin.com/faf2cfd955b9428fa6ec8a8cf18e5bff6970080585998594136/calendar.ics",
			    className: "pd"
			  }
    			],
			views: [
		          {
		            name: "view1",
		            mode: "week",
		            slotCount: "6",
		            maxItems: "1000",
        		    hideOverflow: false,
        		    slotMaxHeight: "95px",
        		    monthFormat: "MMMM YYYY",
        		    position: "top_left",
        		    calendars: ["Tims","XJob","PD"]
        		  },
       			 ],
        		scenes: [
		          {
        		    name: "DEFAULT",
        		  },
        		],
			},
		//	position: "lower_third"
		},
			{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				units: "Imperial",
				location: "Rosharon",
				locationID: "4723944", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "xxx"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				units: "Imperial",
				location: "Rosharon",
				locationID: "4723944", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "xxx"
			}
		},
		{
			  module: 'MMM-NiceHash',
			  position: 'top_right', // Place the module where you want
			  header: 'NiceHash', // Optional - default: 'NiceHash'
			  config: {
			    apiKey: 'xxx',
			    apiSecret: 'yyy',
			    organizationId: 'e4c8aacf-7a11-40f8-8d45-9af37d971cd3',
			    currency: 'USD', // Optional, default: 'USD'
			    symbolPosition: 'left' // Optional, default: 'right'
			  }
		},
		{
			module: 'MMM-MWWordOfTheDay',
			position: 'top_right',
			config: {
				updateInterval: 120000,
				headerText: "Word of the day"
			}
		},
		{
			module: "calendar",
			header: "Upcoming",
			position: "top_right",
			config: {
				maximumNumberOfDays: 14,
				calendars: [
    			  {
			    name: "Tims",
    			    url: "https://calendar.google.com/calendar/ical/rvfd42%40gmail.com/xxx/basic.ics",
    			  },
			  {
			    name: "XJob",
			    url: "https://calendar.google.com/calendar/ical/xxx/basic.ics",
			  }
    			]
			}
		},
//		{
//			module: "newsfeed",
//			position: "bottom_bar",
//			config: {
//				feeds: [
//					{
//						title: "New York Times",
//						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
//					}
//				],
//				showSourceTitle: true,
//				showPublishDate: true,
//				broadcastNewsFeeds: true,
//				broadcastNewsUpdates: true
//			}
//		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
