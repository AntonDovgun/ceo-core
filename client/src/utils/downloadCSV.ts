const downloadCSV = (data: string, title: string): void => {
    const blob = new Blob([`\uFEFF${data}`], {type: 'text/csv;charset=utf-8;'});

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.csv`;
    link.click();

    URL.revokeObjectURL(url);
}

export {
    downloadCSV
}