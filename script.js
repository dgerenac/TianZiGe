const input = document.getElementById('input');
const generateBtn = document.getElementById('generate');
const worksheetContainer = document.getElementById('worksheet-container');
const downloadBtn = document.getElementById('download-pdf');

function generateWorksheet() {
  const chars = input.value.trim();
  worksheetContainer.innerHTML = '';

  for (const ch of chars) {
    if (!/[\u4e00-\u9fff]/.test(ch)) continue;

    const pinyin = TinyPinyin.convertToPinyin(ch);

    const block = document.createElement('div');
    block.className = 'hanzi-block';

    const pinyinDiv = document.createElement('div');
    pinyinDiv.className = 'pinyin';
    pinyinDiv.textContent = pinyin;

    const grid = document.createElement('div');
    grid.className = 'grid';

    // Celdas: 1 animada, 3 vacías
    for (let i = 0; i < 4; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = `writer-${ch}-${i}`;

      grid.appendChild(cell);

      if (i === 0) {
        HanziWriter.create(cell.id, ch, {
          width: 130,
          height: 130,
          padding: 5,
          showOutline: true,
          showCharacter: false,
          strokeAnimationSpeed: 1.2
        }).animateCharacter();
      }
    }

    block.appendChild(pinyinDiv);
    block.appendChild(grid);
    worksheetContainer.appendChild(block);
  }
}

generateBtn.addEventListener('click', generateWorksheet);

downloadBtn.addEventListener('click', () => {
  html2canvas(worksheetContainer).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('hanzi-worksheet.pdf');
  });
});

// Auto-generar al cargar
generateWorksheet();
