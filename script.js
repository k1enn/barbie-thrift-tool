let historyCount = 0;

// Hàm xóa dữ liệu trong các input
function clearInputs() {
    // Lấy tất cả các input type="text" và đặt giá trị về trống
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    
    // Lấy tất cả các select và đặt giá trị về mặc định (giá trị đầu tiên)
    document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
}

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
    const topArmpit = document.getElementById('top-armpit').value;

    //Get top2 value
    // Lấy giá trị từ các phần tử DOM, và cho phép chúng có thể là null nếu không có giá trị
    const top2Type = document.getElementById('top2-type')?.value || null;
    const fit2Top = document.getElementById('fit2-top')?.value || null;
    const top2Chest = document.getElementById('top2-chest')?.value || null;
    const top2Waist = document.getElementById('top2-waist')?.value || null;
    const top2Length = document.getElementById('top2-length')?.value || null;
    const top2Armpit = document.getElementById('top2-armpit')?.value || null;


    // Get bottom value
    const bottomType = document.getElementById('bottom-type').value;
    const fitBottom = document.getElementById('fit-bottom').value;
    const bottomWaist = document.getElementById('bottom-waist').value;
    const bottomLength = document.getElementById('bottom-length').value;
    const bottomThigh = document.getElementById('bottom-thigh').value;

    // Get coat value
    const coatType = document.getElementById('coat-type').value;
    const fitCoat = document.getElementById('fit-coat').value;
    const coatArmpit = document.getElementById('coat-armpit').value;
    const coatLength = document.getElementById('coat-length').value;

    const otherName = document.getElementById('other-name')?.value || null;
    const fitOther = document.getElementById('other-fit')?.value || null;
    const otherChest = document.getElementById('other-chest')?.value || null;
    const otherButt = document.getElementById('other-butt')?.value || null;
    const otherWaist = document.getElementById('other-waist')?.value || null;
    const otherHip = document.getElementById('other-hip')?.value || null;
    const otherLength = document.getElementById('other-length')?.value || null;
    const otherArmpit = document.getElementById('other-armpit')?.value || null;
    const otherThigh = document.getElementById('other-thigh')?.value || null;
    
    let resultDisplay = "";

    // Add set quantity
    resultDisplay += getSetQuantity(setPrice);

    // Thêm thông tin Top
    resultDisplay += getTopInfo(topType, fitTop, topChest, topWaist, topLength, topArmpit);

    // Thêm thông tin Top2
    resultDisplay += getTop2Info(top2Type, fit2Top, top2Chest, top2Waist, top2Length, top2Armpit);

    // Thêm thông tin Bottom
    resultDisplay += getBottomInfo(bottomType, fitBottom, bottomWaist, bottomLength, bottomThigh);

    // Thêm thông tin Coat
    resultDisplay += getCoatInfo(coatType, fitCoat, coatArmpit, coatLength);

    // Thêm thông tin cho sản phẩm khác
    resultDisplay += getOtherInfo(otherName, fitOther, otherChest, otherButt, otherWaist, otherHip, otherLength, otherArmpit, otherThigh);


    document.getElementById('output').textContent = resultDisplay;

    const fullOutput = `${resultDisplay}\n‼️𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧‼️
    𝑷𝒓𝒊𝒐𝒓𝒊𝒕𝒚 𝑪𝒐𝒎𝒎𝒆𝒏𝒕: Payment within 12 hours.
    𝑷𝒓𝒐𝒅𝒖𝒄𝒕 𝑫𝒆𝒕𝒂𝒊𝒍𝒔: Check each post carefully before buying.
    𝑺𝒆𝒄𝒐𝒏𝒅𝒉𝒂𝒏𝒅 𝑰𝒕𝒆𝒎𝒔: May have minor flaws not visible in pictures.
    𝑼𝒏𝒃𝒐𝒙𝒊𝒏𝒈: Record a video when opening the package.
    𝑵𝒐 𝑹𝒆𝒕𝒖𝒓𝒏/𝑹𝒆𝒇𝒖𝒏𝒅: Except for serious defects with unboxing video proof.`;

    addToHistory(fullOutput);
    
    // Xóa dữ liệu input
    clearInputs();
});

// Hàm sao chép kết quả
var copyOutput = document.getElementById('copy-output')
copyOutput.addEventListener('click', function () {
    copyToClipboardWithIndex(document.getElementById('output').textContent, 'Kết quả đã được sao chép!');
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
function getTopInfo(topType, fitTop, topChest, topWaist, topLength, topArmpit) {
    var result = "";
  
    switch (topType) {
        case 'Top':
            result += `𝐓𝐨𝐩:\n`;
            if (fitTop) result += `  - Fit: ${fitTop}\n`;
            if (topChest) result += `  - Ngực / Chest: ${topChest}\n`;
            if (topWaist) result += `  - Eo / Waist: ${topWaist}\n`;
            if (topLength) result += `  - Dài / Length: ${topLength}\n`;
            if (topArmpit) result += `  - Vòng nách / Armpit: ${topArmpit}\n`;
            break;
        case 'Cami':
         result += `𝐂𝐚𝐦𝐢:\n`;
            if (fitTop) result += `  - Fit: ${fitTop}\n`;
            if (topChest) result += `  - Ngực / Chest: ${topChest}\n`;
            if (topWaist) result += `  - Eo / Waist: ${topWaist}\n`;
            if (topLength) result += `  - Dài / Length: ${topLength}\n`;
            if (topArmpit) result += `  - Vòng nách / Armpit: ${topArmpit}\n`;
            break;
        case 'Inner Top':
         result += `𝐈𝐧𝐧𝐞𝐫 𝐓𝐨𝐩:\n`;
            if (fitTop) result += `  - Fit: ${fitTop}\n`;
            if (topChest) result += `  - Ngực / Chest: ${topChest}\n`;
            if (topWaist) result += `  - Eo / Waist: ${topWaist}\n`;
            if (topLength) result += `  - Dài / Length: ${topLength}\n`;
            if (topArmpit) result += `  - Vòng nách / Armpit: ${topArmpit}\n`;
            break;
        case 'Outer Top':
         result += `𝐎𝐮𝐭𝐞𝐫 𝐓𝐨𝐩:\n`;
            if (fitTop) result += `  - Fit: ${fitTop}\n`;
            if (topChest) result += `  - Ngực: ${topChest}\n`;
            if (topWaist) result += `  - Eo / Waist: ${topWaist}\n`;
            if (topLength) result += `  - Dài / Length: ${topLength}\n`;
            if (topArmpit) result += `  - Vòng nách / Armpit: ${topArmpit}\n`;
            break;
        default:
    }
    return result;
}

function getTop2Info(top2Type, fit2Top, top2Chest, top2Waist, top2Length, top2Armpit) {
    var result = "";
  
    switch (top2Type) {
        case 'Top':
            result += `𝐓𝐨𝐩:\n`;
            if (fit2Top) result += `  - Fit: ${fit2Top}\n`;
            if (top2Chest) result += `  - Ngực / Chest: ${top2Chest}\n`;
            if (top2Waist) result += `  - Eo / Waist: ${top2Waist}\n`;
            if (top2Length) result += `  - Dài / Length: ${top2Length}\n`;
            if (top2Armpit) result += `  - Vòng nách / Armpit: ${top2Armpit}\n`;
            break;
        case 'Cami':
         result += `𝐂𝐚𝐦𝐢:\n`;
            if (fit2Top) result += `  - Fit: ${fit2Top}\n`;
            if (top2Chest) result += `  - Ngực / Chest: ${top2Chest}\n`;
            if (top2Waist) result += `  - Eo / Waist: ${top2Waist}\n`;
            if (top2Length) result += `  - Dài / Length: ${top2Length}\n`;
            if (top2Armpit) result += `  - Vòng nách / Armpit: ${top2Armpit}\n`;
            break;
        case 'Inner Top':
         result += `𝐈𝐧𝐧𝐞𝐫 𝐓𝐨𝐩:\n`;
            if (fit2Top) result += `  - Fit: ${fitTop}\n`;
            if (top2Chest) result += `  - Ngực / Chest: ${top2Chest}\n`;
            if (top2Waist) result += `  - Eo / Waist: ${top2Waist}\n`;
            if (top2Length) result += `  - Dài / Length: ${top2Length}\n`;
            if (top2Armpit) result += `  - Vòng nách / Armpit: ${top2Armpit}\n`;
            break;
        case 'Outer Top':
         result += `𝐎𝐮𝐭𝐞𝐫 𝐓𝐨𝐩:\n`;
            if (fit2Top) result += `  - Fit: ${fit2Top}\n`;
            if (top2Chest) result += `  - Ngực: ${top2Chest}\n`;
            if (top2Waist) result += `  - Eo / Waist: ${top2Waist}\n`;
            if (top2Length) result += `  - Dài / Length: ${top2Length}\n`;
            if (top2Armpit) result += `  - Vòng nách / Armpit: ${top2Armpit}\n`;
            break;
        default:
    }
    return result;
}

// Add Bottom information
function getBottomInfo(bottomType, fitBottom, bottomWaist, bottomLength, bottomThigh) {
    var result = "";
    
    switch (bottomType) {
        case 'Shorts':
            result += `𝐒𝐡𝐨𝐫𝐭𝐬:\n`;
            if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
            if (bottomWaist) result += `  - Eo / Waist: ${bottomWaist}\n`;
            if (bottomLength) result += `  - Dài / Length: ${bottomLength}\n`;
            if (bottomThigh) result += `  - Đùi / Thigh: ${bottomThigh}\n`;
            break;
        case 'Skirt':
            result += `𝐒𝐤𝐢𝐫𝐭:\n`;
            if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
            if (bottomWaist) result += `  - Eo / Waist: ${bottomWaist}\n`;
            if (bottomLength) result += `  - Dài / Length: ${bottomLength}\n`;
            if (bottomThigh) result += `  - Đùi / Thigh: ${bottomThigh}\n`;
            break;
        case 'Skirt Pants':
            result += `𝐒𝐤𝐢𝐫𝐭 𝐏𝐚𝐧𝐭𝐬:\n`;
            if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
            if (bottomWaist) result += `  - Eo / Waist: ${bottomWaist}\n`;
            if (bottomLength) result += `  - Dài / Length: ${bottomLength}\n`;
            if (bottomThigh) result += `  - Đùi / Thigh: ${bottomThigh}\n`;
            break;
        case 'Bloomer':
            result += `𝐁𝐥𝐨𝐨𝐦𝐞𝐫:\n`;
            if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
            if (bottomWaist) result += `  - Eo / Waist: ${bottomWaist}\n`;
            if (bottomLength) result += `  - Dài / Length: ${bottomLength}\n`;
            if (bottomThigh) result += `  - Đùi / Thigh: ${bottomThigh}\n`;
            break;
        case 'Pumpkin Pants':
            result += `𝐏𝐮𝐦𝐩𝐤𝐢𝐧 𝐏𝐚𝐧𝐭𝐬:\n`;
            if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
            if (bottomWaist) result += `  - Eo / Waist: ${bottomWaist}\n`;
            if (bottomLength) result += `  - Dài / Length: ${bottomLength}\n`;
            if (bottomThigh) result += `  - Đùi / Thigh: ${bottomThigh}\n`;
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
            if (coatArmpit) result += `  - Vòng nách / Armpit: ${coatArmpit}\n`;
            if (coatLength) result += `  - Dài / Length: ${coatLength}\n`;
            break;
        case 'Jacket':
            result += `𝐂𝐨𝐚𝐭:\n`;
            if (fitCoat) result += `  - Fit: ${fitCoat}\n`;
            if (coatArmpit) result += `  - Vòng nách / Armpit: ${coatArmpit}\n`;
            if (coatLength) result += `  - Dài / Length: ${coatLength}\n`;
            break;
        default:
    }
    return result;
}

function getOtherInfo (otherName, fitOther, otherChest, otherButt, otherWaist, otherHip, otherLength, otherArmpit, otherThigh)
{
    var result = "";
    switch(otherName) {
        default:
            result += `${otherName}\n`;
            if (fitOther) result += `  - Fit: ${fitOther}\n`;
            if (otherChest) result += `  - Ngực / Chest: ${otherChest}\n`;
            if (otherButt) result += `  - Mông / Butt: ${otherButt}\n`; 
            if (otherWaist) result += `  - Eo / Waist: ${otherWaist}\n`;
            if (otherHip) result += `  - Hông / Hip: ${otherHip}\n`;
            if (otherLength) result += `  - Dài / Length: ${otherLength}\n`;
            if (otherArmpit) result += `  - Vòng nách / Armpit: ${otherArmpit}\n`;
            if (otherThigh) result += `  - Đùi / Thigh: ${otherThigh}\n`;
            break;
    }
    

    return result;
}
document.addEventListener("DOMContentLoaded", () => {
    const topTypeElement = document.getElementById("top-type");
    const generateOutputButton = document.getElementById("generate-output");
    const topSection = document.querySelector('section:nth-of-type(1) > .row.g-3');

    // Hàm thêm HTML
    const addInnerOrOuterHtml = () => {
        const newHtml = `
            <div style="padding-top:1rem; padding-bottom: 0.1rem;" class="row g-3" id="additional-html">
            <hr class="w-70 mx-auto">
            <h5>Addition</h5>
                <div class="col-md-6">
                    <label for="top2-type" class="form-label inter-body">Chọn loại:</label>
                    <select id="top2-type" class="form-select inter-body">
                        <option value="">Không chọn</option>
                        <option value="Top">Top</option>
                        <option value="Cami">Cami</option>
                        <option value="Inner Top">Inner Top</option>
                        <option value="Outer Top">Outer Top</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="fit2-top" class="form-label inter-body">Chọn kích cỡ (tùy chọn):</label>
                    <select id="fit2-top" class="form-select inter-body">
                        <option value="">Không chọn</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="S">XS/S</option>
                        <option value="S/M">S/M</option>
                        <option value="S">M</option>
                        <option value="M/L">M/L</option>
                        <option value="L">L</option>
                        <option value="S">L/XL</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="top2-chest" class="form-label inter-body">Ngực / Chest:</label>
                    <input type="text" id="top2-chest" class="form-control inter-body" placeholder="Nhập số">
                </div>
                <div class="col-md-4">
                    <label for="top2-waist" class="form-label inter-body">Eo / Waist:</label>
                    <input type="text" id="top2-waist" class="form-control inter-body" placeholder="Nhập số">
                </div>
                <div class="col-md-4">
                    <label for="top2-length" class="form-label inter-body">Dài / Length:</label>
                    <input type="text" id="top2-length" class="form-control inter-body" placeholder="Nhập số">
                </div>
                <div class="col-md-4">
                    <label for="top2-armpit" class="form-label inter-body">Dài / Length:</label>
                    <input type="text" id="top2-armpit" class="form-control inter-body" placeholder="Nhập số">
                </div>
            </div>`;

        const existingHtml = document.getElementById("additional-html");
        // Kiểm tra nếu HTML chưa được thêm vào thì mới thêm
        if (!existingHtml) {
            topSection.insertAdjacentHTML("afterend", newHtml);
        }
    };

    // Hàm xóa HTML
    const removeInnerOrOuterHtml = () => {
        const additionalHtml = document.getElementById("additional-html");
        if (additionalHtml) {
            additionalHtml.remove();
        }
    };

    // Lắng nghe sự kiện thay đổi trong top-type
    topTypeElement.addEventListener("change", (e) => {
        const selectedValue = e.target.value;

        // Nếu chọn Inner Top hoặc Outer Top, thêm HTML nếu chưa có
        if (selectedValue === "Inner Top" || selectedValue === "Outer Top") {
            addInnerOrOuterHtml();
        } else {
            // Nếu chọn loại khác, xóa HTML nếu đã thêm
            removeInnerOrOuterHtml();
        }
    });

    // Xóa HTML khi nhấn "Tạo Kết Quả"
    generateOutputButton.addEventListener("click", () => {
        removeInnerOrOuterHtml();  // Xóa HTML nếu có
    });
});

// Phần thêm sản phẩm khác

    // Lấy nút "Thêm Section"
    const addSectionButton = document.getElementById('add-section');

    // Lắng nghe sự kiện click của nút "Thêm Section"
    addSectionButton.addEventListener('click', function () {
        // Đoạn HTML cần thêm vào
        const newHtml = `
            <section class="mb-4" id="new-section">
                <h2 class="inter-title">Khác</h2>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="other-name" class="form-label inter-body">Tên sản phẩm / Product's name:</label>
                        <input type="text" id="other-name" class="form-control inter-body" placeholder="Nhập số">
                    </div>
                    <div class="col-md-6">
                        <label for="other-fit" class="form-label inter-body">Chọn kích cỡ:</label>
                        <select id="other-fit" class="form-select inter-body">
                            <option value="">Không chọn</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="S">XS/S</option>
                            <option value="S/M">S/M</option>
                            <option value="S">M</option>
                            <option value="M/L">M/L</option>
                            <option value="L">L</option>
                            <option value="S">L/XL</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="other-chest" class="form-label inter-body">Ngực / Chest:</label>
                        <input type="text" id="other-chest" class="form-control inter-body" placeholder="Nhập số">
                    </div>
                    
                    <div class="col-md-4">
                        <label for="other-waist" class="form-label inter-body">Eo / Waist:</label>
                        <input type="text" id="other-waist" class="form-control inter-body" placeholder="Nhập số">
                    </div>
                    <div class="col-md-4">
                        <label for="other-hip" class="form-label inter-body">Hông / Hip</label>
                        <input type="text" id="other-hip" class="form-control inter-body" placeholder="Nhập số">
                    </div>
                    <div class="col-md-4">
                        <label for="other-butt" class="form-label inter-body">Mông / Butt</label>
                        <input type="text" id="other-butt" class="form-control inter-body" placeholder="Nhập số">
                    </div>
                    <div class="col-md-4">
                        <label for="other-thigh" class="form-label inter-body">Đùi / Thigh</label>
                        <input type="text" id="other-thigh" class="form-control inter-body" placeholder="Nhập số">
                    </div>
                    <div class="col-md-4">
                        <label for="other-length" class="form-label inter-body">Dài / Length:</label>
                        <input type="text" id="other-length" class="form-control inter-body" placeholder="Nhập số">
                    </div>
                    <div class="col-md-4">
                        <label for="other-armpit" class="form-label inter-body">Vòng nách / Armpit:</label>
                        <input type="text" id="other-armpit" class="form-control inter-body" placeholder="Nhập số">
                    </div>
                </div>
                <!-- Nút Xóa phần HTML -->
                <button class="btn btn-danger mt-3" onclick="deleteSection(this)">Xóa</button>
            </section>`;

        // Thêm HTML vào vùng chứa
        document.getElementById('section-container').insertAdjacentHTML('beforeend', newHtml);

        // Ẩn nút "Thêm Section" sau khi thêm phần tử HTML
        addSectionButton.style.display = 'none';
    });

    // Hàm để xóa phần HTML
    function deleteSection(button) {
        const sectionToRemove = button.closest('section');
        sectionToRemove.remove();

        // Hiện lại nút "Thêm Section" sau khi xóa phần tử HTML
        addSectionButton.style.display = 'inline-block';
    }