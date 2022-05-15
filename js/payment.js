$("#submitForm").submit(function (e) {
  e.preventDefault();
  var frm = $("#submitForm");
  var data = {};
  var that = this;
  $.each(this, function (i, v) {
    var input = $(v);
    data[input.attr("name")] = input.val();
    delete data["undefined"];
  });

  $.ajax({
    contentType: "application/json; charset=utf-8",
    type: frm.attr("method"),
    url: frm.attr("action"),
    dataType: 'json',
    data: JSON.stringify(data),
    // success: function (data) {
    //   alert(data);
    // },
    // error: function (data) {
    //   alert("error occured!!");
    //   console.log(data)
    // },
    complete: function (data) {
      loadPayment('http://localhost:8080/ElectroGrid/rest/payments')
      alert('Payment Added Successfully!!')
      //form reset
      that.reset();
    }
  });
});

function loadPayment(url) {
  $("tr:has(td)").remove();
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (response) {
      $.each(response, function (i, item) {
        var $tr = $('<tr  class="table-light">').append(
          $('<th>').text(item.payOptions),
          $('<td>').text(item.totalPayment),
          $('<td>').text(item.cardName),
          $('<td>').text(item.customerName),
          $('<td>').text(item.customerId),
          $('<td>').append('<ul class="flexList"><li><a href="paymentedit.html?id=' + item.paymentId + '"><button><i class="far fa-pen"></i></button></a></li><li><button onClick="deleteitem(' + item.paymentId + ')"><i class="far fa-trash-alt"></i></button></li></ul>')
        )
          .appendTo('#tbody');
      });
    }
  });
}

function deleteitem(id) {
 if(confirm('Are You Sure You Want To Delete This Payment ?')){
    $.ajax({
    type: 'DELETE',
    url: 'http://localhost:8080/ElectroGrid/rest/payments/' + id,
    dataType: 'json',
    complete: function (response) {
      loadPayment('http://localhost:8080/ElectroGrid/rest/payments')
    }
  });
  }
}
function getAPayment(url) {
  let searchParams = new URLSearchParams(window.location.search)
  let id = searchParams.get('id')
  $.ajax({
    type: 'GET',
    url: url + '/' + id,
    dataType: 'json',
    success: function (item) {
      if (item.paymentId == id) {
        $('#id').val(item.paymentId);
        $('#nic').val(item.payOptions);
        $('#name').val(item.totalPayment);
        $('#address').val(item.cardName);
        $('#phone').val(item.customerName);
        $('#age').val(item.customerId);
      }
    }
  })
}


$("#submitEditForm").submit(function (e) {
  e.preventDefault();
  var frm = $("#submitEditForm");
  var data = {};
  var that = this;
  $.each(this, function (i, v) {
    var input = $(v);
    data[input.attr("name")] = input.val();
    delete data["undefined"];
  });

  $.ajax({
    contentType: "application/json; charset=utf-8",
    type: frm.attr("method"),
    url: frm.attr("action") + '/' + $('#id').val(),
    dataType: 'json',
    data: JSON.stringify(data),
    complete: function (data) {
      alert('Payment Updated Successfully!!')
       window.location.replace("payment.html");
    }
  });
});