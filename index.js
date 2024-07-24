import express from 'express';
import bodyParser from 'body-parser';           //comes with Express, and it allows us to take in the incoming POST request body and parse it into a JavaScript object.
import userRoutes from './routes/users.js';     //importieren der Pseudo Benutzerdatenbank

const app = express();                          //Erstellt eine App durch Benutzen des Express-Objekts
const PORT = 5000

app.use(bodyParser.json());                     //use the body-parser middleware to parse the incoming request body (specified that JSON data will be used in the application)
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

/*uses the listen-method on the app to make our application listen for incoming requests. 
The method accepts two things: the PORT, which is where we would be listening for requests 
from our client side, and a callback function that will be triggered when our server is set up.*/

/*You can define API routes using:
C reate POST: Used for creating new data on the server.             app.post()
R ead GET: Used for reading or retrieving data from the server.     app.get()
U pdate PUT: Used for updating existing data on the server.         app.patch()
D elete DELETE: Used for removing data from the server.             app.delete()

in your Express application (in the index.js file).
*/
