document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("hanzi-input");
  const grid = document.getElementById("grid");
  const generateBtn = document.getElementById("generate-btn");
  const downloadBtn = document.getElementById("download-btn");

  function renderGrid(text) {
    grid.innerHTML = "";
    [...text].forEach(char => {
      const square = document.createElement("div");
      square.className = "square";

      const writerContainer = document.createElement("div");
      writerContainer.className = "writer-container";
      square.appendChild(writerContainer);
      grid.appendChild(square);

      const writer = HanziWriter.create(writerContainer, char, {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: true,
        showCharacter: true
      });

      square.addEventListener("click", () => {
        writer.animateCharacter();
      });
    });
  }

  // Carga inicial con 你好
  renderGrid("你好");

  generateBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text) renderGrid(text);
  });

  downloadBtn.addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const canvas = await html2canvas(grid);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("hanzi-worksheet.pdf");
  });
});
