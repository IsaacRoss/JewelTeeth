/**
 * Created by iross on 3/20/2015.
 */
jewel.screens["splash-screen"] = (function(){
    var firstRun = true;

    function setup(){
        jewel.dom.bind('#spash-screen', 'click', function(){
            jewel.showScreen("main-menu");
        });
    }

    function run(){
        if(firstRun){
            setup();
            firstRun = false;
        }
    }

    return {
        run: run
    };
})();