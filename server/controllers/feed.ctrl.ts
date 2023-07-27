

import { feedModel } from '../models/feeds.model.js';

import { userService } from '../services/users.serv.js'
import sanitizeHtml from 'sanitize-html';
import dayjs from 'dayjs';




const feedController = {
    get: async function  (req, res) {
        let idx = Number(req.params.idx) || 0;
        let isRange = String(req.query.isrange) || 'false'
        let order = String(req.query.order || 'ASC')
        let allowOrder = ['ASC', 'DESC']

        let idxRange = Number(req.query.range) || 0;
        let idxMaxRange = 50

        let idxStart = idx || 0;
        let idxEnd = idxStart + idxRange || idx;
        let resultFeed;

        if (allowOrder.indexOf(order) == -1) {
            return res.status(404).json({data:'', msg:'Not Found'})
        }

        if (idxRange > idxMaxRange) {
            idxRange = idxMaxRange
        }

    
        if (isRange == 'true') {
            resultFeed = await feedModel.get({ idxStart, order, range: idxRange })
        } else {
            resultFeed = await feedModel.getFromIdx({ idx: idx })
        }
    
        if (Array.isArray(resultFeed) && resultFeed.length === 0) {
            res.status(404).json({data:'', msg:'Not Found'})
        } else {
            res.status(200).json({data: resultFeed})
        }
    },
    

    insert: async function  (req, res) {
        let token = req.headers['x-access-token'];
        let now = dayjs();
    
        let getUserId = await userService.transformTokentoUserid({ token: token });

        let content = sanitizeHtml(req.body.content);
        let owner = getUserId.userId
        let date = now.format("YYYY.MM.DD.HH.mm.ss"); 
        let type = 1;
    
        if (req.body.content.length > 1000) {
            return res.status(401).json({status:0})
        }

        let data: any = await feedModel.insert({ content: content, owner: owner, date: date, type: type })
    
        if (data.status == 1) {
            res.status(200).json({status:1})
        } else {
            res.status(401).json({status:0})
        }
    },
    
    
    delete: async function (req, res) {
        let token = req.headers['x-access-token'];
    
        let idxFeed = req.params.idx;
        let getUserId = await userService.transformTokentoUserid({ token: token });
    
        let owner =  getUserId.userId
    
        let data: any = await feedModel.delete({ idxFeed, owner })
    
        if (data.status == 1) {
            res.status(200).json({status:1})
        } else {
            res.status(401).json({status:0})
        }
    },
    
    
    update: async function (req, res) {
        let token = req.headers['x-access-token'];
    
        let idxFeed = Number(req.params.idx);
        let contentFeed = req.body.content;
        let getUserId = await userService.transformTokentoUserid({ token: token });
        let owner = getUserId.userId
        
        let data: any = await feedModel.update({ idxFeed, contentFeed, owner })
    
        if (data.status == 1) {
            res.status(200).json({status:1})
        } else {
            res.status(401).json({status:0})
        }
    }
}

export { feedController }