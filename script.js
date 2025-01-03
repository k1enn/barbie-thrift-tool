let currentLanguage = 'both'; // Can be 'en', 'vi', or 'both'

function switchLanguage(lang) {
    currentLanguage = lang;
    updateLanguageDisplay();
    
    // Update the button text
    const langButton = document.getElementById('languageSwitch');
    switch(lang) {
        case 'en':
            langButton.innerHTML = '<i class="bi bi-translate text-decoration-none"></i> EN';
            break;
        case 'vi':
            langButton.innerHTML = '<i class="bi bi-translate text-decoration-none"></i> VI';
            break;
        case 'both':
            langButton.innerHTML = '<i class="bi bi-translate text-decoration-none"></i> EN/VI';
            break;
    }
}

function updateLanguageDisplay() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const langType = element.getAttribute('data-lang');
        if (currentLanguage === 'both' || currentLanguage === langType) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

// Dark mode switch
function darkMode() {
    const body = document.body;
    const icon = document.getElementById('darkModeIcon');
    
    body.classList.toggle('dark-mode');
    icon.classList.add('animated');

    // Update icon
    if(body.classList.contains('dark-mode')) {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-stars-fill');
    } else {
        icon.classList.remove('bi-moon-stars-fill');
        icon.classList.add('bi-sun-fill');
    }

    // Remove animation class after it completes
    setTimeout(() => {
        icon.classList.remove('animated');
    }, 500);
}

let historyCount = 0;

// Hàm xóa dữ liệu trong các input
function clearInputs() {
    // Lấy tất cả các input type="text" và đặt giá trị về trống
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    
    // Lấy tất cả các select và đặt giá trị về mặc định (giá trị đầu tiên)
    document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
}

// Hàm kiểm tra số lượng sản phẩm đã nhập
function validateInputs() {

    // Còn thiếu trường hợp nếu người dùng chọn mà không nhập, nhưng vì có thể làm vậy với chủ đích nên không làm

    const setCount = parseInt(document.getElementById('set-price').value);
    if (!setCount) return true; // If no set count selected, skip validation
    
    let itemCount = 0;
    
    // Count items that have at least one field filled
    const sections = ['top', 'bottom', 'coat', 'other'];
    sections.forEach(section => {
        const type = document.getElementById(`${section}-type`);
        if (type && type.value) itemCount++;
    });
    


    if (itemCount < setCount) {
        showValidationModal(
            `Bạn chọn ${setCount} sản phẩm nhưng chỉ nhập ${itemCount}.\nVui lòng nhập thêm ${setCount - itemCount} món nữa.`
        );
        return false;
    }

    return true;
}


// Add this new function
function showValidationModal(message) {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'validation-modal-container';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'validation-modal-content';
    
    // Add message
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'btn btn-primary';
    closeButton.textContent = 'Ok';
    closeButton.onclick = () => modalContainer.remove();
    
    // Assemble modal
    modalContent.appendChild(messageElement);
    modalContent.appendChild(closeButton);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
}

// Hàm xử lý tạo kết quả
document.getElementById('generate-output').addEventListener('click', function () {

    // Get set quantity
    const setPrice = document.getElementById('set-price').value;

    if (!setPrice) {
        showValidationModal('Vui lòng chọn số lượng sản phẩm!');
        return;
    }
    
    if (!validateInputs()) return; // Stop if validation fails
    
    //Get top value
    const topType = document.getElementById('top-type').value;
    const fitTop = document.getElementById('fit-top').value;
    const topChest = document.getElementById('top-chest').value;
    const topWaist = document.getElementById('top-waist').value;
    const topLength = document.getElementById('top-length').value;
    const topArmpit = document.getElementById('top-armpit').value;
    const topDefect = document.getElementById('top-defect').value;

    //Get top2 value
    // Lấy giá trị từ các phần tử DOM, và cho phép chúng có thể là null nếu không có giá trị
    const top2Type = document.getElementById('top2-type')?.value || null;
    const fit2Top = document.getElementById('fit2-top')?.value || null;
    const top2Chest = document.getElementById('top2-chest')?.value || null;
    const top2Waist = document.getElementById('top2-waist')?.value || null;
    const top2Length = document.getElementById('top2-length')?.value || null;
    const top2Armpit = document.getElementById('top2-armpit')?.value || null;
    const top2Defect = document.getElementById('top2-defect')?.value || null;

    // Get bottom value
    const bottomType = document.getElementById('bottom-type').value;
    const fitBottom = document.getElementById('fit-bottom').value;
    const bottomWaist = document.getElementById('bottom-waist').value;
    const bottomLength = document.getElementById('bottom-length').value;
    const bottomThigh = document.getElementById('bottom-thigh').value;
    const bottomDefect = document.getElementById('bottom-defect').value;

    // Get coat value
    const coatType = document.getElementById('coat-type').value;
    const fitCoat = document.getElementById('fit-coat').value;
    const coatArmpit = document.getElementById('coat-armpit').value;
    const coatLength = document.getElementById('coat-length').value;
    const coatDefect = document.getElementById('coat-defect').value;

    const otherName = document.getElementById('other-name')?.value || null;
    const fitOther = document.getElementById('other-fit')?.value || null;
    const otherChest = document.getElementById('other-chest')?.value || null;
    const otherButt = document.getElementById('other-butt')?.value || null;
    const otherWaist = document.getElementById('other-waist')?.value || null;
    const otherHip = document.getElementById('other-hip')?.value || null;
    const otherLength = document.getElementById('other-length')?.value || null;
    const otherArmpit = document.getElementById('other-armpit')?.value || null;
    const otherThigh = document.getElementById('other-thigh')?.value || null;
    const otherDefect = document.getElementById('other-defect')?.value || null;
    
    let resultDisplay = "";

    // Add set quantity
    resultDisplay += getSetQuantity(setPrice);

    // Thêm thông tin Top
    if(setPrice == '1') {
        resultDisplay += getSingleTopInfo(fitTop, topChest, topWaist, topLength, topArmpit, topDefect);
    }
    else {
        resultDisplay += getTopInfo(topType, fitTop, topChest, topWaist, topLength, topArmpit, topDefect);
    }
    
    // Thêm thông tin Top2
    resultDisplay += getTop2Info(top2Type, fit2Top, top2Chest, top2Waist, top2Length, top2Armpit, topDefect);

    // Thêm thông tin Bottom
    resultDisplay += getBottomInfo(bottomType, fitBottom, bottomWaist, bottomLength, bottomThigh, bottomDefect);

    // Thêm thông tin Coat
    resultDisplay += getCoatInfo(coatType, fitCoat, coatArmpit, coatLength, coatDefect);

    // Thêm thông tin cho sản phẩm khác
    resultDisplay += getOtherInfo(otherName, fitOther, otherChest, otherButt, otherWaist, otherHip, otherLength, otherArmpit, otherThigh, otherDefect);


    document.getElementById('output').textContent = resultDisplay;

    resultDisplay += getAttentionMessage(currentLanguage);

    addToHistory(resultDisplay);
    
    // Xóa dữ liệu input
    clearInputs();
});

function getSetQuantity(setPrice) {
    const messages = {
        1: {
            en: "✨\n🎀𝐏𝐫𝐢𝐜𝐞: \n",
            vi: "✨\n🎀𝐆𝐢𝐚́: \n",
            both: "✨\n🎀𝐏𝐫𝐢𝐜𝐞 / 𝐆𝐢𝐚́: \n"
        },
        2: {
            en: "✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟐𝐩𝐜𝐬: \n",
            vi: "✨\n🎀𝐆𝐢𝐚́ 𝐬𝐞𝐭 𝟐 𝐦𝐨́𝐧: \n",
            both: "✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟐𝐩𝐜𝐬 / 𝐆𝐢𝐚́ 𝐬𝐞𝐭 𝟐 𝐦𝐨́𝐧: \n"
        },
        3: {
            en: "✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟑𝐩𝐜𝐬: \n",
            vi: "✨\n🎀𝐆𝐢𝐚́ 𝐬𝐞𝐭 𝟑 𝐦𝐨́𝐧: \n",
            both: "✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟑𝐩𝐜𝐬 / 𝐆𝐢𝐚́ 𝐬𝐞𝐭 𝟑 𝐦𝐨́𝐧: \n"
        },
        4: {
            en: "✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟒𝐩𝐜𝐬: \n",
            vi: "✨\n🎀𝐆𝐢𝐚́ 𝐬𝐞𝐭 𝟒 𝐦𝐨́𝐧: \n",
            both: "✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟒𝐩𝐜𝐬 / 𝐆𝐢𝐚́ 𝐬𝐞𝐭 𝟒 𝐦𝐨́𝐧: \n"
        }
    };

    return messages[setPrice]?.[currentLanguage] || "";
}

// Translation object
const translations = {
    chest: {
        en: "Chest",
        vi: "Ngực",
        both: "Ngực / Chest"
    },
    waist: {
        en: "Waist",
        vi: "Eo",
        both: "Eo / Waist"
    },
    length: {
        en: "Length",
        vi: "Dài",
        both: "Dài / Length"
    },
    armpit: {
        en: "Armpit",
        vi: "Vòng nách",
        both: "Vòng nách / Armpit"
    },
    hip: {
        en: "Hip",
        vi: "Hông",
        both: "Hông / Hip"
    },
    butt: {
        en: "Butt",
        vi: "Mông",
        both: "Mông / Butt"
    },
    thigh: {
        en: "Thigh",
        vi: "Đùi",
        both: "Đùi / Thigh"
    }
};

// Helper function to get translated text
const getTranslatedText = (key) => translations[key][currentLanguage] || translations[key]['both'];

// Modified getTopInfo function
const getTopInfo = (topType, fitTop, topChest, topWaist, topLength, topArmpit, topDefect) => {
    var result = "";
    if(topType) {
        result += `${convertToBoldUnicode(topType)}:\n`;
        if (topDefect) result += `${topDefect}\n`;
        if (fitTop) result += `  - Fit: ${fitTop}\n`;
        if (topChest) result += `  - ${getTranslatedText('chest')}: ${topChest}cm\n`;
        if (topWaist) result += `  - ${getTranslatedText('waist')}: ${topWaist}cm\n`;
        if (topLength) result += `  - ${getTranslatedText('length')}: ${topLength}cm\n`;
        if (topArmpit) result += `  - ${getTranslatedText('armpit')}: ${topArmpit}cm\n`;
    } 
    return result;
}

// Modified getSingleTopInfo function
const getSingleTopInfo = (fitTop, topChest, topWaist, topLength, topArmpit, topDefect) => {
    var result = "";
    if (topDefect) result += `${topDefect}\n`;
    if (fitTop) {
        if(fitTop != "Freesize") result += `- Fit: ${fitTop}\n`;
        else result += `- Freesize\n`;
    }
    if (topChest) result += `- ${getTranslatedText('chest')}: ${topChest}cm\n`;
    if (topWaist) result += `- ${getTranslatedText('waist')}: ${topWaist}cm\n`;
    if (topLength) result += `- ${getTranslatedText('length')}: ${topLength}cm\n`;
    if (topArmpit) result += `- ${getTranslatedText('armpit')}: ${topArmpit}cm`;
    return result;
}

const getTop2Info = (top2Type, fit2Top, top2Chest, top2Waist, top2Length, top2Armpit, top2Defect) => {
    var result = "";
    if(top2Type) { // Kiểm tra nếu top2Type không phải là chuỗi rỗng
    result += `${convertToBoldUnicode(top2Type)}:\n`;
    if (top2Defect) result += `${top2Defect}\n`;
    if (fit2Top)  {
        if(fit2Top != "Freesize") result += `  - Fit: ${fit2Top}\n`;
        else result += `  - Freesize\n`;
    }
        
    if (top2Chest) result += `  - ${getTranslatedText('chest')}: ${top2Chest}cm\n`;
    if (top2Waist) result += `  - ${getTranslatedText('waist')}: ${top2Waist}cm\n`;
    if (top2Length) result += `  - ${getTranslatedText('length')}: ${top2Length}cm\n`;
    if (top2Armpit) result += `  - ${getTranslatedText('armpit')}: ${top2Armpit}cm\n`;
    }
    return result;
}

// Add Bottom information
const getBottomInfo = (bottomType, fitBottom, bottomWaist, bottomLength, bottomThigh, bottomDefect) => {
    var result = "";
    if(bottomType) { // Kiểm tra nếu bottomType không phải là chuỗi rỗng
        result += `${convertToBoldUnicode(bottomType)}:\n`;
        if (bottomDefect) result += `${bottomDefect}\n`;
        if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
        if (bottomWaist) result += `  - ${getTranslatedText('waist')}: ${bottomWaist}cm\n`;
        if (bottomLength) result += `  - ${getTranslatedText('length')}: ${bottomLength}cm\n`;
        if (bottomThigh) result += `  - ${getTranslatedText('thigh')}: ${bottomThigh}cm\n`;
    }

    return result;
}

//  Add Coat information
const getCoatInfo = (coatType, fitCoat, coatArmpit, coatLength, coatDefect) => {
    var result = "";
    if (coatType) { // Kiểm tra nếu coatType không phải là chuỗi rỗng
        result += `${convertToBoldUnicode(coatType)}:\n`;
        if (coatDefect) result += `${coatDefect}\n`;
        if (fitCoat) result += `  - Fit: ${fitCoat}\n`;
        if (coatArmpit) result += `  - ${getTranslatedText('armpit')}: ${coatArmpit}cm\n`;
        if (coatLength) result += `  - ${getTranslatedText('length')}: ${coatLength}cm\n`;
    }
    return result;
};



const getOtherInfo = (otherName, fitOther, otherChest, otherButt, otherWaist, otherHip, otherLength, otherArmpit, otherThigh, otherDefect) => {
    var result = `${convertToBoldUnicode(otherName)}`;
    if (otherName) result += `:\n`;
    if (otherDefect) result += `${otherDefect}\n`;
    if (fitOther) result += `  - Fit: ${fitOther}\n`;
    if (otherChest) result += `  - ${getTranslatedText('chest')}: ${otherChest}cm\n`;
    if (otherButt) result += `  - ${getTranslatedText('butt')}: ${otherButt}cm\n`; 
    if (otherWaist) result += `  - ${getTranslatedText('waist')}: ${otherWaist}cm\n`;
    if (otherHip) result += `  - ${getTranslatedText('hip')}: ${otherHip}cm\n`;
    if (otherLength) result += `  - ${getTranslatedText('length')}: ${otherLength}cm\n`;
    if (otherArmpit) result += `  - ${getTranslatedText('armpit')}: ${otherArmpit}cm\n`;
    if (otherThigh) result += `  - ${getTranslatedText('thigh')}: ${otherThigh}cm\n`;
    return result;
}

// Hàm sao chép kết quả
var copyOutput = document.getElementById('copy-output')
copyOutput.addEventListener('click', function () {
    copyToClipboardWithIndex(document.getElementById('output').textContent, 'Kết quả đã được sao chép!');
});

// Thêm kết quả vào lịch sử
function addToHistory(resultDisplay) {
    historyCount++;
    const historyList = document.getElementById('history-list');

    const historyItem = document.createElement('li');
    historyItem.className = 'list-group-item';
    historyItem.dataset.index = historyCount;

    historyItem.innerHTML = `
        <strong>#${historyCount}:</strong>
        <pre class="history-content">${resultDisplay}</pre>
        <div class="btn-group">
            <button class="btn btn-sm btn-outline-success me-2 rounded-pill px-3 py-2" onclick="copyHistoryItem(${historyCount})">
                <i class="bi bi-clipboard"></i> Sao chép
            </button>
            <button class="btn btn-sm btn-outline-warning me-2 rounded-pill px-3 py-2" onclick="editHistory(${historyCount})">
                <i class="bi bi-pencil-square"></i> Sửa
            </button>
            <button class="btn btn-sm btn-outline-danger me-2 rounded-pill px-3 py-2" onclick="deleteHistory(${historyCount})">
                <i class="bi bi-trash"></i> Xóa
            </button>
        </div>
        <div class="edit-container d-none mt-2">
            <textarea class="form-control mb-2 inter-body">${resultDisplay}</textarea>
            <div class="btn-group">
                <button class="btn btn-sm btn-outline-primary me-2 rounded-pill px-3 py-2" onclick="saveEdit(${historyCount})">Lưu</button>
                <button class="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2" onclick="cancelEdit(${historyCount})">Hủy</button>
            </div>
        </div>
    `;

    historyList.appendChild(historyItem);
}

// Sao chép từng mục lịch sử
function copyHistoryItem(index) {
    const historyItem = document.querySelector(`#history-list li[data-index="${index}"]`);
    if (historyItem) {
        const message = `History #${index} has been copied! / Lịch sử #${index} đã được sao chép!`;
        copyToClipboardWithIndex(historyItem.querySelector('.history-content').textContent, message, index);
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

// Thêm vào Top phụ
document.addEventListener("DOMContentLoaded", () => {
    const topTypeElement = document.getElementById("top-type");
    const generateOutputButton = document.getElementById("generate-output");
    const topSection = document.querySelector('section:nth-of-type(1) > .row.g-3');

    // Hàm thêm HTML
    const addInnerOrOuterHtml = () => {
        const newHtml = `
            <div style="padding-top: 2rem; padding-bottom:0.1rem;" class="row g-3" id="additional-html">
            <hr class="w-70 mx-auto">
            <h5>Addition</h5>
                <div class="col-md-6">
                    <label for="top2-type" class="form-label inter-body">
                        <span data-lang="en">Type</span>
                        <span data-lang="both"> / </span>
                        <span data-lang="vi">Loại:</span>:
                    </label>
                    <select id="top2-type" class="form-select inter-body">
                        <option value="">Không chọn</option>
                        <option value="Top">Top</option>
                        <option value="Cami">Cami</option>
                        <option value="Inner Top">Inner Top</option>
                        <option value="Outer Top">Outer Top</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="fit2-top" class="form-label inter-body">
                        <span data-lang="en">Size</span>
                        <span data-lang="both"> / </span>
                        <span data-lang="vi">Kích cỡ</span>:
                    </label>
                    <select id="fit2-top" class="form-select inter-body">
                        <option value="">Không chọn</option>
                        <option value="Freesize">Freesize</option>
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
                    <label for="top2-chest" class="form-label inter-body">
                        <span data-lang="en">Chest</span>
                        <span data-lang="both"> / </span>
                        <span data-lang="vi">Ngực</span>:
                    </label>
                    <input type="text" id="top2-chest" class="form-control inter-body" placeholder="Nhập số">
                </div>
                <div class="col-md-4">
                    <label for="top2-waist" class="form-label inter-body">
                        <span data-lang="en">Waist</span>
                        <span data-lang="both"> / </span>
                        <span data-lang="vi">Eo</span>:
                    </label>
                    <input type="text" id="top2-waist" class="form-control inter-body" placeholder="Nhập số">
                </div>
                <div class="col-md-4">
                    <label for="top2-length" class="form-label inter-body">
                        <span data-lang="en">Length</span>
                        <span data-lang="both"> / </span>
                        <span data-lang="vi">Dài</span>:
                    </label>
                    <input type="text" id="top2-length" class="form-control inter-body" placeholder="Nhập số">
                </div>
                <div class="col-md-4">
                    <label for="top2-armpit" class="form-label inter-body">
                        <span data-lang="en">Armpit</span>
                        <span data-lang="both"> / </span>
                        <span data-lang="vi">Vòng nách</span>:
                    </label>
                    <input type="text" id="top2-armpit" class="form-control inter-body" placeholder="Nhập số">
                </div>
                <div class="col-md-4">
                    <label for="top2-defect" class="form-label inter-body">
                        <span data-lang="en">Defect</span>
                        <span data-lang="both"> / </span>
                        <span data-lang="vi">Lỗi</span>:
                    </label>
                    <input type="text" id="top2-defect" class="form-control inter-body" placeholder="Nhập số">
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

// Get the "Add Section" button and the hidden section
const addSectionButton = document.getElementById('add-section');
const otherSection = document.getElementById('new-section');

// Listen for click event on "Add Section" button
addSectionButton.addEventListener('click', function () {
    // Show the hidden section
    otherSection.style.display = 'block';
    // Hide the "Add Section" button
    addSectionButton.style.display = 'none';
});

// Function to hide section
function deleteSection(button) {
    const sectionToHide = button.closest('section');
    // Hide the section
    sectionToHide.style.display = 'none';
    
    // Clear all inputs in the hidden section
    const inputs = sectionToHide.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.value = '';
    });

    // Show the "Add Section" button again
    addSectionButton.style.display = 'inline-block';
}

// Chuyển đổi phông chữ trực tiếp
function convertToBoldUnicode(inputText) {
    if (!inputText) return '';  // Return an empty string if input is empty

    // Mapping for converting normal characters to bold unicode
    const boldMap = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉',
        'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓',
        'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
        'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣',
        'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭',
        'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
        '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗',
        
        // Vietnamese uppercase characters
        'À': '𝐀̀', 'Á': '𝐀́', 'Ả': '𝐀̉', 'Ã': '𝐀̃', 'Ạ': '𝐀̣',
        'È': '𝐄̀', 'É': '𝐄́', 'Ẻ': '𝐄̉', 'Ẽ': '𝐄̃', 'Ẹ': '𝐄̣',
        'Ì': '𝐼̀', 'Í': '𝐼́', 'Ỉ': '𝐼̉', 'Ĩ': '𝐼̃', 'Ị': '𝐼̣',
        'Ò': '𝑂̀', 'Ó': '𝑂́', 'Ỏ': '𝑂̉', 'Õ': '𝑂̃', 'Ọ': '𝑂̣',
        'Ù': '𝑈̀', 'Ú': '𝑈́', 'Ủ': '𝑈̉', 'Ũ': '𝑈̃', 'Ụ': '𝑈̣',
        'Ỳ': '𝑌̀', 'Ý': '𝑌́', 'Ỷ': '𝑌̉', 'Ỹ': '𝑌̃', 'Ỵ': '𝑌̣',
        'Đ': '𝐷', 'Ê': '𝐸̂', 'Ô': '𝑂̂', 'Ơ': '𝑂̛', 'Ư': '𝑈̛',
        
        // Vietnamese lowercase characters
        'à': '𝐚̀', 'á': '𝐚́', 'ả': '𝐚̉', 'ã': '𝐚̃', 'ạ': '𝐚̣',
        'è': '𝐞̀', 'é': '𝐞́', 'ẻ': '𝐞̉', 'ẽ': '𝐞̃', 'ẹ': '𝐞̣',
        'ì': '𝑖̀', 'í': '𝑖́', 'ỉ': '𝑖̉', 'ĩ': '𝑖̃', 'ị': '𝑖̣',
        'ò': '𝑜̀', 'ó': '𝑜́', 'ỏ': '𝑜̉', 'õ': '𝑜̃', 'ọ': '𝑜̣',
        'ù': '𝑢̀', 'ú': '𝑢́', 'ủ': '𝑢̉', 'ũ': '𝑢̃', 'ụ': '𝑢̣',
        'ỳ': '𝑦̀', 'ý': '𝑦́', 'ỷ': '𝑦̉', 'ỹ': '𝑦̃', 'ỵ': '𝑦̣',
        'đ': '𝑑', 'ê': '𝑒̂', 'ô': '𝑜̂', 'ơ': '𝑜̛', 'ư': '𝑢̛',
    };    

    const boldText = Array.from(inputText).map(char => boldMap[char] || char).join('');
    return boldText;
}

// Add these new functions for editing functionality
function editHistory(index) {
    const historyItem = document.querySelector(`#history-list li[data-index="${index}"]`);
    const editContainer = historyItem.querySelector('.edit-container');
    const content = historyItem.querySelector('.history-content');
    
    editContainer.classList.remove('d-none');
    content.classList.add('d-none');
}

function saveEdit(index) {
    const historyItem = document.querySelector(`#history-list li[data-index="${index}"]`);
    const editContainer = historyItem.querySelector('.edit-container');
    const content = historyItem.querySelector('.history-content');
    const textarea = editContainer.querySelector('textarea');
    
    content.textContent = textarea.value;
    editContainer.classList.add('d-none');
    content.classList.remove('d-none');
}

function cancelEdit(index) {
    const historyItem = document.querySelector(`#history-list li[data-index="${index}"]`);
    const editContainer = historyItem.querySelector('.edit-container');
    const content = historyItem.querySelector('.history-content');
    const textarea = editContainer.querySelector('textarea');
    
    textarea.value = content.textContent;
    editContainer.classList.add('d-none');
    content.classList.remove('d-none');
}

const getAttentionMessage = (language) => {
    const messages = {
        attention: {
            en: "‼️𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧‼️",
            vi: `‼️${convertToBoldUnicode("Lưu ý")}‼️`,
            both: `‼️𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧 / ${convertToBoldUnicode("Lưu ý")}‼️`
        },
        priority: {
            en: "𝑷𝒓𝒊𝒐𝒓𝒊𝒕𝒚 𝑪𝒐𝒎𝒎𝒆𝒏𝒕: Payment within 12 hours.",
            vi: "𝑳𝒖̛𝒖 𝒚́ 𝒒𝒖𝒂𝒏 𝒕𝒓𝒐̣𝒏𝒈: Thanh toán trong vòng 12 tiếng.",
            both: "𝑷𝒓𝒊𝒐𝒓𝒊𝒕𝒚 𝑪𝒐𝒎𝒎𝒆𝒏𝒕 / 𝑳𝒖̛𝒖 𝒚́ 𝒒𝒖𝒂𝒏 𝒕𝒓𝒐̣𝒏𝒈: Payment within 12 hours / Thanh toán trong vòng 12 tiếng."
        },
        details: {
            en: "𝑷𝒓𝒐𝒅𝒖𝒄𝒕 𝑫𝒆𝒕𝒂𝒊𝒍𝒔: Check each post carefully before buying.",
            vi: "𝑻𝒉𝒐̂𝒏𝒈 𝒕𝒊𝒏 𝒔𝒂̉𝒏 𝒑𝒉𝒂̂̉𝒎: Vui lòng đọc kỹ bài đăng trước khi mua.",
            both: "𝑷𝒓𝒐𝒅𝒖𝒄𝒕 𝑫𝒆𝒕𝒂𝒊𝒍𝒔 / 𝑻𝒉𝒐̂𝒏𝒈 𝒕𝒊𝒏 𝒔𝒂̉𝒏 𝒑𝒉𝒂̂̉𝒎: Check each post carefully before buying / Vui lòng đọc kỹ bài đăng trước khi mua."
        },
        secondhand: {
            en: "𝑺𝒆𝒄𝒐𝒏𝒅𝒉𝒂𝒏𝒅 𝑰𝒕𝒆𝒎𝒔: May have minor flaws not visible in pictures.",
            vi: "𝑯𝒂̀𝒏𝒈 𝒔𝒆𝒄𝒐𝒏𝒅: Có thể có khuyết điểm nhỏ không thấy trong ảnh.",
            both: "𝑺𝒆𝒄𝒐𝒏𝒅𝒉𝒂𝒏𝒅 𝑰𝒕𝒆𝒎𝒔 / 𝑯𝒂̀𝒏𝒈 𝒔𝒆𝒄𝒐𝒏𝒅: May have minor flaws not visible in pictures / Có thể có khuyết điểm nhỏ không thấy trong ảnh."
        },
        unboxing: {
            en: "𝑼𝒏𝒃𝒐𝒙𝒊𝒏𝒈: Record a video when opening the package.",
            vi: "𝑴𝒐̛̉ 𝒉𝒂̀𝒏𝒈: Quay video khi mở hàng.",
            both: "𝑼𝒏𝒃𝒐𝒙𝒊𝒏𝒈 / 𝑴𝒐̛̉ 𝒉𝒂̀𝒏𝒈: Record a video when opening the package / Quay video khi mở hàng."
        },
        noReturn: {
            en: "𝑵𝒐 𝑹𝒆𝒕𝒖𝒓𝒏/𝑹𝒆𝒇𝒖𝒏𝒅: Except for serious defects with unboxing video proof.",
            vi: "𝑲𝒉𝒐̂𝒏𝒈 𝒉𝒐𝒂̀𝒏 𝒕𝒓𝒂̉: Trừ trường hợp lỗi nghiêm trọng có video mở hàng.",
            both: "𝑵𝒐 𝑹𝒆𝒕𝒖𝒓𝒏/𝑹𝒆𝒇𝒖𝒏𝒅 / 𝑲𝒉𝒐̂𝒏𝒈 𝒉𝒐𝒂̀𝒏 𝒕𝒓𝒂̉: Except for serious defects with unboxing video proof / Trừ trường hợp lỗi nghiêm trọng có video mở hàng."
        }
    };

    return `${messages.attention[language]}
            ${messages.priority[language]}
            ${messages.details[language]}
            ${messages.secondhand[language]}
            ${messages.unboxing[language]}
            ${messages.noReturn[language]}`;
};
