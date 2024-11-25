let historyCount = 0;

// Hàm xử lý tạo kết quả
document.getElementById('generate-output').addEventListener('click', function () {
    const setPrice = document.getElementById('set-price').value;
    const topType = document.getElementById('top-type').value;
    const fitTop = document.getElementById('fit-top').value;
    const topChest = document.getElementById('top-chest').value;
    const topWaist = document.getElementById('top-waist').value;
    const topLength = document.getElementById('top-length').value;

    const bottomType = document.getElementById('bottom-type').value;
    const fitBottom = document.getElementById('fit-bottom').value;
    const bottomWaist = document.getElementById('bottom-waist').value;
    const bottomLength = document.getElementById('bottom-length').value;

    const coatType = document.getElementById('coat-type').value;
    const fitCoat = document.getElementById('fit-coat').value;
    const coatArmpit = document.getElementById('coat-armpit').value;
    const coatLength = document.getElementById('coat-length').value;

    let resultDisplay = "";
    if (setPrice) resultDisplay += `Số lượng set: ${setPrice}\n\n`;

    if (topType) {
        resultDisplay += `𝐓𝐨𝐩:\n`;
        if (fitTop) resultDisplay += `  - Fit: ${fitTop}\n`;
        if (topChest) resultDisplay += `  - Ngực: ${topChest}\n`;
        if (topWaist) resultDisplay += `  - Eo: ${topWaist}\n`;
        if (topLength) resultDisplay += `  - Dài: ${topLength}\n`;
    }

    if (bottomType) {
        resultDisplay += `𝐁𝐨𝐭𝐭𝐨𝐦:\n`;
        if (fitBottom) resultDisplay += `  - Fit: ${fitBottom}\n`;
        if (bottomWaist) resultDisplay += `  - Eo: ${bottomWaist}\n`;
        if (bottomLength) resultDisplay += `  - Dài: ${bottomLength}\n`;
    }

    if (coatType) {
        resultDisplay += `𝐂𝐨𝐚𝐭:\n`;
        if (fitCoat) resultDisplay += `  - Fit: ${fitCoat}\n`;
        if (coatArmpit) resultDisplay += `  - Vòng nách: ${coatArmpit}\n`;
        if (coatLength) resultDisplay += `  - Dài: ${coatLength}\n`;
    }

    document.getElementById('output').textContent = resultDisplay;

    const fullOutput = `${resultDisplay}\n‼️𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧‼️
    𝑷𝒓𝒊𝒐𝒓𝒊𝒕𝒚 𝑪𝒐𝒎𝒎𝒆𝒏𝒕: Payment within 12 hours.
    𝑷𝒓𝒐𝒅𝒖𝒄𝒕 𝑫𝒆𝒕𝒂𝒊𝒍𝒔: Check each post carefully before buying.
    𝑺𝒆𝒄𝒐𝒏𝒅𝒉𝒂𝒏𝒅 𝑰𝒕𝒆𝒎𝒔: May have minor flaws not visible in pictures.
    𝑼𝒏𝒃𝒐𝒙𝒊𝒏𝒈: Record a video when opening the package.
    𝑵𝒐 𝑹𝒆𝒕𝒖𝒓𝒏/𝑹𝒆𝒇𝒖𝒏𝒅: Except for serious defects with unboxing video proof.`;

    addToHistory(fullOutput);
});

// Hàm sao chép kết quả
document.getElementById('copy-output').addEventListener('click', function () {
    copyToClipboard(document.getElementById('output').textContent, 'Kết quả đã được sao chép!');
});

// Thêm kết quả vào lịch sử
function addToHistory(fullOutput) {
    historyCount++;
    const historyList = document.getElementById('history-list');

    const historyItem = document.createElement('li');
    historyItem.className = 'list-group-item';
    historyItem.dataset.index = historyCount;

    historyItem.innerHTML = `
        <strong>#${historyCount}:</strong>
        <pre>${fullOutput}</pre>
        <button class="btn btn-sm btn-success me-2" onclick="copyHistoryItem(${historyCount})">Sao chép</button>
        <button class="btn btn-sm btn-danger" onclick="deleteHistory(${historyCount})">Xóa</button>
    `;

    historyList.appendChild(historyItem);
}

// Sao chép từng mục lịch sử
function copyHistoryItem(index) {
    const historyItem = document.querySelector(`#history-list li[data-index="${index}"] pre`);
    if (historyItem) {
        copyToClipboardWithIndex(historyItem.textContent, `Lịch sử #${index} đã được sao chép!`, index);
    }
}

// Xóa lịch sử
function deleteHistory(index) {
    const itemToRemove = document.querySelector(`#history-list li[data-index="${index}"]`);
    if (itemToRemove) {
        itemToRemove.remove();
        updateHistoryNumbers();
    }
}

// Sao chép toàn bộ lịch sử
document.getElementById('copy-history').addEventListener('click', function () {
    const allHistoryItems = document.querySelectorAll('#history-list li pre');
    const historyText = Array.from(allHistoryItems).map((item, index) => `#${index + 1}:\n${item.textContent}`).join('\n\n');
    copyToClipboardWithIndex(historyText, 'Toàn bộ lịch sử đã được sao chép!');
});

// Hàm sao chép vào clipboard với số thứ tự
function copyToClipboardWithIndex(text, successMessage, index) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = `#${index}:\n${text}`;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    alert(successMessage);
}

// Cập nhật số thứ tự sau khi xóa
function updateHistoryNumbers() {
    const allItems = document.querySelectorAll('#history-list li');
    historyCount = 0; // Reset lại số thứ tự
    allItems.forEach(item => {
        historyCount++;
        item.dataset.index = historyCount;
        const strongTag = item.querySelector('strong');
        if (strongTag) strongTag.textContent = `#${historyCount}:`;
    });
}
