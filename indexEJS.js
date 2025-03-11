import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

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
app.use(logger)

/* INICIO BLOQUE DE NAVEGACION */

/* app.get('/2_0_inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '2_0_inicio.ejs'));
}); */

app.get('/blanco', (req, res) => {
    res.render("0_0_blanco");
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

app.get('/gracias', (req, res) => {
    res.render("2_9_thanks");
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