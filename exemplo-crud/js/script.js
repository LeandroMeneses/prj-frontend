xhttp = new XMLHttpRequest();
var lista;
var api = "https://prj-java-senai.herokuapp.com/api/produto/";

function listar() {
    xhttp.open("GET", api);
    xhttp.send();
    xhttp.onload = function () {
        lista = this.responseText;
        lista = JSON.parse(lista);
        texto = "";
        i = 0;
        for (const p of lista) {
            texto += `<tr onclick='editar(${i})'><td>${p.nproduto}</td><td>${p.descricao}</td><td>${p.valor}</td></tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) {
    p = lista[i];
    document.getElementById("Nproduto").value = p.nproduto;
    document.getElementById("descricao").value = p.descricao;
    document.getElementById("valor").value = p.valor;
    document.getElementById("id").value = p.id;
}

function gravar() {

    var produto = {};
    produto.nproduto = document.getElementById("Nproduto").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.valor = document.getElementById("valor").value;
    // console.log(produto);

    produto.id = document.getElementById("id").value;
    if (produto.id > 0) {
        acao = "PUT"; // alteração
    } else {
        acao = "POST"; // incluir
    }

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(produto));
    xhttp.onload = function () {
        // console.log(this.responseText);
        listar();
        limpar();
    }
}

function limpar() {
    document.getElementById("Nproduto").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();