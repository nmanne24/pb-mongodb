const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()
const port = 3000;

const budgetModel = require("./budgetData")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let url = 'mongodb://127.0.0.1:27017/bugdetCharts';
app.use('/', express.static('public'));

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("Connected:" +url)
        })
        .catch((connectionError)=>{
            console.log(connectionError)
        })
// app.use('/', express.static('public'));



// app.get('/hello',(req, res) =>{
//     res.send('Hello World!');
// });

// app.get('/budget',(req, res) => {
//     const budget_data =require('./budget.json');
//     res.json(budget_data);
// })

// app.listen(port, () => {
//     console.log('Example app listening at http://localhost:'+port);
// });
app.get('/hello',(req, res) =>{
    res.send('Hello World!');
});

// app.get('/budget',(req, res) => {
//     const budget_data =require('./budget.json');
//     res.json(budget_data);
// })
// app.get('/budget', async (req, res) => {
//     try {
//       const budgetData = await budget.find({});
//       res.json(budgetData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// app.post('/addBudget', async (req, res) => {
//     try {
//       const { title, budget, color } = req.body;
//       const newBudget = new Budget({ title, budget, color });
//       const savedBudget = await newBudget.save();
//       res.json(savedBudget);
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ error: 'Invalid Data' });
//     }
//   });

app.get('/budget', async (req, res) => {
    try {
        const budgetData = await budgetModel.find({});
        // Convert colors to original format (without the leading '#')
        const formattedBudgetData = budgetData.map(item => ({
            title: item.title,
            budget: item.budget,
            color: item.color
        }));
        res.json({ myBudget: formattedBudgetData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/addBudget', async (req, res) => {
    try {
      const { title, budget, color } = req.body;
      const newBudget = new budgetModel({ title, budget, color });
      const savedBudget = await newBudget.save();
      res.json(savedBudget);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Invalid Data' });
    }
  });

// app.post('/addBudget', async (req, res) => {
//     try {
//         const { title, budget, color } = req.body;

//         // Validate fields
//         if (!title || !budget || !color) {
//             return res.status(400).json({ error: 'All fields (title, budget, color) are required.' });
//         }

//         // Convert color to hexadecimal format
//         const hexColor = `#${color}`;

//         const newBudget = new budgetModel({ title, budget, color: hexColor });
//         await newBudget.save();
//         res.status(201).json({ message: 'Budget data added successfully.' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+port);
});