function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;

    //Cahce of <img src="/path">
    this.cache = {};
    this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.downloadAll = function(downloadCallback) {
    if (this.downloadQueue.length === 0) {
        downloadCallback();
    }
        
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        var that = this;
        
        img.addEventListener("load", function() {
            console.log(this.src + ' loaded');
            that.successCount += 1;

            if (that.isDone()) {
                downloadCallback();
            }
        }, false);

        img.addEventListener("error", function() {
            console.log(this.src + ' failed');        	
            that.errorCount += 1;

            if (that.isDone()) {
                downloadCallback();
            }
        }, false);

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
}

AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}


var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('Imperial_Boy2.jpg');

ASSET_MANAGER.downloadAll(function() {
    //CALLBACK FUNCTION
    console.log(ASSET_MANAGER.getAsset('Imperial_Boy2.jpg'));
});