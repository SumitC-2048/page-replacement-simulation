let pages = [];
let data = [];
let hits = 0;
let faults = 0;

function insertInput(){
    let frames = document.querySelector('#frames').value;
    let noofPages = document.querySelector('#noofPages').value;
    console.log("frames , no of pages: ", frames,noofPages);
    let parent = document.querySelector('#pageInput');

    // for (let i = 0; i < noofPages; i++) {
    //     let page = document.createElement('input');
    //     page.setAttribute('type','number');
    //     page.setAttribute('placeholder',`${i}`);
    //     page.setAttribute('id',`page${i}`);
    //     parent.appendChild(page);
    // }

}

function TakeInput(){
    let str = document.querySelector('#inputString').value;
    str = str.trim();
    let strArray = str.split(" ");
    // let intArray = strArray.map(Number);
    let intArray = strArray.map((element) => {
        const num = Number(element);
        if (isNaN(num)) {
            alert("Invalid input! Please enter a string with numeric values separated by spaces.");
            throw new Error("Invalid input");
            reset();n 
        }
        return num;
    });
    
    pages = intArray;
    console.log("pages",pages);
}




// Function to create table using divs
function createTable() {
    
    let frames = document.querySelector('#frames').value;
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML='';
    console.log(frames);
    // Create table element


    const table = document.createElement('div');
    table.classList.add('table');

    const heading = document.createElement('div');
    heading.classList.add('heading');

    let pagehead = document.createElement('div');
    pagehead.classList.add('head');
    pagehead.textContent = "page";
    heading.appendChild(pagehead);
    console.log(pagehead);

    for (let i = 1; i <= frames; i++) {
        let framehead = document.createElement('div');
        framehead.classList.add('head');
        framehead.textContent = `Frame${i}`;
        console.log("frame head",i,framehead);
        heading.appendChild(framehead);
        console.log("hello ", i);
    }

    let head = document.createElement('div');
    head.classList.add('head');
    head.textContent = "Fault/Hit";
    heading.appendChild(head);

    table.appendChild(heading);
    // Iterate over rows
    data.forEach(rowData => {
        const row = document.createElement('div');
        row.classList.add('row');


        // Iterate over cells in the row
        rowData.forEach(cellData => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        // Append row to table
        table.appendChild(row);
    });

    // Append table to container
    tableContainer.appendChild(table);


}   



// Assume you have a string variable named 'str'
let str = '';

// Add an event listener to the file input field
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a FileReader object

    // Define a function to be executed when the FileReader has loaded the file
    reader.onload = function(e) {
        str = e.target.result; // Assign the content of the file to the 'str' variable
        str = str.trim();
        let strArray = str.split(" ");
        // let intArray = strArray.map(Number);
        let intArray = strArray.map((element) => {
            const num = Number(element);
            if (isNaN(num)) {
                alert("Invalid input! Please enter a string with numeric values separated by spaces.");
                throw new Error("Invalid input");
                // reset();
            }
            return num;
        });
        
        pages = intArray;
        console.log("pages",pages);
        console.log(str); // Check the content of 'str' (optional)
    };

    // Read the contents of the file as text
    reader.readAsText(file);
});




function reset() {
    location.reload();
}


// 1  2 3 4 5 65  6