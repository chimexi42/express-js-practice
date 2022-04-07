const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())


const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},

]
app.get('/', (req, res)=>{
    res.send('Hello world')

})

app.get('/api/courses', (req, res)=>{
    res.json(courses)

})

app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with given ID was not found")
     res.send(course)
})

app.post('/api/courses', (req, res)=>{
    if(!req.body.name || req.body.length < 3){
        res.status(400).send('Name is required and should be minimum 3 characters')
        return;
    }
  const course = {
      id: courses.length + 1, 
      name: req.body.name,
  }
  courses.push(course)
  res.send(course)
})

app.put('/api/courses/:id', (req, res)=>{

    const course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with given ID was not found")
    

    const {error} = validateCourse(req.body)

    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    course.name = req.body.name
    res.send(course)
})
















function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return  Joi.validate(course, schema)
}









const port = process.env.PORT|| 3000
app.listen(port, ()=>{
    console.log(`App is listening on port ${port}...`)
})