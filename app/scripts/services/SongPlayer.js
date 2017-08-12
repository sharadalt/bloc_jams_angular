/**
 * @desc SongPlayer Service for Bloc Jams
 * @type function
 * @desc returns the SongPlayer object, making it's properties and methods public to the rest of the application
 * @desc The source link for this is added in index.html after Fixtures.js
 * @desc Since the SongPlayer service will play music, we added the
 * Buzz library source to index.html
 * @desc As we play music from Album vew, this service is injected into AlbumCtrl.
 * @The songPlayer property holds the service and makes the service accessible within the Album view. 
 */

(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};   
    
    /**
     * @desc get album information 
     * @type {Object}
     */
    
    var currentAlbum = Fixtures.getAlbum();
    
    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;
    
    /**
     * @desc volume
     * @type number
     */
    var currentVolume = 80;
       
    /**
     * @function playSong
     * @desc Plays the currentBuzzObject and Sets the playing property of the song object to true
     * @parsm {Object} song
    */   
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };
    
    /**
     * @function setVolume
     * @desc Varies the volume
     * @param {Object} 
     */
     SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
      //console.log(currentBuzzObject);
    };
    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }
 
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
 
      currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
             if (SongPlayer.currentTime == SongPlayer.currentSong.duration){
             // call SongPlayer function to play the next song automatically
               SongPlayer.next();
             }
         });
        
      });
      
      SongPlayer.currentSong = song;
      SongPlayer.setVolume(currentVolume);   
    };
    
    /**
     * @function stopSong
     * @desc stop the currentBuzzObject and set the playing propertu of the song object null
     * @param {Object} song
     */
    
      var stopSong = function() {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
    
    /**
     * @function getSongIndex
     * @desc Get the index of the song to be paused/played
     * @param {Object} song
     */
     var getSongIndex = function(song) {
       return currentAlbum.songs.indexOf(song);
     };
    
    /**
     * @desc Active song object from list of songs
     * @type {Object}
     */
      SongPlayer.currentSong = null;
    /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
    */
      SongPlayer.currentTime = null;
    
    /**
     * @desc Volume control for the currently playing song
     * @type {Number}
    */
      SongPlayer.volume = null;
    
    /**
     * @function SongPlayer.play
     * @desc plays the song from album view with the play button
     * @desc To trigger the play method, we added an ngClick directive to the play button anchor tag in album.html:
     * @param {Object} song, gotten from album view, when the user clicks the play button, the ngrepeat directive in album view will say which song to be passed
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {          
          currentBuzzObject.play();        
        }
      }              
    };
      
     /**
     * @function SongPlayer.pause
     * @desc pauses the song from album view with the pause button
     * @desc To trigger the pause method, we added an ngClick directive to the pause button anchor tag in album.html:
     * @param {Object} song, gotten from album view, when the user clicks the play button, the ngrepeat directive in album view will say which song to be paused
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    
     /**
     * @function previous
     * @desc Go to the previous song
     * @param none
     */
    
     SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;
       
       // if the index is < 0 stop the song set the current playing song to 1
       if (currentSongIndex < 0) {
         stopSong();
       } else { // if not move to the previous song
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };
    
     SongPlayer.next = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;
       
       // if the index is >= album length stop the song set the current playing song to 1
       if (currentSongIndex >= currentAlbum.songs.length) {
         stopSong();
       } else { // if not move to the next song
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };
    
    /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
     
     SongPlayer.setCurrentTime = function(time) {
       if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
       }
     };
    return SongPlayer;
  }
  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();