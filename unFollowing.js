// ==UserScript==
// @name         Twitter Unfollowing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Help you unfollow who you won't automatically. 帮你自动取关推特关注人
// @author       https://github.com/sedgwickz
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function getConfirmButton() {
    for (const item of document.querySelectorAll("div[role='button']")) {
      if (item.innerText == "Unfollow") {
        return item;
      }
    }
  }

  async function unFollow() {
    for (const item of document.querySelectorAll("div[role='button']")) {
      if (item.innerText == "Following") {
        await sleep(2000);
        item.click();
        const confirmButton = getConfirmButton();
        confirmButton.click();
        console.log(item.innerText);
      }
    }
  }
  const unFollowButton = document.createElement("button");
  unFollowButton.innerText = "start unfollowing";
  unFollowButton.style.position = "fixed";
  unFollowButton.style.padding = "10px";
  unFollowButton.style.bottom = "100px";
  unFollowButton.style.right = "100px";
  unFollowButton.zIndex = 9999;
  unFollowButton.addEventListener("click", async () => {
    unFollowButton.innerText = "running...";
    while (1) {
      await unFollow();
      // window.scrollTo(0,document.body.scrollHeight);
      await sleep(3);
    }
  });
  document.body.append(unFollowButton);
})();
