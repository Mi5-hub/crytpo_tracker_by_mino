jQuery(function () {
  // VARIABLE DECLARATION
  var euroValue = 0;
  var arrayTotal = []


  getDataUser() // get all users and their assets 

  function getDataUser() {
    $.ajax({
      url: `/crypto`,
      method: "GET",
      datatype: "JSON",
      success: function (data) {
        // create table function
        euroValue = data.eurCurrentPrice;
        Table(data.dataUser);
      },
    });
  }
  // DATATABLE ---------------------------
  function Table(data) {
    cryptoDatatable = $("#cryptoTable").DataTable({
      data: data,
      columns: [
        { data: "user", title: "Nom" },
        {
          data: "balances",
          title: "ASSET ET SA DIFFERENCE EN EURO ",
        },
        {
          data: 'balances', title: 'Total'
        }
      ],
      responsive: true,
      scrollY: "700px",
      scrollX: true,
      scrollCollapse: true,
      bJQueryUI: true,
      stateSave: true,
      createdRow: function (row, data, dataIndex) {
        $(row).attr("id", data._id);
      },
      columnDefs: [
        {
          targets: [0, 2],
          className: "first-row",
        },
        {
          targets: 2,
          render: function (data, type, full, meta) {
            var sousTotal = null;

            for (var i = 0; i < data.length; i++) {
              sousTotal += data[i].btcValue * parseFloat(data[i].free)

            }
            arrayTotal.push(sousTotal)
            return `<label class='badge-total'>${sousTotal}$</label>`
          }
        },
        {
          targets: 1,
          className:'asset',
          render: function (data, type, full, meta) {
            var Badges = "";

            for (var i = 0; i < _.uniq(data).length; i++) {
              Badges +=
                `<label class='badge'>${data[i].asset}:` +
                data[i].btcValue * parseFloat(data[i].free) +
                `$</label>` +
                `<label class='badge-diff'>diff:` +
                (euroValue * parseFloat(data[i].free) > data[i].btcValue * parseFloat(data[i].free) ? euroValue * parseFloat(data[i].free) - data[i].btcValue * parseFloat(data[i].free) : data[i].btcValue * parseFloat(data[i].free) - euroValue * parseFloat(data[i].free)) +
                `€</label>`;
            }
            return Badges;
          },
        },

      ],
    });
  }
});
