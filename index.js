let itemsnumber = Number(
  window.location.href.replace(
    "http://127.0.0.1:3000/api/v1/todos?per_page=",
    ""
  )
);

fetch(`http://127.0.0.1:3000/api/v1/todos?per_page=${itemsnumber}`)
  .then((response) => response.json())
  .then((json) => console.log(json));
