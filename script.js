// Dark mode switch
function darkMode() {
    const body = document.body;
    const icon = document.getElementById('darkModeIcon');
    
    body.classList.toggle('dark-mode');
    
    // Toggle icon between moon and sun
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('bi-moon-stars-fill');
        icon.classList.add('bi-sun-fill');
    } else {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-stars-fill');
    }
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



    const setCount = parseInt(document.getElementById('set-price').value);
    if (!setCount) return true; // If no set count selected, skip validation
    
    let itemCount = 0;
    
    // Count items that have at least one field filled
    const sections = ['top', 'bottom', 'coat', 'other'];
    sections.forEach(section => {
        const type = document.getElementById(`${section}-type`);
        if (type && type.value) itemCount++;
    });
    

    // Check if #other-name is filled
    const otherName = document.getElementById('other-name');
    if (otherName && otherName.value.trim() === '') {
        showValidationModal('Vui lòng nhập tên sản phẩm trong mục "Khác".');
        return false;
    }
    else {
        itemCount++;
    }

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
        showValidationModal('Vui lòng chọn số lượng sản phẩm trong set!');
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

function getSetQuantity(setPrice) {
    var result = "";
        switch (setPrice) { 
        case '1':
            result += `✨\n🎀𝐏𝐫𝐢𝐜𝐞: \n`;
            break;
        case '2': 
            result += `✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟐𝐩𝐜𝐬: \n`;
            break;
        case '3': 
            result += `✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟑𝐩𝐜𝐬: \n`;
            break;
        case '4': 
            result += `✨\n🎀𝐒𝐞𝐭 𝐩𝐫𝐢𝐜𝐞 𝟒𝐩𝐜𝐬: \n`;
            break;
        default:
    }
    return result;
}

// Add Top information
const getTopInfo = (topType, fitTop, topChest, topWaist, topLength, topArmpit, topDefect) => {
    let result = "";
    if(topType){ // Kiểm tra nếu topType không phải là chuỗi rỗng
        result += `${convertToBoldUnicode(topType)}:\n`;
        if (topDefect) result += `${topDefect}\n`;
        if (fitTop) result += `  - Fit: ${fitTop}\n`;
        if (topChest) result += `  - Ngực / Chest: ${topChest}cm\n`;
        if (topWaist) result += `  - Eo / Waist: ${topWaist}cm\n`;
        if (topLength) result += `  - Dài / Length: ${topLength}cm\n`;
        if (topArmpit) result += `  - Vòng nách / Armpit: ${topArmpit}cm\n`;
    } 
    return result;
}

const getSingleTopInfo = (fitTop, topChest, topWaist, topLength, topArmpit, topDefect) => {
    var result = ""
    if (topDefect) result += `${topDefect}\n`;
    if (fitTop)  {
        if(fitTop != "Freesize") result += `  - Fit: ${fitTop}\n`;
        else result += `  - Freesize\n`;
    }
    if (topChest) result += `- Ngực / Chest: ${topChest}cm\n`;
    if (topWaist) result += `- Eo / Waist: ${topWaist}cm\n`;
    if (topLength) result += `- Dài / Length: ${topLength}cm\n`;
    if (topArmpit) result += `- Vòng nách / Armpit: ${topArmpit}cm`;
    return result;
}

const getTop2Info = (top2Type, fit2Top, top2Chest, top2Waist, top2Length, top2Armpit, top2Defect) => {
    let result = "";
    if(top2Type) { // Kiểm tra nếu top2Type không phải là chuỗi rỗng
    result += `${convertToBoldUnicode(top2Type)}:\n`;
    if (top2Defect) result += `${top2Defect}\n`;
    if (fit2Top)  {
        if(fit2Top != "Freesize") result += `  - Fit: ${fit2Top}\n`;
        else result += `  - Freesize\n`;
    }
        
    if (top2Chest) result += `  - Ngực / Chest: ${top2Chest}cm\n`;
    if (top2Waist) result += `  - Eo / Waist: ${top2Waist}cm\n`;
    if (top2Length) result += `  - Dài / Length: ${top2Length}cm\n`;
    if (top2Armpit) result += `  - Vòng nách / Armpit: ${top2Armpit}cm\n`;
    }
    return result;
}

// Add Bottom information
const getBottomInfo = (bottomType, fitBottom, bottomWaist, bottomLength, bottomThigh, bottomDefect) => {
    let result = "";
    if(bottomType) { // Kiểm tra nếu bottomType không phải là chuỗi rỗng
        result += `${convertToBoldUnicode(bottomType)}:\n`;
        if (bottomDefect) result += `${bottomDefect}\n`;
        if (fitBottom) result += `  - Fit: ${fitBottom}\n`;
        if (bottomWaist) result += `  - Eo / Waist: ${bottomWaist}cm\n`;
        if (bottomLength) result += `  - Dài / Length: ${bottomLength}cm\n`;
        if (bottomThigh) result += `  - Đùi / Thigh: ${bottomThigh}cm\n`;
    }

    return result;
}

//  Add Coat information
const getCoatInfo = (coatType, fitCoat, coatArmpit, coatLength, coatDefect) => {
    let result = "";
    if (coatType) { // Kiểm tra nếu coatType không phải là chuỗi rỗng
        result += `${convertToBoldUnicode(coatType)}:\n`;
        if (coatDefect) result += `${coatDefect}\n`;
        if (fitCoat) result += `  - Fit: ${fitCoat}\n`;
        if (coatArmpit) result += `  - Vòng nách / Armpit: ${coatArmpit}cm\n`;
        if (coatLength) result += `  - Dài / Length: ${coatLength}cm\n`;
    }
    return result;
};



const getOtherInfo = (otherName, fitOther, otherChest, otherButt, otherWaist, otherHip, otherLength, otherArmpit, otherThigh, otherDefect) => {
    var result = `${convertToBoldUnicode(otherName)}`;
    if (otherName) result += `:\n`;
    if (otherDefect) result += `${otherDefect}\n`;
    if (fitOther) result += `  - Fit: ${fitOther}\n`;
    if (otherChest) result += `  - Ngực / Chest: ${otherChest}cm\n`;
    if (otherButt) result += `  - Mông / Butt: ${otherButt}cm\n`; 
    if (otherWaist) result += `  - Eo / Waist: ${otherWaist}cm\n`;
    if (otherHip) result += `  - Hông / Hip: ${otherHip}cm\n`;
    if (otherLength) result += `  - Dài / Length: ${otherLength}cm\n`;
    if (otherArmpit) result += `  - Vòng nách / Armpit: ${otherArmpit}cm\n`;
    if (otherThigh) result += `  - Đùi / Thigh: ${otherThigh}cm\n`;
    return result;
}

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
        <pre class="history-content">${fullOutput}</pre>
        <div class="btn-group">
            <button class="btn btn-sm btn-outline-success me-2 rounded-pill px-3 py-2" onclick="copyHistoryItem(${historyCount})">Sao chép</button>
            <button class="btn btn-sm btn-outline-warning me-2 rounded-pill px-3 py-2" onclick="editHistory(${historyCount})">Sửa</button>
            <button class="btn btn-sm btn-outline-danger me-2 rounded-pill px-3 py-2" onclick="deleteHistory(${historyCount})">Xóa</button>
        </div>
        <div class="edit-container d-none mt-2">
            <textarea class="form-control mb-2 inter-body">${fullOutput}</textarea>
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
        copyToClipboardWithIndex(historyItem.querySelector('.history-content').textContent, `Lịch sử #${index} đã được sao chép!`, index);
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
                    <label for="top2-defect" class="form-label inter-body">Defect:</label>
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

// Phần thêm sản phẩm khác

    // Lấy nút "Thêm Section"
    const addSectionButton = document.getElementById('add-section');

    // Lắng nghe sự kiện click của nút "Thêm Section"
    addSectionButton.addEventListener('click', function () {
        // Đoạn HTML cần thêm vào
        const newHtml = `
            <section class="mb-4 shadow-box" id="new-section">
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
                    <div class="col-md-4">
                    <label for="other-defect" class="form-label inter-body">Defect:</label>
                    <input type="text" id="other-defect" class="form-control inter-body" placeholder="Nhập số">
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
