export function objectToFormData(
    obj,
    namespace = null,
    formData = new FormData()
) {
    for (let porpertyName in obj) {
        if (isValidPorperty(obj, porpertyName)) {
            const formKey = getFormKey(namespace, porpertyName);
            appendToFormData(formData, formKey, obj[porpertyName]);
        }
    }
    return formData;
}

function isValidPorperty(obj, porpertyName) {
    return (
        Object.prototype.hasOwnProperty.call(obj, porpertyName) &&
        obj[porpertyName] !== undefined &&
        obj[porpertyName] !== null
    );
}

function getFormKey(namespace, porpertyName) {
    return namespace ? `${namespace}[${porpertyName}]` : porpertyName;
}

function appendToFormData(formData, formKey, value) {
    if (value instanceof Date) {
        appendAsDate(formData, formKey, value);
    } else if (isObjectButNotFile(value)) {
        objectToFormData(value, formKey, formData);
    } else {
        formData.append(formKey, value);
    }
}

function appendAsDate(formData, formKey, date) {
    formData.append(formKey, date.toISOString());
}

function isObjectButNotFile(value) {
    return typeof value == "object" && !(value instanceof File);
}

export function formDataToObject(formData) {
    const obj = {};
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return obj;
}