import {
    firebaseCreateDoc,
    firebaseReadDoc,
    firebaseGetDoc,
    firebaseUpdateDoc,
    firebaseDeleteDoc
} from "../../js/controllers.js";

const doc = document;

const targetDocument = "public users";

const formUpdatePublicUser = widgetSelect("form[data-form-updatepublicuser]");

function getQuerySelector(target) {
    return doc.querySelector(target);
}

function widgetSelect(widget) {
    return getQuerySelector(widget);
}

const formCreatePublicUser = widgetSelect("form[data-form-addpublicuser]");
formCreatePublicUser.addEventListener("submit", e => {
    e.preventDefault();
    firebaseCreateDoc(targetDocument, {
        first_name: formCreatePublicUser.first_name.value,
        last_name: formCreatePublicUser.last_name.value,
        middle_name: formCreatePublicUser.middle_name.value,
        contact_num: formCreatePublicUser.contact_num.value,
        address: formCreatePublicUser.address.value,
        userId: formCreatePublicUser.userId.value,
        ailments: formCreatePublicUser.ailments.value,
        date_of_birth: formCreatePublicUser.date_of_birth.value,

    }).then(() => {
        implementFetchedData();
        formCreatePublicUser.reset();
    });
});

function readDocPublicUser(targetTable) {
    const data = firebaseReadDoc(targetDocument);
    data.then(response => {
        return response;
    }).then(dataCollected => {
        dataCollected.forEach(data => {
            const tr = doc.createElement("tr");
            const tdfirstname = doc.createElement("td");
            const tdlastname = doc.createElement("td");
            const tdmiddlename = doc.createElement("td");
            const tduserId = doc.createElement("td");
            const tdailments = doc.createElement("td");
            const tddate_of_birth = doc.createElement("td");
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
            tduserId.setAttribute("style", "border-collapse: collapse;");
            tdailments.setAttribute("style", "border-collapse: collapse;");
            tddate_of_birth.setAttribute("style", "border-collapse: collapse;");
            tdfirstname.appendChild(doc.createTextNode(data.first_name));
            tdlastname.appendChild(doc.createTextNode(data.last_name));
            tdmiddlename.appendChild(doc.createTextNode(data.middle_name));
            tduserId.appendChild(doc.createTextNode(data.userId));
            tdailments.appendChild(doc.createTextNode(data.ailments));
            tddate_of_birth.appendChild(doc.createTextNode(data.date_of_birth));
            tddelete.appendChild(btndelete);
            tdupdate.appendChild(btnupdate);
            tr.appendChild(tdfirstname);
            tr.appendChild(tdlastname);
            tr.appendChild(tdmiddlename);
            tr.appendChild(tduserId);
            tr.appendChild(tdailments);
            tr.appendChild(tddate_of_birth);
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
        formUpdatePublicUser.referenceId.value = referenceId;
        formUpdatePublicUser.first_name.value = response.first_name;
        formUpdatePublicUser.last_name.value = response.last_name;
        formUpdatePublicUser.middle_name.value = response.middle_name;
        formUpdatePublicUser.contact_num.value = response.contact_num;
        formUpdatePublicUser.address.value = response.address;
        formUpdatePublicUser.userId.value = response.userId;
        formUpdatePublicUser.ailments.value = response.ailments;
        formUpdatePublicUser.date_of_birth.value = response.date_of_birth;
    });
}

formUpdatePublicUser.addEventListener("submit", e => {
    e.preventDefault();
    const referenceId = formUpdatePublicUser.referenceId.value;
    firebaseUpdateDoc(targetDocument, referenceId, {
        first_name: formUpdatePublicUser.first_name.value,
        last_name: formUpdatePublicUser.last_name.value,
        middle_name: formUpdatePublicUser.middle_name.value,
        contact_num: formCreatePublicUser.contact_num.value,
        address: formCreatePublicUser.address.value,
        userId: formCreatePublicUser.userId.value,
        ailments: formCreatePublicUser.ailments.value,
        date_of_birth: formCreatePublicUser.date_of_birth.value,
    }).then(() => {
        formUpdatePublicUser.reset();
    });
});

function deleteDoc(targetReference) {
    firebaseDeleteDoc(targetDocument, targetReference);
}

function implementFetchedData() {
    const table = doc.createElement("table");
    table.setAttribute("border", "1");
    table.setAttribute("style", "border: 1px solid black; margin-left: auto;  margin-right: auto;");
    readDocPublicUser(table);
    widgetSelect("div[data-list-collection]").appendChild(table);
}

implementFetchedData();