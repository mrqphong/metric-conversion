// Tải dữ liệu ngôn ngữ từ languages.json
let translations = {};
fetch('languages.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        changeLanguage(); // Mặc định là tiếng Anh khi tải trang
    })
    .catch(error => console.error('Error loading languages:', error));

// Hàm thay đổi ngôn ngữ
function changeLanguage() {
    const lang = document.getElementById('languageSelect').value;

    // Dịch văn bản chung
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = translations[lang][key];
    });

    // Dịch <select> nếu có
    const select = document.querySelector('select[id$="Unit"]'); // Chọn select có ID kết thúc bằng "Unit"
    if (select) {
        const unitType = select.id.replace('Unit', '_units'); // Ví dụ: tempUnit -> temp_units
        const options = select.options;
        for (let i = 0; i < options.length; i++) {
            const value = options[i].value;
            options[i].textContent = translations[lang][unitType][value];
        }
    }

    // Dịch bảng công thức nếu có
    const table = document.querySelector('.sidebar table');
    if (table) {
        const headers = table.querySelectorAll('th');
        headers[0].textContent = translations[lang]['conversion'];
        headers[1].textContent = translations[lang]['formula'];
    }
}

// Các hàm chuyển đổi đơn vị (giữ nguyên)
function convertTemperature(reverse = false) {
    let inputTemp = document.getElementById('inputTemp');
    let outputTemp = document.getElementById('outputTemp');
    let unit = document.getElementById('tempUnit').value;
    let input = reverse ? outputTemp.value : inputTemp.value;

    if (input === "") return;

    input = parseFloat(input);
    let result;

    if (!reverse) {
        if (unit === 'cToF') result = (input * 9/5) + 32;
        else if (unit === 'cToK') result = input + 273.15;
        else if (unit === 'cToR') result = (input + 273.15) * 9/5;
        else if (unit === 'fToC') result = (input - 32) * 5/9;
        else if (unit === 'fToK') result = (input - 32) * 5/9 + 273.15;
        else if (unit === 'fToR') result = input + 459.67;
        else if (unit === 'kToC') result = input - 273.15;
        else if (unit === 'kToF') result = (input - 273.15) * 9/5 + 32;
        else if (unit === 'rToC') result = (input * 5/9) - 273.15;
        else if (unit === 'rToF') result = input - 459.67;
    } else {
        if (unit === 'cToF') result = (input - 32) * 5/9;
        else if (unit === 'cToK') result = input - 273.15;
        else if (unit === 'cToR') result = (input * 5/9) - 273.15;
        else if (unit === 'fToC') result = (input * 9/5) + 32;
        else if (unit === 'fToK') result = input - 459.67;
        else if (unit === 'fToR') result = input - 459.67;
        else if (unit === 'kToC') result = (input * 9/5) + 32;
        else if (unit === 'kToF') result = (input - 32) * 5/9 + 273.15;
        else if (unit === 'rToC') result = (input + 273.15) * 9/5;
        else if (unit === 'rToF') result = (input * 9/5) + 32;
    }

    if (!reverse) outputTemp.value = result.toFixed(2);
    else inputTemp.value = result.toFixed(2);
}

function convertLength(reverse = false) {
    let inputLength = document.getElementById('inputLength');
    let outputLength = document.getElementById('outputLength');
    let unit = document.getElementById('lengthUnit').value;
    let input = reverse ? outputLength.value : inputLength.value;

    if (input === "") return;

    input = parseFloat(input);
    let result;

    if (!reverse) {
        if (unit === 'kmToMile') result = input * 0.621371;
        else if (unit === 'mileToKm') result = input / 0.621371;
        else if (unit === 'mToFt') result = input * 3.28084;
        else if (unit === 'ftToM') result = input / 3.28084;
        else if (unit === 'mToIn') result = input * 39.3701;
        else if (unit === 'inToM') result = input / 39.3701;
        else if (unit === 'cmToIn') result = input / 2.54;
        else if (unit === 'inToCm') result = input * 2.54;
        else if (unit === 'kmToM') result = input * 1000;
        else if (unit === 'mToKm') result = input / 1000;
    } else {
        if (unit === 'kmToMile') result = input / 0.621371;
        else if (unit === 'mileToKm') result = input * 0.621371;
        else if (unit === 'mToFt') result = input / 3.28084;
        else if (unit === 'ftToM') result = input * 3.28084;
        else if (unit === 'mToIn') result = input / 39.3701;
        else if (unit === 'inToM') result = input * 39.3701;
        else if (unit === 'cmToIn') result = input * 2.54;
        else if (unit === 'inToCm') result = input / 2.54;
        else if (unit === 'kmToM') result = input / 1000;
        else if (unit === 'mToKm') result = input * 1000;
    }

    if (!reverse) outputLength.value = result.toFixed(2);
    else inputLength.value = result.toFixed(2);
}

function convertWeight(reverse = false) {
    let inputWeight = document.getElementById('inputWeight');
    let outputWeight = document.getElementById('outputWeight');
    let unit = document.getElementById('weightUnit').value;
    let input = reverse ? outputWeight.value : inputWeight.value;

    if (input === "") return;

    input = parseFloat(input);
    let result;

    if (!reverse) {
        if (unit === 'kgToLb') result = input * 2.20462;
        else if (unit === 'lbToKg') result = input / 2.20462;
        else if (unit === 'kgToOz') result = input * 35.27396;
        else if (unit === 'ozToKg') result = input / 35.27396;
        else if (unit === 'gToOz') result = input / 28.34952;
        else if (unit === 'ozToG') result = input * 28.34952;
        else if (unit === 'kgToG') result = input * 1000;
        else if (unit === 'gToKg') result = input / 1000;
        else if (unit === 'lbToOz') result = input * 16;
        else if (unit === 'ozToLb') result = input / 16;
    } else {
        if (unit === 'kgToLb') result = input / 2.20462;
        else if (unit === 'lbToKg') result = input * 2.20462;
        else if (unit === 'kgToOz') result = input / 35.27396;
        else if (unit === 'ozToKg') result = input * 35.27396;
        else if (unit === 'gToOz') result = input * 28.34952;
        else if (unit === 'ozToG') result = input / 28.34952;
        else if (unit === 'kgToG') result = input / 1000;
        else if (unit === 'gToKg') result = input * 1000;
        else if (unit === 'lbToOz') result = input / 16;
        else if (unit === 'ozToLb') result = input * 16;
    }

    if (!reverse) outputWeight.value = result.toFixed(2);
    else inputWeight.value = result.toFixed(2);
}

function convertVolume(reverse = false) {
    let inputVolume = document.getElementById('inputVolume');
    let outputVolume = document.getElementById('outputVolume');
    let unit = document.getElementById('volumeUnit').value;
    let input = reverse ? outputVolume.value : inputVolume.value;

    if (input === "") return;

    input = parseFloat(input);
    let result;

    if (!reverse) {
        if (unit === 'lToGal') result = input * 0.264172;
        else if (unit === 'galToL') result = input / 0.264172;
        else if (unit === 'lToMl') result = input * 1000;
        else if (unit === 'mlToL') result = input / 1000;
        else if (unit === 'm3ToL') result = input * 1000;
        else if (unit === 'lToM3') result = input / 1000;
        else if (unit === 'galToMl') result = input * 3785.41;
        else if (unit === 'mlToGal') result = input / 3785.41;
        else if (unit === 'm3ToGal') result = input * 264.172;
        else if (unit === 'galToM3') result = input / 264.172;
    } else {
        if (unit === 'lToGal') result = input / 0.264172;
        else if (unit === 'galToL') result = input * 0.264172;
        else if (unit === 'lToMl') result = input / 1000;
        else if (unit === 'mlToL') result = input * 1000;
        else if (unit === 'm3ToL') result = input / 1000;
        else if (unit === 'lToM3') result = input * 1000;
        else if (unit === 'galToMl') result = input / 3785.41;
        else if (unit === 'mlToGal') result = input * 3785.41;
        else if (unit === 'm3ToGal') result = input / 264.172;
        else if (unit === 'galToM3') result = input * 264.172;
    }

    if (!reverse) outputVolume.value = result.toFixed(2);
    else inputVolume.value = result.toFixed(2);
}

function convertArea(reverse = false) {
    let inputArea = document.getElementById('inputArea');
    let outputArea = document.getElementById('outputArea');
    let unit = document.getElementById('areaUnit').value;
    let input = reverse ? outputArea.value : inputArea.value;

    if (input === "") return;

    input = parseFloat(input);
    let result;

    if (!reverse) {
        if (unit === 'm2ToFt2') result = input * 10.7639;
        else if (unit === 'ft2ToM2') result = input / 10.7639;
        else if (unit === 'm2ToAcre') result = input / 4046.86;
        else if (unit === 'acreToM2') result = input * 4046.86;
        else if (unit === 'haToAcre') result = input * 2.47105;
        else if (unit === 'acreToHa') result = input / 2.47105;
        else if (unit === 'm2ToHa') result = input / 10000;
        else if (unit === 'haToM2') result = input * 10000;
        else if (unit === 'ft2ToAcre') result = input / 43560;
        else if (unit === 'acreToFt2') result = input * 43560;
    } else {
        if (unit === 'm2ToFt2') result = input / 10.7639;
        else if (unit === 'ft2ToM2') result = input * 10.7639;
        else if (unit === 'm2ToAcre') result = input * 4046.86;
        else if (unit === 'acreToM2') result = input / 4046.86;
        else if (unit === 'haToAcre') result = input / 2.47105;
        else if (unit === 'acreToHa') result = input * 2.47105;
        else if (unit === 'm2ToHa') result = input * 10000;
        else if (unit === 'haToM2') result = input / 10000;
        else if (unit === 'ft2ToAcre') result = input * 43560;
        else if (unit === 'acreToFt2') result = input / 43560;
    }

    if (!reverse) outputArea.value = result.toFixed(2);
    else inputArea.value = result.toFixed(2);
}

function convertSpeed(reverse = false) {
    let inputSpeed = document.getElementById('inputSpeed');
    let outputSpeed = document.getElementById('outputSpeed');
    let unit = document.getElementById('speedUnit').value;
    let input = reverse ? outputSpeed.value : inputSpeed.value;

    if (input === "") return;

    input = parseFloat(input);
    let result;

    if (!reverse) {
        if (unit === 'kmhToMph') result = input * 0.621371;
        else if (unit === 'mphToKmh') result = input / 0.621371;
        else if (unit === 'kmhToMs') result = input / 3.6;
        else if (unit === 'msToKmh') result = input * 3.6;
        else if (unit === 'mphToMs') result = input * 0.44704;
        else if (unit === 'msToMph') result = input / 0.44704;
        else if (unit === 'kmhToKnot') result = input * 0.539957;
        else if (unit === 'knotToKmh') result = input / 0.539957;
        else if (unit === 'mphToKnot') result = input * 0.868976;
        else if (unit === 'knotToMph') result = input / 0.868976;
    } else {
        if (unit === 'kmhToMph') result = input / 0.621371;
        else if (unit === 'mphToKmh') result = input * 0.621371;
        else if (unit === 'kmhToMs') result = input * 3.6;
        else if (unit === 'msToKmh') result = input / 3.6;
        else if (unit === 'mphToMs') result = input / 0.44704;
        else if (unit === 'msToMph') result = input * 0.44704;
        else if (unit === 'kmhToKnot') result = input / 0.539957;
        else if (unit === 'knotToKmh') result = input * 0.539957;
        else if (unit === 'mphToKnot') result = input / 0.868976;
        else if (unit === 'knotToMph') result = input * 0.868976;
    }

    if (!reverse) outputSpeed.value = result.toFixed(2);
    else inputSpeed.value = result.toFixed(2);
}