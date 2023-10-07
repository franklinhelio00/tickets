import request from "supertest"
import { App } from "../app";

const app = new App()
const express = app.app

describe('Event test', ()=>{
    it('/POST Event', async ()=>{
        const event = {
            tittle: 'Boteco do Gustavo Lima',
            price: [{setor: 'PISTA', amount: '500'}],
            description: 'Evento descrição',
            city: 'São Paulo',
            location: {
                latitude: '-23.5276207',
                longitude: '-46.6784662'
            },
            cupons: [],
            date: new Date(),
            participantes: [],
            
        };
        const response = await request(express)
        .post('/events')
        .field('tittle', event.tittle)
        .field('description', event.description)
        .field('city', event.city)
        .field('cupons', event.cupons)
        .field('location[latitude]', event.location.latitude)
        .field('location[longitude]', event.location.longitude)
        .field('price[setor]', event.price[0].setor)
        .field('price[amount]', event.price[0].amount)
        .attach('banner', '/Users/frank/Downloads/banner.png')
        .attach('flyers', '/Users/frank/Downloads/flyers1.png')
        .attach('flyers', '/Users/frank/Downloads/flyers2.png');
        if(response.error){
            console.log('error: ', response.error);

        }
        expect(response.status).toBe(201);
        expect(response.body).toEqual({message: 'Evento criado com sucesso'});
    });
});