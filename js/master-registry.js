window.addEventListener('load', function () {
    if (localStorage.getItem('accion') === 'registro') {
        document.getElementById('adduser').style.display = 'block';
        document.getElementById('upduser').style.display = 'none';
        document.getElementById('deluser').style.display = 'none';
        document.getElementById('cancel').style.display = 'block';
        document.getElementById('return').style.display = 'none';
    } else {
        document.getElementById('adduser').style.display = 'none';
        document.getElementById('upduser').style.display = 'block';
        document.getElementById('deluser').style.display = 'block';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('return').style.display = 'block';
        document.getElementById('id').value = parseInt(localStorage.getItem('codigo'));
        document.getElementById('user').value = localStorage.getItem('usuario');
        document.getElementById('password').value = localStorage.getItem('clave');
        document.getElementById('username').value = localStorage.getItem('nombre');
        document.getElementById('img').value = localStorage.getItem('imagen');
    }
});

document.getElementById('cancel').addEventListener('click', function () {
    localStorage.clear();
    location.replace('index.html');
});

document.getElementById('return').addEventListener('click', function () {
    location.replace('sales.html');
});

function limpiarCajas () {
    document.getElementById('id').value = '';
    document.getElementById('user').value = '';
    document.getElementById('password').value = '';
    document.getElementById('username').value = '';
    document.getElementById('img').value = '';
}

var imagBase64 = '';

document.getElementById('img').addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        //console.log(reader.result);
        /*const base64String = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "");*/
        imagBase64 = reader.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('adduser').addEventListener('click', function () {
    if (imagBase64.length === 0) {
        imagBase64 = 'Sin foto';
    }
    var jsondata = {
        id: parseInt(document.getElementById('id').value),
        user: document.getElementById('user').value,
        password: document.getElementById('password').value,
        username: document.getElementById('username').value,
        img: imagBase64
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/ApiBackendNoSql/api/users",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsondata),
        beforeSend: function () {

        },
        success: function (data) {
            if (data['id'] === parseInt(document.getElementById('id').value)) {
                swal("¡Proceso correcto!", "Vendedor registrado correctamente", "success");
                limpiarCajas();
            } else {
                swal("¡Error!", "Error en la peticion", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});

document.getElementById('upduser').addEventListener('click', function () {
    var jsondata = {
        id: parseInt(document.getElementById('id').value),
        user: document.getElementById('user').value,
        password: document.getElementById('password').value,
        username: document.getElementById('username').value,
        img: document.getElementById('img').value
    };
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/ApiBackendNoSql/api/users/" + parseInt(localStorage.getItem('codigo')),
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsondata),
        beforeSend: function () {

        },
        success: function (data) {
            if (data['id'] === parseInt(localStorage.getItem('codigo'))) {
                swal("Proceso correcto!", "Datos del vendedor actualizados correctamente", "success");
            } else {
                swal("¡Error!", "Error en la peticion", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});

document.getElementById('deluser').addEventListener('click', function () {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/ApiBackendNoSql/api/users/" + parseInt(localStorage.getItem('codigo')),
        beforeSend: function () {

        },
        success: function (data) {
            document.getElementById('adduser').style.display = 'none';
            document.getElementById('upduser').style.display = 'none';
            document.getElementById('deluser').style.display = 'none';
            document.getElementById('cancel').style.display = 'block';
            document.getElementById('return').style.display = 'none';
            limpiarCajas();
            swal("Proceso correcto!", "Datos del vendedor actualizados correctamente", "success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});