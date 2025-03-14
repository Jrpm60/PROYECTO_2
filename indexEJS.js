import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

function logger(req, res, next) {
    console.log(`LOGGER: ${req.url}`);
    next();
}
app.use(logger);

/* INICIO BLOQUE DE NAVEGACION */

app.get('/blanco', (req, res) => {
    res.render("0_0_blanco");
});

app.get('/', (req, res) => {
    res.render("2_0_inicio");
});

app.get('/inicio', (req, res) => {
    res.render("2_0_inicio");
});

app.get('/login', (req, res) => {
    res.render("2_1_login");
});

app.get('/form', (req, res) => {
    res.render("2_2_form");
});

app.get('/contact', (req, res) => {
    res.render("2_3_contact");
});

app.get('/cliHist', (req, res) => {
    res.render("2_4_cliHist");
});

app.get('/regInicio', (req, res) => {
    res.render("2_10_regInicio");
});

app.get('/consultas', (req, res) => {
    res.render("2_11_consultas");
});

app.get('/gracias', (req, res) => {
    res.render("2_9_thanks");
});

app.get('/getfichero', (req, res) => {
    const { id } = req.query;
    console.log(id);
    let leeFichero = "";

    switch (Number(id)) {
        case 1:
            leeFichero = "data_login.txt";
            break;
        case 2:
            leeFichero = "data_job_application.txt";
            break;
        case 3:
            leeFichero = "data_contact_form.txt";
            break;
        case 4:
            leeFichero = "data_cliHist.txt";
            break;
        default:
            console.log("Fichero no encontrado");
            return res.render('datos', { datos: [] });
    }

    console.log(leeFichero);

    const nombresCampos = ["Fecha Registro", "Cliente", "Correo de Contacto", "Como", "Quiero", "Para", "Prioridad", "Area de Negocio", "Fecha Sistema", "isLoggedIn"]; // Define los nombres de los campos

    fs.readFile(leeFichero, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al leer el fichero');
        } else {
            const lineas = data.split('\n');
            const datos = lineas.map(linea => linea.split(','));
            res.render('datos', { datos: datos, nombresCampos: nombresCampos }); // Envía los datos y los nombres de los campos a la vista
        console.log(datos);
        }
    });
});

/* FIN BLOQUE NAVEGACION */

app.post('/contact', (req, res) => {
    const filePath = 'data_contact_form.txt';
    const redirectUrl = '/gracias';
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    const dataString = `${dateTimeString}, ${Object.values(req.body).join(', ')}\n`;

    fs.appendFile(filePath, dataString, err => {
        if (err) {
            res.status(500).send('Error al guardar los datos');
        } else {
            res.redirect(redirectUrl);
        }
    });
});

app.post('/procesar', (req, res) => {
    const filePath = 'data_job_application.txt';
    const redirectUrl = '/gracias';
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    const dataString = `${dateTimeString}, ${Object.values(req.body).join(', ')}\n`;

    fs.appendFile(filePath, dataString, err => {
        if (err) {
            res.status(500).send('Error al guardar los datos');
        } else {
            res.redirect(redirectUrl);
        }
    });
});

app.post('/procesLogin', (req, res) => {
    const filePath = 'data_login.txt';
    const { usuario, password } = req.body;
    let redirectUrl;

    if (usuario === 'pp' && password === '11') {
        var isLoggedIn = true;
        redirectUrl = "/regInicio";
    } else {
        var isLoggedIn = false;
        redirectUrl = '/gracias';
    }

    const now = new Date();
    const dateTimeString = now.toLocaleString();
    const dataString = `${dateTimeString}, ${usuario}, ${password}, ${isLoggedIn}\n`;

    fs.appendFile(filePath, dataString, err => {
        if (err) {
            res.status(500).send('Error al guardar los datos');
        } else {
            res.redirect(redirectUrl);
        }
    });
});

app.post('/cliHist', (req, res) => {
    const filePath = 'data_cliHist.txt';
    const redirectUrl = '/gracias';
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    const dataString = `${dateTimeString}, ${Object.values(req.body).join(', ')}\n`;

    fs.appendFile(filePath, dataString, err => {
        if (err) {
            res.status(500).send('Error al guardar los datos');
        } else {
            res.redirect(redirectUrl);
        }
    });
});

app.use((req, res) => {
    res.status(404).send('Error pagina no existe');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});