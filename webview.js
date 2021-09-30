'use strict';

module.exports = (Franz, options) => {
  function getMessages() {
    let groupCount = 0;
    let individualCount = 0;
    let directCount = 0;
    let indirectCount = 0;
    let roomInfoContainer = document.querySelectorAll('li[data-rid]');

    Array.prototype.forEach.call(roomInfoContainer, function (room) {
      let count = 0;

      let unreadBadge = room.querySelector("li._unreadBadge");
      let unreadBadgeHasMention = room.querySelector("li._unreadBadge.sc-cSHVUG");
      if (unreadBadge && unreadBadge.innerText) {
        count = parseInt(unreadBadge.innerText) || 0;
      }

      directCount += count;
    });
    Franz.setBadge(directCount, indirectCount);
  }

  Franz.loop(getMessages);
}
