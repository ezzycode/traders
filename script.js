let currentSortColum =null;
let currentSortDirection ='asc';
let isResizing =false; // NEW FLAG 

function sortTableByColumn(columnIndex) { 
    if (isResizing) { 
        // Blocking sorting if resizing just happened
        return;
    }

    const table =document.getElementById
    ('team-table');
    const rows = Array.from(table.querySelectorAll('tbody tr')) ;

    const isTextColumn = columnIndex !== 1;

    const direction = (currentSortColumn ===  
        columnIndex &&
            currentSortDirection === 'asc') ? 'desc' :'asc';

            rows.sort((rowA, rowB)) =>  { 
                let cellA =rowA.children[columnIndex].
                textContent.trim();
                let cellB =rowB.children[columnIndex].
                textContent.trim();

                if (!isTextColumn)  { 
                    cellA = cellA.tolowerCase();
                    cellB = cellB.tolowerCase();
                }

                if (direction === 'asc') { 
                    return cellA.localeCompare(cellB, undefined, 
                        {numeric: true} ) ;
                } else
                { 
                    return cellB.localeCompare(cellA, undefined, 
                        {numeric: true} ) ;
                }
            
            }); 
rows.forEach(row => table.querySelector('tbody').appendChild(row));

document .querySelectorAll('#tea-table th') .forEach(th => { 
    th.classList.remove('sorted-asc', 'sorted-desc');
}); 

 const header =document.querySelector( 
     '#team-table th:nth-child(${columnIndex + 1})'
 );
 header.classList.add(direction === 'asc'? 
    'sorted-asc' : 'sorted-desc');

    currentSortColumn = columnIndex;
    currentSortDirection = direction;
}

document.querySelectorAll('#team-table th'). 
forEach((th,index) => { 
    th.addEventListener('click',(} => { 
        sortTableByColumn(index);
    });
}); 

const exportButton = document.
querySelector( 
    ".export-btn"
);

const exportHTMLTableToCSV = (selector) 
=> {       
    const table=document.querySelector
    (selector);
    const rows = Array.from(table.rows);
    const teamMembers = rows.map((row)=>
     Array.from(row.cells).map (
        (cell) => cell.innerText.replace(/
            \n/g, "|")
     )
    );

    const csvContent =
    "data:text/csv;charset=utf-8," + 
    teamMembers
       .map((teamMember) => Object.values
       (teamMembers).join(",") )
       .join("\n");

    const encodedUri = encodeURI 
    (csvContent) ;
    const Link = document.createElement
    ("a");
    Link.setAttribute("href",encodedUri) ;
    Link.setAttribute("download",
        "team-members.csv");
        document.body.appendChild(link);
}; 


exportButton.addEventListener("click",
function () { 
     exportHTMLTableToCSV(".table-widget >
        table");
}); 

document.querySelectorAll('#team-table th.resizable')
.forEach(th =>  { 
    let startX, starWidth;

    const resizer = document.createdElement('div');
    resizer.style.width ='1px'; 
    resizer.style.height = '100%';
    resizer.style.position = 'absolute';
    resizer.style.top = '0';
    resizer.style.right ='0';
    resizer.style.background ='rgba(23,56,87,0.3)';
    resizer.style.cursor = 'col-resize';
    th.style.position ='relative';

    resizer.addEventListener('mousedown', (e) => { 
        isResizing =true;
        starX =e.pageX;
        startWidth = parseInt (
            document.defaultView.getComputedStyle(th).width,
            10
        );
        document.documentElement.addEventListener(
            'mousemove', onMouseMove );
        document.documentElement.addEventListener(
            'mouseup', onMouseUp);

    });

    function onMouseMove(e) { 
        const newWidth =startWidth + (e.pageX -startX);
        th.style.width =newWidth + 'px';
    } 

    function onMouseUp() { 
        document.documentElement.removeEventListener( 
            'mousemove', onMouseMove) ;
            document.documentElement.removeEventListener( 
              'mouseup', onMouseMoveUp);
            setTimeout(()   =>isREsizing =false,100);
    } 

    th.appendChild(resizer);
});
