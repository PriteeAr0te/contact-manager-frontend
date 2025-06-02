export function exportContactsToCSV(contacts, filename = "contacts.csv") {
    if (!contacts || contacts.length === 0) return;

    const headers = Object.keys(contacts[0]);
    const csvRows = [];

    csvRows.push(headers.join(","));

    for (const contact of contacts) {
        const row = headers.map(field => {
            let value = contact[field];

            if (typeof value === "string") {
                value = `"${value.replace(/"/g, '""')}"`;
            }

            return value ?? "";
        });
        csvRows.push(row.join(","));
    }

    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
}
