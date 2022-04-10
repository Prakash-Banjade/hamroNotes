console.log('Create note as much as you want to')
showNotes();
// window.('Are you sure want to delete all the notes')

var add_note = document.getElementById('add_note');
var note_title_input = document.getElementById('note_title');
var note_body_input = document.getElementById('note_body');

var notes_container = document.getElementById('notes_container');
var my_note_title = document.getElementById('note_head');
var saved_note = document.getElementById('saved_note');
var del_note = document.getElementById('del_ntoe')

var srchNotes = document.getElementById('srchNotes');
var snackbar = document.getElementById('snackbar');
var snackbar_cross = document.getElementById('cross');

let myNotesObj;



// When clicked in Create button
add_note.addEventListener('click', function(e) {
    let myNotesObj;
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        myNotesObj = [];
    } else {
        myNotesObj = JSON.parse(notes);

    }
    if (note_body_input.value.length != 0) {

        myNotesObj.push(note_body_input.value);
        // console.log(myNotesObj)
        localStorage.setItem('notes', JSON.stringify(myNotesObj))
        note_body_input.value = "";
        note_title_input.value = "";
    } else {
        snackbar.style.display = 'block';
        setTimeout(() => {
            snackbar.style.display = 'none';
        }, 3500);
    }
    showNotes();

})

function showNotes() {
    let myNotesObj;
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        myNotesObj = [];
    } else {
        myNotesObj = JSON.parse(notes);
    }

    let html = "";

    myNotesObj.forEach(function(element, index) {
        html += `<div class="note"    data-aos="fade-up"   data-aos-offset="100">
                   
        <h2>Note ${index + 1}</h2>
        <p>${element}</p>
        <button id="${index}" class="del_note" onclick="delNote(this.id)">Delete</button>
    </div>`
    });
    if (myNotesObj.length == 0) {
        document.getElementById('notes_container').innerHTML = `<p style = "font-family: 'Poppins', sans-serif; color: #888;"> Nothing to show here! Click "Add note" to create a note.</p>`
    } else {
        // notes_container.innerHTML = html;
        document.getElementById('notes_container').innerHTML = html;

    }


}

// When clicked on the cross button of the snackbar

snackbar_cross.addEventListener('click', function() {
    snackbar.style.display = "none";
})

// When click in Delete Note button

function delNote(index) {
    let myNotesObj;
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        myNotesObj = [];
    } else {
        myNotesObj = JSON.parse(notes);
    }

    myNotesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(myNotesObj))
    showNotes();


}

document.getElementById('srchNotes').addEventListener('input', function() {
    let inputVal = srchNotes.value.toLowerCase();
    // console.log(inputVal)
    let noteDiv = document.getElementsByClassName('note');

    Array.from(noteDiv).forEach(function(element, index) {
        let noteTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if (noteTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }


    })


})


document.getElementById('clearArea').addEventListener('click', function() {
    note_title_input.value = "";
    note_body_input.value = "";
})

document.getElementById('delAllNotes').addEventListener('click', function() {
    localStorage.clear();
    document.getElementById('notes_container').innerHTML = `<p style = "font-family: 'Poppins', sans-serif; color: #888;"> Nothing to show here! Click "Add note" to create a note.</p>`
})