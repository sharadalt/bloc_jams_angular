 (function() {
     function LandingCtrl() {
       this.heroTitle = "Turn the Music Up!";
     }
 
     angular
         .module('musicJams')
         .controller('LandingCtrl', LandingCtrl);
 })();