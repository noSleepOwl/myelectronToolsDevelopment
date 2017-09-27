interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);