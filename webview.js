'use strict';

module.exports = (Franz, options) => {
  function getMessages() {
    let directCount = 0;
    let indirectCount = 0;
    let roomInfoContainer = document.querySelectorAll('div.roomListItem__roomInfoContainer');

    Array.prototype.forEach.call(roomInfoContainer, function (room) {
      let count = 0;
      let unreadBadge = room.querySelector("li.roomListBadges__unreadBadge");

      if (unreadBadge && unreadBadge.innerText) {
        count = parseInt(unreadBadge.innerText);
      }

      if (room.querySelector("img.avatarGroup")) {
        // Count incoming group messages as indirectCount
        indirectCount += count;
      } else {
        directCount += count;
      }
    });

    Franz.setBadge(directCount, indirectCount);
  }

  Franz.loop(getMessages);
}