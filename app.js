var tblUsers = document.getElementById('tbl_users_list');
var databaseRef = firebase.database().ref('contacts/');
var rowIndex = 1;

databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = tblUsers.insertRow(rowIndex);
        var cellId = row.insertCell(0);
        var cellFName = row.insertCell(1);
        var cellLName = row.insertCell(2);
        var cellEmail = row.insertCell(3);
        var cellDelete = row.insertCell(4);
        var btnDelete = document.createElement("button");
                btnDelete.value = "Delete";
                btnDelete.innerHTML = "Delete";
                btnDelete.setAttribute("onClick", "delete_user('" + childKey + "');");
                btnDelete.setAttribute("class", "btn btn-danger");
                cellDelete.appendChild(btnDelete);
        cellId.appendChild(document.createTextNode(childKey));
        cellFName.appendChild(document.createTextNode(childData.fName));
        cellLName.appendChild(document.createTextNode(childData.lName));
        cellEmail.appendChild(document.createTextNode(childData.email));

        rowIndex = rowIndex + 1;
    });
});


function save_user() {
    var fName = document.getElementById('fName').value;
    var lName = document.getElementById('lName').value;
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('mobile').value;
    var uid = firebase.database().ref().child('contacts').push().key;

    var data = {
        user_id: uid,
        fName: fName,
        lName: lName,
        email: email,
        mobile: mobile
    }

    var updates = {};
    updates['/contacts/' + uid] = data;
    firebase.database().ref().update(updates);

    alert('The contact has been created successfully!');
    reload_page();
}

function update_user() {
    var uid = document.getElementById('ID').value;
    var fName = document.getElementById('fNameUpdate').value;
    var lName = document.getElementById('lNameUpdate').value;
    var email = document.getElementById('emailUpdate').value;
    var mobile = document.getElementById('mobileUpdate').value;


    var data = {
        user_id: uid,
        fName: fName,
        lName: lName,
        email: email,
        mobile: mobile
    }

    var updates = {};
    updates['contacts/' + uid] = data;
    firebase.database().ref().update(updates);

    alert('The contact has been updated successfully!');
    reload_page();
}

function delete_user(user_id) {
    // var ID = document.getElementById('ID').value;

    firebase.database().ref().child('/contacts/' + user_id).remove();

    alert('The contact has been deleted successfully.');
    reload_page();
}

function reload_page() {
    window.location.reload();
}