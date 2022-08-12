import mongoose from 'mongoose';
import Entries from '../models/entries.js';

export const CreateEntry = async (req, res) =>{
    const request = req?.body
    const newEntry = new Entries({dateVal: request?.dateValue, records: request?.formValues})
    try{
        await newEntry.save()
        res.status(200).json({status: "complete"});
    }
    catch (error) {
        res.status(400).json({status: "incomplete"});
    }
}

export const GetEntry = async (req, res) =>{
    try{
        res.status(200).json({});
    }
    catch (error) {
        res.status(400).json({});
    }
}
