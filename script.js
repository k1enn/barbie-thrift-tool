document.getElementById('generate-output').addEventListener('click', function() {
    // Lấy thông tin từ form
    const setPrice = document.getElementById('set-price').value;  // Lấy giá trị số lượng set
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

    // Khởi tạo chuỗi kết quả
    let output = `✨\n🎀 𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞  ${setPrice}𝐩𝐜𝐬:  VND / USD\n\n`;

    // Top
    if (topType) {
        output += `    • 𝐓𝐨𝐩: \n`;
        if (fitTop) output += `        Fit: ${fitTop}\n`;
        if (topChest) output += `        Ngực / Chest: ${topChest}\n`;
        if (topWaist) output += `        Eo / Waist: ${topWaist}\n`;
        if (topLength) output += `        Dài / Length: ${topLength}\n`;
        output += `\n`;  // Thêm một dòng trống sau phần Top
    }

    // Bottom
    if (bottomType) {
        output += `    • 𝐁𝐨𝐭𝐭𝐨𝐦: \n`;
        if (fitBottom) output += `        Fit: ${fitBottom}\n`;
        if (bottomWaist) output += `        Eo / Waist: ${bottomWaist}\n`;
        if (bottomLength) output += `        Dài / Length: ${bottomLength}\n`;
        output += `\n`;  // Thêm một dòng trống sau phần Bottom
    }

    // Khoác
    if (coatType) {
        output += `    • 𝐂𝐨𝐚𝐭: \n`;
        if (fitCoat) output += `        Fit: ${fitCoat}\n`;
        if (coatArmpit) output += `        Vòng nách / Armpit: ${coatArmpit}\n`;
        if (coatLength) output += `        Dài / Length: ${coatLength}\n`;
        output += `\n`;  // Thêm một dòng trống sau phần Coat
    }

    // Chú ý
    output += `\n‼️𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧‼️
    𝑷𝒓𝒊𝒐𝒓𝒊𝒕𝒚 𝑪𝒐𝒎𝒎𝒆𝒏𝒕: Payment within 12 hours.
    𝑷𝒓𝒐𝒅𝒖𝒄𝒕 𝑫𝒆𝒕𝒂𝒊𝒍𝒔: Check each post carefully before buying. Feel free to ask for more information.
    𝑺𝒆𝒄𝒐𝒏𝒅𝒉𝒂𝒏𝒅 𝑰𝒕𝒆𝒎𝒔: May have minor flaws not visible in pictures.
    𝑼𝒏𝒃𝒐𝒙𝒊𝒏𝒈: Record a video when opening the package.
    𝑵𝒐 𝑹𝒆𝒕𝒖𝒓𝒏/𝑹𝒆𝒇𝒖𝒏𝒅: Except for serious defects with unboxing video proof.`;

    // Hiển thị kết quả
    document.getElementById('output').textContent = output;
});

// Sao chép kết quả vào clipboard
document.getElementById('copy-output').addEventListener('click', function() {
    const outputText = document.getElementById('output').textContent;

    // Tạo một element text tạm thời để sao chép vào clipboard
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = outputText;
    document.body.appendChild(tempTextArea);

    // Chọn và sao chép nội dung
    tempTextArea.select();
    document.execCommand('copy');

    // Xóa element text tạm thời
    document.body.removeChild(tempTextArea);

    // Hiển thị thông báo sao chép thành công
    alert('Kết quả đã được sao chép!');
});


let historyCount = 0;

// Hàm lưu kết quả vào lịch sử
function addToHistory(outputText) {
    historyCount++;
    const historyList = document.getElementById('history-list');

    // Tạo mục lịch sử mới
    const historyItem = document.createElement('li');
    historyItem.dataset.index = historyCount;

    // Thêm nội dung kết quả và nút xóa
    historyItem.innerHTML = `
        <span><strong>#${historyCount}:</strong> ${outputText}</span>
        <button onclick="deleteHistory(${historyCount})">Xóa</button>
    `;

    // Thêm mục mới vào danh sách lịch sử
    historyList.appendChild(historyItem);
}

// Hàm xóa mục trong lịch sử
function deleteHistory(index) {
    const historyItem = document.querySelector(`#history-list li[data-index="${index}"]`);
    if (historyItem) {
        historyItem.remove();
    }
}

// Sự kiện khi bấm "Tạo Kết Quả"
document.getElementById('generate-output').addEventListener('click', function () {
    const outputText = document.getElementById('output').textContent;

    if (outputText.trim() !== '') {
        addToHistory(outputText);
    }
});

// Sao chép toàn bộ lịch sử
document.getElementById('copy-history').addEventListener('click', function () {
    const historyList = document.querySelectorAll('#history-list li span');
    const allHistory = Array.from(historyList).map(item => item.textContent).join('\n\n');

    // Tạo text area tạm để sao chép
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = allHistory;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    alert('Toàn bộ lịch sử đã được sao chép!');
});
