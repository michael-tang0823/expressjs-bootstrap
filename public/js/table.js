$.fn.table = function(section) {

    var title = section.name;
    var headers = section.headers;
    var data = section.data;

    //add table header
    var thead = $('<thead></thead>');
    var tr = $('<tr></tr>');
    tr.appendTo(thead);

    title = title || '&nbsp;';
    $('<th></th>').append(title).appendTo(tr);

    var cols = [];

    headers.forEach(function(item) {
        $('<th></th>').append(item.header).appendTo(tr);
        cols.push(item.col);
    });

    var tbody = $('<tbody></tbody>');

    data.forEach(function(item) {
        //label and bu is old name, rowHeader is new name. old data use
        var rowHeader = item.rowHeader;// || item.label || item.bu;

        var tr = $('<tr></tr>');

        $('<th></th>').append(rowHeader).appendTo(tr);

        headers.forEach(function(header) {
            var cellValue = item.rowData[header.col];

            $('<td></td>').append(cellValue).appendTo(tr);

        });

        tbody.append(tr);
    });

    var table = $('<table class="table table-bordered table-striped"></table>');
    table.append(thead);
    table.append(tbody);

    this.append(table);

    return this;
}