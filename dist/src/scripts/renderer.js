"use strict";
var setButton = document.getElementById('btn');
var titleInput = document.getElementById('title');
setButton.addEventListener('click', function () {
    var title = titleInput.value;
    window.electronAPI.setTitle(title);
});
//# sourceMappingURL=renderer.js.map