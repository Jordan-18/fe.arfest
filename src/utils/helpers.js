import CryptoJS from 'crypto-js';

const key = '6803d318176f17962941c9efc7da8448f36f8a3d9d77dd4bf886cd9c7bb1cd6f4c470911da65261a412a704301725e1afee037e9bf7027f6d32f8efa4875010c'

export const encrypData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

export const decrypData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, key)
    const plainText = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(plainText);
}

export const onSubmit = (el) => {
    const formData = new FormData(document.getElementById(el));
    let jsonData = {};
    for (let [key, value] of formData.entries()) {
        let part = key.split('-')
        if(part[0] == 'select'){
            let parentNode = document.getElementById(key).parentNode.getAttribute('value')
            jsonData[part[1]] = parentNode;
        }
        else{
            jsonData[part[0]] = value;
        }
    }

    return jsonData
}

export const onDate = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
