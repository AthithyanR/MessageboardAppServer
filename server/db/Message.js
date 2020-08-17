import db from './connection.js'
import Joi from 'joi'

const messages  = db.get('Messages')

const schema = Joi.object().keys({
    username:Joi.string().alphanum().required(),
    subject:Joi.string().alphanum().required(),
    message:Joi.string().required().max(500),
    imageURL:Joi.string().uri({
        scheme: [   
            /https?/
        ]
    })
})

const getAll = () => {
    return messages.find()
}

const create = (message) => {
    if(!message.username) message.username = 'Anonymous'
    if(!message.imageURL) message.imageURL = 'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'
    const result = schema.validate(message);
    if(result.error == null){
        message.created = new Date()
        return messages.insert(message)
    }
    else{
        return Promise.reject(result.error)
    }
}

export default {
    getAll,
    create,
}