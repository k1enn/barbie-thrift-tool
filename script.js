let historyCount = 0;

// Hàm xử lý tạo kết quả
document.getElementById('generate-output').addEventListener('click', function () {

    // Get set quantity
    const setPrice = document.getElementById('set-price').value;

    //Get top value
    const topType = document.getElementById('top-type').value;
    const fitTop = document.getElementById('fit-top').value;
    const topChest = document.getElementById('top-chest').value;
    const topWaist = document.getElementById('top-waist').value;
    const topLength = document.getElementById('top-length').value;

    // Get bottom value
    const bottomType = document.getElementById('bottom-type').value;
    const fitBottom = document.getElementById('fit-bottom').value;
    const bottomWaist = document.getElementById('bottom-waist').value;
    const bottomLength = document.getElementById('bottom-length').value;

    // Get coat value
    const coatType = document.getElementById('coat-type').value;
    const fitCoat = document.getElementById('fit-coat').value;
    const coatArmpit = document.getElementById('coat-armpit').value;
    const coatLength = document.getElementById('coat-length').value;
    
    let resultDisplay = "";

    // Add set quantity
    resultDisplay += getSetQuantity(setPrice);

    // Thêm thông tin Top
    resultDisplay += getTopInfo(topType, fitTop, topChest, topWaist, topLength);

    // Thêm thông tin Bottom
    resultDisplay += getBottomInfo(bottomType, fitBottom, bottomWaist, bottomLength);

    // Thêm thông tin Coat
    resultDisplay += getCoatInfo(coatType, fitCoat, coatArmpit, coatLength);


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
function getSetQuantity(setPrice) {
    var result = "";
        switch (setPrice) {
        case '2': 
            result += `✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟐𝐩𝐜𝐬: \n\n`;
            break;
        case '3': 
            result += `✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟑𝐩𝐜𝐬: \n\n`;
            break;
        case '4': 
            result += `✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟒𝐩𝐜𝐬: \n\n`;
            break;
        default:
    }
    return result;
}

// Add Top information
function getTopInfo(topType, fitTop, topChest, topWaist, topLength) {
    var result = "";
  
    switch (topType) {
        case 'Top':
            result += `𝐓𝐨𝐩:\n`;
            if (fitTop) result += `  - Fit: ${fitTop}\n`;
            if (topChest) result += `  - Ngực: ${topChest}\n`;
            if (topWaist) result += `  - Eo: ${topWaist}\n`;
            if (topLength) result += `  - Dài: ${topLength}\n`;
            break;
        case 'Cami':
         result += `𝐂𝐚𝐦𝐢:\n`;
            if (fitTop) result += `  - Fit: ${fitTop}\n`;
            if (topChest) result += `  - Ngực: ${topChest}\n`;
            if (topWaist) result += `  - Eo: ${topWaist}\n`;
            if (topLength) result += `  - Dài: ${topLength}\n`;
            break;
        case 'Inner Top':
         result += `𝐈𝐧𝐧𝐞𝐫 𝐓𝐨𝐩:\n`;
            if (fitTop) result += `  - Fit: ${fitTop}\n`;
            if (topChest) result += `  - Ngực: ${topChest}\n`;
            if (topWaist) result += `  - Eo: ${topWaist}\n`;
            if (topLength) result += `  - Dài: ${topLength}\n`;
            break;
        case 'Outer Top':
         result += `𝐎𝐮𝐭𝐞𝐫 𝐓𝐨𝐩:\n`;
            if (fitTop) result += `  - Fit: ${fitTop}\n`;
            if (topChest) result += `  - Ngực: ${topChest}\n`;
            if (topWaist) result += `  - Eo: ${topWaist}\n`;
            if (topLength) result += `  - Dài: ${topLength}\n`;
            break;
        default:
    }
    return result;
}

// Add Bottom information
function getBottomInfo(bottomType, fitBottom, bottomWaist, bottomLength) {
    var result = "";
    
    switch (bottomType) {
        case 'Shorts':
            result += `𝐒𝐡𝐨𝐫𝐭𝐬:\n`;
            if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
            if (bottomWaist) result += `  - Eo: ${bottomWaist}\n`;
            if (bottomLength) result += `  - Dài: ${bottomLength}\n`;
            break;
        case 'Skirt':
            result += `𝐒𝐤𝐢𝐫𝐭:\n`;
        if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
        if (bottomWaist) result += `  - Eo: ${bottomWaist}\n`;
        if (bottomLength) result += `  - Dài: ${bottomLength}\n`;
            break;
        case 'Skirt Pants':
            result += `𝐒𝐤𝐢𝐫𝐭 𝐏𝐚𝐧𝐭𝐬:\n`;
        if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
        if (bottomWaist) result += `  - Eo: ${bottomWaist}\n`;
        if (bottomLength) result += `  - Dài: ${bottomLength}\n`;
            break;
        case 'Bloomer':
            result += `𝐁𝐥𝐨𝐨𝐦𝐞𝐫:\n`;
        if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
        if (bottomWaist) result += `  - Eo: ${bottomWaist}\n`;
        if (bottomLength) result += `  - Dài: ${bottomLength}\n`;
            break;
        case 'Pumpkin Pants':
            result += `𝐏𝐮𝐦𝐩𝐤𝐢𝐧 𝐏𝐚𝐧𝐭𝐬:\n`;
            if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
            if (bottomWaist) result += `  - Eo: ${bottomWaist}\n`;
            if (bottomLength) result += `  - Dài: ${bottomLength}\n`;
            break;
        default:
    }
    return result;
}

//  Add Coat information
function getCoatInfo(coatType, fitCoat, coatArmpit, coatLength) {
    var result = "";
  
    switch (coatType) {
        case 'Coat':
            result += `𝐉𝐚𝐜𝐤𝐞𝐭:\n`;
            if (fitCoat) result += `  - Fit: ${fitCoat}\n`;
            if (coatArmpit) result += `  - Vòng nách: ${coatArmpit}\n`;
            if (coatLength) result += `  - Dài: ${coatLength}\n`;
            break;
        case 'Jacket':
            result += `𝐂𝐨𝐚𝐭:\n`;
            if (fitCoat) result += `  - Fit: ${fitCoat}\n`;
            if (coatArmpit) result += `  - Vòng nách: ${coatArmpit}\n`;
            if (coatLength) result += `  - Dài: ${coatLength}\n`;
            break;
        default:
    }
    return result;
}