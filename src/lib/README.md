# To clear doubts of every part.

next js apps usually deployed on vercel,netlify.

## Serverless Functions in Next.js
in nextjs the API route handlers like (GET api/users) are stateless (they do not have any past memories if they were called before or not) and because of that at every new request nextjs creates a new function instance and that function obv doesnt know what haa happened before and might ask for the new DB connection and to avoid new connection we double check that using readystate or any global var if DB is already connected or not. 

### Final Version 
In Next.js, API route handlers like GET /api/users are stateless — meaning they don't retain any memory of previous invocations. Every time a request hits the server, a new function instance is spun up. This instance doesn’t know whether a DB connection was already established or not.

If we don’t handle this properly, the app might attempt to create a new MongoDB connection on every API request, which can lead to performance issues and connection overloads (especially in development with hot reloads or serverless environments like Vercel).

To avoid this, we cache the DB connection globally (like using a variable connection.isConnected or checking mongoose.connections[0].readyState) and ensure we only connect if there's no active connection.

So in short:

“Because each request runs in isolation (stateless), we check globally if DB is already connected before creating a new connection.”

### OR

“Next.js API handlers are stateless. Har request pe naya instance banta hai jisko nahi pata pehle se DB connected hai ya nahi. Isliye hum ek global variable ya readyState se check kar lete hain, taaki baar-baar unnecessary connection na ho.”

```js
    import mongoose from mongoose;

    type connectionObj {
        isConnected? : number ;
    }

    const connection :connectionObj = {}
    
    async function dbConnect() :Promise<void>{        //Whenever you write an async function, it automatically returns a Promise — no matter what.
        if(connection.isConnected){
            console.log("connection is already established")
            return
        }
        else{
            try{
                const db = await mongoose.connect(process.env.MONGODB_URI)
                connection.isConnected = db.connections[0].readyState
                console.log("connection established");
            }catch(error){
                process.exit(1)
            }
        }
    }



```