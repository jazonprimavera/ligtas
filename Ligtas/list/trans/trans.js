import {
    firebaseCreateDoc,
    firebaseReadDoc,
    firebaseGetDoc,
    firebaseUpdateDoc,
    firebaseDeleteDoc
} from "../../js/controllers.js";

const doc = document;

const targetDocument = "rescuer_transaction";

const formUpdateTransac = widgetSelect("form[data-form-updatetransac]");

function getQuerySelector(target) {
    return doc.querySelector(target);
}

function widgetSelect(widget) {
    return getQuerySelector(widget);
}

const formTransac = widgetSelect("form[data-form-addtransac]");
formTransac.addEventListener("submit", e => {
    e.preventDefault();
    firebaseCreateDoc(targetDocument, {
        coordinates_rescuer: formTransac.coordinates_rescuere.value,
        date_time_Accept: formTransac.date_time_Accept.value,
        date_time_Arrival: formTransac.date_time_Arrival.value,
        date_time_Request: formTransac.date_time_Request.value,
        first_name: formTransac.first_name.value,
        hotline_num: formTransac.hotline_num.value,
        last_name: formTransac.last_name.value,
        middle_name: formTransac.middle_name.value,
        pin_loc: formTransac.pin_loc.value,
        rescue_Org: formTransac.rescue_Org.value,
        rescuer_trans_id: formTransac.rescuer_trans_id.value,
    }).then(() => {
        implementFetchedData();
        formTransac.reset();
    });
});

function readDocTransac(targetTable) {
    const data = firebaseReadDoc(targetDocument);
    data.then(response => {
        return response;
    }).then(dataCollected => {
        dataCollected.forEach(data => {
            const tr = doc.createElement("tr");
            const tdfirstname = doc.createElement("td");
            const tdlastname = doc.createElement("td");
            const tdmiddlename = doc.createElement("td");
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
                getDocTransac(data.id);
            };
            tr.setAttribute("style", "border-collapse: collapse;");
            tdfirstname.setAttribute("style", "border-collapse: collapse;");
            tdlastname.setAttribute("style", "border-collapse: collapse;");
            tdmiddlename.setAttribute("style", "border-collapse: collapse;");
            tdfirstname.appendChild(doc.createTextNode(data.first_name));
            tdlastname.appendChild(doc.createTextNode(data.last_name));
            tdmiddlename.appendChild(doc.createTextNode(data.middle_name));
            tddelete.appendChild(btndelete);
            tdupdate.appendChild(btnupdate);
            tr.appendChild(tdfirstname);
            tr.appendChild(tdlastname);
            tr.appendChild(tdmiddlename);
            tr.appendChild(tddelete);
            tr.appendChild(tdupdate);
            targetTable.appendChild(tr);
        });
    })
}

function getDocTransac(referenceId) {
    const data = firebaseGetDoc(targetDocument, referenceId);
    data.then(response => {
        console.log(response);
        formUpdateTransac.referenceId.value = referenceId;
        formUpdateTransac.first_name.value = response.first_name;
        formUpdateTransac.last_name.value = response.last_name;
        formUpdateTransac.middle_name.value = response.middle_name;
        formUpdateTransac.org_address.value = response.org_address;
        formUpdateTransac.rescue_org.value = response.rescue_org;
        formUpdateTransac.rescuer_num.value = response.rescuer_num;
    });
}

formUpdateTransac.addEventListener("submit", e => {
    e.preventDefault();
    const referenceId = formUpdateTransac.referenceId.value;
    firebaseUpdateDoc(targetDocument, referenceId, {
        first_name: formUpdateTransac.first_name.value,
        last_name: formUpdateTransac.last_name.value,
        middle_name: formUpdateTransac.middle_name.value,
        org_address: formUpdateTransac.org_address.value,
        rescue_org: formUpdateTransac.rescue_org.value,
        rescuer_num: formUpdateTransac.rescuer_num.value
    }).then(() => {
        formUpdateTransac.reset();
    });
});

function deleteDoc(targetReference) {
    firebaseDeleteDoc(targetDocument, targetReference);
}

function implementFetchedData() {
    const table = doc.createElement("table");
    table.setAttribute("border", "1");
    table.setAttribute("class", "table-style");
    readDocTransac(table);
    widgetSelect("div[data-list-collection]").appendChild(table);
}

implementFetchedData();