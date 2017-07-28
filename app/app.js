var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("home", {
            url:"/",
            views: {
                contents: {
                    controller:  "home",
                    templateUrl: "app/home/homeController.html"
                }
            }
        })
        .state("about-us", {
            url: "/about-us", 
            views: {
                contents: {
                    controller:  "aboutUs",
                    templateUrl: "app/aboutUs/aboutUsController.html"
                }
            }
        })
        .state("about-us.staff", {
            url: "/staff",
            views: {
                contents: { 
                    controller:  "aboutUs",
                    templateUrl: "app/aboutUs/aboutUsController.html"
                }
            }
        })
        .state("facility", {
            url: "/facility",
            views: {
                contents: {
                    controller: "facility",
                    templateUrl: "app/facility/facilityController.html"
                }
            }
        })
        .state("contact", {
            url: "/contact",
            views: {
                contents: {
                    controller: "contact",
                    templateUrl: "app/contact/contactController.html"
                }
            }
        })
        .state("news", {  
            url: "/news",
            views: {
                contents: {
                    controller: "news",
                    templateUrl: "app/news/newsController.html"
                }
            }
        })
        .state("schedule", {        
            url: "/schedule",
            views: {
                contents: {
                    controller: "schedule",
                    templateUrl: "app/calendar/scheduleController.html"
                }
            }
        })
        .state("wod", {        
            url: "/wod",
            views: {
                contents: {
                    controller: "wod",
                    templateUrl: "app/wod/wodController.html"
                }
            }
        })
        .state("pricing", {
            url: "/pricing",
            views: {
                contents: {
                    controller: "pricing",
                    templateUrl: "app/pricing/pricingController.html"
                }
            }
        })
        .state("login", {
            url: "/login",
            views: {
                contents: {
                    controller: "login",
                    templateUrl: "app/login/loginController.html"
                }
            }
        })
        .state("forgotPassword", {       
            url: "/forgot",
            views: {
                contents: {
                    controller: "forgotPassword",
                    templateUrl: "app/login/forgotPasswordController.html"
                }
            }
        })
        .state("register", {        
            url: "/register",
            views: {
                contents: {
                    controller: "register",
                    templateUrl: "app/login/registerController.html"
                }
            }
        });
});