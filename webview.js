'use strict';

module.exports = (Franz, options) => {
  function getMessages() {
    let groupCount = 0;
    let individualCount = 0;
    let directCount = 0;
    let indirectCount = 0;
    let roomInfoContainer = document.querySelectorAll('div#RoomList > ul > li');

    Array.prototype.forEach.call(roomInfoContainer, function (room) {
      let count = 0;

      let unreadBadge = room.querySelector('li._unreadBadge > span');
      let unreadBadgeHasMention = false;
      if (unreadBadge) {
        unreadBadgeHasMention = window.getComputedStyle(room.querySelector('li._unreadBadge'), ':after').getPropertyValue('background-color') != 'rgba(0, 0, 0, 0)';
      }
      if (unreadBadge && unreadBadge.innerText) {
        count = parseInt(unreadBadge.innerText);
      }
      if (0 < count) {
        if (room.querySelector("img").getAttribute('src').indexOf('avatar') < 0) {
          groupCount += count;
          if (unreadBadgeHasMention) {
            directCount++;
          } else {
            indirectCount++;
          }
        } else {
          individualCount += count;
          directCount++;
        }
      }
    });

    Franz.setBadge(directCount, indirectCount);
  }

  Franz.loop(getMessages);
}