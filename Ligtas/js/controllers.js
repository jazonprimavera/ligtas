import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Success message
const SUCCESS_WRITE_FIREBASE = "Data written successfully";
const SUCCESS_MODIFY_FIREBASE = "Data has been modified successfully";
const SUCESS_DELETE_FIREBASE = "Data has been deleted successfully";
const SUCCESS_READ_FIREBASE = "Data has been fetch / read successfully";

// Warning message
const WARNING_FAIL_WRITE_FIREBASE = "Data is failed to write";
const WARNING_FAIL_MODIFY_FIREBASE = "Data is failed to update";
const WARNING_FAIL_DELETE_FIREBASE = "Data is failed to remove";
const WARNING_FAIL_READ_FIREBASE = "Data is failed to fetch / read";

const firebaseConfig = {
    apiKey: "AIzaSyB7xC3DCXPItAooaUJvLHXIQt_0b8ler9s",
    authDomain: "ligtas-53439.firebaseapp.com",
    databaseURL: "https://ligtas-53439-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ligtas-53439",
    storageBucket: "ligtas-53439.appspot.com",
    messagingSenderId: "804588638495",
    appId: "1:804588638495:web:7180cdf285a5ff9aa3202a"
};

// init
initializeApp(firebaseConfig);
const firestore = getFirestore()
let collectionReference = (targetDocument) => collection(firestore, targetDocument);

// Data manager
export async function firebaseCreateDoc(targetDocument, data) {
    return await addDoc(collectionReference(targetDocument), data)
        .then(() => {
            console.log(SUCCESS_WRITE_FIREBASE);
        }).catch(e => {
            console.error(WARNING_FAIL_WRITE_FIREBASE);
            console.error(e.message);
        });
}

export async function firebaseReadDoc(targetDocument) {
    const dataCollected = [];
    await getDocs(collectionReference(targetDocument))
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                dataCollected.push({...doc.data(), id: doc.id });
            });
            console.log(SUCCESS_READ_FIREBASE);
        }).catch(e => {
            console.error(WARNING_FAIL_READ_FIREBASE);
            console.error(e.message);
        });
    return dataCollected
}

export async function firebaseGetDoc(targetDocument, referenceId) {
    const documentReference = doc(firestore, targetDocument, referenceId);
    const documentSnapshot = await getDoc(documentReference);
    if (documentSnapshot.exists()) {
        console.log(SUCCESS_READ_FIREBASE);
        return documentSnapshot.data();
    } else {
        console.error(WARNING_FAIL_READ_FIREBASE);
        return null;
    }
}

export async function firebaseUpdateDoc(targetDocument, referenceId, data) {
    const documentReference = doc(firestore, targetDocument, referenceId);
    return await updateDoc(documentReference, data)
        .then(() => {
            console.log(SUCCESS_MODIFY_FIREBASE);
        }).catch(e => {
            console.error(WARNING_FAIL_MODIFY_FIREBASE);
            console.error(e.message);
        });
}

export async function firebaseDeleteDoc(targetDocument, referenceId) {
    const documentReference = doc(firestore, targetDocument, referenceId);
    return await deleteDoc(documentReference)
        .then(() => {
            console.log(SUCESS_DELETE_FIREBASE);
        }).catch(e => {
            console.error(WARNING_FAIL_DELETE_FIREBASE);
            console.error(e.message);
        });
}