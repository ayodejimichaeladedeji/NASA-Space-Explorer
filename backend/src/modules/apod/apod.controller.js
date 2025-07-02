import ApodService from "./apod.service.js";

const apodService = new ApodService();

export async function getApodController(req, res, next){
    try{
        const { date, start_date, end_date } = req.query;

        const data = await apodService.getApod(date, start_date, end_date);
        res.status(200).json(data);
    }
    catch(error){
        next(error);
    }
}