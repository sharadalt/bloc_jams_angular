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
  function SongPlayer() {
    var SongPlayer = {};   
    var currentSong = null;
    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;
       
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
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
 
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
 
      currentSong = song;
            
    };
    
    /**
     * @function SongPlayer.play
     * @desc plays the song from album view with the play button
     * @desc To trigger the play method, we added an ngClick directive to the play button anchor tag in album.html:
     * @param {Object} song, gotten from album view, when the user clicks the play button, the ngrepeat directive in album view will say which song to be passed
     */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
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
      currentBuzzObject.pause();
        song.playing = false;
    };
      return SongPlayer;
  }
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();