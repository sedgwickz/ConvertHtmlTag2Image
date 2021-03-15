(function () {
  "use strict";
  let el = null;

  function createPanel(x, y) {
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.zIndex = 9999;
    div.innerText = "生成图片";
    div.style.padding = "2px 5px";
    div.style.backgroundColor = "yellow";
    div.style.cursor = "pointer";
    div.addEventListener("click", () => {
      el.style.height = "auto";
      html2canvas(el).then((canvas) => {
        let imageURL = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = imageURL;
        a.download = imageURL;
        a.click();
        console.log(el);
      });
    });
    return div;
  }

  const div = createPanel(0, 0);
  document.body.appendChild(div);

  document.addEventListener("mouseover", (e) => {
    const newEl = document.elementFromPoint(e.clientX, e.clientY);
    if (newEl != div) {
      if (el) el.style.border = "";
      el = newEl;
      el.style.border = "3px solid blue";
      div.style.left = e.x + 5 + "px";
      div.style.top = e.y + "px";
    }
  });
})();
