import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';  // __dirname no esta disponible con ES Modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Incluir el middleware static
// Recordar que los htmls no estan dentro de /public/css y /public/images y /public/js
// Colgar los html en una carpeta views

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// middleware _____________________________
function logger(req, res, next) {
    console.log(`LOGGER: ${req.url}`);
    next();
}
app.use(logger) 

// Middleware ______________________________

app.get('/parcial', (req, res) => {
    res.render("parcial"); 
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro_usu.html')); 
});

app.get('/bucle', (req, res) => {
    const numeros =  [1,6,7,3,78,99];
    res.render("bucle",{numeros})
});

app.post('/registro', (req, res) => {
    console.log('POST');
    const {nombre, usuario, password, password1 } = req.body;

    console.log(`nombre ${nombre}`)
    console.log(`usuario ${usuario}`)
    console.log(`password ${password}`)
    console.log(`password1 ${password1}`)

    if (password === password1) {
        if (password === "11" && usuario === "pp") {
            //res.json({Resultado: 'Acceso permitido'});
            res.sendFile(path.join(__dirname, 'views', 'registro_usu_priv.html'));
          
        }
        else {
            //res.json({Resultado: 'Acceso RECHAZADO'});
            res.sendFile(path.join(__dirname, 'views', 'registro_usu_rech.html'));
        }
    }
    else {
        res.json({Resultado: 'Las contraseñas no coinciden'});
    }  
     
});


app.use((req, res) => {
    res.status(404).send('Error pagina no existe')
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
