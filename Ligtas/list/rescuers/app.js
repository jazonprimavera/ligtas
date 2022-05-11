import {
    firebaseCreateDoc,
    firebaseReadDoc,
    firebaseGetDoc,
    firebaseUpdateDoc,
    firebaseDeleteDoc
} from "../../js/controllers.js";

const doc = document;

const targetDocument = "public_rescuers";

const formUpdateRescuer = widgetSelect("form[data-form-updaterescuer]");

function getQuerySelector(target) {
    return doc.querySelector(target);
}

function widgetSelect(widget) {
    return getQuerySelector(widget);
}

const formRescuer = widgetSelect("form[data-form-addrescuer]");
formRescuer.addEventListener("submit", e => {
    e.preventDefault();
    firebaseCreateDoc(targetDocument, {
        first_name: formRescuer.first_name.value,
        last_name: formRescuer.last_name.value,
        middle_name: formRescuer.middle_name.value,
        org_address: formRescuer.org_address.value,
        rescue_org: formRescuer.rescue_org.value,
        rescuer_num: formRescuer.rescuer_num.value,
        rescuerId: formRescuer.rescuerId.value,
    }).then(() => {
        implementFetchedData();
        formRescuer.reset();
    });
});

function readDocRescuer(targetTable) {
    const data = firebaseReadDoc(targetDocument);
    data.then(response => {
        return response;
    }).then(dataCollected => {
        dataCollected.forEach(data => {
            const tr = doc.createElement("tr");
            const tdfirstname = doc.createElement("td");
            const tdlastname = doc.createElement("td");
            const tdmiddlename = doc.createElement("td");
            const tdrescuerId = doc.createElement("td");
            const tddelete = doc.createElement("td");
            const tdupdate = doc.createElement("td");
            const btndelete = doc.createElement("button");
            btndelete.appendChild(doc.createTextNode("Delete"));
            btndelete.onclick = function() {
                deleteDoc(data.id);
                widgetSelect("div[data-list-collection]").removeChild(targetTable);
                implementFetchedData();
            };
            const btnupdate = doc.createElement("button");
            btnupdate.appendChild(doc.createTextNode("Update"));
            btnupdate.onclick = function() {
                getDocRescuer(data.id);
            };
            tr.setAttribute("style", "border-collapse: collapse;");
            tdfirstname.setAttribute("style", "border-collapse: collapse;");
            tdlastname.setAttribute("style", "border-collapse: collapse;");
            tdmiddlename.setAttribute("style", "border-collapse: collapse;");
            tdrescuerId.setAttribute("style", "border-collapse: collapse;");
            tdlocation.setAttribute("style", "border-collapse: collapse;");
            tdfirstname.appendChild(doc.createTextNode(data.first_name));
            tdlastname.appendChild(doc.createTextNode(data.last_name));
            tdmiddlename.appendChild(doc.createTextNode(data.middle_name));
            tdrescuerId.appendChild(doc.createTextNode(data.rescuerId));
            tdlocation.appendChild(doc.createTextNode(data.location));
            tddelete.appendChild(btndelete);
            tdupdate.appendChild(btnupdate);
            tr.appendChild(tdfirstname);
            tr.appendChild(tdlastname);
            tr.appendChild(tdmiddlename);
            tr.appendChild(tdrescuerId);
            tr.appendChild(tdlocation);
            tr.appendChild(tddelete);
            tr.appendChild(tdupdate);
            targetTable.appendChild(tr);
        });
    })
}

function getDocRescuer(referenceId) {
    const data = firebaseGetDoc(targetDocument, referenceId);
    data.then(response => {
        console.log(response);
        formUpdateRescuer.referenceId.value = referenceId;
        formUpdateRescuer.first_name.value = response.first_name;
        formUpdateRescuer.last_name.value = response.last_name;
        formUpdateRescuer.middle_name.value = response.middle_name;
        formUpdateRescuer.org_address.value = response.org_address;
        formUpdateRescuer.rescue_org.value = response.rescue_org;
        formUpdateRescuer.rescuer_num.value = response.rescuer_num;
        formUpdateRescuer.rescuerId.value = response.rescuerId;
    });
}

formUpdateRescuer.addEventListener("submit", e => {
    e.preventDefault();
    const referenceId = formUpdateRescuer.referenceId.value;
    firebaseUpdateDoc(targetDocument, referenceId, {
        first_name: formUpdateRescuer.first_name.value,
        last_name: formUpdateRescuer.last_name.value,
        middle_name: formUpdateRescuer.middle_name.value,
        org_address: formUpdateRescuer.org_address.value,
        rescue_org: formUpdateRescuer.rescue_org.value,
        rescuer_num: formUpdateRescuer.rescuer_num.value,
        rescuerId: formUpdateRescuer.rescuerId.value,
    }).then(() => {
        formUpdateRescuer.reset();
    });
});

function deleteDoc(targetReference) {
    firebaseDeleteDoc(targetDocument, targetReference);
}

function implementFetchedData() {
    const table = doc.createElement("table");
    table.setAttribute("border", "1");
    table.setAttribute("style", "border: 1px solid black; margin-left: auto;  margin-right: auto;");
    readDocRescuer(table);
    widgetSelect("div[data-list-collection]").appendChild(table);
}

implementFetchedData();