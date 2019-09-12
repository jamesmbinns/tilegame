export const loadState = () => {
    try{
        const localState = localStorage.getItem( "state" );

        if( localState === null ){
            return undefined;
        }

        return JSON.parse( localState );
    }
    catch( error ){
        return undefined;
    }
};

export const saveState = ( state ) => {
    try{
        const localState = JSON.stringify( state );

        localStorage.setItem( "state", localState );
    }
    catch( error ){
        /* eslint-disable no-console */
        console.log( "error", error );
    }
};

export const clearState = () => {
    window.localStorage.clear();
};
