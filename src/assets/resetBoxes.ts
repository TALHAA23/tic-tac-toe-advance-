export default function resetBoxes() {
  const boxes = document.querySelectorAll("div[data-reserve-count]");
  boxes.forEach((item) => {
    if (!(item instanceof HTMLElement)) return;
    item.dataset.reserveCount = "0";
    item.classList.remove("pointer-events-none");
    item
      .querySelectorAll("#md, #lg")
      .forEach((additionBox) => additionBox.classList.add("invisible"));
  });
}
