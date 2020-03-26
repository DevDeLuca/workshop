//Usei o express pra criar e configurar meu servidor
const express = require('express');
const server = express();

const ideias = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi officiis numquam, at n et saepe!",
        url: "https://udemy.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi officiis numquam, at n et saepe!",
        url: "https://www.hypeness.com.br/2020/03/exercicios-em-casa-canais-e-apps-para-manter-a-saude-fisica-e-mental-na-quarentena/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Cursos de Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi officiis numquam, at n et saepe!",
        url: "https://https://www.personare.com.br/meditacao-para-ansiedade-na-quarentena-m56619.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
        title: "Video Games",
        category: "Jogos",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi officiis numquam, at n et saepe!",
        url: "https://www.techtudo.com.br/listas/2020/03/gartic-uno-stop-e-mais-oito-jogos-que-sao-mania-durante-quarentena.ghtml"
    }
]

//configurar arquivos estáticos (css, scripts, imgs...)
server.use(express.static("public"));

//configuração do nunjucks -> serve para dinamizar paginas usando javascript visando também reaproveitar codigo
const nunjucks = require("nunjucks");

nunjucks.configure("views", {
    express: server,
    noCache: true, //boolean
});

//criei uma rota "/" e capturo o pedido do cliente pra responder com a pagina index.html
server.get("/", function (req, res) {
    let lastIdeais = []

    const ideiasReversas = [...ideias].reverse(); //copia e reverte

    for (let ideia of ideiasReversas) {
        if (lastIdeais.length < 3) {
            lastIdeais.push(ideia);
        } else {
            break;
        }
    }

    return res.render("index.html", { ideias: lastIdeais });
});

//criei uma rota "/ideias" e capturo o pedido do cliente pra responder com a pagina ideias.html
server.get("/ideias", function (req, res) {
    return res.render("ideias.html", { ideias: [...ideias].reverse() });
});

//liguei meu server na porta 3000
server.listen(3000);