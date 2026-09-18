import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "../actor/actor.js";

const actorCollection = client.db('cine-db').collection('actores');
const registroPeliculas = client.db('cine-db').collection('peliculas');

async function handleInsertActorRequest(req, res) {
    let data = req.body
    let nombre = data.nombre

    await registroPeliculas.findOne({"nombre": nombre})
    .then(async (p) => {
        if (p === null) return res.status(404).send(p)

        let actor = Actor

        actor.idPelicula = p._id
        actor.nombre = data.nombre
        actor.edad = data.edad
        actor.estaRetirado = data.estaRetirado
        actor.premios = data.premios

        await actorCollection.insertOne(actor)
        .then((d) => {
            if(d === null) return res.status(400).send(d)
            return res.status(201).send(d)
        })
        .catch((e) => {
            console.log(e)
            return res.status(500).send({ code: e.code}) })
        })
    .catch((e) => {
        console.log(e)
        return res.status(500).send({ code: e.code})
    })
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data)})
    .catch((e) => { return res.status(500).send({ code: e.code})})
}

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id

    try {
        let oid = ObjectId.createFromHexString(id)
        
        await actorCollection.findOne({ _id: oid})
        .then((data) => {
            if (data === null) return res.status(404).send(data)
            
            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({ code: e.code })
        })
    }catch(e) {
        return res.status(400).send('Id mal formado')
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    let pelicula = req.params.pelicula

    try {
        let oid = ObjectId.createFromHexString(pelicula)

        await actorCollection.find({"idPelicula": oid}).toArray()
        .then((pelicula) => { return res.status(200).send(pelicula)})
        .catch((e) => { return res.status(500).send({ code: e.code})})
    }catch(e) {
        return res.status(400).send({ code: e.code})
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
}