// Libraries
const express = require( "express" );
const path = require( "path" );
const server = express();
const router = new express.Router();
const port = process.env.PORT || 3000;

server.use( express.urlencoded() )

router.get( "/", ( request, response ) => {
    response.sendFile( path.join( __dirname + "/index.html" ) );
} );

server.use( express.static( __dirname ) );

server.use( router );

server.listen( port, () => {
    console.log( "Server started on Port 3000" );
} );
