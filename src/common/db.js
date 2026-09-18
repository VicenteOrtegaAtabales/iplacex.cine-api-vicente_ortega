import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://ev3_express:guXBzBGGoElXxbTe@cluster-express.nbgcsmf.mongodb.net/?appName=cluster-express'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

await client.connect()
            .then(() => console.log('Conectado éxitosamente a MongoDB'))
            .catch((e) => console.log(e));

export default client;