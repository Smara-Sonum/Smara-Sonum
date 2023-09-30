$(function () {
  $("#fetchData").on("click", fetchData);
  $("#results").on("click", ".delBtn", function () {
    let id = $(this).attr("data-id");
    console.log(id);
    deleteRec(id);
  });
});

function fetchData() {
  console.log("Fetching Start....");
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/products",
    success: responseArrived,
  });
}

function responseArrived(response) {
  console.log("Request Response Received ...");
  console.log(response);
  $("#results").empty();
  for (let i = 0; i < response.length; i++) {
    let rec = response[i];
    $("#results").append(`<div><h1>${rec.title}</h1>
      <button class="delBtn" data-id="${rec._id}">Delete</button>
      <p>${rec.body}</p>
    </div>`);
  }
}

function deleteRec(id) {
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function () {
      fetchData(); // Fetch data again after deletion
    },
  });
}
