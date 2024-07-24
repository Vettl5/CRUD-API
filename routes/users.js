import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();            //creates a fresh router instance, stored in the variable router

const users = []                            // Array für eine Pseudo Datenbank

/* ---------------------GET--------------------- */
router.get('/', (req, res) => {             //Standard Route, um auf HTTP GET requests zu antworten
    res.send(users);
})

router.get('/:id', (req, res) => {          //vorausgesetzt User ID ist in der URL enthalten, gibt die Methode den User zurück
    const { id } = req.params;              //req enthält u.a. parameters, die u.a. die ID in der URL beinhaltet (als Schlüssel-Wert Paar)
    const foundUser = users.find((user) => user.id === id)      //Daten des Users werden aus Datenbank in Variable foundUser gespeichert
    res.send(foundUser)                     //foundUser wird an anfragenden Client zurückgesendet
})

/* ---------------------POST--------------------- */
router.post('/', (req, res) => {
    const user = req.body;

    const userExists = users.some(existingUser => existingUser.email === user.email);

    if(!userExists) {
        users.push({...user, id: uuidv4() });
        res.send(`${user.first_name} has been added to the Database`);
    } else {
        res.send('User already exists!')
    }
})

  /* ---------------------PATCH--------------------- */
router.patch('/:id', (req, res) => {
    const {id} = req.params

    const { first_name, last_name, email } = req.body   //übergeben der Const Werte aus body an lokale Consts (wenn sie denn in req.body existieren) 

    // folgender Code ist als Pointer zu verstehen, sodass aktualisierte Daten nicht explizit zurückgeschrieben werden müssen
    const user = users.find((user) => user.id === id)   /*durchsucht "users" nach Element mit bestimmter ID und speichert es in "user"
                                                        .find geht jedes Element in users einzeln durch, speichert es in user und überprüft es auf id*/
    
    //wenn in req.body eine der Consts enthalten ist, soll sie in user übernommen werden (aktualisieren)
    if (user) { // Überprüft, ob der Benutzer existiert
        if (first_name) {
            if(user.first_name !== first_name) {user.first_name = first_name;}
            else { res.send('This is already the set surname!')}
        }
        if (last_name) {
            if(user.last_name !== last_name) {user.last_name = last_name;}
            else { res.send('This is already the set last name!')}
        }
        if (email) {
            if(user.email !== email) {user.email = email;}
            else { res.send('This is already the set email adress!')}
        } 

        res.send(`User with the ID ${id} has been updated`);
    } else {
        res.send(`User with ID ${id} not found`);
    }
})

/* ---------------------DELETE--------------------- */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
    //users = users.filter((user) => user.id !== id) --> wirft TypeError, weil users als const während der Laufzeit nicht neu zugewiesen werden kann
    res.send(`${id} deleted successfully from database`);
  });


export default router