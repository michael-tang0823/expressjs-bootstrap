$.fn.section_to_flexbox = function(section) {

    var title = section.name;
    var headers = section.headers;
    var data = section.data;
    var displayHeader = section.displayHeader;
    var formatFn = section.formatFn;

    if (displayHeader) {
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

    }

    var firstContentRow = true;

    var tbody = $('<tbody></tbody>');

    data.forEach(function(item) {
        var rowHeader = item.rowHeader;// || item.label || item.bu;

        var tr;

        if (firstContentRow) {
            tr = $('<tr class="firstContentRow"></tr>');
            firstContentRow = false;
        } else {
            tr = $('<tr></tr>');
        }

        $('<th></th>').append(rowHeader).appendTo(tr);

        headers.forEach(function(header) {
            var cellValue = item.rowData[header.col];

            $('<td></td>').append(cellValue).appendTo(tr);

        });

        tbody.append(tr);
    });

    var table = $('<table class="table table-bordered table-striped"></table>');
    if (displayHeader) {
        table.append(thead);
    }

    table.append(tbody);

    this.append(table);


    return this;
}