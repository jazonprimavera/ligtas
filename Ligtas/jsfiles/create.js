<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
<div class="container mt-3">
    <table class="table table-dark">
            <thead>
                <th>Sno</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Section</th>
                <th>Gender</th>
            </thead>
            <tbody id="tbody1"></tbody>
    </table>
</div>

        <script type="module">

    var stdNo = 0;
    var tbody = document.getElementById('tbody1');

    function AddItemToTable(name,roll,sec,gen){
        let trow = document.createElement("tr");
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');

        td1.innerHTML= ++stdNo;
        td2.innerHTML= name;
        td3.innerHTML= roll;
        td4.innerHTML= sec;
        td5.innerHTML= gen;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);

        tbody.appendChild(trow);

    }
    function AddAllItemsToTable(TheStudent){
        stdNo=0;
        tbody.innerHTML="";
        TheStudent.array.forEach(element => {
            AddItemToTable(element.NameOfStd, element.RollNo, element.Section, element.Gender);
        });
    }

    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  
    const firebaseConfig = {
    apiKey: "AIzaSyDzowrOQwPXXbOITOOg500TarCLdD9nuZI",
    authDomain: "test-47d20.firebaseapp.com",
    projectId: "test-47d20",
    storageBucket: "test-47d20.appspot.com",
    messagingSenderId: "271715414040",
    appId: "1:271715414040:web:07c44d374e9b51b2a8136d"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

    import{
        getFirestore, doc, getDoc, getDocs, onSnapshot, collection
    }
    from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
    const db = getFirestore();

        async function GetAllDataOnce(){
            const querySnapshot = await getDocs(collection(db,"TheStudentsList"));

            var students =[];

            querySnapshot.forEach(doc => {
                students.push(doc.data());

            });
            AddAllItemsToTable(students);
        }

        window.onload = GetAllDataOnce;

</script>

</body>
</html>