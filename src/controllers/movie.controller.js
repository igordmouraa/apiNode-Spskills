class movieController{

    static async getMovies(req, res){
        try{
            const { page = 1, pageSize = 4, sortDir = 'desc', sortBy = 'releaseDate' } = req.query;
            
        }catch(error){
            console.error(error);
        }
    }
}