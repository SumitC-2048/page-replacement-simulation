function fifo(){
    // TakeInput();
    hits = 0;
    faults = 0;
    data = []
    let frames = document.getElementById('frames').value;
    let arr = [];
    console.log("frames", frames);
    for (let i = 0; i < frames; i++) {
        arr.push(-1);
    }

    let counter=  0;
    pages.forEach((page, i) =>{
        let temp = []
        temp.push(page);
        let diff = "Fault";
        if(arr.includes(page)){
            diff="Hit"
            hits++;
        }
        else{
            faults ++;
            arr[counter] = page;
            counter++;
            counter%= frames;
        }

        arr.map(e => temp.push(e));
        temp.push(diff);
        data.push(temp);
    })

    // createTable();
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML='<div><h3>First in First Out:</h3></div>';
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

    document.querySelector('#summary').innerHTML = 
    `
    <h3>Summary</h3>
    <p>total pages: ${pages.length}</p>
    <p>total Hits: ${hits}</p>
    <p>total Hits: ${faults}</p>
    <p><b>Hit rate: ${((hits*100)/pages.length).toFixed(2)} %</b></p>
    <p><b>Miss rate: ${((faults*100)/pages.length).toFixed(2)}%</b></p>

    
`

}
