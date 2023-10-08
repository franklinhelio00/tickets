import axios from "axios";
import { Event } from "../entities/Event";
import { HttpException } from "../interfaces/HttpExceptions";
import { EventRepository } from "../repositories/EventRepository";
import dotenv from "dotenv";

dotenv.config();
const apiGoogle = process.env.API_GOOGLEMAPS;

export interface IFilterProps {
    latitude: number;
    longitude: number;
    name: string;
    date: string;
    category: string;
    radius: number;
    price: number;
  }

class EventUseCase {
    constructor(private eventRepository: EventRepository){}

/* The `create` method in the `EventUseCase` class is responsible for creating a new event. It takes an
`eventData` object as a parameter, which contains the necessary information for creating the event. */
    async create(eventData: Event){

        if(!eventData.banner){
            throw new HttpException(400, 'Banner is required');           
        }
        if(!eventData.flyers){
            throw new HttpException(400, 'Flyers is required');
        }
        if(!eventData.location){
            throw new HttpException(400,'Location is required')
        }
        if(!eventData.price){
            throw new HttpException(400,"Price is required")
        }
        if(!eventData.tittle){
            throw new HttpException(400,"Tittle is required");
        }


        //Verificar se já exite um evento no mesmo local e horario
        const verifyEvent = await this.eventRepository.findByLocationAndDate(eventData.location, eventData.date);
        if(verifyEvent) throw new HttpException(400, 'Evento já existe nesse local, data e horario');
        


/* The code is calling the `getCityNameByCoordinates` function to retrieve the city name based on the
latitude and longitude coordinates provided in the `eventData` object. It then assigns the retrieved
city name to the `city` property of the `eventData` object. */
        const cityName = await this.getCityNameByCoordinates(
            eventData.location.latitude,
            eventData.location.longitude,
        );

        eventData = {
            ...eventData ,
            city: cityName,
        }

/* The code is calling the `add` method of the `eventRepository` object and passing the `eventData`
object as an argument. The `add` method is responsible for adding the event data to the event
repository or database. */
        const result = await this.eventRepository.add(eventData);
        return result;
    }

    async findEventByLocation(latitude: string, longitude: string){
        const cityName = await this.getCityNameByCoordinates(
        latitude,
        longitude,
        );
        const findEventByCity = await this.eventRepository.findEventsByCity(cityName);

        const eventWithRadius = findEventByCity.filter(event =>{
            const distance = this.calculateDistance(
                Number(latitude),
                Number(longitude),
                Number(event.location.latitude),
                Number(event.location.longitude),
            )
            return distance <= 3;
        });
        return eventWithRadius;
    }

    async findEventByCategory(categorias: string){
        if(!categorias) throw new HttpException(404,'Category is required');
        
        const events = await this.eventRepository.findEventByCategory(categorias)
        return events;
    }
/**
 * The function `getCityNameByCoordinates` retrieves the city name based on the given latitude and
 * longitude coordinates using the Google Maps Geocoding API.
 * @param {string} latitude - The latitude of the location for which you want to retrieve the city
 * name.
 * @param {string} longitude - The `longitude` parameter is a string representing the longitude
 * coordinate of a location.
 * @returns the name of the city based on the provided latitude and longitude coordinates.
 */
    private async getCityNameByCoordinates(latitude: string,longitude: string){

        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiGoogle}`);
               
               if(response.data.status == 'OK' && response.data.results.length > 0){
                const address = response.data.results[0].address_components
                const cityType = address.find((type: any )=> type.types.includes('administrative_area_level_2') && type.types.includes('political'));
        
                return cityType.long_name
                
        
               }
               throw new HttpException(404, 'City not found');
               
            
        } catch (error) {
            throw new HttpException(401, 'Error request city name');
            
        }

    }
    private calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
      ): number {
        const R = 6371; // Raio da Terra em quilômetros
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
      }
      private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
      }
    }

export {EventUseCase}