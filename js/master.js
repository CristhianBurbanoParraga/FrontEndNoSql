
function readJson(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].img.length > 20) {
            var img = new Image();
            img.src = data[i].img;
            img.width = 60;
            img.height = 60;
            document.getElementById('tbody').innerHTML += `<tr>
                                        <th scope="row">`+ data[i].id + `</th>
                                        <td>`+ data[i].user + `</td>
                                        <td>`+ data[i].username + `</td>
                                        <td>`+ img.outerHTML + `</td></tr>`;
        } else {
            document.getElementById('tbody').innerHTML += `<tr>
                                        <th scope="row">`+ data[i].id + `</th>
                                        <td>`+ data[i].user + `</td>
                                        <td>`+ data[i].username + `</td>
                                        <td>`+ data[i].img + `</td></tr>`;
        }
    }
}

window.addEventListener('load', function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/ApiBackendNoSql/api/users",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            readJson(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});

document.getElementById('registry').addEventListener('click', function () {
    localStorage.setItem('accion', 'registro');
    location.replace('registry.html');
});

document.getElementById('access').addEventListener('click', function () {
    var user = document.getElementById('user').value;
    var pass = document.getElementById('password').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/ApiBackendNoSql/api/users/login?user=" + user + "&password=" + pass,
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            if (data['id'] === 0) {
                swal("¡Advertencia Importante!", "Usuario Inexistente / Credenciales incorrectas", "error");
            } else {
                localStorage.setItem('codigo',data['id']);
                localStorage.setItem('usuario',data['user']);
                localStorage.setItem('clave',data['password']);
                localStorage.setItem('nombre',data['username']);
                localStorage.setItem('imagen',data['img']);
                location.replace('sales.html');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});