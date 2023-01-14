const express=require("express")
const bodyParser= require("body-parser")


const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const movies=[
    {id:1,
    genre: 'action'},
    {id:2,
        genre: 'horror'},
        {id:3,
            genre: 'comedy'},
]
app.get('/',async(req,res)=>{
try {
    res.status(200).json({sucess:true,allMovies:movies})
    
} catch (error) {
    res.status(400).json({sucess: false, error})
}
});

app.get('/:id',async(req,res)=>{
const {id}=req.params;
try {
    const movie = movies.find(item => item.id === parseInt(id));
     if(movie){
        res.status(200).json({sucess:true, Movie: movie});
     }
     else{
        res.status(404).json({sucess: false, message: "The movie nkt found"});
     }
} catch (error) {
    res.status(404).json({sucess: false, message: "The movie nkt found"});
}

});

app.post('/',async(req,res)=>{
    try {
      const movie={
        id: movies.length +1,
        genre: req.body.genre
      };
      movies.push(movie);
      res.status(200).json({sucess:true,newMovie:movie});
        
    } catch (error) {
        res.status(400).json({sucess: false, error})
    }

});

app.put('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const movie = movies.find(item => item.id === parseInt(id));
         if(movie){
            movie.genre = req.body.genre;
            res.status(200).json({sucess:true, updatedMovie: movie});
         }
         else{
            res.status(404).json({sucess: false, message: "The movie nkt found"});
         }
    } catch (error) {
        res.status(404).json({sucess: false, message: "The movie nkt found"});
    }
});
app.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const movie = movies.find(item => item.id === parseInt(id));
         if(movie){
            const idx=movies.indexOf(movie);
            movies.splice(idx,1);
            res.status(200).json({sucess:true,  message: "The movie dlted"});
         }
         else{
            res.status(404).json({sucess: false, message: "The movie nkt found"});
         }
    } catch (error) {
        res.status(404).json({sucess: false, message: "The movie nkt found"});
    }

});

const port = process.env.PORT || 7000;
app.listen(port,()=>{
    console.log(`Listening on ${port}..`);
    
})