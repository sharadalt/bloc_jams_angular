(function() {
     function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);
        
}
 
     angular
         .module('musicJams')
         .controller('CollectionCtrl',CollectionCtrl);
 })();