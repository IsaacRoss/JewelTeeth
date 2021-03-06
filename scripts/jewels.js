/**
 * Created by isaacross on 3/12/15.
 */
var jewel = (function(){
    var scriptQueue = [],
        numResourcesLoaded = 0,
        numResources = 0,
        executeRunning = false;

    function executeScriptQueue(){
        var next = scriptQueue[0],
            first,
            script;
        if(next && next.loaded) {
            executeRunning = true;
            scriptQueue.shift();
            first = document.getElementsByTagName('script')[0];
            script = document.createElement('script');
            script.onload = function(){
                if (next.callback){
                    next.callback();
                }
                // try to execute more
                executeScriptQueue();
            };
            script.src = next.src;
            first.parentNode.insertBefore(script, first);
        }else{
            executeRunning = false;

        }
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
        jewel.showScreen("splash-screen");
    }

    function showScreen(screenId){
        var dom = jewel.dom,
            $ = dom.$,
            activeScreen = $('#game .screen.active')[0],
            screen = $('#' + screenId)[0];
        if(!jewel.screens[screenId]){
            alert('this is not implemented yet');
            return;
        }
        if (activeScreen) {
            dom.removeClass(activeScreen, "active");
        }
        dom.addClass(screen, "active");
        jewel.screens[screenId].run();
    }

    return {
        load: load,
        setup: setup,
        showScreen: showScreen,
        screens: {}
    };
})();