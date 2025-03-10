import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';  // __dirname no esta disponible con ES Modules
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Incluir el middleware static
// Recordar que los htmls no estan dentro de /public/css y /public/images y /public/js
// Colgar los html en una carpeta views

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
    res.sendFile(path.join(__dirname, 'views', 'pedido.html')); 
});


app.get('/pedido1', (req, res) => {

    const data = {
        header: 'Header',
        titulo : "Mi primer Titulo"
     };

    const isLoggedIn = false;
    res.render("pedido1", {data, isLoggedIn});
});

app.post('/pedido', (req, res) => {
    console.log('POST');

    const {articulo, cantidad, presupuesto, email } = req.body;

    const resp = {
        mensaje1 :"",
        mensaje2 :"",
        mensaje3 :"",
    }

    console.log(`articulo ${articulo}`)
    console.log(`cantidad ${cantidad}`)
    console.log(`presupuesto ${presupuesto}`)
    console.log(`email ${email}`)

  /*const now = new Date();
    const dateTimeString =now.toLocaleString();
    const dataString =`${dateTimeString}, ${validacion}, ${Object.values(formData).join(', ')}\n`;
    console.log(`dataString ${dataString}`)
 */

    if (presupuesto  > 100 && presupuesto < 501) {
            var validacion="ok";
            resp.mensaje1 = "Datos Recibidos" 
            resp.mensaje2 = "Pedido registrado correctamente" 
            resp.mensaje3 = "Gracias, estamos a tu disposicion para nuevos pedidos"      
            //res.json({Resultado: 'Pedido registrado Correctamente'});
            //res.sendFile(path.join(__dirname, 'views', 'registro_usu_priv.html'));
            res.render("registro_usu_estado", {resp} )
        }
        else {
            var validacion="nok";
            resp.mensaje1 = "Datos Recibidos" 
            resp.mensaje2 = "Pedido NO Registrado"
            resp.mensaje3 = "Corrige tus datos"

            //res.json({Resultado: 'El presupuesto debe ser mayor de 100 y menor de 500'});
            //res.sendFile(path.join(__dirname, 'views', 'registro_usu_rech.html'));
            res.render("registro_usu_estado", {resp} )
        }
         
    });

    app.get('/welcome',(req,res) => {
        
        const user = {
            isAdmin: true
        }
        res.render('welcome', {user});


    })


    
app.use((req, res) => {
    res.status(404).send('Error pagina no existe')
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
