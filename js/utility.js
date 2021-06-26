const stringyfydate = (node) => {
    const options = {day:'numeric', month: 'short', year: 'numeric'};
    const newDate = !date? "undefine": new Date(Date.parse(date).toLocaleDateString('en-GB',options));
    return newDate;
}