
const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
function connect(){
    return mongoose.connect('mongodb://127.0.0.1:27017/test1')
}
const sectionSchema=new mongoose.Schema({
    _id:{type:String,required:true},
  author_id:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  ],
},
{
    versionKey: false,
    timestamps: true,
  })
const Section=mongoose.model("section",sectionSchema);

const booksSchema=new mongoose.Schema({
    book_name:{type:String,required:true},
},
{
    versionKey: false,
    timestamps: true,
  })

const Book= mongoose.model("book",booksSchema);

const authorSchema=new mongoose.Schema({
    author_name:{type:String, required:true},
    book_id:[{type:mongoose.Schema.Types.ObjectId,ref:"book", required:true}],
},
{
    versionKey: false,
    timestamps: true,
  })
const Author= mongoose.model("author",authorSchema);

const checkedOut=new mongoose.Schema({
    name:{type:String,required:true},
    book_id:{type:mongoose.Schema.Types.ObjectId,ref:"book", required:true},
},
{
    versionKey: false,
    timestamps: true,
  })
  const check=mongoose.model("checkout",checkedOut)
app.post('/book', async(req,res)=>{
    try {
        const book=await Book.create(req.body);
        return res.send(book);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/book', async(req,res)=>{
    try {
        const book=await Book.find().lean().exec();
        return res.send(book);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.post('/author',async(req,res)=>{
    try {
        const author=await Author.create(req.body)
        return res.send(author)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/author',async(req,res)=>{
    try {
         const author=await Author.find().populate({path:"book_id",select:"book_name"}).lean().exec();
         return res.send(author)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/author/:id',async(req,res)=>{
    try {
         const author=await Author.findById(req.params.id).populate({path:"book_id",select:"book_name"}).lean().exec();
         return res.send(author)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.post('/section',async(req,res)=>{
    try {
        const section=await Section.create(req.body)
        return res.send(section)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/section',async(req,res)=>{
    try {
         const section=await Section.find().populate({path:"author_id",select:"author_name"}).lean().exec();
         return res.send(section)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.post('/checkout',async(req,res)=>{
    try {
        const check=await check.create(req.body)
        return res.send(check)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/checkout/:id',async(req,res)=>{
    try {
         const check=await check.findById(req.params.id).populate({path:"book_id",select:"book_name"}).lean().exec();
         return res.send(check)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/checkout',async(req,res)=>{
    try {
         const check=await check.find().populate({path:"book_id",select:"book_name"}).lean().exec();
         return res.send(check)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})



app.listen(5556,async()=>{
    await connect();
    console.log("server is running");
})