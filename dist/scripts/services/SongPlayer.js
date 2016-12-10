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
  function SongPlayer(Fixtures) {
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
        SongPlayer.currentSong.playing = null;
      }
 
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
 
      SongPlayer.currentSong = song;
            
    };
    
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
       
       // if the index is < 0 stop the song set the current playing song to // 1
       if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       } else { // if not move to the previous song
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };
    
    return SongPlayer;
    
    
  }
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();