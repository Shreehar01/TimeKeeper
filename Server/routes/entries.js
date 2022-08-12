import express from 'express';
import {CreateEntry, GetEntry} from '../controllers/entries.js';

const router = express.Router()

router.post('/createEntry', CreateEntry);
router.get('/getEntry', GetEntry); 

export default router;