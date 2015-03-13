/**
 * Created by isaacross on 3/12/15.
 */
var jewel = (function(){
    var scriptQueue = [],
        numResourcesLoaded = 0,
        numResources = 0,
        executeRunning = false;

    function executeScriptQueue(){

    }

    function load(src, callback){
        var image,
            queueEntry;
        numResources++;

        queueEntry = {
            src: src,
            callback: callback,
            loaded: false
        };
        scriptQueue.push(queueEntry);

        image = new Image();
        image.onload = image.onerror = function(){
            numResourcesLoaded++;
            queueEntry.loaded = true;
            if(!executeRunning){
                executeScriptQueue()
            }
        };
        image.src = src;
    }

    function setup(){

    }

    return {
        load: load,
        setup: setup
    };
})();