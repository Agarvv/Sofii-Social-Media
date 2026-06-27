import { Request, Response } from 'express'
import SearchService from '@services/search/SearchService'
//    

// 

//
class SearchController {
    public static async search(req: Request, res: Response) {
        const { query } = req.params;
        
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        
        const queryStr = Array.isArray(query) ? query[0] : query;
        const results = await SearchService.search(queryStr);
        
        res.status(200).json({
            results: results 
        });
    }
}

export default SearchController;