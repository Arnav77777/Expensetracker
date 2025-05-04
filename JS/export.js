exportdocument.getElementById('exportBtn').addEventListener('click', function() {
    // Logic for exporting expenses
    const csvContent = "data:text/csv;charset=utf-8," + 
        expenses.map(e => `${e.date},${e.category},${e.amount},${e.description}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "expenses.csv"
});