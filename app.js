
import cors from 'cors'
import express from 'express' 
import bodyParser from 'body-parser'

let advertiser=[
    {id:"111",fname:"aaa",lname:"aaa",email:"aaa@example.com",password:"123",phone1:"02555333",phone2:"02555333"},
    {id:"222",fname:"bbb",lname:"aaa",email:"bbb@example.com",password:"456",phone1:"02555333",phone2:"02555333"},
    {id:"333",fname:"ccc",lname:"aaa",email:"ccc@example.com",password:"789",phone1:"02555333",phone2:"02555333"},
    {id:"444",fname:"aaa",lname:"aaa",email:"ddd@example.com",password:"234",phone1:"02555333",phone2:"02555333"},
    {id:"555",fname:"eee",lname:"aaa",email:"eee@example.com",password:"567",phone1:"02555333",phone2:"02555333"},
]

let apartment=[
    {name:"test",description:"big",img:"1.jpg",city:"bb",address:"nk",numbed:"5",additives:"pool",price:10000,codeadvertiser:"111"},
    {name:"",description:"big",img:"2.jpg",city:"pt",address:"nk",numbed:"5",additives:"pool",price:70000,codeadvertiser:"222"},
    {name:"test",description:"nice",img:"3.jpg",city:"bsh",address:"nk",numbed:"5",additives:"pool",price:50000,codeadvertiser:"333"},
    {name:"",description:"big",img:"4.jpg",city:"bsh",address:"nk",numbed:"5",additives:"pool",price:10000,codeadvertiser:"111"},
]

let app = express()
const PORT=8080
app.listen(PORT, () => {
    console.log("running in port " + PORT);
})
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

//----------------advertiser-----------------


//הרשמה
app.post('/register', (req, res) => {
    try {
        const newA = req.body
        advertiser.push(newA)
        res.json(true)
    }
    catch {
        res.json(false)
    }
})
//התחברות
app.get('/login/:email/:pass', (req, res) => {
    try {
        const { email, pass } = req.params
        const login = advertiser.find(o => o.email == email && o.password == pass)
        if (login) {
            res.json(login)
        }
        else {
            res.json(null)
        }
    }
    catch (err) {
        res.json(err)
    }
})
app.get('/login1/:email/:pass', (req, res) => {
    try {
        const { email, pass } = req.params
        const login = advertiser.find(o => o.email == email && o.password == pass)
        if (login) {
            res.json(true)
        }
        else {
            res.json(false)
        }
    }
    catch (err) {
        res.json(err)
    }
})
//----------------apartment-----------------

// שליפה רגילה
app.get('/getapartment', (req, res) => {
     res.json(apartment)
 })

//לפי עיר
app.get('/getapartmentbycity/:city', (req, res) => {
   const { city } = req.params
   const ap = apartment.filter(o => o.city == city)
    //שליחת הנתונים בפורמט גסון וסגירת הבקשה
    res.json(ap)

})
// לפי מחיר
app.get('/getapartmentbyprice/:from/:to', (req, res) => {
    const { from,to } = req.params
    const ap = apartment.filter(o => o.price >= from && o.price <= to)
     //שליחת הנתונים בפורמט גסון וסגירת הבקשה
     res.json(ap)
 
 })
//לפי קוד מפרסם
app.get('/getapartmentbyad/:fname/:lname', (req, res) => {
    const { fname, lname } = req.params
    const myadvertiser = advertiser.find(o=>o.fname == fname && o.lname == lname)
    const code = myadvertiser.id
    const mydepartment=apartment.filter(x=>x.codeadvertiser == code)
     //שליחת הנתונים בפורמט גסון וסגירת הבקשה
     res.json(mydepartment)
})

