
function opr(){
    // TakeInput();
    hits=0
    faults=0
    data = []
    let frames = document.getElementById('frames').value;
    let arr = [];
    console.log("frames", frames);
    for (let i = 0; i < frames; i++) {
        arr.push(-1);
    }

    pages.forEach((page, j) =>{
        let temp = []
        temp.push(page);
        let diff = "Fault";
        if(arr.includes(page)){
            diff="Hit"
            hits++
        }
        else{
            faults++
            if(arr.includes(-1)){
                arr[arr.indexOf(-1)] = page;
            }
            else{
                let hash = arr;
                for(let i = j+1; i< pages.length; i++){
                    hash = hash.filter((item => item!=pages[i]))
                    if(hash.length == 1){
                        break;
                    }
                }
                console.log("page to be deleted",hash[0]);
                arr[arr.indexOf(hash[0])] = page;
            }
        }
        arr.map(e => temp.push(e));
        temp.push(diff);
        data.push(temp);
    })

    // making a table for output

    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML='';
    tableContainer.innerHTML = '<div><h3>Optimal Page Replacement:</h3></div>';
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

    document.getElementById('summary').innerHTML = 
    `
    <h3>Summary</h3>
    <p>total pages: ${pages.length}</p>
    <p>total Hits: ${hits}</p>
    <p>total Hits: ${faults}</p>
    <p><b>Hit rate: ${((hits*100)/pages.length).toFixed(2)} %</b></p>
    <p><b>Miss rate: ${((faults*100)/pages.length).toFixed(2)}%</b></p>
`

}



// 1 2 3 1 4 6