Esta es una api para registrar ventas fisicas en un tienda, crear usuarios y los tickets de compra
(si faltan signos de acentuacion es por que en mi lap la tecla no sirve disculpen esas faltantes )



ENDPOINTS


URL base '/api/v1/'






USERS

POST

'base/register'

para registrar un usuario, recuerda por favor definir el role del usuario

'base/login'

para logear  un usuario con correo y contrasena

'base/users/admin'

esta ruta es para que un usuario admin cree directmente un usuario, si deseas crear un usuario 'admin' colocar esto en role, si no creara un usuario 'employee por default

para utulizar los endpoints GET necesitas estar logueado


GET

ALL USERS

para obtener todos los usuarios tienes que estar logueado como 'admin' y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/users'

USER BY ID

para obtener un usuario por su ID  debes estar  logueado sin importar tu role, pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/users/userId'

USER HISTORY TICKETS

para obtener el historial de tickets de un usuario, tienes que estar logueado como 'admin' y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/users/userId/tickets'

PATCH

para poder actualizar los datos de un usuario tienes que estar logueado como 'admin' y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/users/userID'

y pasar el parametro que deseas actualizar

DELETE

HARD DELETE

para borrar de manera permanente a un usuario  tienes que estar logueado como 'admin' y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/api/users/userID?destroy=true'

debemos pasar la query para que el borrado sea permanente '?destroy=true'

SOFT DELETE OR LOGIC DELETE

para hacer un borardo logico , en el cual se guarde la informacion del usuario , se debe estar logeado como 'admin' 
y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/users/userID'

PRODUCTS

POST

para poder crear un product debes estar logueado como 'admin' y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/products/admin'

GET

PRODUCT QUERY

para realizar busquedas por el nombre del product podemos hacerlo atraves de uan query para esto no es necesario estar logueado 

'base/products/query?name={colocamos el nombre del producto sin las llaves}'

para realizar esta busqueda es necesario pasar la query '?name=?'



ALL PRODUCTS

para obtener todos los productos  no se necesita estar logueado

'base/products'



PRODUCT ID

para obtener un product por su ID no es necesario estar logueado

'base/products/:productID'



PATCH

para actualizar algun parametro de un producto  como su stock, etc. es necesario estar logueado como 'admin'
 y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/products/:productId'

y pasar el parametro a actualziar en body.



DELETE

HARD DELETE

para borrar de manera permanente a un product  tienes que estar logueado como 'admin' y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/api/users/productId?destroy=true'

debemos pasar la query para que el borrado sea permanente '?destroy=true'

SOFT DELETE OR LOGIC DELETE

para hacer un borardo logico , en el cual se guarde la informacion del producto , se debe estar logeado como 'admin' 
y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/users/productId'


TICKETS

en todos los enpoints de tickets es necesario estar logueado sin importan tu role ['employee', 'admin'] y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}



POST

para crear un ticket 

'base/api/tickets'

pasar el body del  ticket



GET

para obtener ALL USER

'base/api/tickets'


USER BY ID

para obtener un usuario por su ID

'base/api/tickets/:ticketID'


PATCH

para actualizar un Ticket

'base/api/tickets/:ticketID
'
y parsar el parametro a actualizar

DELETE

HARD DELETE

para borrar de manera permanente a un product  tienes que estar logueado como 'admin' y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/api/users/ticketId?destroy=true'

debemos pasar la query para que el borrado sea permanente '?destroy=true'

SOFT DELETE OR LOGIC DELETE

para hacer un borardo logico , en el cual se guarde la informacion del producto , se debe estar logeado como 'admin' 
y  pasar el token en header recuerda el formato para  pasar el token es 
Bearer {token}

'base/users/ticketId'

en caso de  devoluciones se debe realizar un SOFT DELETE  del ticket, despues hacer un PATCH en PRODUCT para reingresar el mismo al stock
si es una devolucion y cambio de producto se debe realizar PATCH del ticket, despues hacer un PATCH en PRODUCT para reingresar el  que regreso al stock
