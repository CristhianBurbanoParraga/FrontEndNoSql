document.getElementById('salir').addEventListener('click', function () {
    localStorage.clear();
    location.replace('index.html');
});

document.getElementById('myaccount').addEventListener('click', function () {
    localStorage.setItem('accion','micuenta');
    location.replace('registry.html');
});

function readJson (data) {
    document.getElementById('tbody').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        document.getElementById('tbody').innerHTML += `<tr>
                                        <th scope="row">`+ data[i].id + `</th>
                                        <td>`+ data[i].quantity + `</td>
                                        <td>`+ data[i].unitprice + `</td>
                                        <td>`+ data[i].total + `</td>
                                        <td>`+ data[i].observation + `</td>
                                        <td>`+ data[i].username + `</td></tr>`;
    }
}

function ReadAllSales () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/ApiBackendNoSql/api/sales",
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
}

function ReadMySales () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/ApiBackendNoSql/api/sales/" + localStorage.getItem('nombre'),
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
}

window.addEventListener('load', function () {
    document.getElementById('account').innerHTML = 'Cuenta actual: ' + localStorage.getItem('usuario');
    ReadMySales();
});

document.getElementById('optiontable').addEventListener('click', function () {
    if (document.getElementById('optiontable').value === 'mysales') {
        ReadMySales();
    } else {
        ReadAllSales();
    }
});

function limpiarCajas () {
    document.getElementById('id').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('unitprice').value = '';
    document.getElementById('observation').value = '';
}

document.getElementById('addsale').addEventListener('click', function () {
    var jsondata = {
        id: parseInt(document.getElementById('id').value),
        quantity: parseInt(document.getElementById('quantity').value),
        unitprice: parseFloat(document.getElementById('unitprice').value),
        total: parseFloat(parseInt(document.getElementById('quantity').value) * parseFloat(document.getElementById('unitprice').value)),
        observation: document.getElementById('observation').value,
        username: localStorage.getItem('nombre')
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/ApiBackendNoSql/api/sales",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsondata),
        beforeSend: function () {

        },
        success: function (data) {
            if (data['id'] === parseInt(document.getElementById('id').value)) {
                swal("¡Proceso correcto!", "venta registrado correctamente", "success");
                limpiarCajas();
                ReadMySales();
            } else {
                swal("¡Error!", "Error en la peticion", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});
