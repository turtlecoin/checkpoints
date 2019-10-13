$(document).ready(function () {
  const table = $('#ipfsGateways').DataTable({
    columnDefs: [
      {
        targets: [0, 1],
        searchable: false
      },
      {
        targets: 1,
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="' + data + '" download="checkpoints.csv" type="text/csv">' + data + '</a>'
          }
          return data
        }
      },
      {
        targets: 2,
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = numeral(data).format('0,0.00') + 'ms'
          }
          return data
        }
      }
    ],
    order: [
      [2, 'asc']
    ],
    searching: false,
    info: false,
    paging: false,
    lengthMenu: -1,
    language: {
      emptyTable: 'No IPFS gateways available'
    },
    autoWidth: false
  }).columns.adjust().responsive.recalc()

  $.ajax({
    url: Config.hashLocatorUrl,
    dataType: 'json',
    type: 'GET',
    cache: 'false',
    success: function (data) {
      if (data.hash) {
        $('#ipfsHash').text(data.hash)

        table.clear()

        for (var i = 0; i < Config.IPFSgateways.length; i++) {
          checkAndAddIPFSGateway(table, Config.IPFSgateways[i], data.hash)
        }

        loadIPFSPublicGateways(table, data.hash)
      }
    }
  })
})

function loadIPFSPublicGateways (table, hash) {
  $.ajax({
    url: Config.publicIPFSGatewayList,
    dataType: 'json',
    type: 'GET',
    cache: 'true',
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        checkAndAddIPFSGateway(table, data[i], hash)
      }
    }
  })
}

function checkAndAddIPFSGateway (table, gateway, hash) {
  const start = performance.now()
  $.ajax({
    url: gateway.replace(':hash', 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a') + '#x-ipfs-companion-no-redirect',
    dataType: 'text',
    type: 'GET',
    cache: 'false',
    success: function () {
      const url = gateway.replace(':hash', hash)
      const name = gateway.split('/')[2]
      const ms = performance.now() - start
      table.row.add([
        name,
        url,
        ms
      ])
      table.draw(false)
    }
  })
}
